import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../i18n/i18n.service';
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
}
