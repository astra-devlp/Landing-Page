import { Directive, ElementRef, inject } from '@angular/core';

/** Writes the pointer position into --mx / --my so CSS can draw a light under it. */
@Directive({
  selector: '[appSpotlight]',
  host: { '(pointermove)': 'move($event)' },
})
export class Spotlight {
  private readonly element = inject(ElementRef<HTMLElement>);

  protected move(event: PointerEvent): void {
    const el = this.element.nativeElement as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
