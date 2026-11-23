import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Reveal } from '../../../../shared/ui/reveal/reveal';
import { Spotlight } from '../../../../shared/ui/spotlight/spotlight';
import { WhatsappIcon } from '../../../../shared/ui/whatsapp-icon/whatsapp-icon';

/** "Why AstraDev": who we are as a company and what we commit to. */
@Component({
  selector: 'app-empresa',
  imports: [WhatsappIcon, Spotlight, Reveal],
  templateUrl: './empresa.html',
})
export class Empresa {
  protected readonly i18n = inject(I18nService);
}
