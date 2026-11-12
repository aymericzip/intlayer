// @vitest-environment node
import type { ContentNode } from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import { getCellStatus, indexCells } from './cellStatus';
import { computeChangeSet } from './changeSet';
import { convertNodeType } from './convertNodeType';
import {
  flattenContentRows,
  getIsMarkdownDocument,
  SHARED_CELL_KEY,
} from './flattenContentRows';

const options = { locales: ['en', 'fr', 'pl'], sourceLocale: 'en' };

const translation = (values: Record<string, ContentNode>): ContentNode =>
  ({ nodeType: NodeTypes.TRANSLATION, translation: values }) as ContentNode;

const sampleContent = {
  title: translation({ en: 'Shoes', fr: 'Chaussures' }),
  price: 49.9,
  reviews: translation({
    en: {
      nodeType: NodeTypes.PLURAL,
      plural: { one: '1', other: 'n' },
    } as unknown as ContentNode,
    pl: {
      nodeType: NodeTypes.PLURAL,
      plural: { one: '1', few: 'f', many: 'm', other: 'n' },
    } as unknown as ContentNode,
  }),
  body: {
    nodeType: NodeTypes.MARKDOWN,
    markdown: translation({ en: '# Title', fr: '# Titre' }),
  },
  features: [{ label: translation({ en: 'Light', fr: 'Léger' }) }],
  hero: { nodeType: NodeTypes.REACT_NODE, reactNode: {} },
} as unknown as ContentNode;

const rowsById = (content: ContentNode) =>
  new Map(flattenContentRows(content, options).map((row) => [row.id, row]));

describe('flattenContentRows', () => {
  it('lifts translations into locale cells', () => {
    const title = rowsById(sampleContent).get('title');

    expect(title?.kind).toBe('leaf');
    expect(title?.isLocalized).toBe(true);
    expect(title?.typeChain).toEqual(['translation', 'text']);
    expect(title?.cells.fr?.value).toBe('Chaussures');
    expect(title?.cells.fr?.keyPath).toEqual([
      { type: 'object', key: 'title' },
      { type: 'translation', key: 'fr' },
    ]);
    expect(title?.cells.pl?.isMissing).toBe(true);
    expect(title?.rootKeyPath).toEqual([{ type: 'object', key: 'title' }]);
  });

  it('keeps shared values in a single cell', () => {
    const price = rowsById(sampleContent).get('price');

    expect(price?.isLocalized).toBe(false);
    expect(Object.keys(price?.cells ?? {})).toEqual([SHARED_CELL_KEY]);
    expect(price?.leafKind).toBe('number');
  });

  it('merges plural categories of every locale in CLDR order', () => {
    const rows = rowsById(sampleContent);
    const reviews = rows.get('reviews');

    expect(reviews?.kind).toBe('group');
    expect(reviews?.typeChain).toEqual(['translation', 'plural']);
    expect(reviews?.childIds).toEqual([
      'reviews.one',
      'reviews.few',
      'reviews.many',
      'reviews.other',
    ]);
    expect(rows.get('reviews.few')?.cells.pl?.keyPath).toEqual([
      { type: 'object', key: 'reviews' },
      { type: 'translation', key: 'pl' },
      { type: 'plural', key: 'few' },
    ]);
    expect(rows.get('reviews.few')?.cells.en).toBeUndefined();
    expect(rows.get('reviews.one')?.rootKeyPath).toBeUndefined();
  });

  it('renders markdown(translation) as one markdown row per locale', () => {
    const body = rowsById(sampleContent).get('body');

    expect(body?.leafKind).toBe('markdown');
    expect(body?.typeChain).toEqual(['markdown', 'translation', 'text']);
    expect(body?.cells.fr?.keyPath).toEqual([
      { type: 'object', key: 'body' },
      { type: 'markdown' },
      { type: 'translation', key: 'fr' },
    ]);
  });

  it('builds array paths and keeps tree order', () => {
    const ids = flattenContentRows(sampleContent, options).map((row) => row.id);

    expect(ids).toContain('features[0].label');
    expect(ids.indexOf('features')).toBeLessThan(
      ids.indexOf('features[0].label')
    );
    expect(ids.indexOf('reviews.other')).toBeLessThan(ids.indexOf('body'));
  });

  it('flags code-only nodes as read-only', () => {
    expect(rowsById(sampleContent).get('hero')?.leafKind).toBe('readonly');
  });

  it('detects markdown documents', () => {
    expect(
      getIsMarkdownDocument({
        nodeType: NodeTypes.MARKDOWN,
        markdown: '# Doc',
      } as ContentNode)
    ).toBe(true);
    expect(getIsMarkdownDocument(sampleContent)).toBe(false);
  });
});

