import { act, createElement, type FC } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useFrameReconnection } from './useFrameReconnection';

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const INTERVAL_MS = 1_000;

let root: Root;
let isReachable: boolean;
const reloadFrame = vi.fn();

const Probe: FC<{ isDisconnected: boolean }> = ({ isDisconnected }) => {
  useFrameReconnection({
    applicationURL: 'http://localhost:3000',
    isDisconnected,
    reloadFrame,
    intervalMs: INTERVAL_MS,
  });

  return null;
};

const render = (isDisconnected: boolean) =>
  act(() => root.render(createElement(Probe, { isDisconnected })));

/** Runs one probe interval and lets its fetch settle. */
const nextProbe = () =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(INTERVAL_MS);
  });

beforeEach(() => {
  vi.useFakeTimers();
  isReachable = true;
  reloadFrame.mockClear();
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      isReachable ? Promise.resolve(new Response()) : Promise.reject()
    )
  );
  root = createRoot(document.createElement('div'));
});

afterEach(() => {
  act(() => root.unmount());
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('useFrameReconnection', () => {
  it('does nothing while connected', async () => {
    render(false);
    await nextProbe();

    expect(fetch).not.toHaveBeenCalled();
    expect(reloadFrame).not.toHaveBeenCalled();
  });

  it('reloads a reachable application once', async () => {
    render(true);
    await nextProbe();
    await nextProbe();

    expect(reloadFrame).toHaveBeenCalledTimes(1);
  });

  it('reloads again once the application answers after being down', async () => {
    isReachable = false;
    render(true);
    await nextProbe();

    expect(reloadFrame).not.toHaveBeenCalled();

    isReachable = true;
    await nextProbe();

    expect(reloadFrame).toHaveBeenCalledTimes(1);
  });
});
