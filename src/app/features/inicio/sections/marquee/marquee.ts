import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';

/** Two endless rows under the hero: what we build, and what it can do. */
@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.html',
})
export class Marquee {
  protected readonly i18n = inject(I18nService);

  /** Each row is rendered twice so the -50% loop is seamless. */
  protected readonly solutions = computed(() => {
    const items = this.i18n.copy().services.items.map((item) => ({ icon: item.icon, label: item.title }));
    return [...items, ...items];
  });

  protected readonly features = computed(() => {
    const items = this.i18n.copy().marquee.features;
    return [...items, ...items];
  });
}
