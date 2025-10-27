import {
  type ContentNode,
  type CustomIntlayerConfig,
  type Dictionary,
  Locales,
} from '@intlayer/types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { md } from '../transpiler/markdown';
import { t as tCore } from '../transpiler/translation';
import {
  getFilteredLocalesContent,
  getFilteredLocalesDictionary,
} from './getFilteredLocalesContent';

// Mock dependencies
vi.mock('@intlayer/config/built', () => ({
  default: {
    internationalization: {
      defaultLocale: Locales.ENGLISH,
    } as CustomIntlayerConfig,
  },
}));

const t = (translation: any) => tCore(translation);

describe('getFilteredLocalesContent', () => {
  const nodeProps = {
    dictionaryKey: 'test',
    keyPath: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should filter content to include only specified single locale', () => {
    const testData = {
      test1: t({
        en: 'Hello',
        fr: 'Bonjour',
        es: 'Hola',
      }),
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      Locales.FRENCH,
      nodeProps
    );

    // Should only return French translation
    expect(result).toEqual({
      test1: t({
        fr: 'Bonjour',
      }),
    });
  });

  it('should filter content to include multiple specified locales', () => {
    const testData = {
      test1: t({
        en: 'Hello',
        fr: 'Bonjour',
        es: 'Hola',
        de: 'Hallo',
      }),
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      [Locales.FRENCH, Locales.SPANISH],
      nodeProps
    );

    // Should return French and Spanish translations only
    expect(result).toEqual({
      test1: t({
        fr: 'Bonjour',
        es: 'Hola',
      }),
    });
  });

  it('should handle nested objects with filtered translations', () => {
    const testData = {
      level1: {
        test1: t({
          en: 'Hello',
          fr: 'Bonjour',
          es: 'Hola',
        }),
        test2: t({
          en: 'World',
          fr: 'Monde',
          es: 'Mundo',
        }),
        level2: {
          test3: t({
            en: 'Nested',
            fr: 'Imbriqué',
            es: 'Anidado',
          }),
        },
      },
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      Locales.FRENCH,
      nodeProps
    );

    // Should only return French translations
    expect(result).toEqual({
      level1: {
        test1: t({
          fr: 'Bonjour',
        }),
        test2: t({
          fr: 'Monde',
        }),
        level2: {
          test3: t({
            fr: 'Imbriqué',
          }),
        },
      },
    });
  });

  it('should handle arrays with filtered translations', () => {
    const testData = [
      t({
        en: 'Hello',
        fr: 'Bonjour',
        es: 'Hola',
      }),
      t({
        en: 'World',
        fr: 'Monde',
        es: 'Mundo',
      }),
      'Regular string',
    ];

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      Locales.FRENCH,
      nodeProps
    );

    // Should return array with French translations and preserve non-translation content
    expect(result).toEqual([
      t({ fr: 'Bonjour' }),
      t({ fr: 'Monde' }),
      'Regular string',
    ]);
  });

  it('should preserve non-translation content', () => {
    const testData = {
      test1: t({
        en: 'Hello',
        fr: 'Bonjour',
      }),
      test2: 'Regular string',
      test3: 123,
      test4: true,
      test5: null,
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      Locales.FRENCH,
      nodeProps
    );

    // Should filter translations but keep other content as-is
    expect(result).toEqual({
      test1: t({ fr: 'Bonjour' }),
      test2: 'Regular string',
      test3: 123,
      test4: true,
      test5: null,
    });
  });

  it('should handle empty objects and arrays', () => {
    const testData = {
      emptyObject: {},
      emptyArray: [],
      translation: t({
        en: 'Hello',
        fr: 'Bonjour',
      }),
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      Locales.FRENCH,
      nodeProps
    );

    expect(result).toEqual({
      emptyObject: {},
      emptyArray: [],
      translation: t({ fr: 'Bonjour' }),
    });
  });

  it('should handle null and undefined values gracefully', () => {
    const testData = {
      nullValue: null,
      undefinedValue: undefined,
      validTranslation: t({
        en: 'Hello',
        fr: 'Bonjour',
      }),
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      Locales.FRENCH,
      nodeProps
    );

    expect(result).toEqual({
      nullValue: null,
      undefinedValue: undefined,
      validTranslation: t({ fr: 'Bonjour' }),
    });
  });

  it('should handle complex nested structures with multiple locales', () => {
    const testData = {
      section1: {
        title: t({
          en: 'Title',
          fr: 'Titre',
          es: 'Título',
        }),
        items: [
          t({
            en: 'Item 1',
            fr: 'Article 1',
            es: 'Artículo 1',
          }),
          t({
            en: 'Item 2',
            fr: 'Article 2',
            es: 'Artículo 2',
          }),
        ],
        description: 'Regular text',
      },
      section2: t({
        en: 'Section 2',
        fr: 'Section 2',
        es: 'Sección 2',
      }),
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      [Locales.FRENCH, Locales.SPANISH],
      nodeProps
    );

    // Should return French and Spanish translations
    expect(result).toEqual({
      section1: {
        title: t({
          fr: 'Titre',
          es: 'Título',
        }),
        items: [
          t({
            fr: 'Article 1',
            es: 'Artículo 1',
          }),
          t({
            fr: 'Article 2',
            es: 'Artículo 2',
          }),
        ],
        description: 'Regular text',
      },
      section2: t({
        fr: 'Section 2',
        es: 'Sección 2',
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
            fr: {
              title: 'Titre Profond',
              description: 'Description Profonde',
            },
            es: {
              title: 'Título Profundo',
              description: 'Descripción Profunda',
            },
          }),
        },
      },
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      Locales.FRENCH,
      nodeProps
    );

    expect(result).toEqual({
      level1: {
        level2: {
          level3: t({
            fr: {
              title: 'Titre Profond',
              description: 'Description Profonde',
            },
          }),
        },
      },
    });
  });

  it('should filter when locale is missing from some translations', () => {
    const testData = {
      test1: t({
        en: 'Hello',
        fr: 'Bonjour',
        // Missing 'es'
      }),
      test2: t({
        en: 'World',
        fr: 'Monde',
        es: 'Mundo',
      }),
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      Locales.SPANISH,
      nodeProps
    );

    // Should only return Spanish where it exists
    expect(result).toEqual({
      test1: t({}), // Empty translation object for test1 (no Spanish)
      test2: t({ es: 'Mundo' }),
    });
  });

  it('should handle mixed content with arrays and objects', () => {
    const testData = {
      navigation: {
        items: [
          {
            label: t({
              en: 'Home',
              fr: 'Accueil',
              es: 'Inicio',
            }),
            href: '/home',
          },
          {
            label: t({
              en: 'About',
              fr: 'À propos',
              es: 'Acerca de',
            }),
            href: '/about',
          },
        ],
      },
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      Locales.FRENCH,
      nodeProps
    );

    expect(result).toEqual({
      navigation: {
        items: [
          {
            label: t({ fr: 'Accueil' }),
            href: '/home',
          },
          {
            label: t({ fr: 'À propos' }),
            href: '/about',
          },
        ],
      },
    });
  });

  it('should handle translations with all locales when filtering by all', () => {
    const testData = {
      test: t({
        en: 'Hello',
        fr: 'Bonjour',
        es: 'Hola',
      }),
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
      nodeProps
    );

    // Should return all three locales
    expect(result).toEqual({
      test: t({
        en: 'Hello',
        fr: 'Bonjour',
        es: 'Hola',
      }),
    });
  });

  it('should handle single locale array parameter', () => {
    const testData = {
      test: t({
        en: 'Hello',
        fr: 'Bonjour',
        es: 'Hola',
      }),
    };

    const result = getFilteredLocalesContent(
      testData as unknown as ContentNode,
      [Locales.FRENCH],
      nodeProps
    );

    // Should return only French
    expect(result).toEqual({
      test: t({ fr: 'Bonjour' }),
    });
  });
});

