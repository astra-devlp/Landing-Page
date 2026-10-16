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
import { BrandLogo } from '../../../../shared/ui/brand-logo/brand-logo';
import { Reveal } from '../../../../shared/ui/reveal/reveal';

const CLIENT_PAUSE_MS = 1100;
const TYPING_MS = 1300;
const RESTART_MS = 5000;

@Component({
  selector: 'app-hero',
  imports: [RouterLink, BrandLogo, Reveal],
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly i18n = inject(I18nService);

  /** How many chat messages are visible; the demo conversation replays in a loop. */
  protected readonly shown = signal(0);
  protected readonly typing = signal(false);
  protected readonly messages = computed(() => this.i18n.copy().hero.chat.messages);
  protected readonly visibleMessages = computed(() => this.messages().slice(0, this.shown()));
  protected readonly finished = computed(() => this.shown() >= this.messages().length);
  /** Solutions shown twice so the marquee can loop seamlessly. */
  protected readonly marquee = computed(() => {
    const items = this.i18n.copy().services.items;
    return [...items, ...items];
  });

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => clearTimeout(this.timer));

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
      if (this.timer) {
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
      this.typing.set(true);
      this.schedule(TYPING_MS, () => {
        this.typing.set(false);
        this.shown.update((count) => count + 1);
        this.schedule(CLIENT_PAUSE_MS, () => this.step());
      });
    } else {
      this.shown.update((count) => count + 1);
      this.schedule(CLIENT_PAUSE_MS, () => this.step());
    }
  }

  private restart(): void {
    clearTimeout(this.timer);
    this.typing.set(false);
    this.shown.set(0);
    this.schedule(600, () => this.step());
  }

  private schedule(ms: number, fn: () => void): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(fn, ms);
  }
}
