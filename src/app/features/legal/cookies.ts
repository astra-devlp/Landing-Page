import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../../core/consent/consent.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { LEGAL_PATHS, LEGAL_SEO, POLICY_UPDATED } from '../../shared/data/legal';
import { usePageMeta } from '../../shared/utils/page-meta';

interface StorageItem {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
}

@Component({
  selector: 'app-cookies',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './cookies.html',
  styleUrl: './legal.css',
})
export class Cookies {
  protected readonly i18n = inject(I18nService);
  protected readonly consent = inject(ConsentService);
  protected readonly updated = POLICY_UPDATED;
  protected readonly policyPath = `/${LEGAL_PATHS.policy}`;

  protected readonly necessary: StorageItem[] = [
    {
      name: 'astra-consent',
      provider: 'Astra Dev',
      purpose: 'Guardar tu decisión sobre las cookies.',
      duration: 'Hasta que borres los datos del navegador',
    },
    {
      name: 'astra-lang',
      provider: 'Astra Dev',
      purpose: 'Recordar el idioma que elegiste.',
      duration: 'Hasta que borres los datos del navegador',
    },
    {
      name: 'astra-theme',
      provider: 'Astra Dev',
      purpose: 'Recordar si prefieres el tema claro u oscuro.',
      duration: 'Hasta que borres los datos del navegador',
    },
    {
      name: 'astra-chat-nudge-seen',
      provider: 'Astra Dev',
      purpose: 'No volver a mostrarte el aviso del asistente en la misma visita.',
      duration: 'Se borra al cerrar la pestaña',
    },
  ];

  protected readonly analytics: StorageItem[] = [
    {
      name: '_ga',
      provider: 'Google Analytics',
      purpose: 'Distinguir visitantes de forma anónima para contar visitas.',
      duration: '2 años',
    },
    {
      name: '_ga_*',
      provider: 'Google Analytics',
      purpose: 'Mantener el estado de la sesión de analítica.',
      duration: '2 años',
    },
  ];

  constructor() {
    usePageMeta(LEGAL_PATHS.cookies, LEGAL_SEO.cookies.title, LEGAL_SEO.cookies.description);
  }
}
