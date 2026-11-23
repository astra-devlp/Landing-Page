import { Component, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { CLIENTS } from '../../../../shared/data/clients';

/** Logo strip of clients we already work with; each logo opens the client's site. */
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.html',
})
export class Proyectos {
  protected readonly i18n = inject(I18nService);
  protected readonly clients = CLIENTS;
}
