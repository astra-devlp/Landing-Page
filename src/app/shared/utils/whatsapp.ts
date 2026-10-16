const WHATSAPP_NUMBER = '573148721707';

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export interface QuoteRequest {
  name: string;
  company: string;
  solution: string;
  description: string;
}

export interface QuoteTemplate {
  greeting: string;
  company: string;
  interest: string;
}

export function buildQuoteMessage(request: QuoteRequest, template: QuoteTemplate): string {
  const name = request.name.trim();
  const company = request.company.trim();
  const description = request.description.trim();

  let intro = fill(template.greeting, { name });
  if (company) {
    intro += fill(template.company, { company });
  }

  const lines = [`${intro}.`, fill(template.interest, { solution: request.solution })];
  if (description) {
    lines.push('', description);
  }
  return lines.join('\n');
}

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}
