import { type ContentNode, Locales, NodeType } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getFilterTranslationsOnlyContent } from './getFilterTranslationsOnlyContent';

describe('getFilterTranslationsOnlyContent', () => {
  it('should return the content of a node with only the translation plugin', () => {
    const testData = {
      test1: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: 'Hello',
          fr: 'Bonjour',
        },
      },
      test2: 'Hello',
      test3: {
        test4: {
          nodeType: NodeType.Translation,
          [NodeType.Translation]: {
            en: 'Hello',
            fr: 'Bonjour',
          },
        },
        test5: 'Hello',
        test6: [
          {
            nodeType: NodeType.Translation,
            [NodeType.Translation]: {
              en: 'Hello',
              fr: 'Bonjour',
            },
          },
          {
            nodeType: NodeType.Translation,
            [NodeType.Translation]: {
              en: 'Hello',
              fr: 'Bonjour',
            },
          },
          'Hello',
        ],
      },
      test7: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: {
            test8: 'Hello',
          },
          fr: {
            test8: 'Bonjour',
          },
        },
      },
    };

    const expectedResult = {
      test1: 'Hello',
      test3: {
        test4: 'Hello',
        test6: ['Hello', 'Hello', 'Hello'],
      },
      test7: {
        test8: 'Hello',
      },
    };

    const result = getFilterTranslationsOnlyContent(
      testData as unknown as ContentNode,
      Locales.ENGLISH,
      {
        dictionaryKey: '',
        keyPath: [],
      }
    );

    expect(result).toEqual(expectedResult);
  });
});
