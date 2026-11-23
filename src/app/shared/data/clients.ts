/** Clients shown as a logo strip on the home page. Each logo links to their site. */
export interface ClientLogo {
  name: string;
  logo: string;
  href: string;
}

export const CLIENTS: ClientLogo[] = [
  {
    name: 'Dr. Cristian Valencia — Odontología, Armenia',
    logo: 'https://drcristianvalencia.com/assets/Dr%20Cristian%20Valencia.png',
    href: 'https://drcristianvalencia.com/',
  },
];
