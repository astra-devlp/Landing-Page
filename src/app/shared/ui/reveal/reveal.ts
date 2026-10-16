import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input, signal } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  host: {
    '[class.motion-safe:opacity-0]': 'pending()',
    '[class.motion-safe:animate-rise]': 'play()',
    '[style.animation-delay]': 'play() ? delay() : null',
  },
})
export class Reveal {
  readonly revealDelay = input(0);

  private readonly visible = signal(false);
  private readonly reduced =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    if (this.reduced) {
      this.visible.set(true);
      return;
    }

    const element = inject(ElementRef<HTMLElement>);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) {
            return;
          }
          this.visible.set(true);
          observer.disconnect();
        },
        { threshold: [0, 0.2], rootMargin: '0px 0px -8% 0px' },
      );
      observer.observe(element.nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected pending(): boolean {
    return !this.reduced && !this.visible();
  }

  protected play(): boolean {
    return !this.reduced && this.visible();
  }

  protected delay(): string {
    return `${this.revealDelay()}ms`;
  }
}
