import { Types } from 'mongoose';
import { beforeEach, describe, expect, it, vi } from 'vitest';

type AggregateStub = (pipeline: Record<string, any>[]) => unknown[];

const { aggregateStubs, createModelStub } = vi.hoisted(() => {
  const stubs = {
    rollup: (() => []) as AggregateStub,
    visitor: (() => []) as AggregateStub,
    transition: (() => []) as AggregateStub,
    live: (() => []) as AggregateStub,
  };

  return {
    aggregateStubs: stubs,
    createModelStub: (name: keyof typeof stubs) => ({
      aggregate: (pipeline: Record<string, any>[]) => ({
        allowDiskUse: async () => stubs[name](pipeline),
      }),
    }),
  };
});

vi.mock('@schemas/analyticsEvent.schema', () => ({
  AnalyticsRollupModel: createModelStub('rollup'),
  AnalyticsVisitorModel: createModelStub('visitor'),
  AnalyticsPageTransitionModel: createModelStub('transition'),
  AnalyticsLiveActivityModel: createModelStub('live'),
}));

vi.mock('@schemas/dictionary.schema', () => ({ DictionaryModel: {} }));

vi.mock('@services/analytics.service', () => ({
  getFirstDataDay: async () => '2026-01-01',
}));

import {
  AnalyticsReportError,
  buildDictionaryAnnotations,
  buildFilterCondition,
  matchesMetricFilters,
  mergeSourceResults,
  NOT_SET,
  normalizeReportRequest,
  resolveDateRanges,
  resolveReportDate,
  runRealtimeReport,
  runReport,
  sortReportRows,
} from './analyticsReport.service';

const now = new Date('2026-11-10T12:00:00.000Z');
const projectId = new Types.ObjectId();

const getMatch = (pipeline: Record<string, any>[]) => pipeline[0].$match;

beforeEach(() => {
  aggregateStubs.rollup = () => [];
  aggregateStubs.visitor = () => [];
  aggregateStubs.transition = () => [];
  aggregateStubs.live = () => [];
});

describe('resolveReportDate', () => {
  it('resolves relative dates in UTC', () => {
    expect(resolveReportDate('today', now)).toBe('2026-11-10');
    expect(resolveReportDate('yesterday', now)).toBe('2026-11-09');
    expect(resolveReportDate('30daysAgo', now)).toBe('2026-10-11');
    expect(resolveReportDate('2026-02-28', now)).toBe('2026-02-28');
  });

  it('rejects impossible calendar dates', () => {
    expect(resolveReportDate('2026-02-30', now)).toBeNull();
  });
});

describe('resolveDateRanges', () => {
  it('names unnamed ranges by position', () => {
    expect(
      resolveDateRanges(
        [
          { startDate: '7daysAgo', endDate: 'today' },
          { startDate: '14daysAgo', endDate: '8daysAgo', name: 'previous' },
        ],
        now
      )
    ).toEqual([
      { name: 'date_range_0', startDate: '2026-11-03', endDate: '2026-11-10' },
      { name: 'previous', startDate: '2026-10-27', endDate: '2026-11-02' },
    ]);
  });

  it('reports reversed ranges and duplicate names together', () => {
    expect(() =>
      resolveDateRanges(
        [
          { startDate: 'today', endDate: '7daysAgo', name: 'a' },
          { startDate: '7daysAgo', endDate: 'today', name: 'a' },
        ],
        now
      )
    ).toThrow(/starts \(2026-11-10\) after it ends.*unique/);
  });
});

describe('normalizeReportRequest', () => {
  it('explains every incompatible dimension at once', () => {
    try {
      normalizeReportRequest(
        {
          dimensions: ['pagePath', 'country'],
          metrics: ['activeUsers', 'pageViews'],
        },
        1
      );
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(AnalyticsReportError);
      expect((error as AnalyticsReportError).issues).toEqual([
        expect.stringContaining(
          '"activeUsers" cannot be broken down by "pagePath"'
        ),
        expect.stringContaining(
          '"pageViews" cannot be broken down by "country"'
        ),
      ]);
    }
  });

  it('rejects filters on time dimensions, missing values and unknown order fields', () => {
    expect(() =>
      normalizeReportRequest(
        {
          metrics: ['pageViews'],
          dimensionFilters: [
            { dimension: 'date', operator: 'exact', value: '2026-11-10' },
            { dimension: 'locale', operator: 'inList' },
          ],
          metricFilters: [
            { metric: 'conversions', operator: 'equal', value: 1 },
          ],
          orderBys: [{ field: 'locale' }],
        },
        1
      )
    ).toThrow(
      /time dimension "date".*non-empty "values".*"conversions", which is not requested.*order by "locale"/
    );
  });

  it('dedupes and applies defaults', () => {
    expect(
      normalizeReportRequest(
        { dimensions: ['locale', 'locale'], metrics: ['pageViews'] },
        2
      )
    ).toMatchObject({
      dimensions: ['locale'],
      metrics: ['pageViews'],
      limit: 100,
      offset: 0,
    });
  });
});

