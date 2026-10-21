import { WhatsappIcon } from '../../../../shared/ui/whatsapp-icon/whatsapp-icon';
import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';

@Component({
  selector: 'app-proceso',
  imports: [WhatsappIcon],
  templateUrl: './proceso.html',
})
export class Proceso {
  protected readonly i18n = inject(I18nService);
}
