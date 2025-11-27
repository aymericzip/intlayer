import { type ContentNode, Locales, NodeType } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getMissingLocalesContent } from './getMissingLocalesContent';

describe('getMissingLocalesContent', () => {
  it('should collect locales missing in any translation node', () => {
    const data = {
      a: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: 'Hello',
        },
      },
      b: {
        c: {
          nodeType: NodeType.Translation,
          [NodeType.Translation]: {
            en: 'World',
            fr: 'Monde',
          },
        },
      },
    };

    const result = getMissingLocalesContent(
      data as unknown as ContentNode,
      [Locales.ENGLISH, Locales.FRENCH],
      {
        dictionaryKey: '',
        keyPath: [],
      }
    );

    expect(result.sort()).toEqual([Locales.FRENCH].sort());
  });

  it('should return an empty array when all locales are present', () => {
    const data = {
      x: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: 'Hi',
          fr: 'Salut',
        },
      },
      y: [
        {
          nodeType: NodeType.Translation,
          [NodeType.Translation]: {
            en: 'There',
            fr: 'Là',
          },
        },
      ],
    };

    const result = getMissingLocalesContent(
      data as unknown as ContentNode,
      [Locales.ENGLISH, Locales.FRENCH],
      {
        dictionaryKey: '',
        keyPath: [],
      }
    );

    expect(result).toEqual([]);
  });

  it('should handle arrays and deep nesting', () => {
    const data = {
      list: [
        {
          nodeType: NodeType.Translation,
          [NodeType.Translation]: {
            en: 'One',
          },
        },
        {
          group: {
            inner: {
              nodeType: NodeType.Translation,
              [NodeType.Translation]: {
                en: 'Two',
                fr: 'Deux',
              },
            },
          },
        },
      ],
    };

    const result = getMissingLocalesContent(
      data as unknown as ContentNode,
      [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
      {
        dictionaryKey: '',
        keyPath: [],
      }
    );

    expect(result.sort()).toEqual([Locales.FRENCH, Locales.SPANISH].sort());
  });

  it('should return empty when there are no translation nodes', () => {
    const data = {
      plain: 'text',
      nested: { value: 42 },
      arr: [1, 2, 3],
    };

    const result = getMissingLocalesContent(
      data as unknown as ContentNode,
      [Locales.ENGLISH, Locales.FRENCH],
      {
        dictionaryKey: '',
        keyPath: [],
      }
    );

    expect(result).toEqual([]);
  });

  it('should return empty when locales input is empty', () => {
    const data = {
      t: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: 'Hello',
        },
      },
    };

    const result = getMissingLocalesContent(
      data as unknown as ContentNode,
      [],
      {
        dictionaryKey: '',
        keyPath: [],
      }
    );

    expect(result).toEqual([]);
  });

  it('should not duplicate missing locales across multiple nodes', () => {
    const data = {
      n1: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: 'A',
        },
      },
      n2: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          fr: 'B',
        },
      },
    };

    const result = getMissingLocalesContent(
      data as unknown as ContentNode,
      [Locales.ENGLISH, Locales.FRENCH],
      {
        dictionaryKey: '',
        keyPath: [],
      }
    );

    expect(result.sort()).toEqual([Locales.ENGLISH, Locales.FRENCH].sort());
  });

  it('should detect missing locale when translation values are objects', () => {
    const data = {
      index: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: {
            Index: {
              title: 'Home',
            },
          },
          de: {
            Index: {
              title: 'Start',
            },
          },
          // Note: intentionally missing "es"
        },
      },
    };

    const result = getMissingLocalesContent(
      data as unknown as ContentNode,
      [Locales.ENGLISH, Locales.GERMAN, Locales.SPANISH],
      {
        dictionaryKey: 'index',
        keyPath: [],
      }
    );

    expect(result.sort()).toEqual([Locales.SPANISH].sort());
  });

  it('should detect missing keys when translation values are objects with different structures', () => {
    const data = {
      home: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: {
            title: 'Home',
            description: 'Home page description',
            welcome: 'Welcome',
          },
          es: {
            welcome: 'Bienvenido',
            // Missing: title, description
          },
          fr: {}, // Missing: all keys
        },
      },
    };

    const result = getMissingLocalesContent(
      data as unknown as ContentNode,
      [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
      {
        dictionaryKey: 'home',
        keyPath: [],
      }
    );

    // es is missing title and description, fr is missing all keys
    expect(result.sort()).toEqual([Locales.SPANISH, Locales.FRENCH].sort());
  });

  it('should NOT flag locales as missing when arrays have different lengths', () => {
    // This reproduces the bug with website.content.ts where different locales
    // have different numbers of keywords (e.g., 'en' has 12 items, 'fr' has 13)
    const data = {
      keywords: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: ['translation', 'localization', 'multilingual'],
          fr: [
            'Traduction',
            'Localisation',
            'Multilingue',
            'SEO', // Extra item
          ],
          es: ['Traducción', 'Localización'],
        },
      },
    };

    const result = getMissingLocalesContent(
      data as unknown as ContentNode,
      [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
      {
        dictionaryKey: 'keywords',
        keyPath: [],
      }
    );

    // All locales have translations, just different array lengths - should be empty
    expect(result).toEqual([]);
  });

  it('should still detect missing locales when one locale has no array at all', () => {
    const data = {
      keywords: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: ['translation', 'localization'],
          // fr is completely missing
        },
      },
    };

    const result = getMissingLocalesContent(
      data as unknown as ContentNode,
      [Locales.ENGLISH, Locales.FRENCH],
      {
        dictionaryKey: 'keywords',
        keyPath: [],
      }
    );

    expect(result).toEqual([Locales.FRENCH]);
  });

  it('should handle arrays of objects without comparing array lengths', () => {
    const data = {
      items: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }],
          fr: [{ name: 'Article 1' }, { name: 'Article 2' }],
        },
      },
    };

    const result = getMissingLocalesContent(
      data as unknown as ContentNode,
      [Locales.ENGLISH, Locales.FRENCH],
      {
        dictionaryKey: 'items',
        keyPath: [],
      }
    );

    // Both locales have arrays, just different lengths - should be empty
    expect(result).toEqual([]);
  });
});
