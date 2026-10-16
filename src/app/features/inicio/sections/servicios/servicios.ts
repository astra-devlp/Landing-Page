import { Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ServiceGroup } from '../../../../shared/models/site.models';
import { RouterLink } from '@angular/router';
import { SERVICE_PAGE_PATHS } from '../../../../shared/data/service-pages';
import { Reveal } from '../../../../shared/ui/reveal/reveal';

type Filter = 'all' | ServiceGroup;

/** Static class names per group so Tailwind can see them at build time. */
const GROUP_STYLES: Record<
  ServiceGroup,
  { text: string; soft: string; dot: string; hover: string }
> = {
  manage: {
    text: 'text-group-manage',
    soft: 'bg-group-manage/15',
    dot: 'bg-group-manage',
    hover: 'hover:border-group-manage/60',
  },
  sell: {
    text: 'text-group-sell',
    soft: 'bg-group-sell/15',
    dot: 'bg-group-sell',
    hover: 'hover:border-group-sell/60',
  },
  automate: {
    text: 'text-group-automate',
    soft: 'bg-group-automate/15',
    dot: 'bg-group-automate',
    hover: 'hover:border-group-automate/60',
  },
};

@Component({
  selector: 'app-servicios',
  imports: [Reveal, RouterLink],
  templateUrl: './servicios.html',
})
export class Servicios {
  protected readonly i18n = inject(I18nService);
  protected readonly filters: Filter[] = ['all', 'manage', 'sell', 'automate'];
  protected readonly filter = signal<Filter>('all');
  protected readonly styles = GROUP_STYLES;
  protected readonly pagePaths = SERVICE_PAGE_PATHS;

  protected readonly items = computed(() => {
    const filter = this.filter();
    const items = this.i18n.copy().services.items;
    return filter === 'all' ? items : items.filter((item) => item.group === filter);
  });

  protected count(filter: Filter): number {
    const items = this.i18n.copy().services.items;
    return filter === 'all' ? items.length : items.filter((item) => item.group === filter).length;
  }
}
