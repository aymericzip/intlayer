import { describe, expect, it, vi } from 'vitest';
import type { PageDetectionResult } from '../detector/types';
import type { SitemapPages } from '../navigation/useSitemapPages';
import { initialAuditScanState } from '../scan/auditScanState';
import type { AuditScan } from './useAuditScan';
import { useExtensionWebMCPTools } from './useExtensionWebMCPTools';

const createScan = (overrides: Partial<AuditScan> = {}): AuditScan => ({
  ...initialAuditScanState,
  startScan: vi.fn(async () => initialAuditScanState),
  cancelScan: vi.fn(),
  resetScan: vi.fn(),
  ...overrides,
});

const createSitemap = (urls: string[]): SitemapPages => ({
  status: 'loaded',
  pageCount: urls.length,
  loadSitemap: vi.fn(async () => urls),
  searchPages: vi.fn(() => []),
});

const getTools = (
  options: Partial<Parameters<typeof useExtensionWebMCPTools>[0]> = {}
) =>
  useExtensionWebMCPTools({
    tabUrl: 'https://example.com/fr',
    detection: null,
    detectionError: null,
    sitemap: createSitemap([]),
    scan: createScan(),
    navigateTab: vi.fn(),
    ...options,
  });

const getTool = (
  tools: ReturnType<typeof useExtensionWebMCPTools>,
  name: string
) => {
  const tool = tools.find((candidate) => candidate.name === name);
  if (!tool) throw new Error(`Missing tool ${name}`);
  return tool;
};

describe('useExtensionWebMCPTools', () => {
  it('uses CRUD-style camelCase names with annotations', () => {
    for (const tool of getTools()) {
      expect(tool.name).toMatch(/^(get|list|search|create|update|open)[A-Z]/);
      expect(tool.annotations).toBeDefined();
    }
  });

  it('reports why the tab cannot be inspected', async () => {
    const tools = getTools({ detectionError: { code: 'notInspectable' } });

    const result = await getTool(tools, 'getInspectedPage').execute(
      {} as never
    );

    expect(result).toContain('notInspectable');
  });

  it('adds migration guides to the detection', async () => {
    const detection = {
      url: 'https://example.com/fr',
      hreflangs: [],
      technologies: [],
    } as unknown as PageDetectionResult;
    const result = await getTool(
      getTools({ detection }),
      'getInspectedPage'
    ).execute({} as never);

    expect(result).toMatchObject({
      url: 'https://example.com/fr',
      localizedPages: [],
      migrationGuides: [],
    });
  });

  it('searches the sitemap once loaded', async () => {
    const sitemap = createSitemap([
      'https://example.com/fr/pricing',
      'https://example.com/fr/about',
    ]);
    const result = await getTool(
      getTools({ sitemap }),
      'searchSitePages'
    ).execute({ query: 'pricing' } as never);

    expect(sitemap.loadSitemap).toHaveBeenCalled();
    expect(result).toMatchObject({
      total: 2,
      pages: [{ url: 'https://example.com/fr/pricing', path: '/fr/pricing' }],
    });
  });

  it('resolves paths against the tab and rejects non-web URLs', async () => {
    const navigateTab = vi.fn();
    const openPage = getTool(getTools({ navigateTab }), 'openPage');

    await openPage.execute({ url: '/en' } as never);
    await openPage.execute({ url: 'javascript:alert(1)' } as never);

    expect(navigateTab).toHaveBeenCalledTimes(1);
    expect(navigateTab).toHaveBeenCalledWith('https://example.com/en');
  });

  it('audits the tab URL by default', async () => {
    const scan = createScan({
      startScan: vi.fn(async () => ({
        ...initialAuditScanState,
        score: 90,
        mergedData: { robots_present: { status: 'success' as const } },
      })),
    });
    const result = await getTool(
      getTools({ scan }),
      'createWebsiteI18nScan'
    ).execute({} as never);

    expect(scan.startScan).toHaveBeenCalledWith('https://example.com/fr', {
      refresh: undefined,
    });
    expect(result).toMatchObject({ url: 'https://example.com/fr', score: 90 });
  });

  it('refuses to start a second audit', async () => {
    const scan = createScan({ isScanning: true });
    const result = await getTool(
      getTools({ scan }),
      'createWebsiteI18nScan'
    ).execute({} as never);

    expect(result).toContain('already running');
    expect(scan.startScan).not.toHaveBeenCalled();
  });
});