describe('buildFilterCondition', () => {
  it('matches case-insensitively by default and escapes the value', () => {
    const condition = buildFilterCondition({
      operator: 'contains',
      value: '/blog (v2)',
    }) as RegExp;

    expect(condition.test('/en/BLOG (v2)/post')).toBe(true);
    expect(condition.test('/en/blog v2')).toBe(false);
  });

  it('supports exact, negation and lists', () => {
    expect(
      buildFilterCondition({
        operator: 'exact',
        value: 'fr',
        caseSensitive: true,
        not: true,
      })
    ).toEqual({ $ne: 'fr' });
    expect(
      buildFilterCondition({
        operator: 'inList',
        values: ['fr', 'de'],
        caseSensitive: true,
      })
    ).toEqual({ $in: ['fr', 'de'] });
    expect(
      (buildFilterCondition({ operator: 'beginsWith', value: '/fr' }) as RegExp)
        .source
    ).toBe('^\\/fr');
  });
});

describe('mergeSourceResults', () => {
  it('joins metrics of different sources on their dimension values', () => {
    const rows = mergeSourceResults(
      [
        {
          dateRangeName: 'current',
          metrics: ['pageViews'],
          groupedRows: [
            { _id: { d0: 'fr' }, pageViews: 10 },
            { _id: { d0: 'en' }, pageViews: 4 },
          ],
        },
        {
          dateRangeName: 'current',
          metrics: ['activeUsers'],
          groupedRows: [
            { _id: { d0: 'fr' }, activeUsers: 3 },
            { _id: {}, activeUsers: 1 },
          ],
        },
      ],
      ['locale'],
      ['pageViews', 'activeUsers'],
      false
    );

    expect(rows).toEqual([
      { locale: 'fr', pageViews: 10, activeUsers: 3 },
      { locale: 'en', pageViews: 4, activeUsers: 0 },
      { locale: NOT_SET, pageViews: 0, activeUsers: 1 },
    ]);
  });
});

describe('matchesMetricFilters and sortReportRows', () => {
  const rows = [
    { date: '2026-11-02', pageViews: 5 },
    { date: '2026-11-01', pageViews: 9 },
    { date: '2026-11-03', pageViews: 1 },
  ];

  it('filters on metric values', () => {
    expect(
      rows.filter((row) =>
        matchesMetricFilters(row, [
          { metric: 'pageViews', operator: 'between', value: 2, toValue: 9 },
        ])
      )
    ).toHaveLength(2);
  });

  it('sorts time ascending by default, metrics descending when requested', () => {
    expect(
      sortReportRows(rows, [], ['date'], ['pageViews'], false).map(
        (row) => row.date
      )
    ).toEqual(['2026-11-01', '2026-11-02', '2026-11-03']);
    expect(
      sortReportRows(
        rows,
        [{ field: 'pageViews' }],
        ['date'],
        ['pageViews'],
        false
      ).map((row) => row.pageViews)
    ).toEqual([9, 5, 1]);
  });
});

