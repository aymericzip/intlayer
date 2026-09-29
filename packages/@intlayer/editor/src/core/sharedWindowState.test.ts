import { describe, expect, it, vi } from 'vitest';
import { createSharedWindowState } from './sharedWindowState';

describe('createSharedWindowState', () => {
  it('returns undefined until a value is published', () => {
    const sharedState = createSharedWindowState<string>('test_unset');

    expect(sharedState.get()).toBeUndefined();
  });

  it('notifies subscribers with the value and its source', () => {
    const sharedState = createSharedWindowState<string>('test_notify');
    const listener = vi.fn();
    sharedState.subscribe(listener);

    sharedState.set('home', 'manager-a');

    expect(sharedState.get()).toBe('home');
    expect(listener).toHaveBeenCalledWith('home', 'manager-a');
  });

  it('is shared between instances created with the same name', () => {
    const publisher = createSharedWindowState<string>('test_shared');
    const reader = createSharedWindowState<string>('test_shared');

    publisher.set('home');

    expect(reader.get()).toBe('home');
  });

  it('stops notifying after unsubscribe', () => {
    const sharedState = createSharedWindowState<string>('test_unsubscribe');
    const listener = vi.fn();
    const unsubscribe = sharedState.subscribe(listener);

    unsubscribe();
    sharedState.set('home');

    expect(listener).not.toHaveBeenCalled();
  });
});
