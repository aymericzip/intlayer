// @vitest-environment node
import type { ContentNode, Dictionary } from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import {
  buildUseIntlayerSnippet,
  findSiblingForSelection,
  getContentSummary,
  getItemNumbers,
  getShapeDrift,
  getVariantIdentities,
} from './siblingSelection';

const translation = (values: Record<string, string>): ContentNode =>
  ({ nodeType: NodeTypes.TRANSLATION, translation: values }) as ContentNode;

const makeDictionary = (
  qualifier: Pick<Dictionary, 'item' | 'variant'>,
  content: Record<string, ContentNode>
): Dictionary =>
  ({
    key: 'faq',
    ...qualifier,
    content: content as unknown as ContentNode,
  }) as Dictionary;

describe('getShapeDrift', () => {
  it('reports top-level keys an item lacks', () => {
    const siblings = [
      makeDictionary({ item: 1 }, { question: 'a', tags: 'x' }),
      makeDictionary({ item: 2 }, { question: 'b' }),
      makeDictionary({}, { shared: 'base' }),
    ];

    expect(getShapeDrift(siblings)).toEqual({ 2: ['tags'] });
  });

  it('merges keys of the same item across variants', () => {
    const siblings = [
      makeDictionary({ item: 1, variant: 'dark' }, { question: 'a' }),
      makeDictionary({ item: 1, variant: 'light' }, { tags: 'x' }),
      makeDictionary(
        { item: 2, variant: 'dark' },
        { question: 'b', tags: 'y' }
      ),
    ];

    expect(getShapeDrift(siblings)).toEqual({});
  });
});

describe('sibling selection', () => {
  const siblings = [
    makeDictionary({ item: 2, variant: 'dark' }, {}),
    makeDictionary({ item: 1, variant: 'dark' }, {}),
    makeDictionary({ item: 1, variant: { plan: 'pro' } }, {}),
    makeDictionary({ variant: ['black-friday', 'cyber-monday'] }, {}),
  ];

  it('lists items and variant identities', () => {
    expect(getItemNumbers(siblings)).toEqual([1, 2]);

    const identities = getVariantIdentities(siblings);
    expect(identities.map((variant) => variant.identity)).toEqual([
      'dark',
      '{"plan":"pro"}',
      '["black-friday","cyber-monday"]',
    ]);
    expect(identities[1]?.isStructured).toBe(true);
    expect(identities[2]?.aliases).toEqual(['cyber-monday']);
  });

  it('finds the sibling at an item × variant coordinate', () => {
    expect(
      findSiblingForSelection(siblings, { item: 1, variant: 'dark' })
    ).toBe(siblings[1]);
    expect(
      findSiblingForSelection(siblings, { item: null, variant: null })
    ).toBeUndefined();
  });

  it('builds the matching useIntlayer call', () => {
    const [dark, pro] = getVariantIdentities(siblings);

    expect(buildUseIntlayerSnippet('faq', null, undefined)).toBe(
      "useIntlayer('faq')"
    );
    expect(buildUseIntlayerSnippet('faq', 2, dark)).toBe(
      "useIntlayer('faq', { variant: 'dark', item: 2 })"
    );
    expect(buildUseIntlayerSnippet('faq', null, pro)).toBe(
      "useIntlayer('faq', { variant: { plan: 'pro' } })"
    );
  });
});

describe('getContentSummary', () => {
  it('returns the source preview and per-locale completeness', () => {
    const summary = getContentSummary(
      {
        question: translation({ en: 'Why?', fr: 'Pourquoi ?' }),
        answer: translation({ en: 'Because' }),
      } as unknown as ContentNode,
      ['en', 'fr'],
      'en'
    );

    expect(summary.preview).toBe('Why?');
    expect(summary.completenessByLocale).toEqual({ en: 1, fr: 0.5 });
  });
});
