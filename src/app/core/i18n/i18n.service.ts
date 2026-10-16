import { computed, Injectable, signal } from '@angular/core';
import { AppCopy, Lang, LANGS } from './i18n.models';
import { TRANSLATIONS } from './translations';

const STORAGE_KEY = 'astra-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(this.readLang());
  readonly copy = computed(() => TRANSLATIONS[this.lang()]);
  readonly option = computed(() => LANGS.find((option) => option.code === this.lang())!);

  constructor() {
    this.apply(this.lang());
  }

  set(lang: Lang): void {
    this.lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    this.apply(lang);
  }

  t(): AppCopy {
    return this.copy();
  }

  private apply(lang: Lang): void {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    document.title = TRANSLATIONS[lang].title;
  }

  /** Saved choice first; otherwise the browser language; Spanish by default. */
  private readLang(): Lang {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) {
      return stored;
    }
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    return isLang(browser) ? browser : 'es';
  }
}

function isLang(value: string | null | undefined): value is Lang {
  return LANGS.some((option) => option.code === value);
}
