import { compareUrls } from '../compareUrls';

const randomUUID = (): string => Math.random().toString(36).slice(2);

export type MessagePayload = {
  type: string;
  data?: unknown;
  senderId?: string;
};

export type MessengerConfig = {
  /**
   * Origins allowed to send messages to this instance.
   * Use '*' to allow all origins (not recommended for production).
   */
  allowedOrigins: string[];
  /**
   * Function used to send messages to other frames.
   * Injected so the messenger is agnostic to the frame topology.
   */
  postMessageFn: (payload: MessagePayload, origin: string) => void;
};

type MessageHandler<T = unknown> = (data: T, senderId?: string) => void;

/**
 * CrossFrameMessenger manages all cross-frame postMessage communication.
 * It owns a single window message listener and routes incoming messages to
 * type-specific subscribers.
 *
 * Replaces CommunicatorContext + useCrossFrameMessageListener across all frameworks.
 */
export class CrossFrameMessenger {
  readonly senderId: string;
  private readonly _config: MessengerConfig;
  private readonly _subscribers = new Map<string, Set<MessageHandler>>();
  private _windowHandler: ((event: MessageEvent) => void) | null = null;

  constructor(config: MessengerConfig) {
    this._config = config;
    this.senderId = randomUUID();
  }

  /** Start listening for incoming messages on window. */
  start(): void {
    if (typeof window === 'undefined') return;
    if (this._windowHandler) return;
    this._windowHandler = (event: MessageEvent<MessagePayload>) => {
      this._handleMessage(event);
    };
    window.addEventListener('message', this._windowHandler);
  }

  /** Stop listening and clean up. */
  stop(): void {
    if (this._windowHandler) {
      window.removeEventListener('message', this._windowHandler);
      this._windowHandler = null;
    }
  }

  /** Send a message payload to all configured target origins. */
  send(type: string, data?: unknown): void {
    const payload: MessagePayload = { type, data, senderId: this.senderId };
    for (const origin of this._config.allowedOrigins) {
      if (origin) {
        this._config.postMessageFn(payload, origin);
      }
    }
  }

  /**
   * Subscribe to messages of a given type.
   * Returns an unsubscribe function.
   */
  subscribe<T = unknown>(type: string, handler: MessageHandler<T>): () => void {
    if (!this._subscribers.has(type)) {
      this._subscribers.set(type, new Set());
    }
    this._subscribers.get(type)!.add(handler as MessageHandler);
    return () => {
      this._subscribers.get(type)?.delete(handler as MessageHandler);
    };
  }

  private _handleMessage(event: MessageEvent<MessagePayload>): void {
    const payload = event.data;
    if (!payload || typeof payload !== 'object') return;

    const { type, data, senderId: msgSenderId } = payload;
    if (!type || typeof type !== 'string') return;

    // Ignore messages originating from this instance
    if (msgSenderId === this.senderId) return;

    // Validate message origin
    const { allowedOrigins } = this._config;
    const isAllowed =
      !allowedOrigins ||
      allowedOrigins.length === 0 ||
      allowedOrigins.includes('*') ||
      allowedOrigins
        .filter((url) => Boolean(url) && url !== '')
        .some((url) => compareUrls(url, event.origin));

    if (!isAllowed) return;

    const handlers = this._subscribers.get(type);
    if (handlers) {
      for (const handler of handlers) {
        handler(data, msgSenderId);
      }
    }
  }
}
