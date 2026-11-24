import { TestBed } from '@angular/core/testing';
import { Proceso } from './proceso';

describe('Proceso', () => {
  beforeEach(() => localStorage.setItem('astra-lang', 'es'));

  it('pairs every step with its icon and what the client receives', () => {
    const fixture = TestBed.createComponent(Proceso);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    const steps = Array.from(element.querySelectorAll('ol > li')).map((li) => [
      li.querySelector('.material-symbols-outlined')?.textContent?.trim(),
      li.querySelector('h3')?.textContent?.trim(),
    ]);

    expect(steps).toEqual([
      ['forum', 'Hablamos'],
      ['request_quote', 'Te proponemos'],
      ['construction', 'Construimos por etapas'],
      ['rocket_launch', 'Lanzamos y acompañamos'],
    ]);
  });
});
