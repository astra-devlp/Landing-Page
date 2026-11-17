import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input, signal } from '@angular/core';

/**
 * - view: 0 when the element enters at the bottom of the viewport, 1 when it leaves at the top.
 * - exit: 0 while the element's top is at the top of the viewport, 1 once it has scrolled fully past.
 * - pin: 0–1 while a tall wrapper scrolls past its sticky child.
 */
export type ScrollSceneMode = 'view' | 'exit' | 'pin';

/**
 * Exposes scroll progress as the `--p` CSS variable (for transforms in CSS)
 * and as a signal (for picking the active step in templates).
 */
@Directive({
  selector: '[appScrollScene]',
  exportAs: 'scrollScene',
})
export class ScrollScene {
  readonly sceneMode = input<ScrollSceneMode>('view');
  readonly progress = signal(0);

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      let frame = 0;

      const update = () => {
        const rect = host.getBoundingClientRect();
        const viewport = window.innerHeight;
        const mode = this.sceneMode();
        const raw =
          mode === 'pin'
            ? -rect.top / Math.max(1, rect.height - viewport)
            : mode === 'exit'
              ? -rect.top / Math.max(1, rect.height)
              : (viewport - rect.top) / (viewport + rect.height);
        const progress = Math.min(1, Math.max(0, raw));
        host.style.setProperty('--p', progress.toFixed(4));
        this.progress.set(progress);
      };

      const schedule = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(update);
      };

      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      update();

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      });
    });
  }
}
