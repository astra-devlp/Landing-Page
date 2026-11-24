/**
 * Netlify Function behind the website assistant: POST /.netlify/functions/chat
 *
 * The API key lives only here (Netlify environment variables), never in the
 * browser bundle. The API address comes from Netlify too.
 *
 * Environment variables (set in Netlify, not in this file):
 *   LLM_API_KEY   required. OpenRouter key (or any OpenAI-compatible provider's key).
 *   LLM_BASE_URL  required. OpenAI-compatible base URL.
 *
 * Free models are tried in order; the first one that returns text wins. The
 * free line-up on OpenRouter changes often (models disappear or stop being
 * free), so the list ends with OpenRouter's own free router, which picks
 * whichever free model is available.
 */
import { systemPrompt, WHATSAPP_URL } from './knowledge.mts';

const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 5 * 60 * 1000;
/**
 * Free models take 5 to 11 s end to end (measured 2026-11-24), so each one gets
 * room to finish. A model that hangs is still cut off so the next can try.
 */
const ATTEMPT_MS = 20_000;
/** Whole request: under `netlify dev`'s 30 s local limit, so it behaves the same as production (60 s). */
const DEADLINE_MS = 28_000;
/** Below this there is no point starting another model. */
const MIN_ATTEMPT_MS = 5_000;
/**
 * Room for reasoning models: they spend tokens thinking before they answer and
 * return an empty reply when the budget runs out first. The prompt keeps the
 * visible answer to a few sentences.
 */
const MAX_TOKENS = 1_200;
/**
 * Free models on OpenRouter, checked against the real prompt on 2026-11-24.
 * Busy models answer 429 in under a second, so trying them costs little time.
 */
const MODELS = [
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'baidu/ernie-5.5-flash-preview:free',
  'dots-studio/dots-3-note-preview:free',
  'google/gemma-4-26b-a4b-it:free', // often rate-limited
  'google/gemma-4-31b-it:free', // often rate-limited
  // Last resort: OpenRouter routes to any free model that is up right now.
  'openrouter/free',
];
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
  if (origin && hostOf(origin) !== new URL(req.url).host) {
    return json({ error: 'forbidden' }, 403);
  }

  const apiKey = process.env['LLM_API_KEY'];
  const baseUrl = process.env['LLM_BASE_URL']?.replace(/\/$/, '');
  if (!apiKey || !baseUrl) {
    console.error('[chat] LLM_API_KEY or LLM_BASE_URL is not set');
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

  const prompt = systemPrompt(typeof pageLang === 'string' ? pageLang : undefined);
  const deadline = Date.now() + DEADLINE_MS;
  // "Busy" only when every attempt was rate-limited: then a retry would just
  // spend quota. A timeout, an empty reply or a missing model is worth retrying.
  let busy = 0;
  let other = 0;
  for (const model of MODELS) {
    const remaining = deadline - Date.now();
    if (remaining < MIN_ATTEMPT_MS) {
      console.error('[chat] out of time before trying every model');
      other++;
      break;
    }
    try {
      const timeout = Math.min(ATTEMPT_MS, remaining);
      const reply = cleanReply(await complete(baseUrl, apiKey, model, prompt, messages, timeout));
      if (reply) {
        console.info(`[chat] answered by ${model}`);
        return json({ reply });
      }
      console.error(`[chat] ${model} returned an empty reply`);
      other++;
    } catch (error) {
      if (error instanceof UpstreamError && error.status === 429) busy++;
      else other++;
      console.error(`[chat] ${model} failed`, error);
    }
  }
  return json({ error: busy > 0 && other === 0 ? 'rate_limited' : 'upstream_error' }, 502);
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
  timeoutMs: number,
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
      temperature: 0.2,
      max_tokens: MAX_TOKENS,
      // OpenRouter: keep reasoning short and out of the reply. Other providers skip it.
      ...(baseUrl.includes('openrouter.ai') && { reasoning: { effort: 'low', exclude: true } }),
    }),
    signal: AbortSignal.timeout(timeoutMs),
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
export function cleanReply(reply: string | undefined): string | undefined {
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

export function parseMessages(body: unknown): ChatMessage[] | null {
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

/** Host of an Origin header, or null when it is not a URL (browsers send "null" for opaque origins). */
function hostOf(origin: string): string | null {
  try {
    return new URL(origin).host;
  } catch {
    return null;
  }
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
