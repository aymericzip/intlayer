import { afterEach, describe, expect, it, vi } from 'vitest';
import { MessageKey } from '../messageKey';
import type { CrossFrameMessenger } from './CrossFrameMessenger';
import { IframeClickInterceptor } from './IframeClickInterceptor';

/** Minimal messenger double capturing what would cross the frame boundary. */
const createMessengerMock = () =>
  ({
    send: vi.fn(),
    subscribe: vi.fn(() => () => undefined),
    senderId: 'test-sender',
  }) as unknown as CrossFrameMessenger & { send: ReturnType<typeof vi.fn> };

describe('IframeClickInterceptor', () => {
  let interceptor: IframeClickInterceptor | null = null;

  afterEach(() => {
    interceptor?.stopInterceptor();
    interceptor = null;
    document.body.innerHTML = '';
  });

  const startInterceptor = () => {
    const messenger = createMessengerMock();
    interceptor = new IframeClickInterceptor(messenger);
    interceptor.startInterceptor();

    return messenger;
  };

  it('reports a click to the editor', () => {
    const messenger = startInterceptor();

    document.body.click();

    expect(messenger.send).toHaveBeenCalledWith(
      MessageKey.INTLAYER_IFRAME_CLICKED
    );
  });

  it('does not report a mousedown, which may start a long press', () => {
    const messenger = startInterceptor();

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(messenger.send).not.toHaveBeenCalled();
  });

  it('does not report a click stopped by a completed long press', () => {
    const messenger = startInterceptor();
    const selectedContent = document.createElement('span');
    selectedContent.addEventListener('click', (event) =>
      event.stopPropagation()
    );
    document.body.appendChild(selectedContent);

    selectedContent.click();

    expect(messenger.send).not.toHaveBeenCalled();
  });

  it('stops reporting once stopped', () => {
    const messenger = startInterceptor();

    interceptor?.stopInterceptor();
    document.body.click();

    expect(messenger.send).not.toHaveBeenCalled();
  });
});
