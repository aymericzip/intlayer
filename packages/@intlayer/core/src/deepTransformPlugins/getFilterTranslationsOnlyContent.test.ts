import type { ContentNode } from '@intlayer/types/dictionary';
import * as Locales from '@intlayer/types/locales';
import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import { getFilterTranslationsOnlyContent } from './getFilterTranslationsOnlyContent';

describe('getFilterTranslationsOnlyContent', () => {
  it('should return the content of a node with only the translation plugin', () => {
    const testData = {
      test1: {
        nodeType: NodeTypes.TRANSLATION,
        [NodeTypes.TRANSLATION]: {
          en: 'Hello',
          fr: 'Bonjour',
        },
      },
      test2: 'Hello',
      test3: {
        test4: {
          nodeType: NodeTypes.TRANSLATION,
          [NodeTypes.TRANSLATION]: {
            en: 'Hello',
            fr: 'Bonjour',
          },
        },
        test5: 'Hello',
        test6: [
          {
            nodeType: NodeTypes.TRANSLATION,
            [NodeTypes.TRANSLATION]: {
              en: 'Hello',
              fr: 'Bonjour',
            },
          },
          {
            nodeType: NodeTypes.TRANSLATION,
            [NodeTypes.TRANSLATION]: {
              en: 'Hello',
              fr: 'Bonjour',
            },
          },
          'Hello',
        ],
      },
      test7: {
        nodeType: NodeTypes.TRANSLATION,
        [NodeTypes.TRANSLATION]: {
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
