import { afterNextRender, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { whatsappUrl } from '../../../../shared/utils/whatsapp';
import { WhatsappIcon } from '../../../../shared/ui/whatsapp-icon/whatsapp-icon';

const AUTOPLAY_MS = 6000;
const SWIPE_PX = 50;

/** Deck position of the next cards behind the active one: x/y shift (%), scale, opacity. */
const DECK = [
  { x: 0, y: 0, scale: 1, opacity: 1 },
  { x: 9, y: -9, scale: 0.94, opacity: 0.6 },
  { x: 18, y: -18, scale: 0.88, opacity: 0.3 },
];

/** Product showcase: details on one side, a stacked deck of screenshots on the other. */
@Component({
  selector: 'app-showcase',
  imports: [WhatsappIcon],
  templateUrl: './showcase.html',
  host: { '(document:visibilitychange)': 'onVisibility()' },
})
export class Showcase {
  protected readonly i18n = inject(I18nService);
  protected readonly autoplayMs = AUTOPLAY_MS;

  protected readonly index = signal(0);
  protected readonly paused = signal(false);
  protected readonly slides = computed(() => this.i18n.copy().showcase.slides);
  protected readonly current = computed(() => this.slides()[this.index()]);
  /** WhatsApp link that already names the product on screen. */
  protected readonly ctaHref = computed(() =>
    whatsappUrl(this.i18n.copy().showcase.ctaMessage.replace('{product}', this.current().title)),
  );

  private readonly reduced =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  private hidden = false;
  private startX: number | null = null;
  private elapsed = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (this.reduced) {
        this.paused.set(true);
        return;
      }
      const tick = 100;
      const timer = setInterval(() => {
        if (this.paused() || this.hidden) {
          return;
        }
        this.elapsed += tick;
        if (this.elapsed >= AUTOPLAY_MS) {
          this.next();
        }
      }, tick);
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  /** How many places slide i sits behind the active one (0 = on top). */
  protected depth(i: number): number {
    const n = this.slides().length;
    return (i - this.index() + n) % n;
  }

  protected slideStyle(i: number): Record<string, string> {
    const n = this.slides().length;
    const d = this.depth(i);
    // The card that just left slides out to the left; cards far back wait hidden.
    const place =
      DECK[d] ??
      (d === n - 1
        ? { x: -35, y: 0, scale: 0.9, opacity: 0 }
        : { x: 15, y: -18, scale: 0.76, opacity: 0 });
    return {
      transform: `translate(${place.x}%, ${place.y}%) scale(${place.scale})`,
      opacity: String(place.opacity),
      zIndex: String(n - d),
      pointerEvents: d === 0 ? 'auto' : 'none',
    };
  }

  protected pad(value: number): string {
    return String(value).padStart(2, '0');
  }

  protected go(i: number): void {
    const n = this.slides().length;
    this.index.set((i + n) % n);
    this.elapsed = 0;
  }

  protected next(): void {
    this.go(this.index() + 1);
  }

  protected prev(): void {
    this.go(this.index() - 1);
  }

  protected pointerDown(event: PointerEvent): void {
    this.startX = event.clientX;
  }

  protected pointerUp(event: PointerEvent): void {
    if (this.startX === null) {
      return;
    }
    const dx = event.clientX - this.startX;
    this.startX = null;
    if (dx <= -SWIPE_PX) {
      this.next();
    } else if (dx >= SWIPE_PX) {
      this.prev();
    }
  }

  protected setPaused(value: boolean): void {
    if (!this.reduced) {
      this.paused.set(value);
    }
  }

  protected onVisibility(): void {
    this.hidden = document.visibilityState === 'hidden';
  }
}
