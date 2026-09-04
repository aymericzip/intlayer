import { act, render } from '@testing-library/react';
import type { FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  DeviceState,
  SizeType,
  useDevice as UseDevice,
} from './useDevice';

/** A `MediaQueryList` stand-in whose `matches` the test drives by hand. */
type FakeMediaQueryList = MediaQueryList & {
  setMatches: (matches: boolean) => void;
  listenerCount: () => number;
};

const mediaQueries = new Map<string, FakeMediaQueryList>();

const createFakeMediaQueryList = (query: string): FakeMediaQueryList => {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  let matches = false;

  return {
    media: query,
    get matches() {
      return matches;
    },
    addEventListener: (_type: string, listener: EventListener) =>
      listeners.add(listener as (event: MediaQueryListEvent) => void),
    removeEventListener: (_type: string, listener: EventListener) =>
      listeners.delete(listener as (event: MediaQueryListEvent) => void),
    setMatches: (nextMatches: boolean) => {
      matches = nextMatches;

      for (const listener of listeners) {
        listener({ matches: nextMatches } as MediaQueryListEvent);
      }
    },
    listenerCount: () => listeners.size,
  } as unknown as FakeMediaQueryList;
};

const getMediaQuery = (breakpoint: number): FakeMediaQueryList => {
  const query = `(max-width: ${breakpoint}px)`;
  const existing = mediaQueries.get(query);

  if (existing) return existing;

  const mediaQuery = createFakeMediaQueryList(query);

  mediaQueries.set(query, mediaQuery);

  return mediaQuery;
};

/**
 * The hook caches one store per breakpoint at module scope, so every test
 * re-imports the module to start from an empty cache.
 */
const importUseDevice = async (): Promise<typeof UseDevice> => {
  vi.resetModules();

  return (await import('./useDevice')).useDevice;
};

beforeEach(() => {
  mediaQueries.clear();

  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => {
      const breakpoint = Number(query.match(/(\d+)px/)?.[1] ?? 0);

      return getMediaQuery(breakpoint);
    })
  );
  vi.stubGlobal('navigator', {
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

/** Renders the hook and records the value it returned on each render. */
const renderUseDevice = (
  useDevice: typeof UseDevice,
  breakpoint?: SizeType | number
) => {
  const renders: DeviceState[] = [];

  const Probe: FC = () => {
    renders.push(useDevice(breakpoint));

    return null;
  };

  const utils = render(<Probe />);

  const getLastRender = (): DeviceState => renders[renders.length - 1]!;

  return { renders, getLastRender, ...utils };
};

describe('useDevice', () => {
  it('resolves the desktop viewport on the first render', async () => {
    const useDevice = await importUseDevice();

    const { renders } = renderUseDevice(useDevice);

    expect(renders).toHaveLength(1);
    expect(renders[0]).toMatchObject({
      isMobileScreen: false,
      isMobile: false,
      isMac: true,
      isMobileUserAgent: false,
    });
  });

  it('resolves the mobile viewport on the first render', async () => {
    const useDevice = await importUseDevice();

    getMediaQuery(768).setMatches(true);

    const { renders } = renderUseDevice(useDevice);

    expect(renders[0]).toMatchObject({ isMobileScreen: true, isMobile: true });
  });

  it('maps a breakpoint name onto its pixel width', async () => {
    const useDevice = await importUseDevice();

    renderUseDevice(useDevice, 'lg');

    expect(mediaQueries.has('(max-width: 1024px)')).toBe(true);
  });

  it('shares a single media query across every consumer of a breakpoint', async () => {
    const useDevice = await importUseDevice();

    const Consumer: FC = () => {
      useDevice('md');

      return null;
    };

    render(
      <>
        <Consumer />
        <Consumer />
        <Consumer />
      </>
    );

    expect(window.matchMedia).toHaveBeenCalledTimes(1);
    expect(getMediaQuery(768).listenerCount()).toBe(1);
  });

  it('re-renders consumers when the viewport crosses the breakpoint', async () => {
    const useDevice = await importUseDevice();

    const { getLastRender } = renderUseDevice(useDevice);

    expect(getLastRender().isMobile).toBe(false);

    act(() => getMediaQuery(768).setMatches(true));

    expect(getLastRender().isMobile).toBe(true);
  });

  it('detaches the media query listener once the last consumer unmounts', async () => {
    const useDevice = await importUseDevice();

    const { unmount } = renderUseDevice(useDevice);

    expect(getMediaQuery(768).listenerCount()).toBe(1);

    unmount();

    expect(getMediaQuery(768).listenerCount()).toBe(0);
  });

  it('picks up a viewport change that happened while nothing was subscribed', async () => {
    const useDevice = await importUseDevice();

    renderUseDevice(useDevice).unmount();

    getMediaQuery(768).setMatches(true);

    const { getLastRender } = renderUseDevice(useDevice);

    expect(getLastRender().isMobile).toBe(true);
  });
});
