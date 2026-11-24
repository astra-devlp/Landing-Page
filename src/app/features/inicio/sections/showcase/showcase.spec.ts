import { TestBed } from '@angular/core/testing';
import { Showcase } from './showcase';

describe('Showcase', () => {
  beforeEach(() => localStorage.setItem('astra-lang', 'es'));

  function render() {
    const fixture = TestBed.createComponent(Showcase);
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('shows each product with its own screenshot', () => {
    const { element } = render();

    const pairs = Array.from(element.querySelectorAll('[data-slide] img')).map((img) => [
      img.getAttribute('alt'),
      img.getAttribute('src'),
    ]);

    expect(pairs).toEqual([
      ['Table Assistant', '/projects/table-assistant.jpg'],
      ['Bots de WhatsApp con IA', '/projects/chatbot-whatsapp.jpg'],
      ['Sistema POS con inventario', '/projects/sistema-pos.jpg'],
      ['ERP y reportes', '/services/web.jpg'],
      ['Analítica para tu operación', '/services/custom.jpg'],
      ['Páginas web que venden', '/projects/dr-cristian-valencia-sitio.jpg'],
      ['Control de bodegas', '/services/inventory.jpg'],
    ]);
  });

  it('frames the mock-up screenshots instead of cropping them', () => {
    const { element } = render();

    const contained = Array.from(element.querySelectorAll('[data-slide] img.object-contain')).map(
      (img) => img.getAttribute('alt'),
    );

    expect(contained).toEqual(['Table Assistant', 'Páginas web que venden']);
  });

  it('lists every product so the visitor can jump to the one they want', () => {
    const { fixture, element } = render();
    const tabs = Array.from(element.querySelectorAll<HTMLButtonElement>('[data-product-tab]'));

    expect(tabs.map((tab) => tab.querySelector('[data-tab-label]')?.textContent?.trim())).toEqual([
      'Table Assistant',
      'Bots de WhatsApp con IA',
      'Sistema POS con inventario',
      'ERP y reportes',
      'Analítica para tu operación',
      'Páginas web que venden',
      'Control de bodegas',
    ]);

    tabs[2].click();
    fixture.detectChanges();

    expect(element.querySelector('[data-product-detail] h3')?.textContent?.trim()).toBe(
      'Sistema POS con inventario',
    );
    expect(element.querySelectorAll('[data-product-detail] li')).toHaveLength(3);
  });

  it('opens WhatsApp asking about the product on screen', () => {
    const { fixture, element } = render();
    element.querySelectorAll<HTMLButtonElement>('[data-product-tab]')[1].click();
    fixture.detectChanges();

    const cta = element.querySelector<HTMLAnchorElement>('[data-product-detail] a[href*="wa.me"]')!;
    expect(decodeURIComponent(cta.href)).toContain('Bots de WhatsApp con IA');
  });
});
