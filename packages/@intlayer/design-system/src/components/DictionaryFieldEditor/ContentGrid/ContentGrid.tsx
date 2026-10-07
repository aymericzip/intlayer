'use client';

import { Button } from '@components/Button';
import { useLocaleSwitcherContent } from '@components/LocaleSwitcherContentDropDown';
import { Select } from '@components/Select';
import { Tag } from '@components/Tag';
import { useDragReorder } from '@hooks/useDragReorder';
import { getLocaleName } from '@intlayer/core/localization';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import * as NodeTypes from '@intlayer/types/nodeType';
import { cn } from '@utils/cn';
import { ChevronRight, Lock, Sparkles } from 'lucide-react';
import {
  type FC,
  type FocusEvent,
  type KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { useFieldReorder } from '../useFieldReorder';
import { ContentGridCell } from './ContentGridCell';
import { useContentGrid } from './ContentGridContext';
import {
  ContentGridAddLine,
  ContentGridRow,
  getIndentStyle,
  IndentGuides,
  PATH_COLUMN_CLASS_NAME,
} from './ContentGridRow';
import { type CellStatusFilter, countStatuses } from './cellStatus';
import { FocusPane } from './FocusPane';
import { type ContentRow, SHARED_CELL_KEY } from './flattenContentRows';
import { GridToolbar } from './GridToolbar';
import {
  buildDisplayItems,
  findNextMissingCell,
  formatFieldLabel,
  type GridCellPosition,
  getRowReorderTarget,
  getVisibleRows,
  parseGridPosition,
} from './gridRows';
import { AI_HOVER_CLASS_NAME, AI_TEXT_CLASS_NAME } from './StatusDot';
import { TypeBadge } from './TypeBadge';
import { useIsNarrowContainer } from './useIsNarrowContainer';

/** Group rows deeper than this start collapsed. */
const DEFAULT_EXPANDED_DEPTH = 1;

export type ContentGridProps = {
  dictionary: Dictionary;
  className?: string;
};

/** Moves the roving focus between grid cells with the arrow keys. */
const moveGridFocus = (gridElement: HTMLElement, event: KeyboardEvent) => {
  const target = event.target as HTMLElement;
  const position = target.dataset.gridPosition;
  if (!position) return;

  const { rowIndex, columnIndex } = parseGridPosition(position);
  const cells = Array.from(
    gridElement.querySelectorAll<HTMLElement>('[data-grid-position]')
  ).map((element) => {
    const { rowIndex: cellRow, columnIndex: cellColumn } = parseGridPosition(
      element.dataset.gridPosition
    );
    return { element, cellRow, cellColumn };
  });

  const isRightToLeft = getComputedStyle(gridElement).direction === 'rtl';
  const forwardKey = isRightToLeft ? 'ArrowLeft' : 'ArrowRight';
  const backwardKey = isRightToLeft ? 'ArrowRight' : 'ArrowLeft';

  let nextCell: (typeof cells)[number] | undefined;

  if (event.key === forwardKey || event.key === backwardKey) {
    const step = event.key === forwardKey ? 1 : -1;
    nextCell = cells.find(
      (cell) =>
        cell.cellRow === rowIndex && cell.cellColumn === columnIndex + step
    );
  } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    const isDown = event.key === 'ArrowDown';
    const candidates = cells.filter((cell) =>
      isDown ? cell.cellRow > rowIndex : cell.cellRow < rowIndex
    );
    const nextRow = isDown
      ? Math.min(...candidates.map((cell) => cell.cellRow))
      : Math.max(...candidates.map((cell) => cell.cellRow));
    const rowCells = candidates.filter((cell) => cell.cellRow === nextRow);
    nextCell =
      rowCells.find((cell) => cell.cellColumn === columnIndex) ??
      rowCells[rowCells.length - 1];
  }

  if (nextCell) {
    event.preventDefault();
    nextCell.element.focus();
  }
};

