import { describe, expect, it, vi } from 'vitest';

// No DNS in tests: hosts containing "internal" stand for private addresses.
vi.mock('@utils/isPublicUrl', () => ({
  isPublicHttpUrl: async (url: string) =>
    url.startsWith('http') && !url.includes('internal'),
}));
import type {
  AudienceSeriesPoint,
  IncomingAnalyticsEvent,
} from '@/types/analytics.types';
import {
  audienceRangeFromDays,
  bucketDailySeries,
  buildBreakdownRows,
  buildLiveSeries,
  buildPageFlow,
  buildVisitorFlowSteps,
  collectLiveActivity,
  collectPageTransitions,
  DEFAULT_AUDIENCE_RANGE,
  getPageMetadata,
  isAudienceRange,
  LIVE_WINDOW_MINUTES,
  PAGE_FLOW_ENTRANCE,
  type PageFlowLoaders,
  toActiveMinutes,
  toMapCoordinates,
} from './analytics.service';

/** Builds a daily series point with distinguishable users / views. */
const point = (
  bucket: string,
  users: number,
  views: number
): AudienceSeriesPoint => ({ bucket, users, views });

describe('isAudienceRange', () => {
  it('accepts every supported range', () => {
    for (const range of [
      'live',
      '1h',
      '24h',
      '7d',
      '30d',
      '90d',
      '6mo',
      '1y',
      '3y',
    ]) {
      expect(isAudienceRange(range)).toBe(true);
    }
  });

  it('rejects unknown values, including inherited object keys', () => {
    expect(isAudienceRange('2h')).toBe(false);
    expect(isAudienceRange('')).toBe(false);
    expect(isAudienceRange('toString')).toBe(false);
    expect(isAudienceRange('constructor')).toBe(false);
  });
});

describe('audienceRangeFromDays', () => {
  it('maps a legacy window onto the narrowest range that covers it', () => {
    expect(audienceRangeFromDays(1)).toBe('7d');
    expect(audienceRangeFromDays(7)).toBe('7d');
    expect(audienceRangeFromDays(8)).toBe('30d');
    expect(audienceRangeFromDays(30)).toBe('30d');
    expect(audienceRangeFromDays(90)).toBe('90d');
    expect(audienceRangeFromDays(183)).toBe('6mo');
    expect(audienceRangeFromDays(365)).toBe('1y');
  });

  it('clamps windows longer than the widest range', () => {
    expect(audienceRangeFromDays(1095)).toBe('3y');
    expect(audienceRangeFromDays(10_000)).toBe('3y');
  });

  it('never returns a sub-day range, which legacy clients cannot request', () => {
    expect(audienceRangeFromDays(0)).toBe('7d');
    expect(audienceRangeFromDays(-5)).toBe('7d');
  });

  it('agrees with the default range for the historical default window', () => {
    expect(audienceRangeFromDays(30)).toBe(DEFAULT_AUDIENCE_RANGE);
  });
});

describe('bucketDailySeries', () => {
  const daily = [
    // Sunday, closing the ISO week that started Mon 2026-01-05.
    point('2026-01-11', 1, 10),
    // Monday, opening the next ISO week.
    point('2026-01-12', 2, 20),
    point('2026-01-13', 4, 40),
    // Next month.
    point('2026-02-02', 8, 80),
  ];

  it('returns the daily points untouched at day granularity', () => {
    expect(bucketDailySeries(daily, 'day')).toBe(daily);
  });

  it('groups by ISO week, starting each bucket on its Monday', () => {
    expect(bucketDailySeries(daily, 'week')).toEqual([
      point('2026-01-05', 1, 10),
      point('2026-01-12', 6, 60),
      point('2026-02-02', 8, 80),
    ]);
  });

  it('groups by calendar month, anchored to the first of the month', () => {
    expect(bucketDailySeries(daily, 'month')).toEqual([
      point('2026-01-01', 7, 70),
      point('2026-02-01', 8, 80),
    ]);
  });

  it('keeps buckets in chronological order', () => {
    const buckets = bucketDailySeries(daily, 'week').map((row) => row.bucket);
    expect(buckets).toEqual([...buckets].sort());
  });

  it('does not mutate the input points', () => {
    const input = [point('2026-01-12', 2, 20), point('2026-01-13', 4, 40)];
    bucketDailySeries(input, 'week');
    expect(input).toEqual([
      point('2026-01-12', 2, 20),
      point('2026-01-13', 4, 40),
    ]);
  });

  it('handles an empty series', () => {
    expect(bucketDailySeries([], 'month')).toEqual([]);
  });
});

