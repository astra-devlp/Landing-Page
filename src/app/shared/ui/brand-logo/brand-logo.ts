import { Component, computed, inject, input } from '@angular/core';
import { ThemeService } from '../../../core/theme/theme.service';

export type BrandLogoVariant = 'mark' | 'horizontal' | 'stacked';

const LOGO_SRC: Record<BrandLogoVariant, string> = {
  mark: '/brand/logo-mark.png',
  horizontal: '/brand/logo-horizontal.png',
  stacked: '/brand/logo-stacked.png',
};

@Component({
  selector: 'app-brand-logo',
  template: `
    <img [src]="src()" alt="Astra Dev" [class]="classes()" />
  `,
})
export class BrandLogo {
  private readonly theme = inject(ThemeService);

  readonly variant = input<BrandLogoVariant>('horizontal');
  readonly imgClass = input<string>('h-10 w-auto');

  protected readonly src = computed(() => LOGO_SRC[this.variant()]);
  protected readonly classes = computed(
    () => `${this.imgClass()}${this.theme.theme() === 'light' ? ' invert' : ''}`,
  );
}
