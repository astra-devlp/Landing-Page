import { Component, inject, signal } from '@angular/core';
import { AnalyticsService } from '../../../../core/analytics/analytics.service';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { buildQuoteMessage, whatsappUrl } from '../../../../shared/utils/whatsapp';
import { Reveal } from '../../../../shared/ui/reveal/reveal';

@Component({
  selector: 'app-contacto',
  imports: [Reveal],
  templateUrl: './contacto.html',
  styles: ``,
})
export class Contacto {
  protected readonly i18n = inject(I18nService);
  protected readonly formSent = signal(false);
  private readonly analytics = inject(AnalyticsService);

  protected readonly solutionIcons: Record<string, string> = {
    pos: 'point_of_sale',
    erp: 'inventory_2',
    crm: 'groups',
    bot: 'chat',
    ai: 'neurology',
    saas: 'cloud',
    web: 'web',
    custom: 'settings_suggest',
    unsure: 'help',
  };

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const contact = this.i18n.copy().contact;
    const solutionValue = String(data.get('solution') ?? '');
    const solution =
      contact.solutions.find((option) => option.value === solutionValue)?.label ?? solutionValue;

    const message = buildQuoteMessage(
      {
        name: String(data.get('name') ?? ''),
        company: String(data.get('company') ?? ''),
        solution,
        description: String(data.get('description') ?? ''),
      },
      contact.message,
    );

    const url = whatsappUrl(message);
    this.analytics.trackWhatsapp('formulario-contacto');
    const opened = window.open(url, '_blank');
    if (opened) {
      opened.opener = null;
    } else {
      window.location.href = url;
    }

    this.formSent.set(true);
    form.reset();
  }
}
