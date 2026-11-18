import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { DATA_CONTROLLER, LEGAL_PATHS, LEGAL_SEO, POLICY_UPDATED } from '../../shared/data/legal';
import { usePageMeta } from '../../shared/utils/page-meta';
import { whatsappUrl } from '../../shared/utils/whatsapp';

@Component({
  selector: 'app-politica-datos',
  imports: [RouterLink],
  templateUrl: './politica-datos.html',
  styleUrl: './legal.css',
})
export class PoliticaDatos {
  protected readonly i18n = inject(I18nService);
  protected readonly controller = DATA_CONTROLLER;
  protected readonly updated = POLICY_UPDATED;
  protected readonly requestsPath = `/${LEGAL_PATHS.requests}`;
  protected readonly whatsappHref = whatsappUrl(
    'Hola Astra Dev, tengo una solicitud sobre mis datos personales.',
  );

  constructor() {
    usePageMeta(LEGAL_PATHS.policy, LEGAL_SEO.policy.title, LEGAL_SEO.policy.description);
  }
}