/**
 * Spreadsheet view of a dictionary: rows are leaf paths, columns are locales.
 * Composed nodes (`md(t())`, `t(plural())`) become indented rows instead of
 * nested boxes; rich values open the focus pane beside the grid.
 */
export const ContentGrid: FC<ContentGridProps> = ({ className }) => {
  const model = useContentGrid();
  const {
    rows,
    rowsById,
    locales,
    sourceLocale,
    lockedLocales,
    statusContext,
    getStatus,
    getMissingTargets,
    translateCells,
    isTranslating,
  } = model;
  const content = useIntlayer('content-grid');
  const { locale: interfaceLocale } = useLocale();
  const { selectedLocales } = useLocaleSwitcherContent();
  const { containerRef, isNarrow } = useIsNarrowContainer();
  const gridRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CellStatusFilter>('all');
  const [toggledRowIds, setToggledRowIds] = useState<ReadonlySet<string>>(
    () => new Set()
  );
  const [focusedCell, setFocusedCell] = useState<GridCellPosition>();
  const [narrowLocale, setNarrowLocale] = useState<string>();

  const wideLocaleKeys = useMemo(() => {
    const visibleLocales = selectedLocales
      .map(String)
      .filter((locale) => locales.includes(locale));
    return visibleLocales.length > 0 ? visibleLocales : [sourceLocale];
  }, [selectedLocales, locales, sourceLocale]);

  const activeNarrowLocale =
    narrowLocale && locales.includes(narrowLocale)
      ? narrowLocale
      : (wideLocaleKeys.find((locale) => locale !== sourceLocale) ??
        wideLocaleKeys[0] ??
        sourceLocale);
  const localeKeys = isNarrow ? [activeNarrowLocale] : wideLocaleKeys;

  const collapsedRowIds = useMemo(
    () =>
      new Set(
        rows
          .filter(
            (row) =>
              row.kind === 'group' &&
              row.depth > DEFAULT_EXPANDED_DEPTH !== toggledRowIds.has(row.id)
          )
          .map((row) => row.id)
      ),
    [rows, toggledRowIds]
  );

  const visibleRows = useMemo(
    () =>
      getVisibleRows(rows, rowsById, {
        query,
        statusFilter,
        localeKeys,
        collapsedRowIds,
        getStatus,
      }),
    [
      rows,
      rowsById,
      query,
      statusFilter,
      localeKeys,
      collapsedRowIds,
      getStatus,
    ]
  );

  const isFiltering = query.trim() !== '' || statusFilter !== 'all';
  const topLevelRows = useMemo(
    () => rows.filter((row) => row.parentId === undefined),
    [rows]
  );
  const isRootObject = topLevelRows.every(
    (row) => Object.values(row.cells)[0]?.keyPath[0]?.type === NodeTypes.OBJECT
  );

  const displayItems = useMemo(
    () =>
      buildDisplayItems(visibleRows, {
        collapsedRowIds: isFiltering ? new Set() : collapsedRowIds,
        isRootObject: !isFiltering && isRootObject,
      }).filter((item) => !isFiltering || item.type === 'row'),
    [visibleRows, collapsedRowIds, isFiltering, isRootObject]
  );

  const { moveField } = useFieldReorder(model.dictionary);
  const reorderTargetsById = useMemo(
    () =>
      new Map(rows.map((row) => [row.id, getRowReorderTarget(row, rowsById)])),
    [rows, rowsById]
  );
  const displayedRowIds = useMemo(
    () =>
      displayItems.flatMap((item) =>
        item.type === 'row' ? [item.row.id] : []
      ),
    [displayItems]
  );
  const { getDragHandleProps, getDropZoneProps } = useDragReorder({
    itemIds: displayedRowIds,
    orientation: 'vertical',
    title: content.reorderField.value,
    // Fields only move among their siblings
    canMove: (sourceId, targetId) =>
      Boolean(reorderTargetsById.get(sourceId)) &&
      Boolean(reorderTargetsById.get(targetId)) &&
      rowsById.get(sourceId)?.parentId === rowsById.get(targetId)?.parentId,
    onMove: (sourceId, targetId) => {
      const source = reorderTargetsById.get(sourceId);
      const target = reorderTargetsById.get(targetId);
      if (source && target) {
        moveField(source.parentKeyPath, source.childKey, target.childKey);
      }
    },
  });
  /** Reordering is off while filtering: hidden siblings would be skipped. */
  const getIsRowReorderable = (row: ContentRow) =>
    !isFiltering && reorderTargetsById.get(row.id) !== undefined;

  const rootKeys = useMemo(
    () => topLevelRows.map((row) => row.label),
    [topLevelRows]
  );

  const statusCounts = useMemo(
    () => countStatuses(rows, localeKeys, statusContext),
    [rows, localeKeys, statusContext]
  );

  const toggleCollapse = useCallback(
    (rowId: string) =>
      setToggledRowIds((previous) => {
        const next = new Set(previous);
        if (next.has(rowId)) next.delete(rowId);
        else next.add(rowId);
        return next;
      }),
    []
  );

  const openEditor = useCallback(
    (rowId: string, cellKey: string) => setFocusedCell({ rowId, cellKey }),
    []
  );

  const closeEditor = useCallback(() => setFocusedCell(undefined), []);

  const focusCellElement = (position: GridCellPosition) => {
    const rowIndex = displayItems.findIndex(
      (item) => item.type === 'row' && item.row.id === position.rowId
    );
    const row = rowsById.get(position.rowId);
    const columnIndex = row?.isLocalized
      ? localeKeys.indexOf(position.cellKey)
      : 0;

    gridRef.current
      ?.querySelector<HTMLElement>(
        `[data-grid-position="${rowIndex}:${columnIndex}"]`
      )
      ?.focus();
  };

  const jumpToMissing = () => {
    const activeElement = document.activeElement as HTMLElement | null;
    const activePosition = activeElement?.dataset.gridPosition;
    let from: GridCellPosition | undefined;

    if (activePosition) {
      const { rowIndex, columnIndex } = parseGridPosition(activePosition);
      const item = displayItems[rowIndex];
      if (item?.type === 'row') {
        from = {
          rowId: item.row.id,
          cellKey: item.row.isLocalized
            ? (localeKeys[columnIndex] ?? SHARED_CELL_KEY)
            : SHARED_CELL_KEY,
        };
      }
    }

    const next = findNextMissingCell(visibleRows, localeKeys, getStatus, from);
    if (next) focusCellElement(next);
  };

  const handleGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (gridRef.current) moveGridFocus(gridRef.current, event);
  };

  /** Tabbing into the grid lands on its first cell (roving focus entry). */
  const handleGridFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    event.currentTarget
      .querySelector<HTMLElement>('[data-grid-position]')
      ?.focus();
  };

  const focusedRow = focusedCell ? rowsById.get(focusedCell.rowId) : undefined;
  const gridTemplateColumns = `minmax(14rem, 20rem) repeat(${localeKeys.length}, minmax(14rem, 1fr))`;

  const renderLocaleHeader = (locale: string) => {
    const columnTargets = getMissingTargets([locale]);
    const isLocked = lockedLocales.has(locale);

    return (
      // biome-ignore lint/a11y/useSemanticElements lint/a11y/useFocusableInteractive: ARIA grid built on CSS grid; focus is roving on gridcells
      <div
        key={locale}
        role="columnheader"
        className={cn(
          'flex max-w-xl items-center gap-1.5 px-3 py-2.5 text-xs',
          isLocked && 'opacity-60'
        )}
        title={isLocked ? content.lockedTooltip.value : undefined}
      >
        <span className="font-mono font-semibold" dir="ltr">
          {locale.toUpperCase()}
        </span>
        <span className="truncate text-neutral">
          {getLocaleName(locale as LocalesValues, interfaceLocale)}
        </span>
        {locale === sourceLocale && (
          <Tag color="neutral" size="xs" className="px-1.5 text-[10px]">
            {content.sourceLocale}
          </Tag>
        )}
        {isLocked && <Lock className="size-3 shrink-0 text-neutral" />}
        {columnTargets.length > 0 && (
          <Button
            label={`${content.translateColumn.value} (${locale.toUpperCase()})`}
            title={content.translateColumn.value}
            Icon={Sparkles}
            iconClassName="size-3.5"
            variant="none"
            color="custom"
            size="custom"
            roundedSize="sm"
            disabled={isTranslating}
            onClick={() => translateCells(columnTargets)}
            className={cn(
              'ms-auto p-0.5',
              AI_HOVER_CLASS_NAME,
              AI_TEXT_CLASS_NAME
            )}
          />
        )}
      </div>
    );
  };

  const renderNarrowRow = (row: ContentRow, rowIndex: number) => {
    const isGroup = row.kind === 'group';
    const isCollapsed = collapsedRowIds.has(row.id) && !isFiltering;
    const cellKey = row.isLocalized ? activeNarrowLocale : SHARED_CELL_KEY;

    return (
      // biome-ignore lint/a11y/useSemanticElements lint/a11y/useFocusableInteractive: ARIA grid built on CSS grid; focus is roving on gridcells
      <div
        key={row.id}
        role="row"
        className="relative flex flex-col gap-2 border-neutral/10 border-b py-3"
        style={getIndentStyle(row.depth)}
      >
        <IndentGuides depth={row.depth} />
        <div className="flex min-w-0 items-center gap-1.5 pe-2">
          {isGroup && (
            <Button
              label={
                isCollapsed ? content.expand.value : content.collapse.value
              }
              Icon={ChevronRight}
              iconClassName={cn(
                'size-3.5 transition-transform',
                !isCollapsed && 'rotate-90'
              )}
              variant="none"
              color="neutral"
              size="custom"
              className="hover:text-text"
              onClick={() => toggleCollapse(row.id)}
            />
          )}
          <button
            type="button"
            dir="ltr"
            title={row.id}
            onClick={() => openEditor(row.id, cellKey)}
            className={cn(
              'min-w-0 cursor-pointer break-words text-start text-sm hover:underline',
              isGroup && 'font-semibold'
            )}
          >
            {formatFieldLabel(row.label)}
          </button>
          <TypeBadge row={row} />
        </div>
        {!isGroup && row.cells[cellKey] && (
          <ContentGridCell
            row={row}
            cellKey={cellKey}
            position={`${rowIndex}:0`}
            onOpenEditor={openEditor}
          />
        )}
      </div>
    );
  };

  const emptyState = (
    <p className="p-6 text-center text-neutral text-sm">{content.noResults}</p>
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex h-full min-h-0 w-full min-w-0 flex-col gap-6',
        className
      )}
    >
      {!(isNarrow && focusedRow) && (
        <GridToolbar
          query={query}
          onQueryChange={setQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          statusCounts={statusCounts}
          localeKeys={localeKeys}
          onJumpToMissing={jumpToMissing}
          isNarrow={isNarrow}
        />
      )}

      {isNarrow ? (
        focusedRow && focusedCell ? (
          <FocusPane
            row={focusedRow}
            cellKey={focusedCell.cellKey}
            isNarrow
            onClose={closeEditor}
          />
        ) : (
          <>
            <Select value={activeNarrowLocale} onValueChange={setNarrowLocale}>
              <Select.Trigger aria-label={content.locale.value}>
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                {locales.map((locale) => (
                  <Select.Item key={locale} value={locale}>
                    <span className="flex items-center gap-1.5">
                      {getLocaleName(locale as LocalesValues, interfaceLocale)}
                      {lockedLocales.has(locale) && (
                        <Lock className="size-3 text-neutral" />
                      )}
                    </span>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
            {/* biome-ignore lint/a11y/useSemanticElements: roving-focus list grid */}
            <div
              ref={gridRef}
              role="grid"
              tabIndex={0}
              aria-label={model.dictionary.key}
              onKeyDown={handleGridKeyDown}
              onFocus={handleGridFocus}
              className="flex min-h-0 flex-1 flex-col overflow-y-auto"
            >
              {displayItems.length === 0
                ? emptyState
                : displayItems.map((item, itemIndex) =>
                    item.type === 'row' ? (
                      renderNarrowRow(item.row, itemIndex)
                    ) : (
                      <ContentGridAddLine
                        key={`add-${item.addLine.parentRow?.id ?? 'root'}`}
                        addLine={item.addLine}
                        rootKeys={rootKeys}
                      />
                    )
                  )}
            </div>
          </>
        )
      ) : (
        <div className="flex min-h-0 flex-1 gap-3">
          {/* biome-ignore lint/a11y/useSemanticElements: spreadsheet grid with inline editors */}
          <div
            ref={gridRef}
            role="grid"
            tabIndex={0}
            aria-label={model.dictionary.key}
            aria-colcount={localeKeys.length + 1}
            onKeyDown={handleGridKeyDown}
            onFocus={handleGridFocus}
            className="min-h-0 min-w-0 flex-1 overflow-auto"
          >
            <div className="w-max min-w-full">
              {/* biome-ignore lint/a11y/useSemanticElements lint/a11y/useFocusableInteractive: ARIA grid built on CSS grid; focus is roving on gridcells */}
              <div
                role="row"
                className="sticky top-0 z-20 grid min-w-full border-neutral/10 border-b bg-background"
                style={{ gridTemplateColumns }}
              >
                {/* biome-ignore lint/a11y/useSemanticElements lint/a11y/useFocusableInteractive: ARIA grid built on CSS grid; focus is roving on gridcells */}
                <div
                  role="columnheader"
                  className={cn(
                    PATH_COLUMN_CLASS_NAME,
                    'z-30 items-center ps-4 text-neutral text-xs'
                  )}
                >
                  {content.fieldColumn}
                </div>
                {localeKeys.map(renderLocaleHeader)}
              </div>

              {displayItems.length === 0
                ? emptyState
                : displayItems.map((item, itemIndex) =>
                    item.type === 'row' ? (
                      <ContentGridRow
                        key={item.row.id}
                        row={item.row}
                        localeKeys={localeKeys}
                        rowIndex={itemIndex}
                        gridTemplateColumns={gridTemplateColumns}
                        isCollapsed={
                          collapsedRowIds.has(item.row.id) && !isFiltering
                        }
                        isFocused={focusedCell?.rowId === item.row.id}
                        onToggleCollapse={toggleCollapse}
                        onOpenEditor={openEditor}
                        dragHandleProps={
                          getIsRowReorderable(item.row)
                            ? getDragHandleProps(item.row.id)
                            : undefined
                        }
                        dropZoneProps={
                          getIsRowReorderable(item.row)
                            ? getDropZoneProps(item.row.id)
                            : undefined
                        }
                      />
                    ) : (
                      <ContentGridAddLine
                        key={`add-${item.addLine.parentRow?.id ?? 'root'}`}
                        addLine={item.addLine}
                        gridTemplateColumns={gridTemplateColumns}
                        rootKeys={rootKeys}
                      />
                    )
                  )}
            </div>
          </div>

          {focusedRow && focusedCell && (
            <div className="flex min-h-0 w-[28rem] max-w-[45%] shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral/20">
              <FocusPane
                row={focusedRow}
                cellKey={focusedCell.cellKey}
                isNarrow={false}
                onClose={closeEditor}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
