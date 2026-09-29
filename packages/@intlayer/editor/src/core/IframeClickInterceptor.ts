import { MessageKey } from '../messageKey';
import type { CrossFrameMessenger } from './CrossFrameMessenger';

/**
 * Replays a click made inside the iframe on the editor window, so the editor's
 * "click outside" handlers (popovers, drawers) react to it.
 */
const replayIframeClick = (): void => {
  for (const eventType of ['mousedown', 'click']) {
    window.dispatchEvent(
      new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
  }
};

/**
 * Forwards clicks across the iframe boundary.
 *
 * - startInterceptor(): client (iframe) side — reports each mousedown to the editor
 * - startMerger(): editor (parent) side — replays reported clicks on its window
 */
export class IframeClickInterceptor {
  private readonly _messenger: CrossFrameMessenger;
  private _mousedownHandler: EventListener | null = null;
  private _unsubscribeMerge: (() => void) | null = null;

  constructor(messenger: CrossFrameMessenger) {
    this._messenger = messenger;
  }

  startInterceptor(): void {
    if (typeof window === 'undefined') return;
    this._mousedownHandler = () => {
      this._messenger.send(MessageKey.INTLAYER_IFRAME_CLICKED);
    };
    window.addEventListener('mousedown', this._mousedownHandler);
  }

  startMerger(): void {
    this._unsubscribeMerge = this._messenger.subscribe(
      MessageKey.INTLAYER_IFRAME_CLICKED,
      replayIframeClick
    );
  }

  stopInterceptor(): void {
    if (this._mousedownHandler) {
      window.removeEventListener('mousedown', this._mousedownHandler);
      this._mousedownHandler = null;
    }
  }

  stopMerger(): void {
    this._unsubscribeMerge?.();
    this._unsubscribeMerge = null;
  }
}