describe('runReport', () => {
  it('queries each source per range and compares ranges', async () => {
    const rollupMatches: Record<string, any>[] = [];

    aggregateStubs.rollup = (pipeline) => {
      const match = getMatch(pipeline);
      rollupMatches.push(match);

      return match.day.$gte === '2026-11-03'
        ? [
            { _id: { d0: 'fr' }, pageViews: 30 },
            { _id: { d0: 'en' }, pageViews: 10 },
          ]
        : [{ _id: { d0: 'fr' }, pageViews: 20 }];
    };
    aggregateStubs.visitor = (pipeline) =>
      pipeline[1].$group._id.d0
        ? [{ _id: { d0: 'fr' }, activeUsers: 7 }]
        : [{ _id: {}, activeUsers: 9 }];

    const report = await runReport(
      projectId,
      {
        dateRanges: [
          { startDate: '7daysAgo', endDate: 'today', name: 'current' },
          { startDate: '14daysAgo', endDate: '8daysAgo', name: 'previous' },
        ],
        dimensions: ['locale'],
        metrics: ['pageViews', 'activeUsers'],
        dimensionFilters: [
          { dimension: 'locale', operator: 'inList', values: ['fr', 'en'] },
        ],
      },
      now
    );

    expect(rollupMatches[0]).toMatchObject({
      projectId,
      type: 'page_view',
      locale: { $in: [/^fr$/i, /^en$/i] },
    });
    expect(report.dimensions).toEqual(['dateRange', 'locale']);
    expect(report.rows).toEqual([
      { dateRange: 'current', locale: 'fr', pageViews: 30, activeUsers: 7 },
      { dateRange: 'current', locale: 'en', pageViews: 10, activeUsers: 0 },
      { dateRange: 'previous', locale: 'fr', pageViews: 20, activeUsers: 7 },
    ]);
    // Distinct users come from their own count, not from summing rows.
    expect(report.totals).toEqual([
      { dateRange: 'current', pageViews: 40, activeUsers: 9 },
      { dateRange: 'previous', pageViews: 20, activeUsers: 9 },
    ]);
    expect(report.metadata.warnings).toContainEqual(
      expect.stringContaining('distinct count')
    );
  });

  it('reads landing pages from the session entrances', async () => {
    aggregateStubs.transition = (pipeline) => {
      expect(getMatch(pipeline)).toMatchObject({ fromUrl: '(entrance)' });
      expect(pipeline[1].$group._id).toEqual({
        d0: { $ifNull: ['$toUrl', NOT_SET] },
      });

      return [
        { _id: { d0: '/' }, entrances: 3 },
        { _id: { d0: '/fr' }, entrances: 8 },
      ];
    };

    const report = await runReport(
      projectId,
      {
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: ['pagePath'],
        metrics: ['entrances'],
        limit: 1,
      },
      now
    );

    expect(report.rows).toEqual([{ pagePath: '/fr', entrances: 8 }]);
    expect(report.rowCount).toBe(2);
    expect(report.metadata.truncated).toBe(true);
  });

  it('groups weeks and months with operators available since MongoDB 3.4', async () => {
    const groups: unknown[] = [];

    aggregateStubs.rollup = (pipeline) => {
      groups.push(pipeline[1].$group._id);
      return [];
    };

    await runReport(
      projectId,
      {
        dateRanges: [{ startDate: '90daysAgo', endDate: 'today' }],
        dimensions: ['week', 'month'],
        metrics: ['pageViews'],
      },
      now
    );

    expect(groups[0]).toEqual({
      d0: {
        $dateToString: {
          format: '%G-W%V',
          date: { $dateFromString: { dateString: '$day' } },
        },
      },
      d1: { $substrBytes: ['$day', 0, 7] },
    });
  });

  it('warns about the visitor retention', async () => {
    const report = await runReport(
      projectId,
      {
        dateRanges: [{ startDate: '2025-01-01', endDate: 'today' }],
        metrics: ['activeUsers'],
      },
      now
    );

    expect(report.metadata.warnings).toContainEqual(
      expect.stringContaining('last 400 days')
    );
  });
});

describe('runRealtimeReport', () => {
  it('counts distinct sessions and views over the window', async () => {
    aggregateStubs.live = (pipeline) => {
      expect(getMatch(pipeline).minute).toEqual({ $gte: '2026-11-10T11:30' });

      return pipeline[2].$group._id.d0
        ? [
            { _id: { d0: '/fr' }, activeUsers: 2, pageViews: 5 },
            { _id: { d0: '/' }, activeUsers: 3, pageViews: 3 },
          ]
        : [{ _id: {}, activeUsers: 4, pageViews: 8 }];
    };

    const report = await runRealtimeReport(
      projectId,
      { dimensions: ['pagePath'], metrics: ['activeUsers', 'pageViews'] },
      now
    );

    expect(report.rows).toEqual([
      { pagePath: '/', activeUsers: 3, pageViews: 3 },
      { pagePath: '/fr', activeUsers: 2, pageViews: 5 },
    ]);
    expect(report.totals).toEqual([
      { dateRange: 'realtime', activeUsers: 4, pageViews: 8 },
    ]);
    expect(JSON.stringify(report)).not.toMatch(/session|latitude|city/i);
  });
});

describe('buildDictionaryAnnotations', () => {
  it('derives creation, versions, last edit and repository syncs', () => {
    const createdAt = new Date('2026-10-01T10:00:00.000Z');

    const annotations = buildDictionaryAnnotations([
      {
        key: 'home',
        createdAt,
        updatedAt: new Date('2026-11-05T09:00:00.000Z'),
        versions: [
          { name: 'v1', createdAt: new Date('2026-10-01T10:00:20.000Z') },
          { name: 'v2', createdAt: new Date('2026-10-20T08:00:00.000Z') },
        ],
        sourceSync: {
          status: 'committed',
          commitSha: 'abcdef1234',
          url: 'https://example.com/commit/abcdef1234',
          syncedAt: new Date('2026-11-05T09:01:00.000Z'),
        },
      },
    ]);

    expect(annotations.map(({ type }) => type)).toEqual([
      'dictionary_created',
      'content_version_created',
      'dictionary_updated',
      'source_synced',
    ]);
    expect(annotations[3]).toMatchObject({
      title: '"home" committed (abcdef1)',
      url: 'https://example.com/commit/abcdef1234',
    });
  });
});
