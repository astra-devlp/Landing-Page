import { Component, inject } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-whatsapp-fab',
  imports: [],
  template: `
    <a
      class="group fixed right-4 bottom-4 z-40 hidden h-14 sm:inline-flex items-center justify-center rounded-full bg-[#25d366] px-[1rem] font-body-md text-body-md font-semibold text-[#0b0b0d] shadow-2xl transition duration-300 hover:scale-105 focus-visible:scale-105 sm:right-6 sm:bottom-6"
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
      <span
        class="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-space-sm group-hover:max-w-[16rem] group-hover:opacity-100 group-focus-visible:ml-space-sm group-focus-visible:max-w-[16rem] group-focus-visible:opacity-100"
        >{{ i18n.copy().floating.label }}</span
      >
    </a>
  `,
})
export class WhatsappFab {
  protected readonly i18n = inject(I18nService);
}
