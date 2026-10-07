// @vitest-environment node
import type { ContentNode } from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import { getCellStatus, indexCells } from './cellStatus';
import { type ContentRow, flattenContentRows } from './flattenContentRows';
import {
  buildDisplayItems,
  findNextMissingCell,
  formatFieldLabel,
  formatTypeChain,
  getCellPreview,
  getRowReorderTarget,
  getVisibleRows,
  parseGridPosition,
} from './gridRows';

const options = { locales: ['en', 'fr'], sourceLocale: 'en' };

const translation = (values: Record<string, ContentNode>): ContentNode =>
  ({ nodeType: NodeTypes.TRANSLATION, translation: values }) as ContentNode;

const content = {
  title: translation({ en: 'Shoes', fr: 'Chaussures' }),
  subtitle: translation({ en: 'Built to last' }),
  price: 49.9,
  card: {
    label: translation({ en: 'Light', fr: 'Léger' }),
    deep: { note: translation({ en: 'Deep', fr: 'Profond' }) },
  },
  tags: ['new'],
} as unknown as ContentNode;

const rows = flattenContentRows(content, options);
const rowsById = new Map(rows.map((row) => [row.id, row]));
const statusContext = {
  sourceLocale: 'en',
  originalCells: indexCells(rows),
  aiCellIds: new Set<string>(),
  lockedLocales: new Set<string>(),
};
const getStatus = (row: ContentRow, cellKey: string) =>
  getCellStatus(row, cellKey, statusContext);

const visibleIds = (
  query: string,
  statusFilter: 'all' | 'missing' = 'all',
  collapsed: string[] = []
) =>
  getVisibleRows(rows, rowsById, {
    query,
    statusFilter,
    localeKeys: ['en', 'fr'],
    collapsedRowIds: new Set(collapsed),
    getStatus,
  }).map((row) => row.id);

describe('formatTypeChain', () => {
  it('abbreviates wrappers and drops the trailing text', () => {
    expect(formatTypeChain(['translation', 'text'])).toBe('t');
    expect(formatTypeChain(['markdown', 'translation', 'text'])).toBe('md · t');
    expect(formatTypeChain(['translation', 'plural'])).toBe('t · plural');
    expect(formatTypeChain(['text'])).toBe('text');
  });
});

describe('getCellPreview', () => {
  it('flattens whitespace and describes file and nested nodes', () => {
    expect(getCellPreview('a\n  b')).toBe('a b');
    expect(getCellPreview(3)).toBe('3');
    expect(
      getCellPreview({ nodeType: 'file', file: './logo.svg' } as ContentNode)
    ).toBe('./logo.svg');
    expect(
      getCellPreview({
        nodeType: 'nested',
        nested: { dictionaryKey: 'footer', path: 'copyright' },
      } as unknown as ContentNode)
    ).toBe('footer / copyright');
  });
});

describe('getVisibleRows', () => {
  it('keeps ancestors of rows matching the search', () => {
    expect(visibleIds('profond')).toEqual([
      'card',
      'card.deep',
      'card.deep.note',
    ]);
  });

  it('matches paths', () => {
    expect(visibleIds('price')).toEqual(['price']);
  });

  it('filters by status', () => {
    expect(visibleIds('', 'missing')).toEqual(['subtitle']);
  });

  it('hides descendants of collapsed groups unless filtering', () => {
    expect(visibleIds('', 'all', ['card'])).not.toContain('card.label');
    expect(visibleIds('léger', 'all', ['card'])).toContain('card.label');
  });
});

describe('buildDisplayItems', () => {
  it('closes object and array groups with add lines', () => {
    const items = buildDisplayItems(rows, {
      collapsedRowIds: new Set(),
      isRootObject: true,
    }).map((item) =>
      item.type === 'row'
        ? item.row.id
        : `+${item.addLine.kind}:${item.addLine.parentRow?.id ?? 'root'}`
    );

    expect(items).toEqual([
      'title',
      'subtitle',
      'price',
      'card',
      'card.label',
      'card.deep',
      'card.deep.note',
      '+field:card.deep',
      '+field:card',
      'tags',
      'tags[0]',
      '+item:tags',
      '+field:root',
    ]);
  });
});

describe('findNextMissingCell', () => {
  it('finds the next missing cell and wraps around', () => {
    expect(findNextMissingCell(rows, ['en', 'fr'], getStatus)).toEqual({
      rowId: 'subtitle',
      cellKey: 'fr',
    });
    expect(
      findNextMissingCell(rows, ['en', 'fr'], getStatus, {
        rowId: 'subtitle',
        cellKey: 'fr',
      })
    ).toEqual({ rowId: 'subtitle', cellKey: 'fr' });
  });
});

describe('parseGridPosition', () => {
  it('parses positions and tolerates missing ones', () => {
    expect(parseGridPosition('3:1')).toEqual({ rowIndex: 3, columnIndex: 1 });
    expect(parseGridPosition(undefined)).toEqual({
      rowIndex: -1,
      columnIndex: -1,
    });
    expect(parseGridPosition('x').columnIndex).toBe(-1);
  });
});

describe('formatFieldLabel', () => {
  it('spaces camelCase words and capitalizes the first letter', () => {
    expect(formatFieldLabel('viteLogoPanel')).toBe('Vite Logo Panel');
    expect(formatFieldLabel('XMLParser')).toBe('XML Parser');
  });

  it('keeps keys without camelCase boundaries', () => {
    expect(formatFieldLabel('title')).toBe('Title');
    expect(formatFieldLabel('[0]')).toBe('[0]');
  });
});

describe('getRowReorderTarget', () => {
  it('locates top-level fields at the dictionary root', () => {
    expect(getRowReorderTarget(rowsById.get('title')!, rowsById)).toEqual({
      parentKeyPath: [],
      childKey: 'title',
    });
  });

  it('locates nested fields inside their parent object', () => {
    expect(getRowReorderTarget(rowsById.get('card.label')!, rowsById)).toEqual({
      parentKeyPath: [{ type: NodeTypes.OBJECT, key: 'card' }],
      childKey: 'label',
    });
  });

  it('locates array items by index', () => {
    expect(getRowReorderTarget(rowsById.get('tags[0]')!, rowsById)).toEqual({
      parentKeyPath: [{ type: NodeTypes.OBJECT, key: 'tags' }],
      childKey: 0,
    });
  });
});
