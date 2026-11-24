import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import handler, { cleanReply, parseMessages } from './chat.mts';
import { WHATSAPP_URL } from './knowledge.mts';

describe('cleanReply', () => {
  it('keeps a normal reply', () => {
    expect(cleanReply('Hola, te ayudo con tu POS.')).toBe('Hola, te ayudo con tu POS.');
  });

  it('returns undefined for an empty or missing reply', () => {
    expect(cleanReply(undefined)).toBeUndefined();
    expect(cleanReply('   ')).toBeUndefined();
  });

  it('removes leaked reasoning and special tokens', () => {
    expect(cleanReply('<think>plan secreto</think>Respuesta final<|eot|>')).toBe('Respuesta final');
    expect(cleanReply('razonamiento suelto</think>Respuesta')).toBe('Respuesta');
  });

  it('drops a speaker prefix', () => {
    expect(cleanReply('Asistente: Claro que sí')).toBe('Claro que sí');
  });

  it('removes links to sites we do not control', () => {
    expect(cleanReply('Mira https://evil.example.com/pago aquí')).toBe('Mira  aquí');
  });

  it('keeps links to allowed sites', () => {
    expect(cleanReply('Ver https://drcristianvalencia.com/ ahora')).toBe(
      'Ver https://drcristianvalencia.com/ ahora',
    );
  });

  it('replaces any WhatsApp link with the full company link', () => {
    expect(cleanReply('Escríbenos: https://wa.me/57')).toBe(`Escríbenos: ${WHATSAPP_URL}`);
  });

  it('returns undefined when only a removed link was left', () => {
    expect(cleanReply('https://evil.example.com')).toBeUndefined();
  });
});

describe('parseMessages', () => {
  const user = (content: string) => ({ role: 'user', content });

  it('accepts a conversation that ends with the user', () => {
    expect(parseMessages({ messages: [user(' hola ')] })).toEqual([
      { role: 'user', content: 'hola' },
    ]);
  });

  it('rejects a missing, empty or non-array body', () => {
    expect(parseMessages(null)).toBeNull();
    expect(parseMessages({})).toBeNull();
    expect(parseMessages({ messages: [] })).toBeNull();
    expect(parseMessages({ messages: 'hola' })).toBeNull();
  });

  it('rejects an unknown role or a blank message', () => {
    expect(parseMessages({ messages: [{ role: 'system', content: 'x' }] })).toBeNull();
    expect(parseMessages({ messages: [user('   ')] })).toBeNull();
    expect(parseMessages({ messages: [{ role: 'user', content: 42 }] })).toBeNull();
  });

  it('rejects a conversation whose last message is not from the user', () => {
    expect(
      parseMessages({ messages: [user('hola'), { role: 'assistant', content: 'hola' }] }),
    ).toBeNull();
  });

  it('keeps only the last 12 messages and cuts long ones to 1000 characters', () => {
    const many = Array.from({ length: 20 }, (_, i) => user(`m${i}`));
    const parsed = parseMessages({ messages: many })!;
    expect(parsed).toHaveLength(12);
    expect(parsed[0].content).toBe('m8');

    const long = parseMessages({ messages: [user('a'.repeat(1500))] })!;
    expect(long[0].content).toHaveLength(1000);
  });
});

describe('handler origin check', () => {
  const post = (origin: string) =>
    new Request('https://astradevlp.com/.netlify/functions/chat', {
      method: 'POST',
      headers: { origin },
      body: '{}',
    });

  it('rejects another site with 403', async () => {
    expect((await handler(post('https://evil.example.com'))).status).toBe(403);
  });

  it('rejects an opaque "null" origin with 403 instead of crashing', async () => {
    expect((await handler(post('null'))).status).toBe(403);
  });
});

describe('handler model fallback', () => {
  /** Each call answers with the next scripted upstream response. */
  function upstream(...responses: Response[]) {
    const fetchMock = vi.fn(async (_url: string, _init: RequestInit) => responses.shift()!);
    vi.stubGlobal('fetch', fetchMock);
    return fetchMock;
  }
  const answer = (content: string) =>
    new Response(JSON.stringify({ choices: [{ message: { content } }] }), { status: 200 });
  const failure = (status: number) => new Response('{"error":{}}', { status });
  const modelOf = (call: unknown[]) => JSON.parse((call[1] as RequestInit).body as string).model;

  let ip = 0;
  const ask = () =>
    handler(
      new Request('https://astradevlp.com/.netlify/functions/chat', {
        method: 'POST',
        // A fresh client address per test keeps the rate limiter out of the way.
        headers: { 'x-nf-client-connection-ip': `10.0.0.${++ip}` },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Quiero validar pagos' }] }),
      }),
    );

  beforeEach(() => {
    vi.stubEnv('LLM_API_KEY', 'test-key');
    vi.stubEnv('LLM_BASE_URL', 'https://openrouter.ai/api/v1');
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(console, 'info').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('moves past a model that no longer exists or is busy and answers with the next one', async () => {
    upstream(failure(404), failure(429), answer('Con **Integraciones de IA** validamos pagos.'));
    const response = await ask();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      reply: 'Con **Integraciones de IA** validamos pagos.',
    });
  });

  it('falls back to the OpenRouter free router when every listed model fails', async () => {
    const fetchMock = upstream(...Array.from({ length: 20 }, () => failure(404)));
    await ask();

    const models = fetchMock.mock.calls.map(modelOf);
    expect(models.at(-1)).toBe('openrouter/free');
  });

  it('gives reasoning models room to answer after they think', async () => {
    const fetchMock = upstream(answer('Hola'));
    await ask();

    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(body.max_tokens).toBeGreaterThanOrEqual(1000);
  });

  it('says it is busy only when the models were rate-limited, not when they were gone', async () => {
    upstream(...Array.from({ length: 20 }, () => failure(404)));
    expect(await (await ask()).json()).toEqual({ error: 'upstream_error' });

    upstream(...Array.from({ length: 20 }, () => failure(429)));
    expect(await (await ask()).json()).toEqual({ error: 'rate_limited' });
  });

  it('reports a timeout mixed with a busy model as retryable, not as busy', async () => {
    const timeout = () => Promise.reject(new DOMException('aborted', 'TimeoutError'));
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockImplementationOnce(timeout)
        .mockResolvedValueOnce(failure(429))
        .mockImplementation(timeout),
    );

    expect(await (await ask()).json()).toEqual({ error: 'upstream_error' });
  });

  it('gives a slow free model enough time to finish (they take 5 to 11 s)', async () => {
    const timeout = vi.spyOn(AbortSignal, 'timeout');
    upstream(answer('Hola'));
    await ask();

    // Measured end to end, free models answer in 5 to 11 s: the first attempt
    // must outlast that, while the whole request stays under Netlify's 60 s.
    expect(timeout.mock.calls[0][0]).toBeGreaterThanOrEqual(15_000);
    expect(timeout.mock.calls[0][0]).toBeLessThan(60_000);
  });

  it('logs which model answered', async () => {
    upstream(failure(404), answer('Hola'));
    await ask();

    expect(console.info).toHaveBeenCalledWith(expect.stringContaining('answered by'));
  });
});
