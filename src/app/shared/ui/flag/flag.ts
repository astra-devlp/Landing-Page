import { Component, input } from '@angular/core';
import { LangOption } from '../../../core/i18n/i18n.models';

/**
 * Inline SVG flags. Emoji flags are avoided on purpose: Windows renders them as
 * plain letters ("CO", "US", "BR").
 */
@Component({
  selector: 'app-flag',
  template: `
    <svg
      class="block h-full w-full"
      viewBox="0 0 30 20"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      @switch (code()) {
        @case ('co') {
          <rect width="30" height="10" fill="#FCD116" />
          <rect y="10" width="30" height="5" fill="#003893" />
          <rect y="15" width="30" height="5" fill="#CE1126" />
        }
        @case ('us') {
          <rect width="30" height="20" fill="#B22234" />
          @for (y of usWhiteStripes; track y) {
            <rect [attr.y]="y" width="30" [attr.height]="usStripe" fill="#FFFFFF" />
          }
          <rect width="13" [attr.height]="usStripe * 7" fill="#3C3B6E" />
          @for (star of usStars; track $index) {
            <circle [attr.cx]="star[0]" [attr.cy]="star[1]" r="0.45" fill="#FFFFFF" />
          }
        }
        @case ('br') {
          <rect width="30" height="20" fill="#009C3B" />
          <polygon points="2.5,10 15,2 27.5,10 15,18" fill="#FFDF00" />
          <circle cx="15" cy="10" r="4.6" fill="#002776" />
          <path d="M10.6 9.1 Q15 7.6 19.5 11" stroke="#FFFFFF" stroke-width="0.8" fill="none" />
        }
      }
    </svg>
  `,
  host: {
    class:
      'inline-block h-[14px] w-[21px] shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/15',
  },
})
export class Flag {
  readonly code = input.required<LangOption['flag']>();

  protected readonly usStripe = 20 / 13;
  protected readonly usWhiteStripes = [1, 3, 5, 7, 9, 11].map((i) => i * this.usStripe);
  protected readonly usStars = [0, 1, 2, 3].flatMap((row) =>
    [0, 1, 2, 3, 4].map((col) => [1.6 + col * 2.4 + (row % 2) * 1.2, 1.4 + row * 2.4]),
  );
}
