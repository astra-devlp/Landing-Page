import { afterNextRender, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ChatService } from '../../../../core/layout/chat-widget/chat.service';
import { Reveal } from '../../../../shared/ui/reveal/reveal';

const ROTATE_MS = 7000;

@Component({
  selector: 'app-ia',
  imports: [Reveal],
  templateUrl: './ia.html',
})
export class Ia {
  protected readonly i18n = inject(I18nService);
  protected readonly chat = inject(ChatService);

  protected readonly active = signal(0);
  protected readonly demo = computed(() => this.i18n.copy().ia.demos[this.active()]);

  private rotation?: ReturnType<typeof setInterval>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.rotation));

    // Cycle through the sector demos until the visitor picks one.
    afterNextRender(() => {
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.rotation = setInterval(() => {
          this.active.update((index) => (index + 1) % this.i18n.copy().ia.demos.length);
        }, ROTATE_MS);
      }
    });
  }

  protected select(index: number): void {
    clearInterval(this.rotation);
    this.active.set(index);
  }

  protected delay(index: number): string {
    return `${index * 0.45}s`;
  }
}
