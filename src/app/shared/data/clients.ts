/** Clients shown as a logo strip on the home page. Each logo links to their site. */
export interface ClientLogo {
  name: string;
  /** Dark artwork on a light background: the page recolours it and drops the background. */
  logo: string;
  /** Natural size of the logo image, in pixels. */
  width: number;
  height: number;
  href: string;
}

export const CLIENTS: ClientLogo[] = [
  {
    name: 'Dr. Cristian Valencia — Odontología, Armenia',
    logo: 'https://drcristianvalencia.com/assets/Dr%20Cristian%20Valencia.png',
    width: 817,
    height: 598,
    href: 'https://drcristianvalencia.com/',
  },
];
