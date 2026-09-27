import { describe, expect, it, vi } from 'vitest';

const auditedUrls: string[] = [];
const recordedScans: { url: string; source: string }[] = [];

vi.mock('./seoAudit.service', () => ({
  runSingleAudit: async (url: string) => {
    auditedUrls.push(url);
    return { events: [{ progress: 100, message: 'Audit completed' }] };
  },
}));
vi.mock('./auditCache.service', () => ({
  getCachedAudit: async (url: string) =>
    url.includes('cached') ? { cachedAt: '', events: [] } : null,
  setCachedAudit: async () => {},
}));
vi.mock('./scannedHost.service', () => ({
  getHostFromUrl: (url: string) => new URL(url).hostname,
  saveAuditHostScan: async (
    url: string,
    _events: unknown,
    _score: number,
    source: string
  ) => {
    recordedScans.push({ url, source });
  },
}));

const { enqueueBackgroundScan } = await import('./backgroundScanQueue');

describe('backgroundScanQueue', () => {
  it('audits one page per host and records it as a background scan', async () => {
    expect(enqueueBackgroundScan('https://example.com/fr')).toBe(true);
    expect(enqueueBackgroundScan('https://example.com/de')).toBe(false);
    expect(enqueueBackgroundScan('https://cached.example.org/')).toBe(true);

    await vi.waitFor(() => expect(auditedUrls).toHaveLength(1));

    expect(auditedUrls).toEqual(['https://example.com/fr']);
    expect(recordedScans).toEqual([
      { url: 'https://example.com/fr', source: 'background' },
    ]);
  });
});
