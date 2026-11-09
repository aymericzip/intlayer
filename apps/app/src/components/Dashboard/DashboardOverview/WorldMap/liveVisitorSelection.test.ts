import type { LiveVisitor } from '@intlayer/backend-contract/analytics';
import { describe, expect, it } from 'vitest';
import {
  EMPTY_LIVE_VISITOR_SELECTION,
  getHighlightedMinutes,
  getVisitorsActiveAt,
  selectLiveMinute,
} from './liveVisitorSelection';

const createVisitor = (
  visitorId: string,
  activeMinutes: string[]
): LiveVisitor => ({
  visitorId,
  country: 'FR',
  currentUrl: '/',
  pageCount: 1,
  views: 1,
  firstSeenAt: '2026-11-09T10:00:00.000Z',
  lastSeenAt: '2026-11-09T10:05:00.000Z',
  activeMinutes,
});

const visitors = [
  createVisitor('a', ['2026-11-09T10:00', '2026-11-09T10:01']),
  createVisitor('b', ['2026-11-09T10:01']),
];

describe('getVisitorsActiveAt', () => {
  it('keeps the visitors active during the minute', () => {
    expect(
      getVisitorsActiveAt(visitors, '2026-11-09T10:01').map(
        ({ visitorId }) => visitorId
      )
    ).toEqual(['a', 'b']);
  });
});

describe('selectLiveMinute', () => {
  it('opens a lone visitor straight on their journey', () => {
    expect(
      selectLiveMinute(
        EMPTY_LIVE_VISITOR_SELECTION,
        visitors,
        '2026-11-09T10:00'
      )
    ).toEqual({ placeKey: null, minute: '2026-11-09T10:00', visitorId: 'a' });
  });

  it('lists the visitors of a busy minute', () => {
    expect(
      selectLiveMinute(
        { placeKey: 'country:FR', minute: null, visitorId: 'a' },
        visitors,
        '2026-11-09T10:01'
      )
    ).toEqual({ placeKey: null, minute: '2026-11-09T10:01', visitorId: null });
  });

  it('clears when the selected bar is clicked again', () => {
    expect(
      selectLiveMinute(
        { placeKey: null, minute: '2026-11-09T10:01', visitorId: null },
        visitors,
        '2026-11-09T10:01'
      )
    ).toEqual(EMPTY_LIVE_VISITOR_SELECTION);
  });
});

describe('getHighlightedMinutes', () => {
  it('highlights the picked visitor minutes', () => {
    expect(
      getHighlightedMinutes(
        { placeKey: null, minute: '2026-11-09T10:01', visitorId: 'a' },
        visitors
      )
    ).toEqual(new Set(['2026-11-09T10:00', '2026-11-09T10:01']));
  });

  it('falls back to the picked minute, or nothing', () => {
    expect(
      getHighlightedMinutes(
        { placeKey: null, minute: '2026-11-09T10:01', visitorId: 'gone' },
        visitors
      )
    ).toEqual(new Set(['2026-11-09T10:01']));
    expect(
      getHighlightedMinutes(EMPTY_LIVE_VISITOR_SELECTION, visitors)
    ).toBeNull();
  });
});
