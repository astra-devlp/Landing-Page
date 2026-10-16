import { Injectable, signal } from '@angular/core';

/** Lets any section open the website assistant (e.g. "Ask Astra" buttons). */
@Injectable({ providedIn: 'root' })
export class ChatService {
  readonly open = signal(false);

  show(): void {
    this.open.set(true);
  }

  toggle(): void {
    this.open.update((open) => !open);
  }
}
