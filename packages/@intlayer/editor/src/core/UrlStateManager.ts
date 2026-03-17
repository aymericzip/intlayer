import { MessageKey } from '../messagesKeys';
import type { CrossFrameMessenger } from './CrossFrameMessenger';

/**
 * UrlStateManager patches window.history and broadcasts URL path changes
 * across frames via postMessage.
 *
 * Replaces useCrossURLPathSetter / useCrossURLPathState across all frameworks.
 */
export class UrlStateManager {
  private readonly _messenger: CrossFrameMessenger;
  private _originalPushState: typeof history.pushState | null = null;
  private _originalReplaceState: typeof history.replaceState | null = null;
  private _listeners: Array<[string, EventListener]> = [];

  constructor(messenger: CrossFrameMessenger) {
    this._messenger = messenger;
  }

  start(): void {
    if (typeof window === 'undefined') return;

    const updateURLState = () => {
      this._messenger.send(
        `${MessageKey.INTLAYER_URL_CHANGE}/post`,
        window.location.pathname
      );
    };

    this._originalPushState = history.pushState;
    this._originalReplaceState = history.replaceState;

    const injectLocationChange = (method: typeof history.pushState) =>
      function (
        this: typeof history,
        ...args: Parameters<typeof history.pushState>
      ) {
        method.apply(this, args);
        window.dispatchEvent(new Event('locationchange'));
      };

    history.pushState = injectLocationChange(
      this._originalPushState
    ) as typeof history.pushState;
    history.replaceState = injectLocationChange(
      this._originalReplaceState
    ) as typeof history.replaceState;

    for (const eventName of [
      'locationchange',
      'popstate',
      'hashchange',
      'load',
    ] as const) {
      const listener = updateURLState as EventListener;
      window.addEventListener(eventName, listener);
      this._listeners.push([eventName, listener]);
    }

    updateURLState();
  }

  stop(): void {
    if (typeof window === 'undefined') return;

    for (const [eventName, listener] of this._listeners) {
      window.removeEventListener(eventName, listener);
    }
    this._listeners = [];

    if (this._originalPushState) {
      history.pushState = this._originalPushState;
      this._originalPushState = null;
    }
    if (this._originalReplaceState) {
      history.replaceState = this._originalReplaceState;
      this._originalReplaceState = null;
    }
  }
}
