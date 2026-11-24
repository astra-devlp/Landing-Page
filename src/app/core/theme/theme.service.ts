import { Injectable } from '@angular/core';
import { preference } from '../../shared/utils/preference';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly saved = preference('astra-theme', isTheme, () => 'dark', applyTheme);

  readonly theme = this.saved.value;

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.saved.set(theme);
  }
}

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
  root.dataset['theme'] = theme;
}
