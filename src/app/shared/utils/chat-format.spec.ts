import { formatReply } from './chat-format';

describe('formatReply', () => {
  it('escapes HTML from the model', () => {
    expect(formatReply('<img src=x onerror=alert(1)>')).toBe(
      '<p>&lt;img src=x onerror=alert(1)&gt;</p>',
    );
  });

  it('supports bold, paragraphs and bullet lists', () => {
    expect(formatReply('Te recomiendo:\n- **POS**\n- Bot\n\nListo.')).toBe(
      '<p>Te recomiendo:</p><ul><li><strong>POS</strong></li><li>Bot</li></ul><p>Listo.</p>',
    );
  });

  it('links https URLs and labels WhatsApp links', () => {
    expect(formatReply('Escríbenos: https://wa.me/573148721707.')).toBe(
      '<p>Escríbenos: <a href="https://wa.me/573148721707" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>',
    );
  });

  it('does not link javascript: or http: URLs', () => {
    expect(formatReply('javascript:alert(1) http://x.test')).toBe(
      '<p>javascript:alert(1) http://x.test</p>',
    );
  });
});
