import { Component, inject, signal } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

const STORAGE_KEY = 'astra-announcement-dismissed';

@Component({
  selector: 'app-announcement-bar',
  template: `
    @if (visible()) {
      <div
        class="relative bg-gradient-to-r from-brand-from via-[#4f46e5] to-brand-to px-12 py-2 text-center text-white"
      >
        <p class="font-body-sm text-body-sm">
          <span
            class="mr-space-xs inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase"
          >
            {{ i18n.copy().announcement.badge }}
          </span>
          <span class="font-medium">{{ i18n.copy().announcement.text }}</span>
          <a
            class="ml-space-xs inline-flex items-center gap-1 font-semibold underline decoration-white/50 underline-offset-4 hover:decoration-white"
            [href]="i18n.copy().announcement.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ i18n.copy().announcement.cta }}
            <span class="material-symbols-outlined text-[16px]" aria-hidden="true"
              >arrow_forward</span
            >
          </a>
        </p>
        <button
          class="absolute top-1/2 right-2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white/80 hover:bg-white/15 hover:text-white"
          type="button"
          (click)="dismiss()"
          [attr.aria-label]="i18n.copy().announcement.close"
        >
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    }
  `,
})
export class AnnouncementBar {
  protected readonly i18n = inject(I18nService);
  protected readonly visible = signal(!readDismissed());

  protected dismiss(): void {
    this.visible.set(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Storage may be blocked; the bar just comes back next visit.
    }
  }
}

function readDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}
