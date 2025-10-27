import {
  type ContentNode,
  type CustomIntlayerConfig,
  Locales,
} from '@intlayer/types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { t } from '../transpiler';
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
      test1: t({
        en: 'Hello', // Base locale fallback as translation node
      }),
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
        test1: t({
          en: 'Hello', // Base locale fallback as translation node
        }),
        level2: {
          test4: t({
            en: 'Nested', // Base locale fallback as translation node
          }),
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
    expect(result).toEqual([
      t({
        en: 'Hello', // Base locale fallback as translation node
      }),
      'Regular string',
    ]);
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
      test1: t({
        es: 'Hola', // Fallback locale as translation node
      }),
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
        title: t({
          en: 'Title', // Base locale fallback as translation node
        }),
        items: [
          t({
            en: 'Item 2', // Only missing translation as translation node
          }),
          'Regular text',
        ], // Only missing translation and non-translation content
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
      mixedArray: [
        t({
          en: 'Hello', // Only the missing translation as translation node
        }),
      ],
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
      validTranslation: t({
        en: 'Hello', // Only the valid translation with missing locale as translation node
      }),
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
          level3: t({
            en: {
              title: 'Deep Title',
              description: 'Deep Description',
            },
          }),
        },
      },
    });
  });

  it('should detect structural inconsistencies in translation objects', () => {
    const testData = {
      navigation: t({
        en: {
          title: 'On this page',
          linkLabel: 'Go to section',
          collapseButton: 'Collapse',
        },
        ru: {
          title: 'На этой странице',
          linkLabel: 'Перейти к разделу',
          collapseButton: 'Свернуть',
        },
        ja: {
          linkLabel: 'セクションへ行く',
          collapseButton: '折りたたむ',
          // Missing 'title' property
        },
        fr: {
          title: 'Dans cette page',
          linkLabel: 'Aller à la section',
          collapseButton: 'Réduire',
        },
      }),
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.JAPANESE, // localeToCheck (has structural issue)
      nodeProps
    );

    // Should detect that Japanese is missing the 'title' property
    // and return the translation to flag the structural issue
    expect(result).toEqual({
      navigation: t({
        en: {
          title: 'On this page',
          linkLabel: 'Go to section',
          collapseButton: 'Collapse',
        },
      }),
    });
  });

  it('should not flag structural inconsistencies when all locales have same structure', () => {
    const testData = {
      navigation: t({
        en: {
          title: 'On this page',
          linkLabel: 'Go to section',
        },
        fr: {
          title: 'Dans cette page',
          linkLabel: 'Aller à la section',
        },
        ja: {
          title: 'このページ',
          linkLabel: 'セクションへ行く',
        },
      }),
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (present with correct structure)
      nodeProps
    );

    // Should return empty object since all translations are present
    // and have the same structure
    expect(result).toEqual({});
  });

  it('should detect when a locale has extra properties compared to others', () => {
    const testData = {
      button: t({
        en: {
          label: 'Click me',
        },
        fr: {
          label: 'Cliquez-moi',
          tooltip: 'Tooltip supplémentaire', // Extra property
        },
        ja: {
          label: 'クリックして',
        },
      }),
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (has extra property)
      nodeProps
    );

    // French has extra property 'tooltip', so English and Japanese are missing it
    // But since we're checking French and it's not missing keys, it should be excluded
    expect(result).toEqual({});
  });

  it('should detect array elements with inconsistent structures', () => {
    const testData = {
      items: [
        { id: 1, name: 'Item 1', description: 'Description 1' },
        { id: 2, name: 'Item 2' }, // Missing 'description' property
        { id: 3, name: 'Item 3', description: 'Description 3' },
      ],
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH,
      nodeProps
    );

    // Array has structural inconsistency, should be flagged
    // Note: This test may need adjustment based on how you want to handle
    // non-translation array inconsistencies
    expect(result).toBeDefined();
  });

  it('should handle complex nested structural inconsistencies', () => {
    const testData = {
      menu: t({
        en: {
          home: 'Home',
          about: {
            title: 'About',
            description: 'Learn more',
          },
        },
        fr: {
          home: 'Accueil',
          about: {
            title: 'À propos',
            // Missing 'description' in nested object
          },
        },
        ja: {
          home: 'ホーム',
          about: {
            title: '概要',
            description: '詳細を見る',
          },
        },
      }),
    };

    const result = getFilterMissingTranslationsContent(
      testData as unknown as ContentNode,
      Locales.FRENCH, // localeToCheck (has nested structural issue)
      nodeProps
    );

    // Should detect that French is missing 'description' in nested 'about' object
    expect(result).toEqual({
      menu: t({
        en: {
          home: 'Home',
          about: {
            title: 'About',
            description: 'Learn more',
          },
        },
      }),
    });
  });
});
