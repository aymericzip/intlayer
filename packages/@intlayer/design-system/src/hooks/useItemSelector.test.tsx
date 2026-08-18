import { render } from '@testing-library/react';
import { type FC, useRef } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useItemSelector } from './useItemSelector';

/** Counts how many observers and frames a render pass creates. */
const counters = {
  mutationObservers: 0,
  resizeObservers: 0,
  observedTargets: 0,
};

class ObserverMock {
  observe() {
    counters.observedTargets += 1;
  }
  disconnect() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
}

class MutationObserverMock extends ObserverMock {
  constructor() {
    super();
    counters.mutationObservers += 1;
  }
}

class ResizeObserverMock extends ObserverMock {
  constructor() {
    super();
    counters.resizeObservers += 1;
  }
}

/** Stable identities for the options the harness renders. */
const OPTION_IDS = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'];

/**
 * Mirrors how `SwitchSelector` calls the hook: a fresh options object holding a
 * fresh `selector` closure on every render.
 */
const InlineSelectorList: FC<{ optionCount: number; renderTick: number }> = ({
  optionCount,
}) => {
  const optionsRefs = useRef<HTMLElement[]>([]);

  useItemSelector(optionsRefs, {
    selector: (option) => option.getAttribute('data-indicator') === 'true',
    isHoverable: false,
    orientation: 'horizontal',
  });

  const optionIds = OPTION_IDS.slice(0, optionCount);

  return (
    <div>
      {optionIds.map((optionId, index) => (
        <button
          data-indicator={index === 0}
          key={optionId}
          ref={(element) => {
            if (element) optionsRefs.current[index] = element;
          }}
          type="button"
        >
          {optionId}
        </button>
      ))}
    </div>
  );
};

describe('useItemSelector', () => {
  beforeEach(() => {
    counters.mutationObservers = 0;
    counters.resizeObservers = 0;
    counters.observedTargets = 0;

    vi.stubGlobal('MutationObserver', MutationObserverMock);
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('opens one observer of each kind for the whole option group', () => {
    render(<InlineSelectorList optionCount={5} renderTick={0} />);

    expect(counters.mutationObservers).toBe(1);
    expect(counters.resizeObservers).toBe(1);
    // Both observers watch each of the five options.
    expect(counters.observedTargets).toBe(10);
  });

  test('keeps its observers across renders that only change the selector identity', () => {
    const { rerender } = render(
      <InlineSelectorList optionCount={5} renderTick={0} />
    );

    // The options are only in the ref array from the second render on, so the
    // subscription settles there; what matters is that it stops moving after.
    rerender(<InlineSelectorList optionCount={5} renderTick={1} />);
    counters.mutationObservers = 0;
    counters.resizeObservers = 0;

    rerender(<InlineSelectorList optionCount={5} renderTick={2} />);
    rerender(<InlineSelectorList optionCount={5} renderTick={3} />);

    expect(counters.mutationObservers).toBe(0);
    expect(counters.resizeObservers).toBe(0);
  });

  test('re-subscribes when the option count changes', () => {
    const { rerender } = render(
      <InlineSelectorList optionCount={5} renderTick={0} />
    );

    rerender(<InlineSelectorList optionCount={5} renderTick={1} />);
    counters.mutationObservers = 0;
    counters.resizeObservers = 0;

    // A ref callback only runs once its element is rendered, so the added
    // option reaches the ref array — and the observers — on the render after
    // the one that introduced it.
    rerender(<InlineSelectorList optionCount={6} renderTick={2} />);
    rerender(<InlineSelectorList optionCount={6} renderTick={3} />);

    expect(counters.mutationObservers).toBe(1);
    expect(counters.resizeObservers).toBe(1);
  });
});
