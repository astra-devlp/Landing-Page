import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TECH_STACK } from '../../data/inicio.data';
import { BrandLogo } from '../../../../shared/ui/brand-logo/brand-logo';
import { Reveal } from '../../../../shared/ui/reveal/reveal';

@Component({
  selector: 'app-about',
  imports: [BrandLogo, Reveal],
  templateUrl: './about.html',
  styles: ``,
})
export class About {
  protected readonly i18n = inject(I18nService);
  protected readonly stack = TECH_STACK;
}
