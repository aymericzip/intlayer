import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { AuditEvent } from './types';

const updateOneCalls: { filter: unknown; update: unknown }[] = [];
let claimModifiedCount = 1;

vi.mock('@schemas/scannedHost.schema', () => ({
  ScannedHostModel: {
    updateOne: async (filter: unknown, update: unknown) => {
      updateOneCalls.push({ filter, update });
      return { modifiedCount: claimModifiedCount };
    },
  },
}));

const {
  MAX_SCANS_PER_HOST,
  buildAuditHostScan,
  claimBackgroundScan,
  resolveReportedTechnologies,
  saveAuditHostScan,
} = await import('./scannedHost.service');

const events: AuditEvent[] = [
  { progress: 10, message: 'Checking domain...' },
  { domainData: { title: 'Example', description: 'An example site' } },
  {
    domainData: {
      discoveredLocales: ['en', 'fr'],
      routing: {
        strategy: 'prefix-all',
        confidence: 'high',
        locales: ['en', 'fr'],
        evidence: 'hreflang alternates',
      },
      technologies: [
        {
          id: 'nextjs',
          name: 'Next.js',
          category: 'framework',
          version: '15.1.0',
          evidence: 'window.next.version',
        },
        {
          id: 'crowdin',
          name: 'Crowdin',
          category: 'tms',
          evidence: 'loads https://cdn.crowdin.com/jipt/jipt.js',
        },
      ],
    },
  },
];

describe('scannedHost', () => {
  beforeEach(() => {
    updateOneCalls.length = 0;
    claimModifiedCount = 1;
  });

  it('merges the domain data of every audit event into one scan', () => {
    expect(
      buildAuditHostScan('https://Example.com/fr/', events, 82, 'scan')
    ).toMatchObject({
      url: 'https://Example.com/fr/',
      source: 'scan',
      score: 82,
      title: 'Example',
      technologies: [
        {
          id: 'nextjs',
          name: 'Next.js',
          category: 'framework',
          version: '15.1.0',
        },
        { id: 'crowdin', name: 'Crowdin', category: 'tms' },
      ],
      routingStrategy: 'prefix-all',
      locales: ['en', 'fr'],
    });
  });

  it('upserts the scan into its host document, capping the scan array', async () => {
    await saveAuditHostScan('https://WWW.Example.com/fr', events, 82, 'scan');

    expect(updateOneCalls).toHaveLength(1);
    expect(updateOneCalls[0]?.filter).toEqual({ host: 'www.example.com' });
    expect(updateOneCalls[0]?.update).toMatchObject({
      $set: { lastScore: 82, routingStrategy: 'prefix-all' },
      $push: { scans: { $slice: -MAX_SCANS_PER_HOST } },
      $inc: { scanCount: 1 },
    });
  });

  it('skips failed audits', async () => {
    await saveAuditHostScan(
      'https://example.com/',
      [...events, { globalError: 'Navigation timeout' }],
      0,
      'scan'
    );
    expect(updateOneCalls).toHaveLength(0);
  });

  it('resolves reported technologies against the known signatures', () => {
    expect(
      resolveReportedTechnologies([
        { id: 'crowdin' },
        { id: 'next-intl', version: ' 4.1.0 ' },
        { id: 'crowdin' },
        { id: 'not-a-real-technology' },
      ])
    ).toEqual([
      { id: 'crowdin', name: 'Crowdin', category: 'tms' },
      {
        id: 'next-intl',
        name: 'next-intl',
        category: 'i18n-library',
        version: '4.1.0',
      },
    ]);
  });

  it('grants a background scan claim only when the update applied', async () => {
    expect(await claimBackgroundScan('example.com')).toBe(true);
    claimModifiedCount = 0;
    expect(await claimBackgroundScan('example.com')).toBe(false);
  });
});
