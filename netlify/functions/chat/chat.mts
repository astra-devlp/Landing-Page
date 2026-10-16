/**
 * Netlify Function behind the website assistant: POST /.netlify/functions/chat
 *
 * The API key lives only here (Netlify environment variables), never in the
 * browser bundle. Any OpenAI-compatible chat API works; the defaults target
 * OpenRouter's free models.
 *
 * Environment variables:
 *   LLM_API_KEY   required. OpenRouter key (or any OpenAI-compatible provider's key).
 *   LLM_MODEL     optional. Comma-separated models, tried in order until one answers.
 *   LLM_BASE_URL  optional. OpenAI-compatible base URL; defaults to OpenRouter.
 */
import { systemPrompt, WHATSAPP_URL } from './knowledge.mts';

const DEFAULT_BASE_URL = 'https://openrouter.ai/api/v1';
// Free models get rate-limited or retired often, hence the fallbacks.
// Avoid routers like openrouter/free: they may pick moderation or reasoning-only models.
const DEFAULT_MODELS =
  'nvidia/nemotron-3-super-120b-a12b:free,qwen/qwen3.8-27b:free,google/gemma-4-31b-it:free';

const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 5 * 60 * 1000;
/** The only sites the assistant may link to; any other URL is removed from replies. */
const ALLOWED_HOSTS = ['wa.me', 'drcristianvalencia.com'];

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Best-effort per-instance limiter: protects the free quota from casual abuse.
const hits = new Map<string, number[]>();

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return json({ error: 'method_not_allowed' }, 405);
  }

  const origin = req.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(req.url).host) {
    return json({ error: 'forbidden' }, 403);
  }

  const apiKey = process.env['LLM_API_KEY'];
  if (!apiKey) {
    console.error('[chat] LLM_API_KEY is not set');
    return json({ error: 'not_configured' }, 503);
  }

  const ip = req.headers.get('x-nf-client-connection-ip') ?? 'unknown';
  if (isRateLimited(ip)) {
    return json({ error: 'rate_limited' }, 429);
  }

  const body = await req.json().catch(() => null);
  const messages = parseMessages(body);
  const pageLang = (body as { lang?: unknown } | null)?.lang;
  if (!messages) {
    return json({ error: 'bad_request' }, 400);
  }

  const baseUrl = (process.env['LLM_BASE_URL'] || DEFAULT_BASE_URL).replace(/\/$/, '');
  const models = (process.env['LLM_MODEL'] || DEFAULT_MODELS)
    .split(',')
    .map((model) => model.trim());

  let rateLimited = false;
  for (const model of models) {
    try {
      const prompt = systemPrompt(typeof pageLang === 'string' ? pageLang : undefined);
      const reply = cleanReply(await complete(baseUrl, apiKey, model, prompt, messages));
      if (reply) {
        return json({ reply });
      }
      console.error(`[chat] ${model} returned an empty reply`);
    } catch (error) {
      rateLimited ||= error instanceof UpstreamError && error.status === 429;
      console.error(`[chat] ${model} failed`, error);
    }
  }
  return json({ error: rateLimited ? 'rate_limited' : 'upstream_error' }, 502);
};

class UpstreamError extends Error {
  readonly status: number;

  constructor(status: number, body: string) {
    super(`HTTP ${status}: ${body.slice(0, 300)}`);
    this.status = status;
  }
}

async function complete(
  baseUrl: string,
  apiKey: string,
  model: string,
  prompt: string,
  messages: ChatMessage[],
): Promise<string | undefined> {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      // Optional OpenRouter attribution headers; ignored by other providers.
      'HTTP-Referer': process.env['URL'] || 'https://astradev.local',
      'X-Title': 'Astra Dev',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: prompt }, ...messages],
      temperature: 0.3,
      // Generous limit: reasoning models spend tokens thinking before they answer.
      max_tokens: 1500,
      // OpenRouter: keep reasoning short and out of the reply. Other providers skip it.
      ...(baseUrl.includes('openrouter.ai') && { reasoning: { effort: 'low', exclude: true } }),
    }),
    signal: AbortSignal.timeout(25_000),
  });

  if (!response.ok) {
    throw new UpstreamError(response.status, await response.text());
  }
  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content?.trim() || undefined;
}

/**
 * Free models sometimes leak their reasoning or special tokens, or prefix the
 * speaker name. Strip that, and drop links to sites we do not control.
 */
function cleanReply(reply: string | undefined): string | undefined {
  if (!reply) return undefined;
  const cleaned = reply
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/^[\s\S]*<\/think>/i, '')
    .replace(/<\|[^|]*\|>/g, '')
    .replace(/^\s*(Astra|Assistant|Asistente)\s*:\s*/i, '')
    // Always point to the full WhatsApp link, even if the model cut it short.
    .replace(/https?:\/\/(www\.)?wa\.me\/[\d?=&%\w.-]*/gi, WHATSAPP_URL)
    .replace(/https?:\/\/[^\s)<>\]]+/g, (url) => {
      try {
        const host = new URL(url).hostname.replace(/^www\./, '');
        return ALLOWED_HOSTS.includes(host) ? url : '';
      } catch {
        return '';
      }
    })
    .trim();
  return cleaned || undefined;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  const raw = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    return null;
  }

  const messages = raw.slice(-MAX_MESSAGES).map((item) => {
    const { role, content } = (item ?? {}) as Partial<ChatMessage>;
    const valid =
      (role === 'user' || role === 'assistant') && typeof content === 'string' && content.trim();
    return valid ? { role, content: content.trim().slice(0, MAX_CHARS) } : null;
  });

  if (messages.some((message) => message === null) || messages.at(-1)!.role !== 'user') {
    return null;
  }
  return messages as ChatMessage[];
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
