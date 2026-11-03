import { WhatsappIcon } from '../../../../shared/ui/whatsapp-icon/whatsapp-icon';
import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';

const CLIENT_PAUSE_MS = 900;
const THINKING_MS = 650;
const RESTART_MS = 4500;
const TYPE_TICK_MS = 22;

@Component({
  selector: 'app-hero',
  imports: [WhatsappIcon, RouterLink],
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly i18n = inject(I18nService);
  protected readonly trustIcons = ['forum', 'layers', 'support_agent'];

  /** How many finished chat messages are visible. */
  protected readonly shown = signal(0);
  /** Dots while the assistant “thinks” before typing. */
  protected readonly thinking = signal(false);
  /** Live text of the message being typed, if any. */
  protected readonly draft = signal<{ from: 'client' | 'business'; text: string } | null>(null);
  protected readonly messages = computed(() => this.i18n.copy().hero.chat.messages);
  protected readonly visibleMessages = computed(() => this.messages().slice(0, this.shown()));
  protected readonly finished = computed(
    () => this.shown() >= this.messages().length && !this.draft() && !this.thinking(),
  );
  /** The demo inventory starts at 3 pairs; one is held when the conversation ends. */
  protected readonly stock = computed(() => (this.finished() ? 2 : 3));

  private timer?: ReturnType<typeof setTimeout>;
  private typeTimer?: ReturnType<typeof setInterval>;

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      clearTimeout(this.timer);
      clearInterval(this.typeTimer);
    });

    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.shown.set(this.messages().length);
        return;
      }
      this.schedule(600, () => this.step());
    });

    // Restart the conversation when the language changes.
    effect(() => {
      this.messages();
      if (this.timer || this.typeTimer) {
        this.restart();
      }
    });
  }

  private step(): void {
    const messages = this.messages();
    const next = messages[this.shown()];
    if (!next) {
      this.schedule(RESTART_MS, () => this.restart());
      return;
    }

    if (next.from === 'business') {
      this.thinking.set(true);
      this.schedule(THINKING_MS, () => {
        this.thinking.set(false);
        this.typeMessage(next.from, next.text, () => {
          this.schedule(CLIENT_PAUSE_MS, () => this.step());
        });
      });
    } else {
      this.typeMessage(next.from, next.text, () => {
        this.schedule(CLIENT_PAUSE_MS, () => this.step());
      });
    }
  }

  private typeMessage(from: 'client' | 'business', full: string, done: () => void): void {
    clearInterval(this.typeTimer);
    this.draft.set({ from, text: '' });
    const step =
      from === 'business'
        ? Math.max(1, Math.ceil(full.length / 55))
        : Math.max(1, Math.ceil(full.length / 35));
    let shown = 0;

    this.typeTimer = setInterval(() => {
      shown = Math.min(full.length, shown + step);
      this.draft.set({ from, text: full.slice(0, shown) });
      if (shown >= full.length) {
        clearInterval(this.typeTimer);
        this.typeTimer = undefined;
        this.draft.set(null);
        this.shown.update((count) => count + 1);
        done();
      }
    }, TYPE_TICK_MS);
  }

  private restart(): void {
    clearTimeout(this.timer);
    clearInterval(this.typeTimer);
    this.typeTimer = undefined;
    this.thinking.set(false);
    this.draft.set(null);
    this.shown.set(0);
    this.schedule(600, () => this.step());
  }

  private schedule(ms: number, fn: () => void): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(fn, ms);
  }
}
