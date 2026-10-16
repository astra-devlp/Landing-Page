import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../i18n/i18n.service';
import { SERVICE_PAGE_PATHS } from '../../../shared/data/service-pages';
import { BrandLogo } from '../../../shared/ui/brand-logo/brand-logo';
import { Reveal } from '../../../shared/ui/reveal/reveal';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, BrandLogo, Reveal],
  templateUrl: './footer.html',
  styles: ``,
})
export class Footer {
  protected readonly i18n = inject(I18nService);
  protected readonly year = new Date().getFullYear();
  protected readonly pagePaths = SERVICE_PAGE_PATHS;
}
