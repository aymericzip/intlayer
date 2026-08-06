import { describe, expect, it, vi } from 'vitest';
import type { CrossFrameMessenger } from './CrossFrameMessenger';
import { CrossFrameStateManager } from './CrossFrameStateManager';

type TestValue = { dictionaryKey: string; keyPath: string[] };

/** Minimal messenger double capturing what would cross the frame boundary. */
const createMessengerMock = () =>
  ({
    send: vi.fn(),
    subscribe: vi.fn(() => () => undefined),
    senderId: 'test-sender',
  }) as unknown as CrossFrameMessenger & { send: ReturnType<typeof vi.fn> };

describe('CrossFrameStateManager', () => {
  it('broadcasts a concrete value as-is', () => {
    const messenger = createMessengerMock();
    const manager = new CrossFrameStateManager<TestValue>('focus', messenger);

    const nextValue = { dictionaryKey: 'home', keyPath: [] };
    manager.set(nextValue);

    expect(manager.value).toEqual(nextValue);
    expect(messenger.send).toHaveBeenCalledWith('focus/post', nextValue);
  });

  it('resolves an updater against the previous value before broadcasting', () => {
    const messenger = createMessengerMock();
    const manager = new CrossFrameStateManager<TestValue>('focus', messenger, {
      initialValue: { dictionaryKey: 'home', keyPath: ['title'] },
    });

    manager.set((previousValue) => ({
      ...(previousValue as TestValue),
      keyPath: [],
    }));

    expect(manager.value).toEqual({ dictionaryKey: 'home', keyPath: [] });
  });

  it('never sends a function across frames — postMessage cannot clone one', () => {
    const messenger = createMessengerMock();
    const manager = new CrossFrameStateManager<TestValue>('focus', messenger, {
      initialValue: { dictionaryKey: 'home', keyPath: ['title'] },
    });

    manager.set((previousValue) => ({
      ...(previousValue as TestValue),
      keyPath: [],
    }));

    const [, payload] = messenger.send.mock.calls[0];
    expect(typeof payload).not.toBe('function');
    expect(payload).toEqual({ dictionaryKey: 'home', keyPath: [] });
    // structuredClone throws DataCloneError on a function — this is the guard.
    expect(() => structuredClone(payload)).not.toThrow();
  });

  it('dispatches the resolved value on the change event', () => {
    const messenger = createMessengerMock();
    const manager = new CrossFrameStateManager<TestValue>('focus', messenger, {
      initialValue: { dictionaryKey: 'home', keyPath: ['title'] },
    });

    const handler = vi.fn();
    manager.addEventListener('change', handler);

    manager.set((previousValue) => ({
      ...(previousValue as TestValue),
      keyPath: [],
    }));

    const event = handler.mock.calls[0][0] as CustomEvent<TestValue>;
    expect(event.detail).toEqual({ dictionaryKey: 'home', keyPath: [] });
  });

  it('passes undefined to the updater when no value is set yet', () => {
    const messenger = createMessengerMock();
    const manager = new CrossFrameStateManager<TestValue>('focus', messenger);

    const updater = vi.fn(() => ({ dictionaryKey: 'home', keyPath: [] }));
    manager.set(updater);

    expect(updater).toHaveBeenCalledWith(undefined);
  });
});
