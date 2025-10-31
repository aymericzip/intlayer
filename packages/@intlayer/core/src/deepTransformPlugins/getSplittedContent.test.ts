import { type Dictionary, NodeType } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { t } from '../transpiler';
import {
  getSplittedContent,
  getSplittedDictionaryContent,
} from './getSplittedContent';

describe('getSplittedContent', () => {
  it('splits common vs per-locale fields in a simple object', () => {
    const content: Dictionary = {
      key: 'test',
      content: {
        title: 'Common title',
        description: t({
          en: 'English description',
          fr: 'Description française',
        }),
      },
    };

    const result = getSplittedContent(content.content);

    expect(result.common).toEqual({ title: 'Common title' });
    expect(result.en).toEqual({ description: 'English description' });
    expect(result.fr).toEqual({ description: 'Description française' });
  });

  it('handles nested objects and arrays', () => {
    const content: Dictionary = {
      key: 'test',
      content: {
        meta: {
          keywords: t<string[]>({
            en: ['a', 'b'],
            fr: ['a_fr', 'b_fr'],
          }),
          author: 'Common author',
        },
        items: [
          {
            label: t({ en: 'Item EN', fr: 'Item FR' }),
            value: 1,
          },
          {
            label: t({ en: 'Second EN', fr: 'Second FR' }),
            value: 2,
          },
        ],
      },
    };

    const result = getSplittedContent(content.content);

    expect(result.common).toEqual({
      meta: { author: 'Common author' },
      items: [{ value: 1 }, { value: 2 }],
    });
    expect(result.en).toEqual({
      meta: { keywords: ['a', 'b'] },
      items: [{ label: 'Item EN' }, { label: 'Second EN' }],
    });
    expect(result.fr).toEqual({
      meta: { keywords: ['a_fr', 'b_fr'] },
      items: [{ label: 'Item FR' }, { label: 'Second FR' }],
    });
  });

  it('treats non-translation typed nodes as common', () => {
    const content: Dictionary = {
      key: 'test',
      content: {
        markdown: {
          nodeType: NodeType.Markdown,
          [NodeType.Markdown]: '# Title',
        },
        name: 'Common name',
      },
    };

    const result = getSplittedContent(content.content);
    expect(result.common).toEqual({
      markdown: {
        nodeType: NodeType.Markdown,
        [NodeType.Markdown]: '# Title',
      },
      name: 'Common name',
    });
    expect(result.en).toBeUndefined();
    expect(result.fr).toBeUndefined();
  });
});

describe('getSplittedDictionaryContent', () => {
  it('returns splitted content for a dictionary', () => {
    const dictionary: Dictionary = {
      key: 'test',
      content: {
        title: 'Common',
        desc: t({ en: 'EN', fr: 'FR' }),
      },
    };

    const result = getSplittedDictionaryContent(dictionary);
    expect(result.common).toEqual({ title: 'Common' });
    expect(result.en).toEqual({ desc: 'EN' });
    expect(result.fr).toEqual({ desc: 'FR' });
  });
});
