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
});
