import { Component, inject } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-whatsapp-fab',
  imports: [],
  template: `
    <a
      class="fixed right-4 bottom-4 z-40 hidden h-14 sm:inline-flex items-center gap-space-sm rounded-full bg-[#25d366] px-space-md font-body-md text-body-md font-semibold text-[#0b0b0d] shadow-2xl transition duration-300 hover:scale-105 sm:right-6 sm:bottom-6 sm:px-space-lg"
      [href]="i18n.copy().whatsapp.href"
      target="_blank"
      rel="noopener noreferrer"
      [attr.aria-label]="i18n.copy().floating.aria"
    >
      <span
        class="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25d366] motion-safe:animate-ring"
        aria-hidden="true"
      ></span>
      <span class="material-symbols-outlined">chat</span>
      <span class="hidden sm:inline">{{ i18n.copy().floating.label }}</span>
    </a>
  `,
})
export class WhatsappFab {
  protected readonly i18n = inject(I18nService);
}
