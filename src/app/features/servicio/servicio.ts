import { DOCUMENT } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ServicePageKey } from '../../core/i18n/i18n.models';
import { I18nService } from '../../core/i18n/i18n.service';
import { ChatService } from '../../core/layout/chat-widget/chat.service';
import { SERVICE_PAGE_PATHS } from '../../shared/data/service-pages';
import { Reveal } from '../../shared/ui/reveal/reveal';
import { whatsappUrl } from '../../shared/utils/whatsapp';
import { CtaFinal } from '../inicio/sections/cta-final/cta-final';
import { Proceso } from '../inicio/sections/proceso/proceso';

/** Project shown under "See it in action" for each page (index in projects.items). */
const RELATED_PROJECT: Record<ServicePageKey, number> = { pos: 3, bot: 2, ia: 1 };

@Component({
  selector: 'app-servicio',
  imports: [Reveal, Proceso, CtaFinal],
  templateUrl: './servicio.html',
})
export class Servicio {
  protected readonly i18n = inject(I18nService);
  protected readonly chat = inject(ChatService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  protected readonly key = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['page'] as ServicePageKey)),
    { requireSync: true },
  );
  protected readonly page = computed(() => this.i18n.copy().servicePages.pages[this.key()]);
  protected readonly project = computed(
    () => this.i18n.copy().projects.items[RELATED_PROJECT[this.key()]],
  );
  protected readonly whatsappHref = computed(() => whatsappUrl(this.page().whatsappMessage));

  constructor() {
    // Page-specific title, description and canonical URL, updated on language change.
    effect(() => {
      const page = this.page();
      const url = `${this.document.location.origin}/${SERVICE_PAGE_PATHS[this.key()]}`;
      this.title.setTitle(page.seoTitle);
      this.meta.updateTag({ name: 'description', content: page.seoDescription });
      this.meta.updateTag({ property: 'og:title', content: page.seoTitle });
      this.meta.updateTag({ property: 'og:description', content: page.seoDescription });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ name: 'twitter:title', content: page.seoTitle });
      this.meta.updateTag({ name: 'twitter:description', content: page.seoDescription });
      this.document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    });

    inject(DestroyRef).onDestroy(() => {
      const home = this.i18n.copy();
      const url = `${this.document.location.origin}/`;
      this.title.setTitle(home.title);
      this.meta.updateTag({ name: 'description', content: home.hero.body });
      this.meta.updateTag({ property: 'og:title', content: home.title });
      this.meta.updateTag({ property: 'og:description', content: home.hero.body });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ name: 'twitter:title', content: home.title });
      this.meta.updateTag({ name: 'twitter:description', content: home.hero.body });
      this.document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    });
  }
}
