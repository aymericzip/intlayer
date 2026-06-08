import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  extractPackagesFromScript,
  scanShowcaseProject,
} from './showcaseScan.service';

vi.mock('@logger', () => ({
  logger: { info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

vi.mock('@utils/puppeteer/launchBrowser', () => ({
  launchBrowser: vi.fn(),
}));

// Import after mocks so vi.fn() references are resolved
import { launchBrowser } from '@utils/puppeteer/launchBrowser';

// ─── helpers ─────────────────────────────────────────────────────────────────

const basePageDetails = {
  lang: 'en',
  dir: 'ltr',
  hreflangs: [],
  canonical: '',
  hasLocalizedLinks: false,
  allAnchorsLocalized: false,
  inlineScripts: [] as string[],
  externalScriptUrls: [] as string[],
  metaTitle: 'Test Site',
  metaDescription: 'A test description',
  hasWindowIntlayer: false,
};

const makeBrowserMock = (
  pageDetailsOverrides: Partial<typeof basePageDetails> = {},
  screenshotBuffer: Buffer = Buffer.from('fake-screenshot')
) => {
  const pageDetails = { ...basePageDetails, ...pageDetailsOverrides };
  const mockPage = {
    setViewport: vi.fn().mockResolvedValue(undefined),
    goto: vi.fn().mockResolvedValue(undefined),
    waitForSelector: vi.fn().mockResolvedValue(undefined),
    waitForNetworkIdle: vi.fn().mockResolvedValue(undefined),
    evaluate: vi.fn().mockResolvedValue(pageDetails),
    screenshot: vi.fn().mockResolvedValue(screenshotBuffer),
    close: vi.fn().mockResolvedValue(undefined),
  };
  const mockBrowser = {
    newPage: vi.fn().mockResolvedValue(mockPage),
    close: vi.fn().mockResolvedValue(undefined),
  };
  return { mockPage, mockBrowser };
};

// ─── extractPackagesFromScript ────────────────────────────────────────────────

describe('extractPackagesFromScript', () => {
  it('extracts intlayer version from a bundled script', () => {
    const script = `
      var x = {name:"intlayer",version:"3.1.0",doc:"https://intlayer.org/docs"};
    `;
    expect(extractPackagesFromScript(script)).toEqual({ intlayer: '3.1.0' });
  });

  it('extracts react-intlayer with single quotes', () => {
    const script = `window.__I18N__={name:'react-intlayer',version:'3.2.1'}`;
    expect(extractPackagesFromScript(script)).toEqual({
      'react-intlayer': '3.2.1',
    });
  });

  it('extracts @intlayer/core scoped package', () => {
    const script = `{name:"@intlayer/core",version:"3.0.0"}`;
    expect(extractPackagesFromScript(script)).toEqual({
      '@intlayer/core': '3.0.0',
    });
  });

  it('extracts multiple intlayer packages from one script', () => {
    const script = `
      {name:"intlayer",version:"3.5.0",doc:"https://intlayer.org/docs"}
      {name:"next-intlayer",version:"3.5.0"}
      {name:"@intlayer/config",version:"3.5.0"}
    `;
    expect(extractPackagesFromScript(script)).toEqual({
      intlayer: '3.5.0',
      'next-intlayer': '3.5.0',
      '@intlayer/config': '3.5.0',
    });
  });

  it('returns empty object for a script with no intlayer packages', () => {
    const script = `
      {name:"react",version:"18.0.0"}
      {name:"lodash",version:"4.17.21"}
    `;
    expect(extractPackagesFromScript(script)).toEqual({});
  });

  it('returns empty object for an empty string', () => {
    expect(extractPackagesFromScript('')).toEqual({});
  });

  it('handles whitespace around colons and commas', () => {
    const script = `{ name : "intlayer" , version : "3.0.0" }`;
    expect(extractPackagesFromScript(script)).toEqual({ intlayer: '3.0.0' });
  });

  it('strips leading non-digit characters from version', () => {
    // Some bundles include the raw semver range
    const script = `{name:"intlayer",version:"^3.1.0"}`;
    const result = extractPackagesFromScript(script);
    // The regex strips leading ^ so we get clean version
    expect(result.intlayer).toBe('3.1.0');
  });

  it('does not false-positive on a package called "not-intlayer-related"', () => {
    // Must contain the word "intlayer" to match
    const script = `{name:"some-unrelated-lib",version:"1.0.0"}`;
    expect(extractPackagesFromScript(script)).toEqual({});
  });

  it('extracts vue-intlayer', () => {
    const script = `{name:"vue-intlayer",version:"3.3.0"}`;
    expect(extractPackagesFromScript(script)).toEqual({
      'vue-intlayer': '3.3.0',
    });
  });
});

// ─── scanShowcaseProject ──────────────────────────────────────────────────────

describe('scanShowcaseProject', () => {
  beforeEach(() => {
    // Default: robots.txt and sitemap.xml not found
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    vi.clearAllMocks();
  });

  it('detects intlayer via window.intlayer and returns hasIntlayer=true', async () => {
    const { mockBrowser } = makeBrowserMock({ hasWindowIntlayer: true });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const result = await scanShowcaseProject('https://example.com');

    expect(result.hasIntlayer).toBe(true);
  });

  it('takes a screenshot when window.intlayer is present', async () => {
    const fakeBuffer = Buffer.from('screenshot-data');
    const { mockBrowser, mockPage } = makeBrowserMock(
      { hasWindowIntlayer: true },
      fakeBuffer
    );
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const result = await scanShowcaseProject('https://example.com');

    expect(mockPage.screenshot).toHaveBeenCalledOnce();
    expect(result.screenshotBuffer).toEqual(fakeBuffer);
  });

  it('does NOT take a screenshot when intlayer is not detected', async () => {
    const { mockBrowser, mockPage } = makeBrowserMock({
      hasWindowIntlayer: false,
      inlineScripts: [],
      externalScriptUrls: [],
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const result = await scanShowcaseProject('https://example.com');

    expect(result.hasIntlayer).toBe(false);
    expect(mockPage.screenshot).not.toHaveBeenCalled();
    expect(result.screenshotBuffer).toBeUndefined();
  });

  it('returns metaTitle and metaDescription from the page', async () => {
    const { mockBrowser } = makeBrowserMock({
      hasWindowIntlayer: true,
      metaTitle: 'My Intlayer App',
      metaDescription: 'An i18n-ready application',
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const result = await scanShowcaseProject('https://example.com');

    expect(result.metaTitle).toBe('My Intlayer App');
    expect(result.metaDescription).toBe('An i18n-ready application');
  });

  it('detects intlayer via bundle marker in inline script when window.intlayer is absent', async () => {
    const inlineScript = `var x={name:"intlayer",version:"3.5.0",doc:"https://intlayer.org/docs"}`;
    const { mockBrowser } = makeBrowserMock({
      hasWindowIntlayer: false,
      inlineScripts: [inlineScript],
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const result = await scanShowcaseProject('https://example.com');

    expect(result.hasIntlayer).toBe(true);
    expect(result.intlayerVersion).toBe('3.5.0');
  });

  it('detects intlayer via window.intlayer= pattern in inline script', async () => {
    const inlineScript = `window.intlayer={enabled:!0}`;
    const { mockBrowser } = makeBrowserMock({
      hasWindowIntlayer: false,
      inlineScripts: [inlineScript],
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const result = await scanShowcaseProject('https://example.com');

    expect(result.hasIntlayer).toBe(true);
  });

  it('detects intlayer via external script bundle', async () => {
    const externalScript = `var cfg={name:"intlayer",version:"3.1.0",doc:"https://intlayer.org/docs"}`;
    const { mockBrowser } = makeBrowserMock({
      hasWindowIntlayer: false,
      inlineScripts: [],
      externalScriptUrls: ['https://example.com/bundle.js'],
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    // robots/sitemap fail; external script fetch succeeds
    (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      (url: string) => {
        if ((url as string).endsWith('bundle.js')) {
          return Promise.resolve({
            ok: true,
            headers: { get: () => null },
            text: () => Promise.resolve(externalScript),
          });
        }
        return Promise.resolve({ ok: false });
      }
    );

    const result = await scanShowcaseProject('https://example.com');

    expect(result.hasIntlayer).toBe(true);
    expect(result.intlayerVersion).toBe('3.1.0');
  });

  it('skips bundle scanning when window.intlayer is already set (no external fetches for scripts)', async () => {
    const { mockBrowser } = makeBrowserMock({
      hasWindowIntlayer: true,
      externalScriptUrls: ['https://example.com/bundle.js'],
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const scriptFetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => null },
      text: () => Promise.resolve(''),
    });
    (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      (url: string) => {
        if ((url as string).endsWith('bundle.js')) return scriptFetch(url);
        return Promise.resolve({ ok: false });
      }
    );

    await scanShowcaseProject('https://example.com');

    // bundle.js should NOT have been fetched since window.intlayer short-circuits
    expect(scriptFetch).not.toHaveBeenCalled();
  });

  it('closes the browser even when an error is thrown', async () => {
    const { mockBrowser, mockPage } = makeBrowserMock();
    mockPage.goto = vi.fn().mockRejectedValue(new Error('Navigation failed'));
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    await expect(scanShowcaseProject('https://example.com')).rejects.toThrow(
      'Navigation failed'
    );

    expect(mockBrowser.close).toHaveBeenCalledOnce();
  });

  // ── Framework-specific scenarios ───────────────────────────────────────────

  /**
   * intlayer-vite-solid.vercel.app
   * solid-intlayer calls setIntlayerIdentifier() inside onMount() — runs
   * after the Solid component tree mounts, which happens after the JS
   * bundle executes. Puppeteer evaluates AFTER waitForNetworkIdle, so by
   * then onMount has already fired and window.intlayer is set.
   */
  it('detects intlayer on a Vite + Solid app (window.intlayer set via onMount)', async () => {
    const { mockBrowser } = makeBrowserMock({
      hasWindowIntlayer: true,
      lang: 'en',
      hreflangs: ['en', 'fr', 'x-default'],
      hasLocalizedLinks: true,
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const result = await scanShowcaseProject(
      'https://intlayer-vite-solid.vercel.app/'
    );

    expect(result.hasIntlayer).toBe(true);
    expect(result.screenshotBuffer).toBeDefined();
    expect(result.scanDetails.langTag).toBe('en');
  });

  /**
   * intlayer-vite-svelte-template.vercel.app
   * svelte-intlayer calls setIntlayerIdentifier() synchronously at the top
   * of setupIntlayer() — runs as soon as the module executes, before any
   * Svelte runes are evaluated. window.intlayer is set during JS init.
   */
  it('detects intlayer on a Vite + Svelte app (window.intlayer set synchronously in setupIntlayer)', async () => {
    const { mockBrowser } = makeBrowserMock({
      hasWindowIntlayer: true,
      lang: 'en',
      hreflangs: ['en', 'fr', 'x-default'],
      hasLocalizedLinks: true,
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const result = await scanShowcaseProject(
      'https://intlayer-vite-svelte-template.vercel.app/'
    );

    expect(result.hasIntlayer).toBe(true);
    expect(result.screenshotBuffer).toBeDefined();
  });

  /**
   * intlayer-next-16-template.vercel.app
   * react-intlayer calls setIntlayerIdentifier() inside useEffect(()=>{}, [])
   * which fires after React hydration on the client. For SSR pages (Next.js),
   * the HTML arrives pre-rendered; Puppeteer waits for network idle which
   * covers React bundle download + hydration + effect execution.
   */
  it('detects intlayer on a Next.js 16 app (window.intlayer set via useEffect after hydration)', async () => {
    const { mockBrowser } = makeBrowserMock({
      hasWindowIntlayer: true,
      lang: 'en',
      hreflangs: ['en', 'fr', 'es', 'x-default'],
      hasLocalizedLinks: true,
      allAnchorsLocalized: true,
      canonical: 'https://intlayer-next-16-template.vercel.app/en',
      metaTitle: 'Intlayer Next.js 16 Template',
      metaDescription: 'A Next.js 16 app using Intlayer for i18n',
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      (url: string) => {
        if ((url as string).includes('robots.txt'))
          return Promise.resolve({ ok: true });
        if ((url as string).includes('sitemap.xml'))
          return Promise.resolve({
            ok: true,
            text: () =>
              Promise.resolve(
                '<urlset><url><loc>/en</loc></url><url><loc>/fr</loc></url></urlset>'
              ),
          });
        return Promise.resolve({ ok: false });
      }
    );

    const result = await scanShowcaseProject(
      'https://intlayer-next-16-template.vercel.app/'
    );

    expect(result.hasIntlayer).toBe(true);
    expect(result.screenshotBuffer).toBeDefined();
    expect(result.scanDetails.hasCanonical).toBe(true);
    expect(result.scanDetails.robotsTxt.accessible).toBe(true);
    expect(result.scanDetails.sitemapXml.urlsDiscoveredCount).toBe(2);
  });

  /**
   * Fallback: a Vite + Solid app where window.intlayer is NOT yet set
   * at evaluate time but the bundle contains the solid-intlayer package marker.
   */
  it('falls back to bundle detection when window.intlayer is missing on a Solid app', async () => {
    const solidBundleScript = `{name:"solid-intlayer",version:"3.5.0"},{name:"intlayer",version:"3.5.0",doc:"https://intlayer.org/docs"}`;
    const { mockBrowser } = makeBrowserMock({
      hasWindowIntlayer: false,
      inlineScripts: [solidBundleScript],
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const result = await scanShowcaseProject(
      'https://intlayer-vite-solid.vercel.app/'
    );

    expect(result.hasIntlayer).toBe(true);
    expect(result.intlayerVersion).toBe('3.5.0');
    expect(result.libsUsed).toContain('solid-intlayer');
  });

  /**
   * Fallback: a Vite + Svelte app where the bundle contains svelte-intlayer.
   */
  it('falls back to bundle detection when window.intlayer is missing on a Svelte app', async () => {
    const svelteBundleScript = `{name:"svelte-intlayer",version:"3.4.1"},{name:"intlayer",version:"3.4.1",doc:"https://intlayer.org/docs"}`;
    const { mockBrowser } = makeBrowserMock({
      hasWindowIntlayer: false,
      inlineScripts: [svelteBundleScript],
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const result = await scanShowcaseProject(
      'https://intlayer-vite-svelte-template.vercel.app/'
    );

    expect(result.hasIntlayer).toBe(true);
    expect(result.libsUsed).toContain('svelte-intlayer');
  });

  /**
   * Fallback: a Next.js app where the bundle contains next-intlayer.
   */
  it('falls back to bundle detection when window.intlayer is missing on a Next.js app', async () => {
    const nextBundleScript = `{name:"next-intlayer",version:"3.6.0"},{name:"intlayer",version:"3.6.0",doc:"https://intlayer.org/docs"}`;
    const { mockBrowser } = makeBrowserMock({
      hasWindowIntlayer: false,
      inlineScripts: [nextBundleScript],
    });
    (launchBrowser as ReturnType<typeof vi.fn>).mockResolvedValue(mockBrowser);

    const result = await scanShowcaseProject(
      'https://intlayer-next-16-template.vercel.app/'
    );

    expect(result.hasIntlayer).toBe(true);
    expect(result.libsUsed).toContain('next-intlayer');
  });
});
