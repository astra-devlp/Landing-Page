import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang, LANGS } from '../../i18n/i18n.models';
import { I18nService } from '../../i18n/i18n.service';
import { ThemeService } from '../../theme/theme.service';
import { ScrollService } from '../scroll.service';
import { BrandLogo } from '../../../shared/ui/brand-logo/brand-logo';
import { Flag } from '../../../shared/ui/flag/flag';

@Component({
  selector: 'app-header',
  imports: [RouterLink, BrandLogo, Flag],
  templateUrl: './header.html',
  styles: ``,
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'langOpen.set(false)',
  },
})
export class Header {
  protected readonly i18n = inject(I18nService);
  protected readonly theme = inject(ThemeService);
  protected readonly menuOpen = signal(false);
  protected readonly langOpen = signal(false);
  protected readonly langs = LANGS;
  protected readonly scroll = inject(ScrollService);

  private readonly langMenu = viewChild.required<ElementRef<HTMLElement>>('langMenu');

  constructor() {
    this.scroll.track(this.i18n.copy().nav.map((link) => link.fragment));
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleLang(): void {
    this.langOpen.update((open) => !open);
  }

  protected chooseLang(lang: Lang): void {
    this.i18n.set(lang);
    this.langOpen.set(false);
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (this.langOpen() && !this.langMenu().nativeElement.contains(event.target as Node)) {
      this.langOpen.set(false);
    }
  }
}
