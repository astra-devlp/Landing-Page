import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ProjectItem } from '../../../../shared/models/site.models';
import { Reveal } from '../../../../shared/ui/reveal/reveal';

@Component({
  selector: 'app-proyectos',
  imports: [Reveal],
  templateUrl: './proyectos.html',
})
export class Proyectos {
  protected readonly i18n = inject(I18nService);

  protected imageClass(project: ProjectItem): string {
    if (project.imageFit === 'contain') {
      return 'object-contain p-space-md';
    }
    if (project.imageAnchor === 'center') {
      return 'object-cover object-center';
    }
    if (project.imageAnchor === 'right') {
      return 'object-cover object-[62%_center]';
    }
    return 'object-cover object-[center_25%]';
  }
}
