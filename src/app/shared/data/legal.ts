/**
 * Datos legales de Astra Dev (Ley 1581 de 2012 y Decreto 1377 de 2013).
 *
 * Hoy Astra Dev opera como marca de personas naturales (sin sociedad registrada).
 * Cuando se constituya la empresa, cambiar `holder` por la razón social y agregar el NIT.
 */
export const DATA_CONTROLLER = {
  brand: 'Astra Dev',
  /** Nombre completo de la(s) persona(s) natural(es) responsable(s). */
  holder: 'PENDIENTE: nombre completo del responsable',
  /** Ciudad y departamento de domicilio. */
  city: 'PENDIENTE: ciudad, departamento',
  country: 'Colombia',
  email: 'astra.dev.tech@gmail.com',
  phone: '313 560 0641',
  website: 'astradevlp.com',
};

/** Fecha de publicación de la versión vigente de la política. Actualizar al cambiarla. */
export const POLICY_UPDATED = '17 de noviembre de 2026';

export const LEGAL_PATHS = {
  terms: 'terminos-y-condiciones',
  policy: 'politica-de-datos',
  cookies: 'politica-de-cookies',
  requests: 'tus-datos',
} as const;

export type LegalPage = keyof typeof LEGAL_PATHS;

export const LEGAL_SEO: Record<LegalPage, { title: string; description: string }> = {
  terms: {
    title: 'Términos y Condiciones | Astra Dev',
    description:
      'Condiciones de uso del sitio de Astra Dev y de contratación de nuestros servicios de software, páginas web e inteligencia artificial.',
  },
  cookies: {
    title: 'Política de Cookies | Astra Dev',
    description:
      'Qué cookies y almacenamiento del navegador usa el sitio de Astra Dev, para qué sirven y cómo cambiar tu decisión.',
  },
  policy: {
    title: 'Política de Tratamiento de Datos Personales | Astra Dev',
    description:
      'Cómo Astra Dev recolecta, usa y protege tus datos personales, y cómo puedes consultarlos, corregirlos o pedir que los borremos.',
  },
  requests: {
    title: 'Solicitudes sobre tus datos personales | Astra Dev',
    description: 'Canal para enviar a Astra Dev solicitudes sobre tus datos personales.',
  },
};

export interface DataRequest {
  name: string;
  contact: string;
  business: string;
  detail: string;
}

/** Código corto para identificar la solicitud y responderla dentro del plazo legal. */
export function requestReference(date = new Date()): string {
  // Local date (not UTC), so evening requests in Colombia keep the right day.
  const pad = (n: number) => String(n).padStart(2, '0');
  const day = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SOL-${day}-${random}`;
}

export function buildDataRequestMessage(request: DataRequest, reference: string): string {
  const lines = [
    `Solicitud sobre datos personales (${reference})`,
    '',
    `Nombre: ${request.name.trim()}`,
    `Número o correo: ${request.contact.trim()}`,
  ];
  if (request.business.trim()) {
    lines.push(`Negocio: ${request.business.trim()}`);
  }
  if (request.detail.trim()) {
    lines.push('', request.detail.trim());
  }
  return lines.join('\n');
}
