import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  buildGoogleAnalyticsBootstrap,
  getGoogleAnalyticsHeadScripts,
} from './googleAnalytics';

const MEASUREMENT_ID = 'G-TEST123';

type GtagWindow = Window & {
  dataLayer?: unknown[];
  __intlayerGoogleAnalyticsBootstrapped?: boolean;
};

const getGtagScripts = () =>
  Array.from(document.head.querySelectorAll('script')).filter((script) =>
    script.src.includes('googletagmanager.com/gtag/js')
  );

const runBootstrap = () => {
  // Runs the inline bootstrap in global scope, as the browser would.
  new Function(buildGoogleAnalyticsBootstrap(MEASUREMENT_ID))();
};

describe('getGoogleAnalyticsHeadScripts', () => {
  it('returns no script without a measurement id', () => {
    expect(getGoogleAnalyticsHeadScripts(undefined)).toEqual([]);
    expect(getGoogleAnalyticsHeadScripts('')).toEqual([]);
  });

  it('returns one inline script carrying the nonce', () => {
    const scripts = getGoogleAnalyticsHeadScripts(MEASUREMENT_ID, 'abc');

    expect(scripts).toHaveLength(1);
    expect(scripts[0]?.nonce).toBe('abc');
    expect(scripts[0]?.children).toContain(JSON.stringify(MEASUREMENT_ID));
  });
});

describe('buildGoogleAnalyticsBootstrap', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
    (window as GtagWindow).dataLayer = undefined;
    (window as GtagWindow).__intlayerGoogleAnalyticsBootstrapped = undefined;
    for (const script of getGtagScripts()) script.remove();
  });

  afterEach(() => {
    // Lets every bootstrap reach its fallback, detaching its listeners.
    vi.runAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('queues config and the landing page_view without loading gtag.js', () => {
    runBootstrap();

    const dataLayer = (window as GtagWindow).dataLayer ?? [];
    const commands = dataLayer.map((entry) =>
      Array.from(entry as ArrayLike<unknown>)
    );

    expect(commands[1]).toEqual([
      'config',
      MEASUREMENT_ID,
      { send_page_view: false },
    ]);
    expect(commands[2]).toEqual([
      'event',
      'page_view',
      { page_location: window.location.href, page_referrer: document.referrer },
    ]);
    expect(getGtagScripts()).toHaveLength(0);
  });

  it('runs once even when the inline script is executed twice', () => {
    // TanStack Router re-appends inline head scripts it cannot match by nonce.
    runBootstrap();
    runBootstrap();

    const pageViews = ((window as GtagWindow).dataLayer ?? []).filter(
      (entry) => Array.from(entry as ArrayLike<unknown>)[1] === 'page_view'
    );
    vi.runAllTimers();

    expect(pageViews).toHaveLength(1);
    expect(getGtagScripts()).toHaveLength(1);
  });

  it('loads gtag.js once, on the first interaction', () => {
    runBootstrap();

    window.dispatchEvent(new Event('pointerdown'));
    window.dispatchEvent(new Event('keydown'));
    vi.runAllTimers();

    expect(getGtagScripts()).toHaveLength(1);
  });

  it('loads gtag.js after the fallback timeout', () => {
    runBootstrap();

    vi.advanceTimersByTime(999);
    expect(getGtagScripts()).toHaveLength(0);

    vi.advanceTimersByTime(1);
    expect(getGtagScripts()).toHaveLength(1);
  });

  it('loads gtag.js once the page has loaded and is idle', () => {
    runBootstrap();
    expect(getGtagScripts()).toHaveLength(0);

    window.dispatchEvent(new Event('load'));
    vi.advanceTimersByTime(1);

    expect(getGtagScripts()).toHaveLength(1);
  });
});
