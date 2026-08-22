import { render } from '@testing-library/react';
import type { FC } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useStickToBottom } from './useStickToBottom';

/** Fires the observed callbacks by hand, the way a layout pass would. */
const resizeCallbacks = new Set<() => void>();

class ResizeObserverMock {
  private readonly callback: () => void;

  constructor(callback: () => void) {
    this.callback = callback;
  }

  observe() {
    resizeCallbacks.add(this.callback);
  }

  unobserve() {
    resizeCallbacks.delete(this.callback);
  }

  disconnect() {
    resizeCallbacks.delete(this.callback);
  }
}

const triggerContentResize = () => {
  for (const callback of resizeCallbacks) callback();
};

/** jsdom lays nothing out, so the scroll geometry is described by hand. */
type Geometry = {
  scrollHeight: number;
  clientHeight: number;
};

const applyGeometry = (
  element: HTMLElement,
  { scrollHeight, clientHeight }: Geometry
) => {
  Object.defineProperty(element, 'scrollHeight', {
    configurable: true,
    get: () => scrollHeight,
  });
  Object.defineProperty(element, 'clientHeight', {
    configurable: true,
    get: () => clientHeight,
  });
};

const List: FC = () => {
  const { scrollRef, contentRef, unpin } = useStickToBottom<
    HTMLDivElement,
    HTMLDivElement
  >();

  return (
    <div ref={scrollRef} data-testid="scroll">
      <div ref={contentRef} data-testid="content" />
      <button type="button" data-testid="unpin" onClick={unpin} />
    </div>
  );
};

describe('useStickToBottom', () => {
  beforeEach(() => {
    resizeCallbacks.clear();
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('follows the content down while the list sits at the bottom', () => {
    const { getByTestId } = render(<List />);
    const scrollElement = getByTestId('scroll');

    applyGeometry(scrollElement, { scrollHeight: 1000, clientHeight: 400 });
    scrollElement.scrollTop = 600;

    // A message streams in, growing the content past the current bottom.
    applyGeometry(scrollElement, { scrollHeight: 1400, clientHeight: 400 });
    triggerContentResize();

    expect(scrollElement.scrollTop).toBe(1000);
  });

  test('leaves the scroll position alone once the user has scrolled up', () => {
    const { getByTestId } = render(<List />);
    const scrollElement = getByTestId('scroll');

    applyGeometry(scrollElement, { scrollHeight: 1000, clientHeight: 400 });
    scrollElement.scrollTop = 100;
    scrollElement.dispatchEvent(new Event('scroll'));

    triggerContentResize();

    expect(scrollElement.scrollTop).toBe(100);
  });

  test('picks the follow back up when the user returns to the bottom', () => {
    const { getByTestId } = render(<List />);
    const scrollElement = getByTestId('scroll');

    applyGeometry(scrollElement, { scrollHeight: 1000, clientHeight: 400 });

    scrollElement.scrollTop = 100;
    scrollElement.dispatchEvent(new Event('scroll'));

    scrollElement.scrollTop = 600;
    scrollElement.dispatchEvent(new Event('scroll'));

    applyGeometry(scrollElement, { scrollHeight: 1400, clientHeight: 400 });
    triggerContentResize();

    expect(scrollElement.scrollTop).toBe(1000);
  });

  test('holds its position when the content grows upwards after unpin', () => {
    const { getByTestId } = render(<List />);
    const scrollElement = getByTestId('scroll');

    applyGeometry(scrollElement, { scrollHeight: 1000, clientHeight: 400 });
    scrollElement.scrollTop = 600;

    // Revealing earlier messages prepends content to a list still sitting at
    // the bottom, so the follow has to be released first.
    getByTestId('unpin').click();

    applyGeometry(scrollElement, { scrollHeight: 2400, clientHeight: 400 });
    triggerContentResize();

    expect(scrollElement.scrollTop).toBe(600);
  });

  test('stops observing once unmounted', () => {
    const { unmount } = render(<List />);

    expect(resizeCallbacks.size).toBe(1);

    unmount();

    expect(resizeCallbacks.size).toBe(0);
  });
});
