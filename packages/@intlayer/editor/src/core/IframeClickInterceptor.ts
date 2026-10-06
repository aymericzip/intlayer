import { MessageKey } from '../messageKey';
import type { CrossFrameMessenger } from './CrossFrameMessenger';
import { isSelectionClick } from './selectionClick';

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
 * - startInterceptor(): client (iframe) side — reports each click to the editor
 * - startMerger(): editor (parent) side — replays reported clicks on its window
 *
 * Clicks are reported once released rather than on mousedown: a long press on
 * content starts with a mousedown too, and reporting it closed the editor
 * drawers right before the press focused content in them. A completed long
 * press stops its own click (see `ContentSelector`), and a click selecting
 * content is marked as such, so neither is reported.
 */
export class IframeClickInterceptor {
  private readonly _messenger: CrossFrameMessenger;
  private _clickHandler: EventListener | null = null;
  private _unsubscribeMerge: (() => void) | null = null;

  constructor(messenger: CrossFrameMessenger) {
    this._messenger = messenger;
  }

  startInterceptor(): void {
    if (typeof window === 'undefined') return;
    this._clickHandler = (event) => {
      if (isSelectionClick(event)) return;

      this._messenger.send(MessageKey.INTLAYER_IFRAME_CLICKED);
    };
    window.addEventListener('click', this._clickHandler);
  }

  startMerger(): void {
    this._unsubscribeMerge = this._messenger.subscribe(
      MessageKey.INTLAYER_IFRAME_CLICKED,
      replayIframeClick
    );
  }

  stopInterceptor(): void {
    if (this._clickHandler) {
      window.removeEventListener('click', this._clickHandler);
      this._clickHandler = null;
    }
  }

  stopMerger(): void {
    this._unsubscribeMerge?.();
    this._unsubscribeMerge = null;
  }
}
