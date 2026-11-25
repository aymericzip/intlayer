import { describe, expect, it } from 'vitest';
import { sampleCountries, sampleLocales, samplePages } from './sampleAudience';
import { sampleJourneys } from './samplePageFlow';

describe('sample audience breakdowns', () => {
  it('distributes the flow audience across more than 30 countries', () => {
    const visitors = sampleJourneys.reduce(
      (total, journey) => total + journey.visitors,
      0
    );
    expect(sampleCountries.length).toBeGreaterThan(30);
    expect(
      sampleCountries.reduce((total, country) => total + country.users, 0)
    ).toBe(visitors);
    expect(
      sampleCountries.every(
        (country) => country.users > 0 && country.users < 150
      )
    ).toBe(true);
  });

  it('counts every page view in both page and locale breakdowns', () => {
    const views = sampleJourneys.reduce(
      (total, journey) => total + journey.pages.length * journey.visitors,
      0
    );
    expect(samplePages.reduce((total, page) => total + page.views, 0)).toBe(
      views
    );
    expect(
      sampleLocales.reduce((total, locale) => total + locale.views, 0)
    ).toBe(views);
    expect(sampleLocales.every((locale) => locale.users <= locale.views)).toBe(
      true
    );
  });
});
