// @vitest-environment node
// jsdom breaks esbuild, loaded through the dictionary manipulator imports
import type { Locale } from '@intlayer/types/allLocales';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MessageKey } from '../messageKey';
import {
  CLIENT_HEARTBEAT_TIMEOUT_MS,
  EditorStateManager,
  type EditorStateManagerConfig,
} from './EditorStateManager';

const createManager = (mode: EditorStateManagerConfig['mode']) =>
  new EditorStateManager({
    mode,
    messenger: { allowedOrigins: ['*'], postMessageFn: vi.fn() },
  });

describe('EditorStateManager locale change request', () => {
  it('sends the requested locale from the editor', () => {
    const manager = createManager('editor');
    const sendSpy = vi.spyOn(manager.messenger, 'send');

    manager.requestLocaleChange('fr' as Locale);

    expect(sendSpy).toHaveBeenCalledWith(
      MessageKey.INTLAYER_LOCALE_CHANGE_REQUESTED,
      'fr'
    );
  });

  it('never sends a locale request from the client', () => {
    const manager = createManager('client');
    const sendSpy = vi.spyOn(manager.messenger, 'send');

    manager.requestLocaleChange('fr' as Locale);

    expect(sendSpy).not.toHaveBeenCalled();
  });

  it('subscribes the client to the requested locales', () => {
    const manager = createManager('client');
    const subscribeSpy = vi.spyOn(manager.messenger, 'subscribe');
    const handler = vi.fn();

    manager.onLocaleChangeRequested(handler);

    expect(subscribeSpy).toHaveBeenCalledWith(
      MessageKey.INTLAYER_LOCALE_CHANGE_REQUESTED,
      handler
    );
  });

  it('does not subscribe the editor to its own requests', () => {
    const manager = createManager('editor');
    const subscribeSpy = vi.spyOn(manager.messenger, 'subscribe');

    manager.onLocaleChangeRequested(vi.fn());

    expect(subscribeSpy).not.toHaveBeenCalled();
  });
});

describe('EditorStateManager displayed dictionary keys', () => {
  it('requests displayed keys on editor start when value is undefined', () => {
    const manager = createManager('editor');
    const sendSpy = vi.spyOn(manager.messenger, 'send');

    manager.start();

    expect(sendSpy).toHaveBeenCalledWith(
      `${MessageKey.INTLAYER_DISPLAYED_DICTIONARY_KEYS}/get`
    );
    manager.stop();
  });

  it('broadcasts displayed keys on editor activate in client mode', () => {
    const manager = createManager('client');
    const sendSpy = vi.spyOn(manager.messenger, 'send');

    manager.displayedDictionaryKeys.set(['dict-a', 'dict-b']);
    sendSpy.mockClear();

    // Trigger activate callback
    (manager as any)._setupActivationHandshake();
    // Simulate INTLAYER_EDITOR_ACTIVATE message received
    (manager as any)._broadcastData();

    expect(sendSpy).toHaveBeenCalledWith(
      `${MessageKey.INTLAYER_DISPLAYED_DICTIONARY_KEYS}/post`,
      ['dict-a', 'dict-b']
    );
    manager.stop();
  });
});

describe('EditorStateManager client heartbeat', () => {
  // Node environment: a bare event target stands in for the window
  beforeEach(() => {
    vi.stubGlobal('window', new EventTarget());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const receive = (type: string, data?: unknown) =>
    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          type,
          data,
          senderId: 'client',
          messageId: crypto.randomUUID(),
        },
        origin: 'http://localhost:3000',
      })
    );

  it('activates a new client, then pings without broadcasting again', () => {
    vi.useFakeTimers();
    const manager = createManager('editor');
    const sendSpy = vi.spyOn(manager.messenger, 'send');
    manager.start();

    receive(MessageKey.INTLAYER_CLIENT_READY, { isActivated: false });
    expect(manager.editorEnabled.value).toBe(true);
    expect(sendSpy).toHaveBeenCalledWith(MessageKey.INTLAYER_EDITOR_ACTIVATE);

    sendSpy.mockClear();
    receive(MessageKey.INTLAYER_CLIENT_READY, { isActivated: true });
    expect(sendSpy).not.toHaveBeenCalledWith(
      MessageKey.INTLAYER_EDITOR_ACTIVATE
    );

    manager.stop();
    vi.useRealTimers();
  });

  it('marks a silent client disconnected, then reconnects it', () => {
    vi.useFakeTimers();
    const manager = createManager('editor');
    manager.start();

    receive(MessageKey.INTLAYER_CLIENT_READY, { isActivated: false });
    vi.advanceTimersByTime(CLIENT_HEARTBEAT_TIMEOUT_MS + 3_000);
    expect(manager.editorEnabled.value).toBe(false);

    receive(MessageKey.INTLAYER_CLIENT_READY, { isActivated: true });
    expect(manager.editorEnabled.value).toBe(true);

    manager.stop();
    vi.useRealTimers();
  });
});
