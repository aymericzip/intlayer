import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { observeScrollExtent } from './observeScrollExtent';

/** Targets handed to the ResizeObserver, in the order they were observed. */
let observedTargets: Element[] = [];
let isResizeObserverDisconnected = false;

class ResizeObserverMock {
  observe(target: Element) {
    observedTargets.push(target);
  }
  unobserve() {}
  disconnect() {
    isResizeObserverDisconnected = true;
  }
}

/** Waits for the MutationObserver callbacks, which run on a microtask. */
const flushMutations = () =>
  new Promise<void>((resolve) => queueMicrotask(resolve));

const buildContainer = (childCount: number) => {
  const container = document.createElement('div');

  for (let index = 0; index < childCount; index++) {
    container.appendChild(document.createElement('section'));
  }

  document.body.appendChild(container);

  return container;
};

beforeEach(() => {
  observedTargets = [];
  isResizeObserverDisconnected = false;
  vi.stubGlobal('ResizeObserver', ResizeObserverMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

describe('observeScrollExtent', () => {
  test('observes the container and each of its children', () => {
    const container = buildContainer(2);

    observeScrollExtent(container, vi.fn());

    expect(observedTargets).toEqual([
      container,
      container.children[0],
      container.children[1],
    ]);
  });

  test('observes a child added after the fact, and reports the change', async () => {
    const container = buildContainer(1);
    const onResize = vi.fn();

    observeScrollExtent(container, onResize);
    observedTargets = [];

    const addedChild = document.createElement('section');
    container.appendChild(addedChild);

    await flushMutations();

    expect(observedTargets).toContain(addedChild);
    expect(onResize).toHaveBeenCalledTimes(1);
  });

  test('stops observing once disconnected', async () => {
    const container = buildContainer(1);
    const onResize = vi.fn();

    const stopObserving = observeScrollExtent(container, onResize);
    stopObserving();

    expect(isResizeObserverDisconnected).toBe(true);

    container.appendChild(document.createElement('section'));
    await flushMutations();

    expect(onResize).not.toHaveBeenCalled();
  });
});
