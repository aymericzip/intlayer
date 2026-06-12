/**
 * Minimal EventEmitter that mirrors `@lingui/core`'s EventEmitter API.
 * Required because we cannot import from `@lingui/core` at runtime
 * (we are its alias) — so we reimplement the base class here.
 */
export class EventEmitter<
  Events extends Record<string, (...args: unknown[]) => void>,
> {
  private readonly _events: Map<
    keyof Events,
    Set<(...args: unknown[]) => void>
  > = new Map();

  /**
   * Registers a listener for the given event and returns an unsubscribe function.
   */
  on<E extends keyof Events>(event: E, listener: Events[E]): () => void {
    if (!this._events.has(event)) {
      this._events.set(event, new Set());
    }
    this._events.get(event)!.add(listener as (...args: unknown[]) => void);
    return () => this.removeListener(event, listener);
  }

  /**
   * Removes a previously registered listener.
   */
  removeListener<E extends keyof Events>(event: E, listener: Events[E]): void {
    this._events.get(event)?.delete(listener as (...args: unknown[]) => void);
  }

  /**
   * Emits an event, invoking all registered listeners.
   */
  emit<E extends keyof Events>(event: E, ...args: Parameters<Events[E]>): void {
    this._events.get(event)?.forEach((listener) => {
      listener(...(args as unknown[]));
    });
  }
}