describe('buildBreakdownRows', () => {
  it('merges both sides, defaulting a key missing from one to zero', () => {
    const rows = buildBreakdownRows(
      new Map([
        ['fr', 3],
        ['en', 1],
      ]),
      new Map([
        ['fr', 30],
        ['de', 5],
      ])
    );

    expect(rows).toEqual([
      { key: 'fr', users: 3, views: 30 },
      { key: 'de', users: 0, views: 5 },
      { key: 'en', users: 1, views: 0 },
    ]);
  });

  it('ranks by views by default, breaking ties on users', () => {
    const rows = buildBreakdownRows(
      new Map([
        ['/a', 1],
        ['/b', 9],
      ]),
      new Map([
        ['/a', 10],
        ['/b', 10],
      ])
    );

    expect(rows.map((row) => row.key)).toEqual(['/b', '/a']);
  });

  it('ranks by users when asked, breaking ties on views', () => {
    const rows = buildBreakdownRows(
      new Map([
        ['FR', 2],
        ['US', 7],
      ]),
      new Map([['FR', 100]]),
      'users'
    );

    expect(rows.map((row) => row.key)).toEqual(['US', 'FR']);
  });

  it('drops empty keys — an event with no locale or no url is not a bucket', () => {
    const rows = buildBreakdownRows(new Map([['', 5]]), new Map([['', 50]]));

    expect(rows).toEqual([]);
  });

  it('caps the number of rows so an unbounded page dimension stays readable', () => {
    const views = new Map(
      Array.from({ length: 400 }, (_, index) => [`/page-${index}`, index])
    );

    const rows = buildBreakdownRows(new Map(), views);

    expect(rows).toHaveLength(250);
    // The cap keeps the head of the ranking, not an arbitrary slice.
    expect(rows[0]).toEqual({ key: '/page-399', users: 0, views: 399 });
  });

  it('handles two empty sides', () => {
    expect(buildBreakdownRows(new Map(), new Map())).toEqual([]);
  });
});

