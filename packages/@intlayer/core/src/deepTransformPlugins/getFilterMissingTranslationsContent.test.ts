import { type CustomIntlayerConfig, Locales } from '@intlayer/config/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { t } from '../transpiler';
import type { ContentNode } from '../types';
import { getFilterMissingTranslationsContent } from './getFilterMissingTranslationsContent';

// Mock dependencies
vi.mock('@intlayer/config/built', () => ({
  default: {
    internationalization: {
      defaultLocale: Locales.ENGLISH,
    } as CustomIntlayerConfig,
  },
}));

describe('getFilterMissingTranslationsContent', () => {
  const nodeProps = {
    dictionaryKey: 'test',
    keyPath: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return content only for missing translations', () => {
    const testData = {
      test1: t({
        en: 'Hello',
        // Missing 'fr' translation
      }),
      test2: t({
        en: 'Hello',
        fr: 'Bonjour', // Has 'fr' translation
      }),
      test3: 'Hello', // Non-translation content
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (missing)
      nodeProps
    );

    // Should only return content for test1 (missing fr translation)
    // test2 should be filtered out (has fr translation)
    // test3 should be filtered out (not a translation)
    expect(result).toEqual({
      test1: 'Hello', // Base locale fallback
    });
  });

  it('should return nothing when all translations are present', () => {
    const testData = {
      test1: t({
        en: 'Hello',
        fr: 'Bonjour', // Has 'fr' translation
      }),
      test2: t({
        en: 'World',
        fr: 'Monde', // Has 'fr' translation
      }),
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (present)
      nodeProps
    );

    // Should return empty object since all translations are present
    expect(result).toEqual({});
  });

  it('should handle nested objects with mixed translation states', () => {
    const testData = {
      level1: {
        test1: t({
          en: 'Hello',
          // Missing 'fr' translation
        }),
        test2: t({
          en: 'World',
          fr: 'Monde', // Has 'fr' translation
        }),
        test3: 'Regular string', // Non-translation content
        level2: {
          test4: t({
            en: 'Nested',
            // Missing 'fr' translation
          }),
        },
      },
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (missing)
      nodeProps
    );

    // Should only return content for missing translations
    expect(result).toEqual({
      level1: {
        test1: 'Hello', // Base locale fallback
        level2: {
          test4: 'Nested', // Base locale fallback
        },
      },
    });
  });

  it('should handle arrays with mixed translation states', () => {
    const testData = [
      t({
        en: 'Hello',
        // Missing 'fr' translation
      }),
      t({
        en: 'World',
        fr: 'Monde', // Has 'fr' translation
      }),
      'Regular string', // Non-translation content
    ];

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (missing)
      nodeProps
    );

    // Should return array with only missing translations
    expect(result).toEqual(['Hello', 'Regular string']);
  });

  it('should use fallback locale when base locale is missing', () => {
    const testData = {
      test1: t({
        es: 'Hola', // Only Spanish, no English
        // Missing 'fr' translation
      }),
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (missing)
      nodeProps
    );

    // Should use fallback locale
    expect(result).toEqual({
      test1: 'Hola', // Fallback locale
    });
  });

  it('should handle complex nested structures', () => {
    const testData = {
      section1: {
        title: t({
          en: 'Title',
          // Missing 'fr' translation
        }),
        items: [
          t({
            en: 'Item 1',
            fr: 'Article 1', // Has 'fr' translation
          }),
          t({
            en: 'Item 2',
            // Missing 'fr' translation
          }),
        ],
        description: 'Regular text', // Non-translation content
      },
      section2: t({
        en: 'Section 2',
        fr: 'Section 2', // Has 'fr' translation
      }),
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (missing)
      nodeProps
    );

    // Should only return content for missing translations
    expect(result).toEqual({
      section1: {
        title: 'Title', // Base locale fallback
        items: ['Item 2', 'Regular text'], // Only missing translation and non-translation content
      },
    });
  });

  it('should handle empty objects and arrays', () => {
    const testData = {
      emptyObject: {},
      emptyArray: [],
      mixedArray: [
        t({
          en: 'Hello',
          // Missing 'fr' translation
        }),
      ],
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (missing)
      nodeProps
    );

    expect(result).toEqual({
      mixedArray: ['Hello'], // Only the missing translation
    });
  });

  it('should handle null and undefined values gracefully', () => {
    const testData = {
      nullValue: null,
      undefinedValue: undefined,
      validTranslation: t({
        en: 'Hello',
        // Missing 'fr' translation
      }),
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (missing)
      nodeProps
    );

    expect(result).toEqual({
      validTranslation: 'Hello', // Only the valid translation with missing locale
    });
  });

  it('should handle deeply nested translation structures', () => {
    const testData = {
      level1: {
        level2: {
          level3: t({
            en: {
              title: 'Deep Title',
              description: 'Deep Description',
            },
            // Missing 'fr' translation
          }),
        },
      },
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (missing)
      nodeProps
    );

    expect(result).toEqual({
      level1: {
        level2: {
          level3: {
            title: 'Deep Title',
            description: 'Deep Description',
          },
        },
      },
    });
  });
});
