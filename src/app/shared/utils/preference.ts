import { Signal, signal } from '@angular/core';

export interface Preference<T extends string> {
  readonly value: Signal<T>;
  set(value: T): void;
}

/**
 * A visitor choice kept in localStorage: read and validated once on start,
 * applied to the page, and saved on change. Blocked storage (Safari with
 * cookies blocked, some private modes) throws on access; the choice then
 * still works for this visit and is simply not remembered.
 */
export function preference<T extends string>(
  key: string,
  isValid: (value: unknown) => value is T,
  fallback: () => T,
  apply: (value: T) => void,
): Preference<T> {
  const stored = read(key);
  const value = signal<T>(isValid(stored) ? stored : fallback());
  apply(value());

  return {
    value: value.asReadonly(),
    set(next: T) {
      value.set(next);
      write(key, next);
      apply(next);
    },
  };
}

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Not remembered, but already applied to this visit.
  }
}
