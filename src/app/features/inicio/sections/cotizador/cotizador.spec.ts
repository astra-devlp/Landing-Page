import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Calculadora } from '../calculadora/calculadora';
import { Cotizador } from './cotizador';

describe('Cotizador', () => {
  beforeEach(() => {
    localStorage.setItem('astra-lang', 'es');
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  // Protected members are the component's public surface for its template.
  const create = () => TestBed.createComponent(Cotizador).componentInstance as any;

  it('recommends by goal, with business-specific overrides', () => {
    const quiz = create();
    quiz.choose('distributor');
    quiz.choose('control');
    quiz.choose('now');

    expect(quiz.done()).toBe(true);
    expect(quiz.recommendation().map((item: { title: string }) => item.title)).toEqual([
      'ERP',
      'Sistema POS',
    ]);
  });

  it('sends the answers and the recommendation in the WhatsApp summary', () => {
    const quiz = create();
    quiz.choose('restaurant');
    quiz.choose('whatsapp');
    quiz.choose('month');

    const text = decodeURIComponent(new URL(quiz.whatsappHref()).searchParams.get('text') ?? '');
    expect(text).toContain('Negocio: Restaurante');
    expect(text).toContain('Quiero: Atender mejor por WhatsApp');
    expect(text).toContain('Plazo: Este mes');
    expect(text).toContain('Me recomendaron: Bots de WhatsApp, Sistema POS');
  });

  it('goes back and restarts', () => {
    const quiz = create();
    quiz.choose('store');
    quiz.back();
    expect(quiz.step()).toBe(0);
    quiz.choose('health');
    quiz.restart();
    expect(quiz.step()).toBe(0);
    expect(quiz.answers()).toEqual([]);
  });
});

describe('Calculadora', () => {
  it('estimates monthly hours saved', () => {
    TestBed.configureTestingModule({});
    const calc = TestBed.createComponent(Calculadora).componentInstance as any;
    // 60 msgs × 70% × 3 min + 20 receipts × 4 min = 206 min/day → ×26 days ≈ 89 h
    expect(calc.hours()).toBe(89);
    calc.messages.set(0);
    calc.receipts.set(0);
    expect(calc.hours()).toBe(0);
  });
});
