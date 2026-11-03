import { WhatsappIcon } from '../../../../shared/ui/whatsapp-icon/whatsapp-icon';
import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ScrollScene } from '../../../../shared/ui/scroll-scene/scroll-scene';

const VH_PER_STEP = 28;

@Component({
  selector: 'app-proceso',
  imports: [WhatsappIcon, ScrollScene],
  templateUrl: './proceso.html',
})
export class Proceso {
  protected readonly i18n = inject(I18nService);

  protected storyHeight(steps: number): string {
    return `${steps * VH_PER_STEP + 100}vh`;
  }

  protected activeStep(progress: number, steps: number): number {
    return Math.min(steps - 1, Math.floor(progress * steps));
  }

  protected stepFill(progress: number, steps: number, index: number): number {
    return Math.min(1, Math.max(0, progress * steps - index));
  }

  protected cardStyle(progress: number, steps: number, index: number): Record<string, string> {
    const dist = progress * steps - (index + 0.5);
    const opacity = Math.min(1, Math.max(0, 1 - Math.abs(dist) * 1.15));
    const y = dist * 56;
    const scale = 0.92 + opacity * 0.08;
    const blur = (1 - opacity) * 8;
    return {
      opacity: opacity.toFixed(3),
      transform: `translateY(${y.toFixed(1)}px) scale(${scale.toFixed(3)})`,
      filter: blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : 'none',
      pointerEvents: opacity > 0.55 ? 'auto' : 'none',
    };
  }
}
