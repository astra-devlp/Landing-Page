import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../i18n/i18n.service';
import { LEGAL_PATHS } from '../../../shared/data/legal';
import { BrandLogo } from '../../../shared/ui/brand-logo/brand-logo';
import { WhatsappIcon } from '../../../shared/ui/whatsapp-icon/whatsapp-icon';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, BrandLogo, WhatsappIcon],
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly i18n = inject(I18nService);
  protected readonly year = new Date().getFullYear();
  protected readonly legalLinks = computed(() => {
    const copy = this.i18n.copy().legal;
    return [
      { path: `/${LEGAL_PATHS.terms}`, label: copy.termsLink },
      { path: `/${LEGAL_PATHS.policy}`, label: copy.policyLink },
      { path: `/${LEGAL_PATHS.cookies}`, label: copy.cookiesLink },
      { path: `/${LEGAL_PATHS.requests}`, label: copy.requestsLink },
    ];
  });
}
