import type { DocMetadata } from '@intlayer/docs';
import { describe, expect, it } from 'vitest';
import { createDocSearchIndex, searchDocIndex } from './docSearchIndex';

const createDoc = (
  docKey: string,
  title: string,
  priority?: number
): DocMetadata => ({
  docKey,
  title,
  priority,
  url: `https://intlayer.org/doc/${docKey}`,
  relativeUrl: `/doc/${docKey}`,
  githubUrl: '',
  slugs: ['doc', docKey],
  description: '',
  keywords: [],
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
});

describe('searchDocIndex', () => {
  it('ranks the higher priority page first among equally relevant matches', () => {
    const docs = [
      createDoc('package', 'useLocale hook', 5),
      createDoc('guide', 'useLocale hook', 10),
    ];

    const results = searchDocIndex(createDocSearchIndex(docs), 'useLocale');

    expect(results.map((doc) => doc.docKey)).toEqual(['guide', 'package']);
  });

  it('keeps a far more relevant match ahead of a higher priority one', () => {
    const docs = [
      createDoc('guide', 'Next.js internationalization routing guide', 10),
      createDoc('faq', 'Routing', 2),
    ];

    const results = searchDocIndex(createDocSearchIndex(docs), 'Routing');

    expect(results[0]?.docKey).toBe('faq');
  });

  it('treats a page without priority as a default priority page', () => {
    const docs = [createDoc('low', 'Plural', 2), createDoc('unset', 'Plural')];

    const results = searchDocIndex(createDocSearchIndex(docs), 'Plural');

    expect(results.map((doc) => doc.docKey)).toEqual(['unset', 'low']);
  });
});
