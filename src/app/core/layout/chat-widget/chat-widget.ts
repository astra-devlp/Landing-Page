import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { formatReply } from '../../../shared/utils/chat-format';
import { whatsappUrl } from '../../../shared/utils/whatsapp';
import { ChatService } from './chat.service';

interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_ENDPOINT = '/.netlify/functions/chat';
const MAX_INPUT = 1000;
const NUDGE_KEY = 'astra-chat-nudge-seen';
const NUDGE_DELAY_MS = 20_000;

function readSession(key: string): boolean {
  try {
    return sessionStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

@Component({
  selector: 'app-chat-widget',
  template: `
    @if (open()) {
      <section
        class="fixed right-4 bottom-20 z-50 flex h-[min(560px,calc(100dvh-10rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-low shadow-2xl motion-safe:animate-rise sm:right-6 sm:bottom-[10.5rem]"
        role="dialog"
        [attr.aria-label]="copy().title"
      >
        <header
          class="flex items-center gap-space-sm border-b border-outline-variant/50 bg-surface-container px-space-md py-space-sm"
        >
          <div class="btn-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <span class="material-symbols-outlined text-[20px]" aria-hidden="true">smart_toy</span>
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate font-body-md text-body-md font-semibold text-primary">
              {{ copy().title }}
            </p>
            <p class="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
              <span class="h-1.5 w-1.5 rounded-full bg-[#25D366]"></span>
              {{ copy().status }}
            </p>
          </div>
          <button
            class="inline-flex h-9 w-9 items-center justify-center rounded text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
            type="button"
            (click)="open.set(false)"
            [attr.aria-label]="copy().close"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </header>

        <div
          #scroller
          class="flex flex-1 flex-col gap-space-sm overflow-y-auto bg-surface-container-lowest p-space-md"
          aria-live="polite"
        >
          <div
            class="chat-bubble self-start rounded-tl-none bg-surface-container-high text-on-surface"
          >
            <p>{{ copy().greeting }}</p>
          </div>

          @for (turn of turns(); track $index) {
            @if (turn.role === 'user') {
              <div class="chat-bubble self-end rounded-tr-none bg-accent/15 text-primary">
                <p>{{ turn.content }}</p>
              </div>
            } @else {
              <div
                class="chat-bubble self-start rounded-tl-none bg-surface-container-high text-on-surface"
                [innerHTML]="format(turn.content)"
              ></div>
            }
          }

          @if (loading()) {
            <div
              class="chat-bubble self-start rounded-tl-none bg-surface-container-high"
              aria-label="…"
            >
              <span class="flex gap-1 py-1">
                @for (dot of [0, 1, 2]; track dot) {
                  <span
                    class="h-2 w-2 rounded-full bg-on-surface-variant motion-safe:animate-bounce"
                    [style.animation-delay.ms]="dot * 150"
                  ></span>
                }
              </span>
            </div>
          }

          @if (error()) {
            <p
              class="self-stretch rounded-lg bg-error-container/40 px-space-md py-space-sm font-body-sm text-body-sm text-on-surface"
              role="alert"
            >
              {{ error() }}
            </p>
          }

          @if (turns().length === 0 && !loading()) {
            <div class="mt-auto flex flex-wrap gap-space-xs pt-space-sm">
              @for (suggestion of copy().suggestions; track suggestion) {
                <button
                  class="rounded-full border border-accent/40 px-space-sm py-space-xs font-body-sm text-body-sm text-accent transition hover:bg-accent/15"
                  type="button"
                  (click)="send(suggestion)"
                >
                  {{ suggestion }}
                </button>
              }
            </div>
          }
        </div>

        <form
          class="flex items-end gap-space-xs border-t border-outline-variant/50 bg-surface-container p-space-sm"
          (submit)="onSubmit($event)"
        >
          <textarea
            #input
            class="max-h-28 min-h-10 flex-1 resize-none rounded-lg bg-surface-container-high px-space-sm py-space-sm font-body-md text-body-md text-primary placeholder:text-outline focus:outline-2 focus:outline-accent"
            rows="1"
            [attr.maxlength]="maxInput"
            [placeholder]="copy().placeholder"
            [attr.aria-label]="copy().placeholder"
            (keydown.enter)="onEnter($event)"
          ></textarea>
          <button
            class="btn-brand inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg disabled:opacity-50"
            type="submit"
            [disabled]="loading()"
            [attr.aria-label]="copy().send"
          >
            <span class="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
        <a
          class="flex items-center justify-center gap-space-xs bg-surface-container px-space-md pb-space-sm font-body-sm text-body-sm font-semibold text-[#25D366] hover:underline"
          [href]="handoffHref()"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="material-symbols-outlined text-[16px]" aria-hidden="true">chat</span>
          {{ copy().handoff }}
        </a>
      </section>
    }

    @if (nudge() && !open()) {
      <div
        class="fixed right-4 bottom-20 z-40 flex max-w-[260px] items-start gap-space-xs rounded-2xl rounded-br-sm border border-outline-variant bg-surface-container-low p-space-sm pl-space-md shadow-[var(--shadow-card-hover)] motion-safe:animate-pop sm:right-24 sm:bottom-28"
      >
        <button
          class="text-left font-body-md text-body-sm font-medium text-on-surface"
          type="button"
          (click)="openFromNudge()"
        >
          {{ copy().nudge }}
        </button>
        <button
          class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high"
          type="button"
          (click)="dismissNudge()"
          [attr.aria-label]="copy().nudgeClose"
        >
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    }

    <button
      class="btn-brand fixed right-4 bottom-20 z-40 hidden h-14 w-14 items-center justify-center rounded-full sm:right-6 sm:bottom-24 sm:inline-flex"
      type="button"
      (click)="toggle()"
      [attr.aria-expanded]="open()"
      [attr.aria-label]="open() ? copy().close : copy().open"
    >
      <span class="material-symbols-outlined text-[26px]">{{
        open() ? 'close' : 'smart_toy'
      }}</span>
    </button>
  `,
  styles: `
    .chat-bubble {
      max-width: 85%;
      border-radius: 0.75rem;
      padding: 0.5rem 0.875rem;
      font-size: 14px;
      line-height: 21px;
      overflow-wrap: anywhere;
    }
    .chat-bubble :is(p, ul) + :is(p, ul) {
      margin-top: 0.5rem;
    }
    .chat-bubble ul {
      list-style: disc;
      padding-left: 1.1rem;
    }
    .chat-bubble a {
      color: var(--color-accent);
      font-weight: 600;
      text-decoration: underline;
    }
  `,
})
export class ChatWidget {
  private readonly i18n = inject(I18nService);
  private readonly scroller = viewChild<ElementRef<HTMLElement>>('scroller');
  private readonly input = viewChild<ElementRef<HTMLTextAreaElement>>('input');

  protected readonly copy = () => this.i18n.copy().chat;
  private readonly chat = inject(ChatService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly open = this.chat.open;
  protected readonly turns = signal<ChatTurn[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal('');
  protected readonly maxInput = MAX_INPUT;
  protected readonly format = formatReply;

  /** WhatsApp handoff that carries the visitor's first question, so nobody has to repeat it. */
  protected readonly handoffHref = computed(() => {
    const copy = this.copy();
    const query = this.turns()
      .find((turn) => turn.role === 'user')
      ?.content.slice(0, 300);
    return whatsappUrl(
      query ? copy.handoffWithQuery.replace('{query}', query) : copy.handoffMessage,
    );
  });

  /** Proactive "can I help?" bubble, shown once per session after a short delay. */
  protected readonly nudge = signal(false);

  constructor() {
    afterNextRender(() => {
      if (!readSession(NUDGE_KEY)) {
        const timer = setTimeout(() => this.nudge.set(true), NUDGE_DELAY_MS);
        this.destroyRef.onDestroy(() => clearTimeout(timer));
      }
    });

    // Focus the input whenever the panel opens, from the launcher or any "Ask Astra" button.
    effect(() => {
      if (this.open()) {
        this.nudge.set(false);
        setTimeout(() => this.input()?.nativeElement.focus());
      }
    });
  }

  protected toggle(): void {
    this.dismissNudge();
    this.chat.toggle();
  }

  protected openFromNudge(): void {
    this.dismissNudge();
    this.chat.show();
  }

  protected dismissNudge(): void {
    this.nudge.set(false);
    try {
      sessionStorage.setItem(NUDGE_KEY, '1');
    } catch {
      // Storage may be blocked; the bubble simply may show again.
    }
  }

  protected onEnter(event: Event): void {
    if (!(event as KeyboardEvent).shiftKey) {
      event.preventDefault();
      this.submitInput();
    }
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.submitInput();
  }

  protected async send(text: string): Promise<void> {
    const content = text.trim().slice(0, MAX_INPUT);
    if (!content || this.loading()) {
      return;
    }

    this.error.set('');
    this.turns.update((turns) => [...turns, { role: 'user', content }]);
    this.loading.set(true);
    this.scrollToEnd();

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: this.turns(), lang: this.i18n.lang() }),
      });
      const data = (await response.json().catch(() => ({}))) as { reply?: string; error?: string };

      if (response.ok && data.reply) {
        this.turns.update((turns) => [...turns, { role: 'assistant', content: data.reply! }]);
      } else {
        this.error.set(data.error === 'rate_limited' ? this.copy().rateLimited : this.copy().error);
      }
    } catch {
      this.error.set(this.copy().error);
    } finally {
      this.loading.set(false);
      this.scrollToEnd();
    }
  }

  private submitInput(): void {
    const input = this.input()?.nativeElement;
    if (input && input.value.trim() && !this.loading()) {
      void this.send(input.value);
      input.value = '';
    }
  }

  private scrollToEnd(): void {
    setTimeout(() => {
      const element = this.scroller()?.nativeElement;
      element?.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
    });
  }
}
