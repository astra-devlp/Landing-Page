import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

/**
 * Feeds the cursor position to the hovered `.card` as --mx/--my, which the
 * `card` utility uses to paint a glow under the pointer. One delegated
 * listener covers every card on the page.
 */
@Injectable({ providedIn: 'root' })
export class SpotlightService {
  private readonly document = inject(DOCUMENT);

  init(): void {
    const window = this.document.defaultView;
    if (!window?.matchMedia('(hover: hover)').matches) {
      return;
    }

    let frame = 0;
    this.document.addEventListener(
      'pointermove',
      (event) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const card = (event.target as Element | null)?.closest<HTMLElement>('.card');
          if (!card) return;
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
          card.style.setProperty('--my', `${event.clientY - rect.top}px`);
        });
      },
      { passive: true },
    );
  }
}
