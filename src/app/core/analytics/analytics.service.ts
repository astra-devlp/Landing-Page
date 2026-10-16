import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

/**
 * Google Analytics 4 measurement ID (e.g. 'G-ABC123XYZ').
 * Leave empty to disable tracking: no script is loaded and events are dropped.
 */
export const GA_MEASUREMENT_ID = '';

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);

  init(): void {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    const window = this.document.defaultView!;
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // gtag.js expects the native `arguments` object, not an array.
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);

    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    this.document.head.appendChild(script);

    // One delegated listener covers every WhatsApp link on the page.
    this.document.addEventListener('click', (event) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="https://wa.me/"]',
      );
      if (link) {
        this.trackWhatsapp(this.locationOf(link));
      }
    });
  }

  /** Records a WhatsApp lead, tagged with where on the page it started. */
  trackWhatsapp(location: string): void {
    this.document.defaultView?.gtag?.('event', 'generate_lead', {
      method: 'whatsapp',
      location,
    });
  }

  private locationOf(element: Element): string {
    if (element.closest('app-whatsapp-fab')) return 'boton-flotante';
    if (element.closest('app-chat-widget')) return 'chatbot';
    if (element.closest('app-header')) return 'header';
    if (element.closest('app-footer')) return 'footer';
    return element.closest('section')?.id || 'desconocido';
  }
}
