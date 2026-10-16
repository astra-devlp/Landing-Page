import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Reveal } from '../../../../shared/ui/reveal/reveal';

@Component({
  selector: 'app-proceso',
  imports: [Reveal],
  templateUrl: './proceso.html',
})
export class Proceso {
  protected readonly i18n = inject(I18nService);
  protected readonly icons = ['forum', 'description', 'construction', 'rocket_launch'];
}