describe('getPageMetadata', () => {
  it('extracts title and description from HTML', async () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>My Cool Page</title>
          <meta name="description" content="This is the page description." />
        </head>
        <body>Hello</body>
      </html>
    `;
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'text/html' }),
      text: async () => html,
    } as unknown as Response);

    const result = await getPageMetadata('https://example.com/test-page-1');
    expect(result).toEqual({
      title: 'My Cool Page',
      description: 'This is the page description.',
    });
    spy.mockRestore();
  });

  it('falls back to og:title and og:description if standard tags are missing', async () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="og:title" content="OG Title" />
          <meta property="og:description" content="OG Description" />
        </head>
        <body>Hello</body>
      </html>
    `;
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'text/html' }),
      text: async () => html,
    } as unknown as Response);

    const result = await getPageMetadata('https://example.com/test-page-2');
    expect(result).toEqual({
      title: 'OG Title',
      description: 'OG Description',
    });
    spy.mockRestore();
  });

  it('never fetches a non-public address', async () => {
    const spy = vi.spyOn(globalThis, 'fetch');

    const result = await getPageMetadata('http://internal.example/admin');
    expect(result).toEqual({ title: '', description: '' });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('follows public redirects but blocks a redirect to a private address', async () => {
    const spy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({
        ok: false,
        status: 302,
        headers: new Headers({ location: '/en' }),
      } as unknown as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => '<title>Redirected</title>',
      } as unknown as Response);

    const result = await getPageMetadata('https://example.com/redirect-ok');
    expect(result.title).toBe('Redirected');
    expect(spy).toHaveBeenLastCalledWith(
      'https://example.com/en',
      expect.objectContaining({ redirect: 'manual' })
    );

    spy.mockReset().mockResolvedValue({
      ok: false,
      status: 302,
      headers: new Headers({ location: 'http://internal.example/' }),
    } as unknown as Response);

    const blockedResult = await getPageMetadata(
      'https://example.com/redirect-blocked'
    );
    expect(blockedResult).toEqual({ title: '', description: '' });
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('returns empty strings when fetch fails or url is invalid', async () => {
    const resultInvalid = await getPageMetadata('not-a-url');
    expect(resultInvalid).toEqual({ title: '', description: '' });

    const spy = vi
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue(new Error('Network error'));

    const resultError = await getPageMetadata('https://example.com/error');
    expect(resultError).toEqual({ title: '', description: '' });
    spy.mockRestore();
  });
});

describe('collectLiveActivity', () => {
  const now = Date.parse('2026-11-09T12:30:40.000Z');

  /** Epoch ms `secondsAgo` before `now`. */
  const ago = (secondsAgo: number): number => now - secondsAgo * 1000;

  /** Builds a sanitized event at `secondsAgo` before `now`. */
  const event = (
    type: IncomingAnalyticsEvent['type'],
    secondsAgo: number,
    url = '/pricing',
    locale = 'en'
  ): IncomingAnalyticsEvent => ({ type, t: ago(secondsAgo), url, locale });

  it('groups events per minute + url + locale and counts only page views', () => {
    expect(
      collectLiveActivity(
        [
          event('page_view', 5),
          event('content_exposure', 10),
          event('page_view', 20),
          event('page_view', 50),
          event('page_view', 5, '/docs'),
        ],
        now
      )
    ).toEqual([
      {
        minute: '2026-11-09T12:30',
        url: '/pricing',
        locale: 'en',
        views: 2,
        firstSeenAt: ago(20),
        lastSeenAt: ago(5),
      },
      {
        minute: '2026-11-09T12:29',
        url: '/pricing',
        locale: 'en',
        views: 1,
        firstSeenAt: ago(50),
        lastSeenAt: ago(50),
      },
      {
        minute: '2026-11-09T12:30',
        url: '/docs',
        locale: 'en',
        views: 1,
        firstSeenAt: ago(5),
        lastSeenAt: ago(5),
      },
    ]);
  });

  it('marks a session active on exposures alone, with zero views', () => {
    expect(collectLiveActivity([event('content_exposure', 1)], now)).toEqual([
      {
        minute: '2026-11-09T12:30',
        url: '/pricing',
        locale: 'en',
        views: 0,
        firstSeenAt: ago(1),
        lastSeenAt: ago(1),
      },
    ]);
  });

  it('skips events older than the live window and events without a url', () => {
    expect(
      collectLiveActivity(
        [
          event('page_view', LIVE_WINDOW_MINUTES * 60 + 1),
          event('page_view', 1, ''),
        ],
        now
      )
    ).toEqual([]);
  });

  it('clamps client clocks running ahead to now', () => {
    expect(collectLiveActivity([event('page_view', -600)], now)).toEqual([
      {
        minute: '2026-11-09T12:30',
        url: '/pricing',
        locale: 'en',
        views: 1,
        firstSeenAt: now,
        lastSeenAt: now,
      },
    ]);
  });
});

describe('buildVisitorFlowSteps', () => {
  /** Activity row on `url` between two `HH:mm:ss` times of the same day. */
  const row = (url: string, from: string, to: string, views = 1) => ({
    url,
    locale: 'en',
    country: 'FR',
    views,
    firstSeenAt: new Date(`2026-11-09T${from}Z`),
    lastSeenAt: new Date(`2026-11-09T${to}Z`),
  });

  it('orders the journey by arrival time', () => {
    const steps = buildVisitorFlowSteps([
      row('/docs', '12:05:00', '12:05:30'),
      row('/', '12:01:00', '12:01:40'),
      row('/pricing', '12:03:00', '12:03:10'),
    ]);

    expect(steps.map((step) => step.url)).toEqual(['/', '/pricing', '/docs']);
  });

  it('collapses a page spanning several minutes into one step', () => {
    expect(
      buildVisitorFlowSteps([
        row('/', '12:01:10', '12:01:50', 1),
        row('/', '12:02:00', '12:02:40', 0),
        row('/docs', '12:03:00', '12:03:05', 2),
      ])
    ).toEqual([
      {
        url: '/',
        locale: 'en',
        views: 1,
        firstSeenAt: new Date('2026-11-09T12:01:10Z'),
        lastSeenAt: new Date('2026-11-09T12:02:40Z'),
      },
      {
        url: '/docs',
        locale: 'en',
        views: 2,
        firstSeenAt: new Date('2026-11-09T12:03:00Z'),
        lastSeenAt: new Date('2026-11-09T12:03:05Z'),
      },
    ]);
  });

  it('keeps a return to an earlier page as its own step', () => {
    const steps = buildVisitorFlowSteps([
      row('/', '12:01:00', '12:01:10'),
      row('/docs', '12:02:00', '12:02:10'),
      row('/', '12:03:00', '12:03:10'),
    ]);

    expect(steps.map((step) => step.url)).toEqual(['/', '/docs', '/']);
  });

  it('does not mutate its input and handles no activity', () => {
    const rows = [
      row('/b', '12:02:00', '12:02:01'),
      row('/a', '12:01:00', '12:01:01'),
    ];
    buildVisitorFlowSteps(rows);

    expect(rows[0].url).toBe('/b');
    expect(buildVisitorFlowSteps([])).toEqual([]);
  });
});

describe('buildLiveSeries', () => {
  const now = Date.parse('2026-11-09T12:30:40.000Z');

  it('returns one point per minute, ending on the running minute', () => {
    const series = buildLiveSeries(new Map(), now);

    expect(series).toHaveLength(LIVE_WINDOW_MINUTES);
    expect(series[0].bucket).toBe('2026-11-09T12:01');
    expect(series.at(-1)?.bucket).toBe('2026-11-09T12:30');
  });

  it('fills quiet minutes with zeros and keeps active ones', () => {
    const series = buildLiveSeries(
      new Map([
        ['2026-11-09T12:29', { users: 3, views: 5 }],
        // Outside the window — ignored.
        ['2026-11-09T11:00', { users: 9, views: 9 }],
      ]),
      now
    );

    expect(series.at(-2)).toEqual(point('2026-11-09T12:29', 3, 5));
    expect(series.at(-1)).toEqual(point('2026-11-09T12:30', 0, 0));
    expect(series.reduce((sum, entry) => sum + entry.users, 0)).toBe(3);
  });
});

describe('collectPageTransitions', () => {
  const start = Date.parse('2026-11-09T12:00:00.000Z');
  const minutes = (count: number): number => start + count * 60_000;

  it('links consecutive page views and opens the session on an entrance', () => {
    expect(
      collectPageTransitions([
        { url: '/docs', t: minutes(2) },
        { url: '/', t: minutes(0) },
        { url: '/pricing', t: minutes(5) },
      ])
    ).toEqual([
      { day: '2026-11-09', fromUrl: PAGE_FLOW_ENTRANCE, toUrl: '/', count: 1 },
      { day: '2026-11-09', fromUrl: '/', toUrl: '/docs', count: 1 },
      { day: '2026-11-09', fromUrl: '/docs', toUrl: '/pricing', count: 1 },
    ]);
  });

  it("links the first view to the session's previous page", () => {
    expect(
      collectPageTransitions([{ url: '/docs', t: minutes(10) }], {
        url: '/',
        lastSeenAt: minutes(8),
      })
    ).toEqual([{ day: '2026-11-09', fromUrl: '/', toUrl: '/docs', count: 1 }]);
  });

  it('starts a new session after 30 minutes of inactivity', () => {
    expect(
      collectPageTransitions([{ url: '/docs', t: minutes(40) }], {
        url: '/',
        lastSeenAt: minutes(5),
      })
    ).toEqual([
      {
        day: '2026-11-09',
        fromUrl: PAGE_FLOW_ENTRANCE,
        toUrl: '/docs',
        count: 1,
      },
    ]);
  });

  it('ignores reloads and does not guess the origin of a late flush', () => {
    expect(
      collectPageTransitions(
        [
          { url: '/docs', t: minutes(1) },
          { url: '/docs', t: minutes(2) },
        ],
        { url: '/', lastSeenAt: minutes(3) }
      )
    ).toEqual([]);
  });

  it('counts the same navigation twice', () => {
    expect(
      collectPageTransitions([
        { url: '/', t: minutes(0) },
        { url: '/docs', t: minutes(1) },
        { url: '/', t: minutes(2) },
        { url: '/docs', t: minutes(3) },
      ]).find((transition) => transition.fromUrl === '/')?.count
    ).toBe(2);
  });
});

describe('buildPageFlow', () => {
  /** In-memory loaders over fixed views and transitions. */
  const loaders = (
    views: Record<string, number>,
    transitions: [fromUrl: string, toUrl: string, count: number][]
  ): PageFlowLoaders => ({
    loadViews: async (urls) =>
      new Map(urls.map((url) => [url, views[url] ?? 0])),
    loadTransitions: async (urls) =>
      transitions
        .filter(([fromUrl]) => urls.includes(fromUrl))
        .map(([fromUrl, toUrl, count]) => ({ fromUrl, toUrl, count })),
  });

  it('spreads traffic over next pages and derives exits', async () => {
    const flow = await buildPageFlow(
      '/',
      loaders({ '/': 100, '/docs': 50, '/pricing': 20 }, [
        ['/', '/docs', 60],
        ['/', '/pricing', 20],
        ['/docs', '/pricing', 25],
      ]),
      2
    );

    expect(flow.steps[0]).toEqual([{ url: '/', value: 100, exits: 20 }]);
    // /docs is reached 60 times; half of its traffic moves on to /pricing.
    expect(flow.steps[1]).toEqual([
      { url: '/docs', value: 60, exits: 30 },
      { url: '/pricing', value: 20, exits: 20 },
    ]);
    expect(flow.steps[2]).toEqual([{ url: '/pricing', value: 30, exits: 30 }]);
    expect(flow.links).toEqual([
      { fromStep: 0, fromUrl: '/', toUrl: '/docs', value: 60 },
      { fromStep: 0, fromUrl: '/', toUrl: '/pricing', value: 20 },
      { fromStep: 1, fromUrl: '/docs', toUrl: '/pricing', value: 30 },
    ]);
  });

  it('merges pages past the per-step cap into an unfollowed "other" node', async () => {
    const flow = await buildPageFlow(
      '/',
      loaders({ '/': 10, '/a': 5 }, [
        ['/', '/a', 5],
        ['/', '/b', 3],
        ['/', '/c', 2],
        ['/b', '/a', 3],
      ]),
      2,
      1
    );

    expect(flow.steps[1]).toEqual([
      { url: '/a', value: 5, exits: 5 },
      { url: null, value: 5, exits: null },
    ]);
    expect(flow.links.filter((link) => link.toUrl === null)).toEqual([
      { fromStep: 0, fromUrl: '/', toUrl: null, value: 5 },
    ]);
    // Neither /a nor "other" leads anywhere, so the flow stops.
    expect(flow.steps).toHaveLength(2);
  });

  it('uses outgoing navigations as the base when they exceed views', async () => {
    const flow = await buildPageFlow(
      PAGE_FLOW_ENTRANCE,
      loaders({}, [
        [PAGE_FLOW_ENTRANCE, '/', 8],
        [PAGE_FLOW_ENTRANCE, '/docs', 2],
      ]),
      1
    );

    expect(flow.steps[0]).toEqual([
      { url: PAGE_FLOW_ENTRANCE, value: 10, exits: null },
    ]);
    expect(flow.steps[1].map((node) => node.value)).toEqual([8, 2]);
  });

  it('returns the lone starting page when it has no traffic', async () => {
    expect(await buildPageFlow('/missing', loaders({}, []))).toEqual({
      steps: [[{ url: '/missing', value: 0, exits: null }]],
      links: [],
    });
  });
});

describe('toMapCoordinates', () => {
  it('keeps numeric coordinates', () => {
    expect(toMapCoordinates(40.42, -3.7)).toEqual({
      latitude: 40.42,
      longitude: -3.7,
    });
  });

  it('drops null or partial coordinates', () => {
    expect(toMapCoordinates(null, null)).toEqual({
      latitude: undefined,
      longitude: undefined,
    });
    expect(toMapCoordinates(40.42, null)).toEqual({
      latitude: undefined,
      longitude: undefined,
    });
  });
});

describe('toActiveMinutes', () => {
  it('dedupes minutes and orders them oldest first', () => {
    expect(
      toActiveMinutes([
        '2026-11-09T10:02',
        '2026-11-09T09:59',
        '2026-11-09T10:02',
        '2026-11-09T10:00',
      ])
    ).toEqual(['2026-11-09T09:59', '2026-11-09T10:00', '2026-11-09T10:02']);
  });
});