describe('getFilteredLocalesDictionary', () => {
  it('should filter dictionary content to specified locale', () => {
    const dictionary: Dictionary = {
      key: 'test-dictionary',
      content: {
        test1: t({
          en: 'Hello',
          fr: 'Bonjour',
          es: 'Hola',
        }),
        test2: t({
          en: 'World',
          fr: 'Monde',
          es: 'Mundo',
        }),
      },
    } as unknown as Dictionary;

    const result = getFilteredLocalesDictionary(dictionary, Locales.FRENCH);

    expect(result).toEqual({
      key: 'test-dictionary',
      content: {
        test1: t({ fr: 'Bonjour' }),
        test2: t({ fr: 'Monde' }),
      },
    });
  });

  it('should filter dictionary content to multiple specified locales', () => {
    const dictionary: Dictionary = {
      key: 'test-dictionary',
      content: {
        test: t({
          en: 'Hello',
          fr: 'Bonjour',
          es: 'Hola',
          de: 'Hallo',
        }),
      },
    } as unknown as Dictionary;

    const result = getFilteredLocalesDictionary(dictionary, [
      Locales.FRENCH,
      Locales.SPANISH,
    ]);

    expect(result).toEqual({
      key: 'test-dictionary',
      content: {
        test: t({
          fr: 'Bonjour',
          es: 'Hola',
        }),
      },
    });
  });

  it('should handle complex dictionary with nested content', () => {
    const dictionary: Dictionary = {
      key: 'complex-dictionary',
      content: {
        navigation: {
          home: t({
            en: 'Home',
            fr: 'Accueil',
          }),
          about: t({
            en: 'About',
            fr: 'À propos',
          }),
        },
        footer: {
          copyright: t({
            en: 'All rights reserved',
            fr: 'Tous droits réservés',
          }),
        },
        markdownMultilingual2: md(
          t({
            en: '## test en',
            fr: '## test fr',
          })
        ),
      },
    } as unknown as Dictionary;

    const result = getFilteredLocalesDictionary(dictionary, Locales.FRENCH);

    expect(JSON.stringify(result)).toEqual(
      JSON.stringify({
        key: 'complex-dictionary',
        content: {
          navigation: {
            home: t({ fr: 'Accueil' }),
            about: t({ fr: 'À propos' }),
          },
          footer: {
            copyright: t({ fr: 'Tous droits réservés' }),
          },
          markdownMultilingual2: md(
            t({
              fr: '## test fr',
            })
          ),
        },
      })
    );
  });
});
