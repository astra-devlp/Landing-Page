import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

/** A section counts as "current" once its top passes just under the fixed header. */
const TRACKED_OFFSET_PX = 140;

/**
 * One passive scroll listener shared by the header (progress bar, active
 * section) and the mobile CTA bar.
 */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly document = inject(DOCUMENT);

  readonly y = signal(0);
  /** 0–100, how far down the page the visitor is. */
  readonly progress = signal(0);
  /** Fragment of the section currently under the header, if any. */
  readonly activeSection = signal<string | null>(null);

  private sections: string[] = [];
  private frame = 0;

  constructor() {
    const window = this.document.defaultView;
    window?.addEventListener('scroll', () => this.schedule(), { passive: true });
    window?.addEventListener('resize', () => this.schedule(), { passive: true });
  }

  track(sections: string[]): void {
    this.sections = sections;
    this.schedule();
  }

  private schedule(): void {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.update());
  }

  private update(): void {
    const root = this.document.documentElement;
    const y = root.scrollTop;
    const max = root.scrollHeight - root.clientHeight;
    this.y.set(y);
    this.progress.set(max > 0 ? Math.min(100, (y / max) * 100) : 0);

    let active: string | null = null;
    for (const id of this.sections) {
      const top = this.document.getElementById(id)?.getBoundingClientRect().top;
      if (top !== undefined && top <= TRACKED_OFFSET_PX) {
        active = id;
      }
    }
    this.activeSection.set(active);
  }
}
