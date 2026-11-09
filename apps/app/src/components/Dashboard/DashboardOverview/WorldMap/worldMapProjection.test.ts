import type { LiveVisitor } from '@intlayer/backend-contract/analytics';
import { describe, expect, it } from 'vitest';
import { groupVisitorsByPlace, projectCoordinates } from './worldMapProjection';

/** Live visitor with sensible defaults. */
const visitor = (overrides: Partial<LiveVisitor>): LiveVisitor => ({
  visitorId: '0123456789abcdef',
  country: 'FR',
  currentUrl: '/',
  pageCount: 1,
  views: 1,
  firstSeenAt: '2026-11-09T12:00:00.000Z',
  lastSeenAt: '2026-11-09T12:01:00.000Z',
  ...overrides,
});

describe('projectCoordinates', () => {
  // Reference values from d3-geo geoNaturalEarth1().fitSize([960, 470]).
  it.each([
    [2.35, 48.85, 485.595, 118.382],
    [-74, 40.7, 296.325, 143.49],
    [139.7, 35.7, 833.988, 159.126],
    [151.2, -33.9, 865.665, 377.263],
  ])('places (%f, %f) like d3-geo', (longitude, latitude, x, y) => {
    const [projectedX, projectedY] = projectCoordinates(longitude, latitude);

    expect(projectedX).toBeCloseTo(x, 2);
    expect(projectedY).toBeCloseTo(y, 2);
  });
});

describe('groupVisitorsByPlace', () => {
  it('groups visitors sharing city coordinates, largest place first', () => {
    const places = groupVisitorsByPlace([
      visitor({
        visitorId: 'a',
        city: 'Lyon',
        latitude: 45.76,
        longitude: 4.84,
      }),
      visitor({
        visitorId: 'b',
        city: 'Paris',
        latitude: 48.85,
        longitude: 2.35,
      }),
      visitor({
        visitorId: 'c',
        city: 'Paris',
        latitude: 48.85,
        longitude: 2.35,
      }),
    ]);

    expect(places.map((place) => place.city)).toEqual(['Paris', 'Lyon']);
    expect(places[0].visitors.map((entry) => entry.visitorId)).toEqual([
      'b',
      'c',
    ]);
    expect(places[0].key).toBe('48.85,2.35');
  });

  it('falls back to the country centroid without coordinates', () => {
    const [place] = groupVisitorsByPlace([visitor({ country: 'DE' })]);

    expect(place.key).toBe('country:DE');
    expect(place.city).toBeUndefined();
    expect(place.x).toBeGreaterThan(480);
  });

  it('leaves out visitors that cannot be placed', () => {
    expect(
      groupVisitorsByPlace([
        visitor({ country: 'ZZ' }),
        // Too small for the 1:110m outlines, so no centroid either.
        visitor({ country: 'SG' }),
      ])
    ).toEqual([]);
  });
});