describe('getCellStatus', () => {
  const originalRows = flattenContentRows(sampleContent, options);
  const context = {
    sourceLocale: 'en',
    originalCells: indexCells(originalRows),
    aiCellIds: new Set<string>(),
    lockedLocales: new Set<string>(),
  };

  it('reports missing, done and read-only cells', () => {
    const rows = rowsById(sampleContent);
    const title = rows.get('title');

    expect(title && getCellStatus(title, 'pl', context)).toBe('missing');
    expect(title && getCellStatus(title, 'fr', context)).toBe('done');
    const hero = rows.get('hero');
    expect(hero && getCellStatus(hero, SHARED_CELL_KEY, context)).toBe(
      'readonly'
    );
  });

  it('reports edited, identical, ai and locked cells', () => {
    const edited = {
      ...(sampleContent as unknown as Record<string, ContentNode>),
      title: translation({ en: 'Shoes', fr: 'Shoes', pl: 'Buty' }),
    } as unknown as ContentNode;
    const title = rowsById(edited).get('title');
    if (!title) throw new Error('missing title row');

    expect(getCellStatus(title, 'pl', context)).toBe('edited');
    expect(getCellStatus(title, 'fr', context)).toBe('edited');
    expect(
      getCellStatus(title, 'en', {
        ...context,
        aiCellIds: new Set(['title::en']),
      })
    ).toBe('ai');
    expect(
      getCellStatus(title, 'pl', { ...context, lockedLocales: new Set(['pl']) })
    ).toBe('locked');

    const savedIdentical = flattenContentRows(edited, options);
    expect(
      getCellStatus(title, 'fr', {
        ...context,
        originalCells: indexCells(savedIdentical),
      })
    ).toBe('identical');
  });
});

describe('computeChangeSet', () => {
  it('lists added, changed and removed leaves', () => {
    const edited = {
      title: translation({ en: 'Sneakers', fr: 'Chaussures', pl: 'Buty' }),
      reviews: (sampleContent as unknown as Record<string, ContentNode>)
        .reviews,
      body: (sampleContent as unknown as Record<string, ContentNode>).body,
      features: (sampleContent as unknown as Record<string, ContentNode>)
        .features,
      hero: (sampleContent as unknown as Record<string, ContentNode>).hero,
    } as unknown as ContentNode;

    const entries = computeChangeSet(
      flattenContentRows(sampleContent, options),
      flattenContentRows(edited, options)
    );
    const byId = new Map(entries.map((entry) => [entry.cellId, entry]));

    expect(byId.get('title::en')?.kind).toBe('changed');
    expect(byId.get('title::en')?.previousValue).toBe('Shoes');
    expect(byId.get('title::pl')?.kind).toBe('added');
    expect(byId.get('price::*')?.kind).toBe('removed');
    expect(entries).toHaveLength(3);
  });
});

describe('convertNodeType', () => {
  it('wraps text into a translation, keeping it as the source locale', () => {
    const { node, isLossless } = convertNodeType(
      'Hello',
      'translation',
      options
    );

    expect(isLossless).toBe(true);
    expect(node).toEqual(translation({ en: 'Hello', fr: '', pl: '' }));
  });

  it('wraps a translation into markdown without losing locales', () => {
    const source = translation({ en: 'a', fr: 'b' });
    const { node } = convertNodeType(source, 'markdown', options);

    expect(node).toEqual({ nodeType: 'markdown', markdown: source });
  });

  it('unwraps markdown(translation) back to the translation', () => {
    const source = translation({ en: 'a', fr: 'b' });
    const { node, isLossless } = convertNodeType(
      { nodeType: 'markdown', markdown: source } as ContentNode,
      'translation',
      options
    );

    expect(node).toEqual(source);
    expect(isLossless).toBe(true);
  });

  it('reports data loss when collapsing a translation', () => {
    const { node, isLossless } = convertNodeType(
      translation({ en: 'a', fr: 'b' }),
      'text',
      options
    );

    expect(node).toBe('a');
    expect(isLossless).toBe(false);
  });

  it('seeds plural branches with the current text', () => {
    const { node } = convertNodeType('n items', 'plural', options);

    expect(node).toEqual({
      nodeType: 'plural',
      plural: { one: 'n items', other: 'n items' },
    });
  });
});
