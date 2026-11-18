import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';
import { LEGAL_PATHS } from '../../shared/data/legal';
import { ConsentService } from './consent.service';

@Component({
  selector: 'app-cookie-banner',
  imports: [RouterLink],
  template: `
    @if (consent.bannerOpen()) {
      <section
        class="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-outline-variant bg-surface-container-low p-5 shadow-2xl motion-safe:animate-rise sm:bottom-6 md:p-6"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-body"
      >
        <h2
          class="mb-1 flex items-center gap-2 font-body-md text-body-md font-semibold text-primary"
          id="cookie-banner-title"
        >
          <span class="material-symbols-outlined text-[20px] text-accent" aria-hidden="true"
            >cookie</span
          >
          {{ copy().cookieTitle }}
        </h2>
        <p class="font-body-sm text-body-sm text-on-surface-variant" id="cookie-banner-body">
          {{ copy().cookieBody }}
          <a class="text-accent underline underline-offset-2" [routerLink]="cookiesPath">{{
            copy().cookieMore
          }}</a>
        </p>
        <div class="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            class="inline-flex min-h-11 items-center justify-center rounded-lg border border-outline-variant bg-surface px-5 py-2 font-body-sm text-body-sm font-semibold text-on-surface transition hover:border-accent/50 hover:text-primary"
            type="button"
            (click)="consent.rejectOptional()"
          >
            {{ copy().cookieReject }}
          </button>
          <button
            class="btn-brand inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2 font-body-sm text-body-sm font-semibold"
            type="button"
            (click)="consent.acceptAll()"
          >
            {{ copy().cookieAccept }}
          </button>
        </div>
      </section>
    }
  `,
})
export class CookieBanner {
  protected readonly consent = inject(ConsentService);
  private readonly i18n = inject(I18nService);
  protected readonly copy = () => this.i18n.copy().legal;
  protected readonly cookiesPath = `/${LEGAL_PATHS.cookies}`;
}
