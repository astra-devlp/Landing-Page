import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Spotlight } from '../../../../shared/ui/spotlight/spotlight';
import { Reveal } from '../../../../shared/ui/reveal/reveal';
import { WhatsappIcon } from '../../../../shared/ui/whatsapp-icon/whatsapp-icon';

/** Delay between one step lighting up and the next, in ms. */
const STEP_DELAY_MS = 380;

/**
 * "How we work": the four steps side by side on one timeline, all visible at
 * once. The line fills and the steps light up in order when it scrolls in.
 */
@Component({
  selector: 'app-proceso',
  imports: [WhatsappIcon, Reveal, Spotlight],
  templateUrl: './proceso.html',
})
export class Proceso {
  protected readonly i18n = inject(I18nService);
  protected readonly stepDelay = STEP_DELAY_MS;
  protected readonly stepLabel: Record<string, string> = { es: 'Paso', en: 'Step', pt: 'Passo' };

  /** True once the timeline has entered the viewport. */
  protected readonly started = signal(false);

  private readonly timeline = viewChild.required<ElementRef<HTMLElement>>('timeline');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || typeof IntersectionObserver !== 'function') {
        this.started.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            this.started.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      observer.observe(this.timeline().nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
