import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ServicePageKey } from '../../core/i18n/i18n.models';
import { Servicio } from './servicio';

describe('Servicio', () => {
  const relatedProjectTitle = (page: ServicePageKey) => {
    localStorage.setItem('astra-lang', 'es');
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { data: of({ page }) } }],
    });
    // Protected members are the component's public surface for its template.
    const component = TestBed.createComponent(Servicio).componentInstance as any;
    return component.project().title as string;
  };

  it.each<[ServicePageKey, string]>([
    ['pos', 'Sistema POS con inventario'],
    ['bot', 'Chatbot con IA para WhatsApp y tu web'],
    ['ia', 'Table Assistant'],
  ])('shows the related project on the %s page', (page, title) => {
    expect(relatedProjectTitle(page)).toBe(title);
  });
});
