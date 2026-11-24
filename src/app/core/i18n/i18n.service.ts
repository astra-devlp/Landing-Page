import { computed, Injectable } from '@angular/core';
import { preference } from '../../shared/utils/preference';
import { AppCopy, Lang, LANGS } from './i18n.models';
import { TRANSLATIONS } from './translations';

@Injectable({ providedIn: 'root' })
export class I18nService {
  /** Saved choice first; otherwise the browser language; Spanish by default. */
  private readonly saved = preference('astra-lang', isLang, browserLang, applyLang);

  readonly lang = this.saved.value;
  readonly copy = computed(() => TRANSLATIONS[this.lang()]);
  readonly option = computed(() => LANGS.find((option) => option.code === this.lang())!);

  set(lang: Lang): void {
    this.saved.set(lang);
  }

  t(): AppCopy {
    return this.copy();
  }
}

function isLang(value: unknown): value is Lang {
  return LANGS.some((option) => option.code === value);
}

function browserLang(): Lang {
  const browser = navigator.language?.slice(0, 2).toLowerCase();
  return isLang(browser) ? browser : 'es';
}

function applyLang(lang: Lang): void {
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  document.title = TRANSLATIONS[lang].title;
}
