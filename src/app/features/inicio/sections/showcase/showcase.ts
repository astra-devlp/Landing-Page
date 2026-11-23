import { afterNextRender, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { WhatsappIcon } from '../../../../shared/ui/whatsapp-icon/whatsapp-icon';

const AUTOPLAY_MS = 5000;
const SWIPE_PX = 50;

/** Image per slide, in the same order as `showcase.slides` in the copy. */
const SLIDE_IMAGES: { src: string; fit: 'cover' | 'contain' }[] = [
  { src: '/projects/table-assistant.jpg', fit: 'contain' },
  { src: '/projects/chatbot-whatsapp.jpg', fit: 'cover' },
  { src: '/projects/sistema-pos.jpg', fit: 'cover' },
  { src: '/services/web.jpg', fit: 'cover' },
  { src: '/services/custom.jpg', fit: 'cover' },
  { src: '/projects/dr-cristian-valencia-sitio.jpg', fit: 'contain' },
  { src: '/services/inventory.jpg', fit: 'cover' },
];

/** Coverflow carousel of the products we build. */
@Component({
  selector: 'app-showcase',
  imports: [WhatsappIcon],
  templateUrl: './showcase.html',
  host: { '(document:visibilitychange)': 'onVisibility()' },
})
export class Showcase {
  protected readonly i18n = inject(I18nService);
  protected readonly images = SLIDE_IMAGES;
  protected readonly autoplayMs = AUTOPLAY_MS;

  protected readonly index = signal(0);
  protected readonly paused = signal(false);
  protected readonly slides = computed(() => this.i18n.copy().showcase.slides);

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

  /** Signed distance of slide i from the active one, wrapped around the ends. */
  protected offset(i: number): number {
    const n = this.slides().length;
    let d = (i - this.index() + n) % n;
    if (d > n / 2) {
      d -= n;
    }
    return d;
  }

  protected slideStyle(i: number): Record<string, string> {
    const d = this.offset(i);
    const far = Math.abs(d) > 1;
    return {
      transform: `translateX(calc(-50% + ${d * 68}%)) scale(${d === 0 ? 1 : 0.8}) rotateY(${d * -10}deg)`,
      opacity: far ? '0' : d === 0 ? '1' : '0.45',
      zIndex: String(10 - Math.abs(d)),
      pointerEvents: far ? 'none' : 'auto',
    };
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
