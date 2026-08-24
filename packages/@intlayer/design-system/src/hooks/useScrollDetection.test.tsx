import { render, waitFor } from '@testing-library/react';
import type { FC } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useScrollDetection } from './useScrollDetection';

/** Callbacks handed to the `ResizeObserver`s the hook creates. */
let resizeCallbacks: ResizeObserverCallback[] = [];

class ResizeObserverMock {
  constructor(callback: ResizeObserverCallback) {
    resizeCallbacks.push(callback);
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

/** Reports every read of `scrollHeight`, whoever performs it. */
let scrollHeightReadCount = 0;

const ScrollDetectionProbe: FC = () => {
  const { isScrollable } = useScrollDetection();

  return <span data-testid="probe">{String(isScrollable)}</span>;
};

/** Runs the resize callbacks the way the browser does once layout settled. */
const emitResize = () => {
  for (const callback of resizeCallbacks) {
    callback([], {} as ResizeObserver);
  }
};

describe('useScrollDetection', () => {
  beforeEach(() => {
    resizeCallbacks = [];
    scrollHeightReadCount = 0;

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
    vi.spyOn(
      window.HTMLElement.prototype,
      'scrollHeight',
      'get'
    ).mockImplementation(() => {
      scrollHeightReadCount += 1;
      return window.innerHeight * 3;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  test('measures nothing while mounting', () => {
    render(<ScrollDetectionProbe />);

    // A read here would flush the layout of the whole document inside the
    // commit that just rewrote it.
    expect(scrollHeightReadCount).toBe(0);
  });

  test('reports the page as scrollable from the observer callback', async () => {
    const { getByTestId } = render(<ScrollDetectionProbe />);

    expect(getByTestId('probe').textContent).toBe('false');

    emitResize();

    expect(scrollHeightReadCount).toBeGreaterThan(0);
    await waitFor(() => expect(getByTestId('probe').textContent).toBe('true'));
  });

  test('measures again on every resize, and stays on the same state', async () => {
    const { getByTestId } = render(<ScrollDetectionProbe />);

    emitResize();
    await waitFor(() => expect(getByTestId('probe').textContent).toBe('true'));

    const readCountAfterFirstResize = scrollHeightReadCount;

    emitResize();

    expect(scrollHeightReadCount).toBeGreaterThan(readCountAfterFirstResize);
    expect(getByTestId('probe').textContent).toBe('true');
  });
});
