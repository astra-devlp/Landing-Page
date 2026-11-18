import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { I18nService } from '../../core/i18n/i18n.service';

/**
 * Sets title, description and canonical URL for a static page and restores the
 * home values when the page is left. Call it from a component constructor.
 */
export function usePageMeta(path: string, title: string, description: string): void {
  const titleService = inject(Title);
  const meta = inject(Meta);
  const document = inject(DOCUMENT);
  const i18n = inject(I18nService);

  const apply = (pageTitle: string, pageDescription: string, url: string) => {
    titleService.setTitle(pageTitle);
    meta.updateTag({ name: 'description', content: pageDescription });
    meta.updateTag({ property: 'og:title', content: pageTitle });
    meta.updateTag({ property: 'og:description', content: pageDescription });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ name: 'twitter:title', content: pageTitle });
    meta.updateTag({ name: 'twitter:description', content: pageDescription });
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
  };

  apply(title, description, `${document.location.origin}/${path}`);

  inject(DestroyRef).onDestroy(() => {
    const home = i18n.copy();
    apply(home.title, home.hero.body, `${document.location.origin}/`);
  });
}
