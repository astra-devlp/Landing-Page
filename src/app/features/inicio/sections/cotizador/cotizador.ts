import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { SERVICE_PAGE_PATHS } from '../../../../shared/data/service-pages';
import { ServiceItem } from '../../../../shared/models/site.models';
import { whatsappUrl } from '../../../../shared/utils/whatsapp';
import { Reveal } from '../../../../shared/ui/reveal/reveal';

/** Recommended services (by icon) for each goal; the first one is the main pick. */
const BY_GOAL: Record<string, string[]> = {
  whatsapp: ['chat', 'neurology'],
  online: ['web', 'chat'],
  control: ['point_of_sale', 'inventory_2'],
  automate: ['neurology', 'point_of_sale'],
  clients: ['groups', 'chat'],
  product: ['cloud', 'settings_suggest'],
};

/** Business-specific tweaks to the goal-based pick. */
const OVERRIDES: Record<string, string[]> = {
  'distributor:control': ['inventory_2', 'point_of_sale'],
  'restaurant:whatsapp': ['chat', 'point_of_sale'],
  'health:whatsapp': ['chat', 'web'],
};

@Component({
  selector: 'app-cotizador',
  imports: [Reveal, RouterLink],
  templateUrl: './cotizador.html',
})
export class Cotizador {
  protected readonly i18n = inject(I18nService);
  protected readonly pagePaths = SERVICE_PAGE_PATHS;

  protected readonly step = signal(0);
  protected readonly answers = signal<string[]>([]);

  protected readonly quiz = computed(() => this.i18n.copy().quiz);
  protected readonly total = computed(() => this.quiz().questions.length);
  protected readonly done = computed(() => this.step() >= this.total());

  protected readonly recommendation = computed<ServiceItem[]>(() => {
    const [business, goal] = this.answers();
    const icons = OVERRIDES[`${business}:${goal}`] ?? BY_GOAL[goal] ?? [];
    const items = this.i18n.copy().services.items;
    return icons
      .map((icon) => items.find((item) => item.icon === icon))
      .filter((item): item is ServiceItem => !!item);
  });

  protected readonly whatsappHref = computed(() => {
    const quiz = this.quiz();
    const labels = this.answers().map(
      (value, i) =>
        quiz.questions[i].options.find((option) => option.value === value)?.label ?? value,
    );
    const message = quiz.message
      .replace('{business}', labels[0] ?? '')
      .replace('{goal}', labels[1] ?? '')
      .replace('{timeline}', labels[2] ?? '')
      .replace(
        '{solutions}',
        this.recommendation()
          .map((item) => item.title)
          .join(', '),
      );
    return whatsappUrl(message);
  });

  protected stepLabel(): string {
    return this.quiz()
      .step.replace('{n}', String(Math.min(this.step() + 1, this.total())))
      .replace('{total}', String(this.total()));
  }

  protected choose(value: string): void {
    this.answers.update((answers) => [...answers.slice(0, this.step()), value]);
    this.step.update((step) => step + 1);
  }

  protected back(): void {
    this.step.update((step) => Math.max(0, step - 1));
  }

  protected restart(): void {
    this.answers.set([]);
    this.step.set(0);
  }
}
