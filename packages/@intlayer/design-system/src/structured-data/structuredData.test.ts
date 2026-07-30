import { describe, expect, it } from 'vitest';
import { buildSoftwareApplicationJsonLd } from './buildSoftwareApplicationJsonLd';
import { buildWebsiteJsonLd } from './buildWebsiteJsonLd';

/** Minimum description length Google expects on a Dataset node. */
const MINIMUM_DATASET_DESCRIPTION_LENGTH = 50;

const websiteParams = {
  url: 'https://intlayer.org',
  searchUrl: 'https://intlayer.org/doc/search',
  locales: ['en', 'fr'],
  keywords: ['i18n', 'localization'],
  rssUrl: 'https://intlayer.org/feed.xml',
};

const softwareApplicationParams = {
  name: 'Intlayer',
  url: 'https://intlayer.org',
  description: 'i18n library with AI integration.',
  softwareVersion: '9.1.0',
  keywords: ['i18n'],
  audienceType: 'Developers',
};

describe('buildWebsiteJsonLd', () => {
  it('adds a DataFeed node with a description when an RSS URL is provided', () => {
    const { subjectOf } = buildWebsiteJsonLd(websiteParams);

    // Google validates DataFeed as a Dataset subtype, which makes both `name`
    // and `description` required fields.
    expect(subjectOf?.['@type']).toBe('DataFeed');
    expect(subjectOf?.name).toBeTruthy();
    expect(subjectOf?.description.length).toBeGreaterThanOrEqual(
      MINIMUM_DATASET_DESCRIPTION_LENGTH
    );
  });

  it('lets the caller override the RSS feed name and description', () => {
    const { subjectOf } = buildWebsiteJsonLd({
      ...websiteParams,
      rssName: 'Custom feed',
      rssDescription: 'Custom description',
    });

    expect(subjectOf?.name).toBe('Custom feed');
    expect(subjectOf?.description).toBe('Custom description');
  });

  it('omits the DataFeed node when no RSS URL is provided', () => {
    const websiteJsonLd = buildWebsiteJsonLd({
      ...websiteParams,
      rssUrl: undefined,
    });

    expect(websiteJsonLd).not.toHaveProperty('subjectOf');
  });
});

describe('buildSoftwareApplicationJsonLd', () => {
  it('always emits the offers node required by the rich result', () => {
    const { offers } = buildSoftwareApplicationJsonLd(
      softwareApplicationParams
    );

    expect(offers).toMatchObject({
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    });
  });

  it('always emits an aggregateRating within its own rating scale', () => {
    const { aggregateRating } = buildSoftwareApplicationJsonLd(
      softwareApplicationParams
    );

    expect(aggregateRating['@type']).toBe('AggregateRating');
    expect(aggregateRating.ratingCount).toBeGreaterThan(0);
    expect(Number(aggregateRating.ratingValue)).toBeGreaterThanOrEqual(
      aggregateRating.worstRating
    );
    expect(Number(aggregateRating.ratingValue)).toBeLessThanOrEqual(
      aggregateRating.bestRating
    );
  });

  it('honours caller-provided offers and rating values', () => {
    const { offers, aggregateRating } = buildSoftwareApplicationJsonLd({
      ...softwareApplicationParams,
      offersPrice: '19.00',
      offersPriceCurrency: 'EUR',
      ratingValue: '4.5',
      ratingCount: 12,
      reviewCount: 8,
    });

    expect(offers.price).toBe('19.00');
    expect(offers.priceCurrency).toBe('EUR');
    expect(aggregateRating.ratingValue).toBe('4.5');
    expect(aggregateRating.ratingCount).toBe(12);
    expect(aggregateRating.reviewCount).toBe(8);
  });
});
