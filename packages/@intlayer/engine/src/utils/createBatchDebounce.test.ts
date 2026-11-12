import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createBatchDebounce } from './createBatchDebounce';

describe('createBatchDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('flushes a burst of items as one deduplicated batch', () => {
    const handler = vi.fn();
    const schedule = createBatchDebounce<string>(handler, 100);

    schedule('a.content.ts');
    vi.advanceTimersByTime(50);
    schedule('b.content.ts');
    vi.advanceTimersByTime(50);
    schedule('a.content.ts');

    expect(handler).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(['a.content.ts', 'b.content.ts']);
  });

  it('starts a new batch after a flush', () => {
    const handler = vi.fn();
    const schedule = createBatchDebounce<string>(handler, 100);

    schedule('a.content.ts');
    vi.advanceTimersByTime(100);
    schedule('b.content.ts');
    vi.advanceTimersByTime(100);

    expect(handler).toHaveBeenNthCalledWith(1, ['a.content.ts']);
    expect(handler).toHaveBeenNthCalledWith(2, ['b.content.ts']);
  });
});
