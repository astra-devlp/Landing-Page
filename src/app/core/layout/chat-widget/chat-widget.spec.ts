import { TestBed } from '@angular/core/testing';
import { ChatService } from './chat.service';
import { ChatWidget } from './chat-widget';

describe('ChatWidget', () => {
  const reply = (body: object, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

  function scriptFetch(...responses: Response[]) {
    const fetchMock = vi.fn(async () => responses.shift()!);
    vi.stubGlobal('fetch', fetchMock);
    return fetchMock;
  }

  function openChat() {
    localStorage.setItem('astra-lang', 'es');
    // jsdom has no scrollTo; the widget calls it to follow new messages.
    Element.prototype.scrollTo = () => undefined;
    // Answers appear at once instead of typing out, so the test reads the final text.
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const fixture = TestBed.createComponent(ChatWidget);
    TestBed.inject(ChatService).show();
    fixture.detectChanges();
    // Protected members are the component's public surface for its template.
    return { fixture, chat: fixture.componentInstance as any };
  }

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('shows the answer from the assistant', async () => {
    scriptFetch(reply({ reply: 'Con **Integraciones de IA** validamos pagos.' }));
    const { fixture, chat } = openChat();

    await chat.send('Quiero validar pagos');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('validamos pagos');
    expect(chat.error()).toBe('');
  });

  it('asks the server once per message: the server already tries every model', async () => {
    const fetchMock = scriptFetch(reply({ error: 'upstream_error' }, 502));
    const { chat } = openChat();

    await chat.send('Hola');

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('says it is busy when the models are rate-limited', async () => {
    scriptFetch(reply({ error: 'rate_limited' }, 502));
    const { chat } = openChat();

    await chat.send('Hola');

    expect(chat.error()).toContain('muchas preguntas');
  });

  it('offers WhatsApp with the question already written when it cannot answer', async () => {
    scriptFetch(reply({ error: 'upstream_error' }, 502));
    const { fixture, chat } = openChat();

    await chat.send('Quiero validar pagos');
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('[role="alert"]') as HTMLElement;
    const link = alert.querySelector('a[href*="wa.me"]') as HTMLAnchorElement;
    expect(link).not.toBeNull();
    expect(decodeURIComponent(link.href)).toContain('Quiero validar pagos');
  });
});
