/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CrossFrameMessage<T = any> {
  type: string;
  data: T;
}

export type MessageHandler = (data: any, event: MessageEvent) => void;

export type CrossFrameCommunicatorOptions = {
  /**
   * The window to which we will post messages.
   * - In an iframe (child) app, this is usually `window.parent`.
   * - In the parent app, this is `iframe.contentWindow`.
   */
  targetWindow: Window;

  /**
   * The expected origin when sending messages.
   * - For example, "https://my-parent-domain.com" or "https://my-child-domain.com".
   * - Use "*" only if absolutely necessary, but it is not recommended.
   */
  targetOrigin?: string;

  /**
   * An array of allowed origins from which we accept incoming messages.
   * - If empty, no external origin is allowed.
   * - You can also add "*" to allow all, but that is not recommended in production.
   */
  allowedOrigins?: string[];
};

export class CrossFrameCommunicator {
  private targetWindow: Window;
  private targetOrigin: string;
  private allowedOrigins: string[];
  private handlers: Record<string, MessageHandler[]>;

  constructor(options: CrossFrameCommunicatorOptions) {
    this.targetWindow = options.targetWindow;
    this.targetOrigin = options.targetOrigin ?? '*';
    this.allowedOrigins = options.allowedOrigins ?? ['*'];
    this.handlers = {};

    // Listen for incoming messages on the current window
    window.addEventListener('message', this.handleIncomingMessage);
  }

  /**
   * Clean up the event listener if needed (for single-page apps, unmounting, etc.).
   */
  public destroy() {
    window.removeEventListener('message', this.handleIncomingMessage);
  }

  /**
   * Register a handler for a specific message type.
   */
  public on(type: string, handler: MessageHandler) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  }

  /**
   * Post a message to the target window.
   * @param type A string identifying the message
   * @param data The payload (any serializable data)
   */
  public sendMessage<T>(type: string, data: T) {
    // Use the targetOrigin instead of '*'
    this.targetWindow.postMessage({ type, data }, this.targetOrigin);
  }

  /**
   * Internal method to dispatch incoming messages to registered handlers.
   */
  private handleIncomingMessage = (event: MessageEvent) => {
    const { data, origin, source } = event;

    // 1) Check if the event has the structure we expect
    if (!data || typeof data !== 'object' || !data.type) {
      return;
    }

    // 2) Check if the origin is allowed
    if (!this.isAllowedOrigin(origin)) {
      // Optionally, you could console.warn or log this
      // console.warn(`Message from disallowed origin: ${origin}`);
      return;
    }

    // 3) (Optional) Check if the event source is the window we expect
    //    This ensures the message is from the same Window object (iframe) we are targeting.
    //    If you only care about the domain, you can skip this check.
    if (source !== this.targetWindow) {
      // console.warn('Message received from an unexpected window source');
      return;
    }

    // 4) Dispatch to any registered handlers
    const messageType = data.type;
    if (this.handlers[messageType]) {
      this.handlers[messageType].forEach((handler) => {
        handler(data.data, event);
      });
    }
  };

  private isAllowedOrigin(origin: string): boolean {
    // If the array includes "*", then all origins are allowed
    if (this.allowedOrigins.includes('*')) return true;

    // Otherwise, the origin must be in the array
    return this.allowedOrigins.includes(origin);
  }
}
