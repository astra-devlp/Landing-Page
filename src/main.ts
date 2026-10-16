import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const navigation = performance.getEntriesByType('navigation')[0] as
  | PerformanceNavigationTiming
  | undefined;

if (navigation?.type === 'reload') {
  if (window.location.hash) {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }
  window.scrollTo(0, 0);
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
