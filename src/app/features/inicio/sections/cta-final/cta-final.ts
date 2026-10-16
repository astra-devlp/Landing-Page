import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ChatService } from '../../../../core/layout/chat-widget/chat.service';
import { Reveal } from '../../../../shared/ui/reveal/reveal';

@Component({
  selector: 'app-cta-final',
  imports: [Reveal],
  templateUrl: './cta-final.html',
})
export class CtaFinal {
  protected readonly i18n = inject(I18nService);
  protected readonly chat = inject(ChatService);
}
