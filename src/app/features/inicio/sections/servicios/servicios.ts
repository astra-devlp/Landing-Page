import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { SERVICE_PAGE_PATHS } from '../../../../shared/data/service-pages';
import { ServiceGroup } from '../../../../shared/models/site.models';
import { Cotizador } from '../cotizador/cotizador';

/** Static class names per group so Tailwind can see them at build time. */
const GROUP_STYLES: Record<ServiceGroup, { text: string; dot: string }> = {
  manage: { text: 'text-group-manage', dot: 'bg-group-manage' },
  sell: { text: 'text-group-sell', dot: 'bg-group-sell' },
  automate: { text: 'text-group-automate', dot: 'bg-group-automate' },
};

@Component({
  selector: 'app-servicios',
  imports: [RouterLink, Cotizador],
  templateUrl: './servicios.html',
})
export class Servicios {
  protected readonly i18n = inject(I18nService);
  protected readonly groups: ServiceGroup[] = ['manage', 'sell', 'automate'];
  protected readonly styles = GROUP_STYLES;
  protected readonly pagePaths = SERVICE_PAGE_PATHS;

  protected itemsOf(group: ServiceGroup) {
    return this.i18n.copy().services.items.filter((item) => item.group === group);
  }
}
