import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { whatsappUrl } from '../../../../shared/utils/whatsapp';
import { Reveal } from '../../../../shared/ui/reveal/reveal';

@Component({
  selector: 'app-sectores',
  imports: [Reveal],
  templateUrl: './sectores.html',
})
export class Sectores {
  protected readonly i18n = inject(I18nService);

  protected href(sector: string): string {
    return whatsappUrl(this.i18n.copy().sectors.message.replace('{sector}', sector));
  }
}
