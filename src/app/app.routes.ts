import { Routes } from '@angular/router';
import { LEGAL_PATHS } from './shared/data/legal';
import { SERVICE_PAGE_PATHS } from './shared/data/service-pages';

const servicePages: Routes = Object.entries(SERVICE_PAGE_PATHS).map(([page, path]) => ({
  path,
  loadComponent: () => import('./features/servicio/servicio').then((m) => m.Servicio),
  data: { page },
}));

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/inicio/inicio.routes').then((m) => m.INICIO_ROUTES),
  },
  ...servicePages,
  {
    path: LEGAL_PATHS.terms,
    loadComponent: () => import('./features/legal/terminos').then((m) => m.Terminos),
  },
  {
    path: LEGAL_PATHS.cookies,
    loadComponent: () => import('./features/legal/cookies').then((m) => m.Cookies),
  },
  {
    path: LEGAL_PATHS.policy,
    loadComponent: () => import('./features/legal/politica-datos').then((m) => m.PoliticaDatos),
  },
  {
    path: LEGAL_PATHS.requests,
    loadComponent: () => import('./features/legal/tus-datos').then((m) => m.TusDatos),
  },
  { path: '**', redirectTo: '' },
];
