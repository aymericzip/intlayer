// @vitest-environment node
// jsdom breaks esbuild, loaded through the dictionary manipulator imports
import type { Locale } from '@intlayer/types/allLocales';
import { describe, expect, it, vi } from 'vitest';
import { MessageKey } from '../messageKey';
import {
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
