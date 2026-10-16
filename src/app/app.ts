import { ViewportScroller } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyticsService } from './core/analytics/analytics.service';
import { AnnouncementBar } from './core/layout/announcement-bar/announcement-bar';
import { ChatWidget } from './core/layout/chat-widget/chat-widget';
import { MobileCtaBar } from './core/layout/mobile-cta-bar/mobile-cta-bar';
import { SpotlightService } from './core/spotlight/spotlight.service';
import { Footer } from './core/layout/footer/footer';
import { Header } from './core/layout/header/header';
import { Starfield } from './core/layout/starfield/starfield';
import { WhatsappFab } from './core/layout/whatsapp-fab/whatsapp-fab';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Footer,
    Starfield,
    WhatsappFab,
    ChatWidget,
    MobileCtaBar,
    AnnouncementBar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    const scroller = inject(ViewportScroller);
    scroller.setOffset([0, 80]);

    const analytics = inject(AnalyticsService);
    const spotlight = inject(SpotlightService);

    afterNextRender(() => {
      analytics.init();
      spotlight.init();

      const navigation = performance.getEntriesByType('navigation')[0] as
        PerformanceNavigationTiming | undefined;

      if (navigation?.type === 'reload') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });
  }
}
