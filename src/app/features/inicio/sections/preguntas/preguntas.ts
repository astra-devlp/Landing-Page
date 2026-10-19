import { WhatsappIcon } from '../../../../shared/ui/whatsapp-icon/whatsapp-icon';
import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ChatService } from '../../../../core/layout/chat-widget/chat.service';

@Component({
  selector: 'app-preguntas',
  imports: [WhatsappIcon],
  templateUrl: './preguntas.html',
})
export class Preguntas {
  protected readonly i18n = inject(I18nService);
  protected readonly chat = inject(ChatService);
}
