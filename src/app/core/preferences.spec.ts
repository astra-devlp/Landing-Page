import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n/i18n.service';
import { ThemeService } from './theme/theme.service';

/** Safari with blocked cookies, some private modes: any storage access throws. */
function blockStorage() {
  const fail = () => {
    throw new DOMException('The operation is insecure.', 'SecurityError');
  };
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(fail);
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(fail);
}

describe('saved preferences', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('remembers the language and theme between visits', () => {
    TestBed.inject(I18nService).set('pt');
    TestBed.inject(ThemeService).set('light');
    TestBed.resetTestingModule();

    expect(TestBed.inject(I18nService).lang()).toBe('pt');
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
  });

  it('ignores a saved value that is not a valid option', () => {
    localStorage.setItem('astra-lang', 'klingon');
    localStorage.setItem('astra-theme', 'neon');

    expect(['es', 'en', 'pt']).toContain(TestBed.inject(I18nService).lang());
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('still starts, with defaults, when storage is blocked', () => {
    blockStorage();

    expect(['es', 'en', 'pt']).toContain(TestBed.inject(I18nService).lang());
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('still switches language and theme for this visit when storage is blocked', () => {
    blockStorage();
    const i18n = TestBed.inject(I18nService);
    const theme = TestBed.inject(ThemeService);

    i18n.set('en');
    theme.set('light');

    expect(i18n.lang()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(theme.theme()).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });
});
