import { isSameKeyPath } from '@intlayer/core/utils';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import {
  type CellStatus,
  type CellStatusFilter,
  matchesStatusFilter,
} from './cellStatus';
import { type ContentRow, SHARED_CELL_KEY } from './flattenContentRows';

const IDENTIFIER_PATTERN = /^[A-Za-z_$][\w$-]*$/;

/** Converts a keyPath to a display path matching row ids. */
export const keyPathToPath = (keyPath: KeyPath[]): string => {
  let path = '';
  for (const segment of keyPath) {
    if (segment.type === NodeTypes.TRANSLATION) continue;
    if (segment.type === NodeTypes.ARRAY) {
      path = `${path}[${segment.key}]`;
    } else if (typeof segment.key !== 'undefined') {
      const key = String(segment.key);
      const isIdentifier = IDENTIFIER_PATTERN.test(key);
      const formatted = isIdentifier ? key : `[${JSON.stringify(key)}]`;
      path =
        path === ''
          ? formatted
          : formatted.startsWith('[')
            ? `${path}${formatted}`
            : `${path}.${formatted}`;
    }
  }
  return path;
};

/** Checks whether a row matches the focused key path from the editor. */
export const getRowMatchesKeyPath = (
  row: ContentRow,
  focusedKeyPath: KeyPath[]
): boolean => {
  const strippedFocused = focusedKeyPath.filter(
    (segment) => segment.type !== NodeTypes.TRANSLATION
  );
  if (strippedFocused.length === 0) return true;

  // 1. Check if any cell's keyPath matches, is an ancestor, or is a descendant
  const matchesCell = Object.values(row.cells).some((cell) => {
    const strippedCell = cell.keyPath.filter(
      (segment) => segment.type !== NodeTypes.TRANSLATION
    );
    return (
      isSameKeyPath(strippedFocused, strippedCell) ||
      isSameKeyPath(strippedCell, strippedFocused)
    );
  });
  if (matchesCell) return true;

  // 2. Check path string prefix matching in both directions
  const targetPath = keyPathToPath(strippedFocused);
  if (targetPath) {
    if (
      row.id === targetPath ||
      row.id.startsWith(`${targetPath}.`) ||
      row.id.startsWith(`${targetPath}[`) ||
      targetPath.startsWith(`${row.id}.`) ||
      targetPath.startsWith(`${row.id}[`)
    ) {
      return true;
    }
  }

  return false;
};

/** Short labels for type chips; anything missing shows its raw type. */
const TYPE_ABBREVIATIONS: Partial<Record<NodeType, string>> = {
  [NodeTypes.TRANSLATION]: 't',
  [NodeTypes.MARKDOWN]: 'md',
  [NodeTypes.ENUMERATION]: 'enum',
  [NodeTypes.INSERTION]: 'insert',
  [NodeTypes.CONDITION]: 'cond',
  [NodeTypes.REACT_NODE]: 'react',
  [NodeTypes.PREACT_NODE]: 'preact',
  [NodeTypes.SOLID_NODE]: 'solid',
};

/**
 * Formats a type chain as a compact chip label: `[translation, text]` → `t`,
 * `[markdown, translation, text]` → `md · t`, `[translation, plural]` → `t · plural`.
 */
export const formatTypeChain = (typeChain: NodeType[]): string => {
  const meaningfulTypes =
    typeChain.length > 1 && typeChain[typeChain.length - 1] === NodeTypes.TEXT
      ? typeChain.slice(0, -1)
      : typeChain;

  return meaningfulTypes
    .map((nodeType) => TYPE_ABBREVIATIONS[nodeType] ?? nodeType)
    .join(' · ');
};

/** One-line text preview of a cell value. */
export const getCellPreview = (value: ContentNode): string => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value.replace(/\s+/g, ' ').trim();
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  const record = value as unknown as Record<string, unknown>;

  if (record.nodeType === NodeTypes.FILE) return String(record.file ?? '');
  if (record.nodeType === NodeTypes.NESTED) {
    const nested = (record.nested ?? {}) as {
      dictionaryKey?: string;
      path?: string;
    };
    return [nested.dictionaryKey, nested.path].filter(Boolean).join(' / ');
  }

  return '';
};

