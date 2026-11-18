import { ViewportScroller } from '@angular/common';
import { afterNextRender, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyticsService } from './core/analytics/analytics.service';
import { ConsentService } from './core/consent/consent.service';
import { CookieBanner } from './core/consent/cookie-banner';
import { ChatWidget } from './core/layout/chat-widget/chat-widget';
import { MobileCtaBar } from './core/layout/mobile-cta-bar/mobile-cta-bar';
import { Footer } from './core/layout/footer/footer';
import { Header } from './core/layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ChatWidget, MobileCtaBar, CookieBanner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    const scroller = inject(ViewportScroller);
    scroller.setOffset([0, 80]);

    const analytics = inject(AnalyticsService);
    const consent = inject(ConsentService);

    // Analytics loads only after the visitor accepts optional cookies.
    effect(() => {
      if (consent.analyticsAllowed()) {
        analytics.init();
      }
    });

    afterNextRender(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as
        PerformanceNavigationTiming | undefined;

      if (navigation?.type === 'reload') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });
  }
}
