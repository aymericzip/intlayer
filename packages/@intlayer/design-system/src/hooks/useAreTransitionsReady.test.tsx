import { act, render } from '@testing-library/react';
import type { FC } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { useAreTransitionsReady as UseAreTransitionsReady } from './useAreTransitionsReady';

let useAreTransitionsReady: typeof UseAreTransitionsReady;
let pendingFrames: FrameRequestCallback[] = [];

/** Runs the animation frames queued so far, not the ones they queue. */
const runNextFrame = () => {
  const frames = pendingFrames;
  pendingFrames = [];
  for (const frame of frames) frame(performance.now());
};

beforeEach(async () => {
  vi.resetModules();
  ({ useAreTransitionsReady } = await import('./useAreTransitionsReady'));
  pendingFrames = [];
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    pendingFrames.push(callback);
    return pendingFrames.length;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

const Probe: FC = () => (
  <span data-testid="ready">{String(useAreTransitionsReady())}</span>
);

describe('useAreTransitionsReady', () => {
  it('is false on the server', () => {
    expect(renderToString(<Probe />)).toContain('false');
  });

  it('turns true two frames after hydration', async () => {
    const container = document.createElement('div');
    container.innerHTML = renderToString(<Probe />);

    await act(async () => {
      hydrateRoot(container, <Probe />);
    });
    expect(container.textContent).toBe('false');

    act(runNextFrame);
    expect(container.textContent).toBe('false');

    act(runNextFrame);
    expect(container.textContent).toBe('true');
  });

  it('is true right away for components mounted once ready', () => {
    const first = render(<Probe />);
    act(runNextFrame);
    act(runNextFrame);
    first.unmount();

    const { getByTestId } = render(<Probe />);

    expect(getByTestId('ready').textContent).toBe('true');
  });
});
