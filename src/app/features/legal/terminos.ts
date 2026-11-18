import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { DATA_CONTROLLER, LEGAL_PATHS, LEGAL_SEO, POLICY_UPDATED } from '../../shared/data/legal';
import { usePageMeta } from '../../shared/utils/page-meta';

@Component({
  selector: 'app-terminos',
  imports: [RouterLink],
  templateUrl: './terminos.html',
  styleUrl: './legal.css',
})
export class Terminos {
  protected readonly i18n = inject(I18nService);
  protected readonly controller = DATA_CONTROLLER;
  protected readonly updated = POLICY_UPDATED;
  protected readonly paths = {
    policy: `/${LEGAL_PATHS.policy}`,
    cookies: `/${LEGAL_PATHS.cookies}`,
  };

  constructor() {
    usePageMeta(LEGAL_PATHS.terms, LEGAL_SEO.terms.title, LEGAL_SEO.terms.description);
  }
}
