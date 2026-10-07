import {
  type ContentCell,
  type ContentRow,
  getCellId,
  SHARED_CELL_KEY,
} from './flattenContentRows';

/**
 * Attention state of one cell. Ordered by priority: a cell shows the first
 * status that applies.
 */
export type CellStatus =
  | 'readonly'
  | 'locked'
  | 'ai'
  | 'missing'
  | 'edited'
  | 'identical'
  | 'done';

/** Statuses a user can filter the grid by. */
export type CellStatusFilter = 'all' | 'missing' | 'edited' | 'ai';

export type CellStatusContext = {
  /** Locale AI translates from; also the reference for "identical". */
  sourceLocale: string;
  /** Cells of the saved dictionary, keyed by cell id (see {@link indexCells}). */
  originalCells: Map<string, ContentCell>;
  /** Cell ids filled by AI and not yet accepted. */
  aiCellIds: ReadonlySet<string>;
  /** Locales the current user cannot edit. */
  lockedLocales: ReadonlySet<string>;
};

/** Indexes every leaf cell of a row list by cell id. */
export const indexCells = (rows: ContentRow[]): Map<string, ContentCell> => {
  const cells = new Map<string, ContentCell>();

  for (const row of rows) {
    if (row.kind !== 'leaf') continue;

    for (const [cellKey, cell] of Object.entries(row.cells)) {
      cells.set(getCellId(row.id, cellKey), cell);
    }
  }

  return cells;
};

const isEmptyValue = (value: unknown): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '');

/** Structural equality for JSON-like content values. */
export const isSameContentValue = (first: unknown, second: unknown): boolean =>
  first === second || JSON.stringify(first) === JSON.stringify(second);

/** Computes the status of one leaf cell. */
export const getCellStatus = (
  row: ContentRow,
  cellKey: string,
  { sourceLocale, originalCells, aiCellIds, lockedLocales }: CellStatusContext
): CellStatus => {
  const cell = row.cells[cellKey];
  const cellId = getCellId(row.id, cellKey);

  if (row.leafKind === 'readonly') return 'readonly';
  if (cellKey !== SHARED_CELL_KEY && lockedLocales.has(cellKey)) {
    return 'locked';
  }
  if (aiCellIds.has(cellId)) return 'ai';
  if (!cell || cell.isMissing || isEmptyValue(cell.value)) return 'missing';

  const originalCell = originalCells.get(cellId);
  if (!originalCell || !isSameContentValue(originalCell.value, cell.value)) {
    return 'edited';
  }

  if (
    row.isLocalized &&
    cellKey !== sourceLocale &&
    typeof cell.value === 'string' &&
    cell.value === row.cells[sourceLocale]?.value
  ) {
    return 'identical';
  }

  return 'done';
};

/** True when a status passes the active filter. */
export const matchesStatusFilter = (
  status: CellStatus,
  filter: CellStatusFilter
): boolean => filter === 'all' || status === filter;

/** Counts statuses over the leaf cells of the given locales. */
export const countStatuses = (
  rows: ContentRow[],
  cellKeys: string[],
  context: CellStatusContext
): Record<CellStatus, number> => {
  const counts: Record<CellStatus, number> = {
    readonly: 0,
    locked: 0,
    ai: 0,
    missing: 0,
    edited: 0,
    identical: 0,
    done: 0,
  };

  for (const row of rows) {
    if (row.kind !== 'leaf') continue;

    const rowCellKeys = row.isLocalized ? cellKeys : [SHARED_CELL_KEY];
    for (const cellKey of rowCellKeys) {
      if (!row.cells[cellKey] && !row.isLocalized) continue;
      counts[getCellStatus(row, cellKey, context)]++;
    }
  }

  return counts;
};
