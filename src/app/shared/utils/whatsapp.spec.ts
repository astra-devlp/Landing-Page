import { buildQuoteMessage, whatsappUrl } from './whatsapp';

const template = {
  greeting: 'Hola Astra Dev, soy {name}',
  company: ' de {company}',
  interest: 'Me interesa: {solution}.',
};

describe('whatsappUrl', () => {
  it('returns the plain chat link without a message', () => {
    expect(whatsappUrl()).toBe('https://wa.me/573148721707');
  });

  it('encodes the prefilled message', () => {
    expect(whatsappUrl('Hola, ¿qué tal?')).toBe(
      'https://wa.me/573148721707?text=Hola%2C%20%C2%BFqu%C3%A9%20tal%3F',
    );
  });
});

describe('buildQuoteMessage', () => {
  it('includes every field the visitor filled', () => {
    const message = buildQuoteMessage(
      {
        name: ' Laura ',
        company: 'Ferretería El Tornillo',
        solution: 'Sistema POS',
        description: 'Quiero controlar el inventario.',
      },
      template,
    );

    expect(message).toBe(
      'Hola Astra Dev, soy Laura de Ferretería El Tornillo.\nMe interesa: Sistema POS.\n\nQuiero controlar el inventario.',
    );
  });

  it('skips the optional fields when they are empty', () => {
    const message = buildQuoteMessage(
      { name: 'Laura', company: '  ', solution: 'ERP', description: '' },
      template,
    );

    expect(message).toBe('Hola Astra Dev, soy Laura.\nMe interesa: ERP.');
  });
});
