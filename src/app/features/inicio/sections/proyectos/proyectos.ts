import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ProjectItem } from '../../../../shared/models/site.models';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.html',
})
export class Proyectos {
  protected readonly i18n = inject(I18nService);

  /** Delivered work (a client site and our own product) gets the large rows. */
  protected readonly featured = computed(() =>
    this.i18n.copy().projects.items.filter((project) => project.kind !== 'offer'),
  );

  /** Solutions we offer, shown smaller so they are not mistaken for client work. */
  protected readonly offers = computed(() =>
    this.i18n.copy().projects.items.filter((project) => project.kind === 'offer'),
  );

  protected imageClass(project: ProjectItem): string {
    if (project.imageAnchor === 'center') {
      return 'object-cover object-center';
    }
    if (project.imageAnchor === 'right') {
      return 'object-cover object-[62%_center]';
    }
    return 'object-cover object-[center_25%]';
  }
}
