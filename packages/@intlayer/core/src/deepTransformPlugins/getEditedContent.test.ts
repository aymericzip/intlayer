import { describe, expect, it } from 'vitest';
import { getEditedContent, getEditedDictionary } from './getEditedContent';

const translation = (map: Record<string, unknown>) => ({
  nodeType: 'translation' as const,
  translation: map,
});

describe('getEditedContent', () => {
  it('includes a node whose source value changed, reduced to source only', () => {
    const previous = {
      title: translation({ en: 'Old', fr: 'Vieux' }),
      body: translation({ en: 'Body', fr: 'Corps' }),
    };
    const next = {
      title: translation({ en: 'New', fr: 'Vieux' }),
      body: translation({ en: 'Body', fr: 'Corps' }),
    };

    expect(getEditedContent(previous, next, 'en')).toEqual({
      title: translation({ en: 'New' }),
    });
  });

  it('excludes nodes whose source value is unchanged (even if a target changed)', () => {
    const previous = { title: translation({ en: 'Same', fr: 'Pareil' }) };
    const next = { title: translation({ en: 'Same', fr: 'Different' }) };

    expect(getEditedContent(previous, next, 'en')).toEqual({});
  });

  it('includes a brand-new node, reduced to source only', () => {
    const previous = { title: translation({ en: 'Title', fr: 'Titre' }) };
    const next = {
      title: translation({ en: 'Title', fr: 'Titre' }),
      subtitle: translation({ en: 'Subtitle' }),
    };

    expect(getEditedContent(previous, next, 'en')).toEqual({
      subtitle: translation({ en: 'Subtitle' }),
    });
  });

  it('returns {} when nothing changed', () => {
    const content = {
      title: translation({ en: 'A', fr: 'A' }),
      nested: { deep: translation({ en: 'B', fr: 'B' }) },
    };

    expect(getEditedContent(content, content, 'en')).toEqual({});
  });

  it('handles undefined previous content (full diff → all source-only)', () => {
    const next = {
      title: translation({ en: 'Title', fr: 'Titre' }),
    };

    expect(getEditedContent(undefined, next, 'en')).toEqual({
      title: translation({ en: 'Title' }),
    });
  });

  it('keeps only the changed branch in nested objects', () => {
    const previous = {
      group: {
        a: translation({ en: 'A', fr: 'A' }),
        b: translation({ en: 'B', fr: 'B' }),
      },
    };
    const next = {
      group: {
        a: translation({ en: 'A2', fr: 'A' }),
        b: translation({ en: 'B', fr: 'B' }),
      },
    };

    expect(getEditedContent(previous, next, 'en')).toEqual({
      group: { a: translation({ en: 'A2' }) },
    });
  });

  it('keeps array alignment: changed item source-only, unchanged item intact', () => {
    const previous = {
      items: [
        translation({ en: 'one', fr: 'un' }),
        translation({ en: 'two', fr: 'deux' }),
      ],
    };
    const next = {
      items: [
        translation({ en: 'one', fr: 'un' }),
        translation({ en: 'TWO', fr: 'deux' }),
      ],
    };

    expect(getEditedContent(previous, next, 'en')).toEqual({
      items: [translation({ en: 'one', fr: 'un' }), translation({ en: 'TWO' })],
    });
  });

  it('ignores plain primitive leaves (not locale-aware)', () => {
    const previous = { count: 1, label: translation({ en: 'A', fr: 'A' }) };
    const next = { count: 2, label: translation({ en: 'A', fr: 'A' }) };

    expect(getEditedContent(previous, next, 'en')).toEqual({});
  });
});

describe('getEditedDictionary', () => {
  it('returns a partial dictionary preserving the key', () => {
    const previous = {
      key: 'my-key',
      content: { title: translation({ en: 'Old', fr: 'Vieux' }) },
    };
    const next = {
      key: 'my-key',
      content: { title: translation({ en: 'New', fr: 'Vieux' }) },
    };

    expect(getEditedDictionary(previous, next, 'en')).toEqual({
      key: 'my-key',
      content: { title: translation({ en: 'New' }) },
    });
  });
});
