import { mergeIframeClick } from '../mergeIframeClick';
import { MessageKey } from '../messagesKeys';
import type { CrossFrameMessenger } from './CrossFrameMessenger';

/**
 * IframeClickInterceptor handles click events across iframe boundaries.
 *
 * - startInterceptor(): called in the client (iframe) — broadcasts mousedown to parent
 * - startMerger(): called in the editor (parent) — merges received clicks into DOM events
 *
 * Replaces useIframeClickInterceptor / useIframeClickMerger across all frameworks.
 */
export class IframeClickInterceptor {
  private readonly _messenger: CrossFrameMessenger;
  private _mousedownHandler: EventListener | null = null;
  private _unsubscribeMerge: (() => void) | null = null;

  constructor(messenger: CrossFrameMessenger) {
    this._messenger = messenger;
  }

  /** Called on the client side (inside iframe). Broadcasts click events to parent. */
  startInterceptor(): void {
    if (typeof window === 'undefined') return;
    this._mousedownHandler = () => {
      this._messenger.send(MessageKey.INTLAYER_IFRAME_CLICKED);
    };
    window.addEventListener('mousedown', this._mousedownHandler);
  }

  /** Called on the editor side (parent frame). Merges incoming iframe clicks into DOM. */
  startMerger(): void {
    this._unsubscribeMerge = this._messenger.subscribe(
      MessageKey.INTLAYER_IFRAME_CLICKED,
      mergeIframeClick as (data: unknown) => void
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