/** Cell keys a row shows: its locales, or the shared key when not localized. */
export const getVisibleCellKeys = (
  row: ContentRow,
  localeKeys: string[]
): string[] => (row.isLocalized ? localeKeys : [SHARED_CELL_KEY]);

export type VisibleRowsOptions = {
  /** Lower-cased search terms matched against paths and string values. */
  query: string;
  statusFilter: CellStatusFilter;
  /** Visible locale columns. */
  localeKeys: string[];
  /** Group rows whose descendants are hidden. */
  collapsedRowIds: ReadonlySet<string>;
  getStatus: (row: ContentRow, cellKey: string) => CellStatus;
  /** Focused key path from the visual editor. */
  focusedKeyPath?: KeyPath[];
};

const getRowMatchesQuery = (row: ContentRow, query: string): boolean => {
  if (row.id.toLowerCase().includes(query)) return true;

  return Object.values(row.cells).some((cell) =>
    getCellPreview(cell.value).toLowerCase().includes(query)
  );
};

/**
 * Rows to display for the active search, status filter and collapsed groups.
 * Ancestors of matching leaves stay visible so the path keeps its context.
 */
export const getVisibleRows = (
  rows: ContentRow[],
  rowsById: Map<string, ContentRow>,
  {
    query,
    statusFilter,
    localeKeys,
    collapsedRowIds,
    getStatus,
    focusedKeyPath,
  }: VisibleRowsOptions
): ContentRow[] => {
  const normalizedQuery = query.trim().toLowerCase();
  const hasFocusedKeyPath = (focusedKeyPath?.length ?? 0) > 0;
  const isFiltering =
    normalizedQuery !== '' || statusFilter !== 'all' || hasFocusedKeyPath;

  const visibleRowIds = new Set<string>();

  if (isFiltering) {
    for (const row of rows) {
      if (row.kind !== 'leaf') continue;

      const matchesQuery =
        normalizedQuery === '' || getRowMatchesQuery(row, normalizedQuery);
      const matchesFocused =
        !hasFocusedKeyPath || getRowMatchesKeyPath(row, focusedKeyPath!);
      const matchesStatus =
        statusFilter === 'all' ||
        getVisibleCellKeys(row, localeKeys).some(
          (cellKey) =>
            row.cells[cellKey] !== undefined &&
            matchesStatusFilter(getStatus(row, cellKey), statusFilter)
        );

      if (!matchesQuery || !matchesFocused || !matchesStatus) continue;

      let currentId: string | undefined = row.id;
      while (currentId !== undefined && !visibleRowIds.has(currentId)) {
        visibleRowIds.add(currentId);
        currentId = rowsById.get(currentId)?.parentId;
      }
    }
  }

  const isHiddenByCollapse = (row: ContentRow): boolean => {
    // Filtering expands everything: matches must never hide behind a chevron
    if (isFiltering) return false;

    let parentId = row.parentId;
    while (parentId !== undefined) {
      if (collapsedRowIds.has(parentId)) return true;
      parentId = rowsById.get(parentId)?.parentId;
    }
    return false;
  };

  return rows.filter(
    (row) =>
      (!isFiltering || visibleRowIds.has(row.id)) && !isHiddenByCollapse(row)
  );
};

/** Where an "add field" / "add item" line goes. */
export type AddLine = {
  kind: 'field' | 'item';
  /** Group row receiving the new child, `undefined` for the dictionary root. */
  parentRow: ContentRow | undefined;
  depth: number;
};

export type DisplayItem =
  | { type: 'row'; row: ContentRow }
  | { type: 'add'; addLine: AddLine };

const getAddKind = (row: ContentRow): AddLine['kind'] | undefined => {
  if (!row.rootKeyPath || row.kind !== 'group') return undefined;
  if (row.typeChain[0] === NodeTypes.OBJECT) return 'field';
  if (row.typeChain[0] === NodeTypes.ARRAY) return 'item';
  return undefined;
};

/**
 * Interleaves "add" lines after the last visible descendant of every object
 * and array group (and at the end for the root object).
 */
