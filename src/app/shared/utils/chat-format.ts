/**
 * Turns the assistant's plain-text reply into safe HTML: escapes everything,
 * then supports only **bold**, "- " bullet lists, line breaks and https links.
 */
export function formatReply(text: string): string {
  const lines = escapeHtml(text.trim()).split('\n');
  const html: string[] = [];
  let inList = false;

  for (const raw of lines) {
    const line = raw.trim();
    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    if (bullet) {
      if (!inList) html.push('<ul>');
      inList = true;
      html.push(`<li>${inline(bullet[1])}</li>`);
      continue;
    }
    if (inList) html.push('</ul>');
    inList = false;
    if (line) html.push(`<p>${inline(line)}</p>`);
  }
  if (inList) html.push('</ul>');
  return html.join('');
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(https:\/\/[^\s<]+[^\s<.,;:!?)])/g, (url) => {
      const label = url.startsWith('https://wa.me/') ? 'WhatsApp' : url.replace(/^https:\/\//, '');
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
