import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import {
  buildDataRequestMessage,
  DATA_CONTROLLER,
  LEGAL_PATHS,
  LEGAL_SEO,
  requestReference,
} from '../../shared/data/legal';
import { WhatsappIcon } from '../../shared/ui/whatsapp-icon/whatsapp-icon';
import { usePageMeta } from '../../shared/utils/page-meta';
import { whatsappUrl } from '../../shared/utils/whatsapp';

type Channel = 'whatsapp' | 'email';

@Component({
  selector: 'app-tus-datos',
  imports: [RouterLink, WhatsappIcon],
  templateUrl: './tus-datos.html',
  styleUrl: './legal.css',
})
export class TusDatos {
  protected readonly i18n = inject(I18nService);
  protected readonly controller = DATA_CONTROLLER;
  protected readonly policyPath = `/${LEGAL_PATHS.policy}`;
  /** Reference of the last request opened, shown so the person can keep it. */
  protected readonly sentReference = signal('');

  constructor() {
    usePageMeta(LEGAL_PATHS.requests, LEGAL_SEO.requests.title, LEGAL_SEO.requests.description);
  }

  protected onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const channel = ((event.submitter as HTMLButtonElement | null)?.value ?? 'whatsapp') as Channel;
    const data = new FormData(form);
    const reference = requestReference();
    const message = buildDataRequestMessage(
      {
        name: String(data.get('name') ?? ''),
        contact: String(data.get('contact') ?? ''),
        business: String(data.get('business') ?? ''),
        detail: String(data.get('detail') ?? ''),
      },
      reference,
    );

    if (channel === 'email') {
      const subject = encodeURIComponent(`Solicitud sobre datos personales ${reference}`);
      window.location.href = `mailto:${this.controller.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
    } else {
      const url = whatsappUrl(message);
      const opened = window.open(url, '_blank');
      if (opened) {
        opened.opener = null;
      } else {
        window.location.href = url;
      }
    }

    this.sentReference.set(reference);
    form.reset();
  }
}
