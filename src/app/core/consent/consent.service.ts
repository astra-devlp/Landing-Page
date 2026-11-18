import { computed, Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'astra-consent';
/** Bump when the cookie policy changes in a way that needs asking again. */
const CONSENT_VERSION = 1;

export interface ConsentDecision {
  /** Optional analytics cookies (Google Analytics). Necessary storage is always on. */
  analytics: boolean;
  /** ISO date of the decision, kept as proof of consent. */
  date: string;
  version: number;
}

/** Remembers the visitor's cookie choice and whether the banner is showing. */
@Injectable({ providedIn: 'root' })
export class ConsentService {
  readonly decision = signal<ConsentDecision | null>(read());
  readonly analyticsAllowed = computed(() => this.decision()?.analytics === true);
  /** Open until the visitor decides, or when they reopen it from the footer. */
  readonly bannerOpen = signal(this.decision() === null);

  acceptAll(): void {
    this.save(true);
  }

  rejectOptional(): void {
    this.save(false);
  }

  reopen(): void {
    this.bannerOpen.set(true);
  }

  private save(analytics: boolean): void {
    const decision: ConsentDecision = {
      analytics,
      date: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    this.decision.set(decision);
    this.bannerOpen.set(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decision));
    } catch {
      // Private mode or blocked storage: the choice still applies to this visit.
    }
  }
}

function read(): ConsentDecision | null {
  try {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? 'null',
    ) as ConsentDecision | null;
    return stored?.version === CONSENT_VERSION ? stored : null;
  } catch {
    return null;
  }
}
