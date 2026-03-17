import type { CrossFrameMessenger } from './CrossFrameMessenger';

export type CrossFrameStateOptions = {
  /** Whether to broadcast state changes to other frames. Default: true */
  emit?: boolean;
  /** Whether to listen for state updates from other frames. Default: true */
  receive?: boolean;
};

/**
 * CrossFrameStateManager synchronizes a single named value across frames using
 * the postMessage API via CrossFrameMessenger.
 *
 * Protocol:
 *   `{key}/post` — broadcast a new value
 *   `{key}/get`  — request the current value from other frames
 *
 * Replaces useCrossFrameState across all frameworks.
 *
 * @fires change — CustomEvent<T> dispatched whenever the value changes (local set or received)
 */
export class CrossFrameStateManager<T> extends EventTarget {
  private _value: T | undefined;
  private readonly _key: string;
  private readonly _messenger: CrossFrameMessenger;
  private readonly _options: Required<CrossFrameStateOptions>;
  private readonly _unsubscribers: Array<() => void> = [];

  constructor(
    key: string,
    messenger: CrossFrameMessenger,
    options: CrossFrameStateOptions & { initialValue?: T } = {}
  ) {
    super();
    this._key = key;
    this._messenger = messenger;
    this._options = {
      emit: options.emit ?? true,
      receive: options.receive ?? true,
    };
    if (options.initialValue !== undefined) {
      this._value = options.initialValue;
    }
  }

  get value(): T | undefined {
    return this._value;
  }

  /** Update the value locally and broadcast it to other frames if emit is enabled. */
  set(newValue: T): void {
    this._value = newValue;
    this.dispatchEvent(new CustomEvent<T>('change', { detail: newValue }));
    if (this._options.emit) {
      this._messenger.send(`${this._key}/post`, newValue);
    }
  }

  /**
   * Start listening for incoming state updates and responding to /get requests.
   * If receive=true and no initial value is set, sends a /get to request the current value.
   */
  start(): void {
    if (this._options.receive) {
      const unsub = this._messenger.subscribe<T>(
        `${this._key}/post`,
        (data) => {
          this._value = data;
          this.dispatchEvent(new CustomEvent<T>('change', { detail: data }));
        }
      );
      this._unsubscribers.push(unsub);
    }

    if (this._options.emit) {
      // Respond to /get requests by broadcasting current value
      const unsub = this._messenger.subscribe(
        `${this._key}/get`,
        (_, originSenderId) => {
          if (originSenderId === this._messenger.senderId) return;
          if (this._value === undefined) return;
          this._messenger.send(`${this._key}/post`, this._value);
        }
      );
      this._unsubscribers.push(unsub);
    }

    // If receiving and no initial value, request it from other frames
    if (this._options.receive && this._value === undefined) {
      this._messenger.send(`${this._key}/get`);
    }
  }

  /** Stop all listeners. */
  stop(): void {
    for (const unsub of this._unsubscribers) unsub();
    this._unsubscribers.length = 0;
  }

  /** Broadcast the current value to all frames (useful after reconnect). */
  postCurrentValue(): void {
    if (this._value !== undefined) {
      this._messenger.send(`${this._key}/post`, this._value);
    }
  }
}
