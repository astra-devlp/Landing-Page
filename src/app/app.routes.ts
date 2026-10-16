import { Routes } from '@angular/router';
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
  { path: '**', redirectTo: '' },
];
