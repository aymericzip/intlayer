import { describe, expect, it } from 'vitest';
import { buildCreativeWorkJsonLd } from './buildCreativeWorkJsonLd';
import { buildItemListJsonLd } from './buildItemListJsonLd';
import { buildOrganizationJsonLd } from './buildOrganizationJsonLd';
import { buildSoftwareApplicationJsonLd } from './buildSoftwareApplicationJsonLd';
import { buildWebsiteJsonLd } from './buildWebsiteJsonLd';
import { normalizeJsonLdUrl } from './normalizeJsonLdUrl';

/** Minimum description length Google expects on a Dataset node. */
const MINIMUM_DATASET_DESCRIPTION_LENGTH = 50;

const websiteParams = {
  url: 'https://intlayer.org',
  searchUrl: 'https://intlayer.org/doc/search',
  locales: ['en', 'fr'],
  keywords: ['i18n', 'localization'],
  rssUrl: 'https://intlayer.org/feed.xml',
};

const creativeWorkParams = {
  name: 'Blog',
  description: 'Discover all topics related to Intlayer.',
  content: '# Blog',
  keywords: 'i18n',
  audienceType: 'Developers',
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

  // Call sites concatenate `Website_Home` (which ends with a slash) with a
  // leading-slash path, so the builder receives doubled slashes.
  it('collapses doubled slashes in every emitted URL', () => {
    const softwareApplicationJsonLd = buildSoftwareApplicationJsonLd({
      ...softwareApplicationParams,
      url: 'https://intlayer.org/',
      authorUrl: 'https://intlayer.org/',
      logoUrl: 'https://intlayer.org//assets/logo.png',
      githubUrl: 'https://github.com//aymericzip/intlayer',
      mainEntityUrl: 'https://intlayer.org//translate',
    });

    expect(softwareApplicationJsonLd.author.logo).toBe(
      'https://intlayer.org/assets/logo.png'
    );
    expect(softwareApplicationJsonLd.publisher.logo).toBe(
      'https://intlayer.org/assets/logo.png'
    );
    expect(softwareApplicationJsonLd.image).toBe(
      'https://intlayer.org/cover.png'
    );
    expect(softwareApplicationJsonLd.author.sameAs).toEqual([
      'https://github.com/aymericzip/intlayer',
    ]);
    expect(softwareApplicationJsonLd.mainEntityOfPage).toBe(
      'https://intlayer.org/translate'
    );
  });
});

describe('buildOrganizationJsonLd', () => {
  it('collapses doubled slashes in the logo and sameAs URLs', () => {
    const organizationJsonLd = buildOrganizationJsonLd({
      url: 'https://intlayer.org/',
      logoUrl: 'https://intlayer.org//assets/logo.png',
      slogan: 'i18n made simple',
      knowsAbout: ['i18n'],
      sameAs: ['https://github.com//aymericzip/intlayer'],
      availableLanguages: ['en', 'fr'],
    });

    expect(organizationJsonLd.logo.url).toBe(
      'https://intlayer.org/assets/logo.png'
    );
    expect(organizationJsonLd.sameAs).toEqual([
      'https://github.com/aymericzip/intlayer',
    ]);
  });
});

describe('normalizeJsonLdUrl', () => {
  it('preserves the protocol separator and protocol-relative prefixes', () => {
    expect(normalizeJsonLdUrl('https://intlayer.org//cover.png')).toBe(
      'https://intlayer.org/cover.png'
    );
    expect(normalizeJsonLdUrl('//cdn.intlayer.org//cover.png')).toBe(
      '//cdn.intlayer.org/cover.png'
    );
    expect(normalizeJsonLdUrl('https://intlayer.org/cover.png')).toBe(
      'https://intlayer.org/cover.png'
    );
  });

  it('collapses runs longer than two slashes', () => {
    expect(normalizeJsonLdUrl('https://intlayer.org///doc//search')).toBe(
      'https://intlayer.org/doc/search'
    );
  });

  it('passes undefined through untouched', () => {
    expect(normalizeJsonLdUrl(undefined)).toBeUndefined();
  });
});

describe('buildCreativeWorkJsonLd', () => {
  it('formats valid dates as Schema.org YYYY-MM-DD', () => {
    const { datePublished, dateModified } = buildCreativeWorkJsonLd({
      ...creativeWorkParams,
      datePublished: new Date('2024-12-24'),
      dateModified: new Date('2025-06-29'),
    });

    expect(datePublished).toBe('2024-12-24');
    expect(dateModified).toBe('2025-06-29');
  });

  it('omits unparsable frontmatter dates instead of throwing', () => {
    // `2024-24-12` — a real typo in the blog frontmatter — used to bubble up a
    // `RangeError: Invalid Date` that aborted the whole static export.
    const buildWithInvalidDate = () =>
      buildCreativeWorkJsonLd({
        ...creativeWorkParams,
        datePublished: new Date('2024-24-12'),
        dateModified: new Date('2024-24-12'),
      });

    expect(buildWithInvalidDate).not.toThrow();
    expect(buildWithInvalidDate().datePublished).toBeUndefined();
    expect(buildWithInvalidDate().dateModified).toBeUndefined();
  });

  it('omits dates that were never provided', () => {
    const { datePublished, dateModified } =
      buildCreativeWorkJsonLd(creativeWorkParams);

    expect(datePublished).toBeUndefined();
    expect(dateModified).toBeUndefined();
  });
});

describe('buildCreativeWorkJsonLd', () => {
  it('formats valid dates as Schema.org YYYY-MM-DD', () => {
    const { datePublished, dateModified } = buildCreativeWorkJsonLd({
      ...creativeWorkParams,
      datePublished: new Date('2024-12-24'),
      dateModified: new Date('2025-06-29'),
    });

    expect(datePublished).toBe('2024-12-24');
    expect(dateModified).toBe('2025-06-29');
  });

  it('omits unparsable frontmatter dates instead of throwing', () => {
    // `2024-24-12` — a real typo in the blog frontmatter — used to bubble up a
    // `RangeError: Invalid Date` that aborted the whole static export.
    const buildWithInvalidDate = () =>
      buildCreativeWorkJsonLd({
        ...creativeWorkParams,
        datePublished: new Date('2024-24-12'),
        dateModified: new Date('2024-24-12'),
      });

    expect(buildWithInvalidDate).not.toThrow();
    expect(buildWithInvalidDate().datePublished).toBeUndefined();
    expect(buildWithInvalidDate().dateModified).toBeUndefined();
  });

  it('omits dates that were never provided', () => {
    const { datePublished, dateModified } =
      buildCreativeWorkJsonLd(creativeWorkParams);

    expect(datePublished).toBeUndefined();
    expect(dateModified).toBeUndefined();
  });
});

describe('buildItemListJsonLd', () => {
  const items = [
    { name: 'Bundle size', description: 'Load only the content a page uses.' },
    { name: 'Maintainability', description: 'Scope the content per feature.' },
  ];

  it('numbers the entries in the order they are given', () => {
    const { itemListElement, numberOfItems } = buildItemListJsonLd({ items });

    expect(numberOfItems).toBe(items.length);
    expect(itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, ...items[0] },
      { '@type': 'ListItem', position: 2, ...items[1] },
    ]);
  });

  it('omits the list name rather than declaring it empty', () => {
    expect(buildItemListJsonLd({ items })).not.toHaveProperty('name');
    expect(buildItemListJsonLd({ items, name: 'Why Intlayer' }).name).toBe(
      'Why Intlayer'
    );
  });
});
