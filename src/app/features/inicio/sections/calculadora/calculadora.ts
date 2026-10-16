import { Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { whatsappUrl } from '../../../../shared/utils/whatsapp';
import { Reveal } from '../../../../shared/ui/reveal/reveal';

// Assumptions behind the estimate; they are also spelled out in the on-page note.
const MINUTES_PER_MESSAGE = 3;
const AUTOMATED_SHARE = 0.7;
const MINUTES_PER_RECEIPT = 4;
const WORKDAYS_PER_MONTH = 26;
const HOURS_PER_WORKDAY = 8;

@Component({
  selector: 'app-calculadora',
  imports: [Reveal],
  templateUrl: './calculadora.html',
})
export class Calculadora {
  protected readonly i18n = inject(I18nService);

  protected readonly fields = [
    { key: 'messages', max: 300 },
    { key: 'receipts', max: 150 },
  ] as const;

  protected readonly messages = signal(60);
  protected readonly receipts = signal(20);

  protected readonly hours = computed(() => {
    const minutesPerDay =
      this.messages() * AUTOMATED_SHARE * MINUTES_PER_MESSAGE +
      this.receipts() * MINUTES_PER_RECEIPT;
    return Math.round((minutesPerDay * WORKDAYS_PER_MONTH) / 60);
  });

  protected readonly days = computed(() =>
    (this.hours() / HOURS_PER_WORKDAY).toLocaleString(this.i18n.lang(), {
      maximumFractionDigits: 1,
    }),
  );

  protected readonly whatsappHref = computed(() =>
    whatsappUrl(
      this.i18n
        .copy()
        .calculator.message.replace('{messages}', String(this.messages()))
        .replace('{receipts}', String(this.receipts())),
    ),
  );

  protected onInput(target: 'messages' | 'receipts', event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    (target === 'messages' ? this.messages : this.receipts).set(value);
  }
}
