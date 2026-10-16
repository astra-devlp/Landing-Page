import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { ChatService } from '../chat-widget/chat.service';
import { ScrollService } from '../scroll.service';

const SHOW_AFTER_PX = 500;

/** Phone-only bottom bar with the two main actions, shown once the visitor scrolls. */
@Component({
  selector: 'app-mobile-cta-bar',
  template: `
    <div
      class="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant bg-surface-container-low/95 px-space-md pt-space-sm pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_-18px_rgb(0_0_0/0.5)] backdrop-blur-xl transition-transform duration-300 sm:hidden"
      [class.translate-y-full]="!visible()"
      [attr.aria-hidden]="!visible()"
    >
      <div class="flex gap-space-sm">
        <a
          class="inline-flex flex-1 items-center justify-center gap-space-xs rounded-xl bg-[#25d366] px-space-md py-3 font-body-md text-body-md font-semibold text-[#0b0b0d]"
          [href]="i18n.copy().whatsapp.href"
          target="_blank"
          rel="noopener noreferrer"
          [attr.tabindex]="visible() ? null : -1"
        >
          <span class="material-symbols-outlined text-[20px]">chat</span>
          {{ i18n.copy().mobileBar.quote }}
        </a>
        <button
          class="btn-brand inline-flex flex-1 items-center justify-center gap-space-xs rounded-xl px-space-md py-3 font-body-md text-body-md font-semibold"
          type="button"
          (click)="chat.toggle()"
          [attr.tabindex]="visible() ? null : -1"
        >
          <span class="material-symbols-outlined text-[20px]">smart_toy</span>
          {{ i18n.copy().mobileBar.ask }}
        </button>
      </div>
    </div>
  `,
})
export class MobileCtaBar {
  protected readonly i18n = inject(I18nService);
  protected readonly chat = inject(ChatService);
  private readonly scroll = inject(ScrollService);

  protected readonly visible = computed(() => this.scroll.y() > SHOW_AFTER_PX || this.chat.open());
}