export const buildDisplayItems = (
  visibleRows: ContentRow[],
  {
    collapsedRowIds,
    isRootObject,
  }: { collapsedRowIds: ReadonlySet<string>; isRootObject: boolean }
): DisplayItem[] => {
  const items: DisplayItem[] = [];
  const openGroups: { row: ContentRow; kind: AddLine['kind'] }[] = [];

  const closeGroupsDeeperOrEqual = (depth: number) => {
    while ((openGroups[openGroups.length - 1]?.row.depth ?? -1) >= depth) {
      const group = openGroups.pop();
      if (!group) break;
      items.push({
        type: 'add',
        addLine: {
          kind: group.kind,
          parentRow: group.row,
          depth: group.row.depth + 1,
        },
      });
    }
  };

  for (const row of visibleRows) {
    closeGroupsDeeperOrEqual(row.depth);
    items.push({ type: 'row', row });

    const addKind = getAddKind(row);
    if (addKind && !collapsedRowIds.has(row.id)) {
      openGroups.push({ row, kind: addKind });
    }
  }

  closeGroupsDeeperOrEqual(0);

  if (isRootObject) {
    items.push({
      type: 'add',
      addLine: { kind: 'field', parentRow: undefined, depth: 0 },
    });
  }

  return items;
};

/** Location of one cell in the visible grid. */
export type GridCellPosition = { rowId: string; cellKey: string };

/**
 * First missing cell after `from` (wrapping around), scanning visible leaf
 * rows left to right, top to bottom.
 */
export const findNextMissingCell = (
  visibleRows: ContentRow[],
  localeKeys: string[],
  getStatus: (row: ContentRow, cellKey: string) => CellStatus,
  from?: GridCellPosition
): GridCellPosition | undefined => {
  const positions: { row: ContentRow; cellKey: string }[] = [];

  for (const row of visibleRows) {
    if (row.kind !== 'leaf') continue;
    for (const cellKey of getVisibleCellKeys(row, localeKeys)) {
      if (row.cells[cellKey] === undefined) continue;
      positions.push({ row, cellKey });
    }
  }

  const startIndex = from
    ? positions.findIndex(
        (position) =>
          position.row.id === from.rowId && position.cellKey === from.cellKey
      )
    : -1;

  for (let offset = 1; offset <= positions.length; offset++) {
    const position =
      positions[(startIndex + offset + positions.length) % positions.length];
    if (!position) continue;
    const { row, cellKey } = position;

    if (getStatus(row, cellKey) === 'missing') {
      return { rowId: row.id, cellKey };
    }
  }

  return undefined;
};

/** Parses a `row:column` roving-focus position; `-1` when absent or invalid. */
export const parseGridPosition = (
  position: string | undefined
): { rowIndex: number; columnIndex: number } => {
  const [rowIndex, columnIndex] = (position ?? '').split(':').map(Number);
  const toIndex = (value: number | undefined): number =>
    value === undefined || Number.isNaN(value) || position === undefined
      ? -1
      : value;

  return { rowIndex: toIndex(rowIndex), columnIndex: toIndex(columnIndex) };
};

/**
 * Display label of a field key: camelCase words are spaced and the first
 * letter is capitalized, e.g. `viteLogoPanel` → `Vite Logo Panel`.
 */
export const formatFieldLabel = (fieldKey: string): string => {
  const spacedKey = fieldKey
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');

  return spacedKey.charAt(0).toUpperCase() + spacedKey.slice(1);
};

/** Where a row sits in its parent node, for drag and drop reordering. */
export type RowReorderTarget = {
  /** Key path of the parent node (`[]` for the dictionary root). */
  parentKeyPath: KeyPath[];
  /** Object key or array index of the row inside its parent. */
  childKey: string | number;
};

/**
 * Locates a row inside its parent node. Rows whose outer node only exists
 * below a translation, or whose segment is not an object key or array index
 * (plural, enumeration…), cannot be reordered.
 */
export const getRowReorderTarget = (
  row: ContentRow,
  rowsById: ReadonlyMap<string, ContentRow>
): RowReorderTarget | undefined => {
  const parentRow = row.parentId ? rowsById.get(row.parentId) : undefined;
  const parentKeyPath = row.parentId ? parentRow?.rootKeyPath : [];
  const ownKeyPath = row.rootKeyPath;

  if (!parentKeyPath || !ownKeyPath) return undefined;
  if (ownKeyPath.length !== parentKeyPath.length + 1) return undefined;

  const segment = ownKeyPath[parentKeyPath.length];
  if (segment?.type !== NodeTypes.OBJECT && segment?.type !== NodeTypes.ARRAY) {
    return undefined;
  }

  return { parentKeyPath, childKey: segment.key };
};
