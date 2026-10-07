'use client';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import {
  type DragHandleProps,
  type DropZoneProps,
  VERTICAL_DROP_ZONE_CLASS_NAME,
} from '@hooks/useDragReorder';
import { getEmptyNode } from '@intlayer/core/dictionaryManipulator';
import { useEditedContent } from '@intlayer/editor-react';
import type {
  ContentNode,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import { cn } from '@utils/cn';
import {
  ChevronRight,
  GripVertical,
  Languages,
  Plus,
  Sparkles,
} from 'lucide-react';
import { type FC, memo, type SubmitEvent, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ContentGridCell } from './ContentGridCell';
import { useContentGrid } from './ContentGridContext';
import { type ContentRow, SHARED_CELL_KEY } from './flattenContentRows';
import { type AddLine, formatFieldLabel } from './gridRows';
import { AI_TEXT_CLASS_NAME } from './StatusDot';
import { TypeBadge } from './TypeBadge';

/** Indentation per depth level of the path column, in rem. */
const INDENT_REM = 1.25;

/** Inline start padding of the path column before the first level, in rem. */
const BASE_INDENT_REM = 0.75;

/** Inline start padding of the path column for a depth. */
export const getIndentStyle = (depth: number) => ({
  paddingInlineStart: `${BASE_INDENT_REM + depth * INDENT_REM}rem`,
});

/** Classes of the sticky path column shared by header, rows and add lines. */
export const PATH_COLUMN_CLASS_NAME =
  'sticky start-0 z-10 flex min-w-0 items-start gap-2 bg-background py-2.5 pe-3';

export type IndentGuidesProps = {
  depth: number;
};

/**
 * One vertical line per ancestor level, aligned on the parent chevrons, so
 * nested elements read as belonging to their parent.
 */
export const IndentGuides: FC<IndentGuidesProps> = ({ depth }) =>
  Array.from({ length: depth }, (_, level) => (
    <span
      // biome-ignore lint/suspicious/noArrayIndexKey: levels are positional
      key={level}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 border-neutral/20 border-s"
      style={{
        insetInlineStart: `${BASE_INDENT_REM + level * INDENT_REM + 0.4375}rem`,
      }}
    />
  ));

export type ContentGridRowProps = {
  row: ContentRow;
  /** Visible locale columns. */
  localeKeys: string[];
  rowIndex: number;
  gridTemplateColumns: string;
  isCollapsed: boolean;
  isFocused: boolean;
  onToggleCollapse: (rowId: string) => void;
  onOpenEditor: (rowId: string, cellKey: string) => void;
  /** Spread on the path column when the field can be dragged. */
  dragHandleProps?: DragHandleProps;
  /** Spread on the row when another field can be dropped on it. */
  dropZoneProps?: DropZoneProps;
};

/**
 * One grid line: sticky path + type badge, then one cell per visible locale.
 * Shared values span the locale columns with a "same for all locales" note.
 */
export const ContentGridRow: FC<ContentGridRowProps> = memo(
  ({
    row,
    localeKeys,
    rowIndex,
    gridTemplateColumns,
    isCollapsed,
    isFocused,
    onToggleCollapse,
    onOpenEditor,
    dragHandleProps,
    dropZoneProps,
  }) => {
    const { getMissingTargets, translateCells, isTranslating, changeRowType } =
      useContentGrid();
    const content = useIntlayer('content-grid');
    const isGroup = row.kind === 'group';

    const missingTargets =
      row.kind === 'leaf' && row.isLocalized
        ? getMissingTargets(localeKeys, [row.id])
        : [];

    const renderCells = () => {
      if (isGroup) {
        return (
          <div
            className="self-stretch bg-text/[0.03]"
            style={{ gridColumn: `span ${localeKeys.length}` }}
          />
        );
      }

      if (!row.isLocalized) {
        return (
          <>
            <ContentGridCell
              row={row}
              cellKey={SHARED_CELL_KEY}
              position={`${rowIndex}:0`}
              onOpenEditor={onOpenEditor}
            />
            {localeKeys.length > 1 && (
              <div
                className="flex items-center gap-2 px-2 py-1.5 text-neutral text-xs"
                style={{ gridColumn: `span ${localeKeys.length - 1}` }}
              >
                <span className="italic">{content.sameForAllLocales}</span>
                {row.leafKind !== 'readonly' && (
                  <Button
                    label={content.makeTranslatable.value}
                    variant="hoverable"
                    color="text"
                    size="sm"
                    Icon={Languages}
                    onClick={() => changeRowType(row, NodeTypes.TRANSLATION)}
                  >
                    {content.makeTranslatable}
                  </Button>
                )}
              </div>
            )}
          </>
        );
      }

      return localeKeys.map((locale, columnIndex) =>
        row.cells[locale] ? (
          <ContentGridCell
            key={locale}
            row={row}
            cellKey={locale}
            position={`${rowIndex}:${columnIndex}`}
            onOpenEditor={onOpenEditor}
          />
        ) : (
          <div
            key={locale}
            className="flex items-center px-2 text-neutral text-xs"
            aria-hidden
          >
            —
          </div>
        )
      );
    };

    return (
      // biome-ignore lint/a11y/useSemanticElements lint/a11y/useFocusableInteractive: ARIA grid built on CSS grid; focus is roving on gridcells
      <div
        role="row"
        aria-expanded={isGroup ? !isCollapsed : undefined}
        aria-level={row.depth + 1}
        className={cn(
          'group/row grid min-w-full items-start',
          isGroup && row.depth === 0 && 'mt-2',
          isFocused && 'bg-text/5',
          dropZoneProps && VERTICAL_DROP_ZONE_CLASS_NAME,
          dragHandleProps?.['data-dragging'] && 'opacity-40'
        )}
        style={{ gridTemplateColumns }}
        {...dropZoneProps}
      >
        {/* biome-ignore lint/a11y/useSemanticElements lint/a11y/useFocusableInteractive: ARIA grid built on CSS grid; focus is roving on gridcells */}
        <div
          role="rowheader"
          className={cn(
            PATH_COLUMN_CLASS_NAME,
            isGroup &&
              'bg-[color-mix(in_oklab,var(--color-text)_3%,var(--color-background))]',
            isFocused &&
              'bg-[color-mix(in_oklab,var(--color-text)_5%,var(--color-background))]'
          )}
          style={getIndentStyle(row.depth)}
        >
          <IndentGuides depth={row.depth} />
          {dragHandleProps && (
            <Button
              {...dragHandleProps}
              label={content.reorderField.value}
              Icon={GripVertical}
              variant="none"
              color="neutral"
              size="custom"
              roundedSize="sm"
              className="absolute inset-s-0 top-2.5 cursor-grab p-0.5 opacity-0 transition-opacity hover:bg-text/10 focus-visible:opacity-100 active:cursor-grabbing group-hover/row:opacity-100"
              iconClassName="size-3"
            />
          )}
          {isGroup ? (
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
              roundedSize="sm"
              className="mt-1 hover:text-text"
              onClick={() => onToggleCollapse(row.id)}
            />
          ) : (
            <span className="w-3.5 shrink-0" />
          )}
          <button
            type="button"
            dir="ltr"
            title={`${content.openEditor.value}: ${row.id}`}
            onClick={() =>
              onOpenEditor(
                row.id,
                row.isLocalized
                  ? (localeKeys[0] ?? SHARED_CELL_KEY)
                  : SHARED_CELL_KEY
              )
            }
            className={cn(
              'min-w-0 cursor-pointer break-words text-start text-sm hover:underline',
              isGroup ? 'font-semibold' : 'text-text'
            )}
          >
            {formatFieldLabel(row.label)}
          </button>
          <TypeBadge row={row} className="mt-0.5" />
          {missingTargets.length > 0 && (
            <Button
              label={content.translateRow.value}
              title={content.translateRow.value}
              Icon={Sparkles}
              iconClassName="size-3.5"
              variant="none"
              color="custom"
              size="custom"
              roundedSize="sm"
              disabled={isTranslating}
              onClick={() => translateCells(missingTargets)}
              className={cn(
                'mt-0.5 opacity-0 transition-opacity focus-visible:opacity-100 group-hover/row:opacity-100',
                AI_TEXT_CLASS_NAME
              )}
            />
          )}
        </div>
        {renderCells()}
      </div>
    );
  }
);

ContentGridRow.displayName = 'ContentGridRow';

export type ContentGridAddLineProps = {
  addLine: AddLine;
  gridTemplateColumns?: string;
  /** Keys already used at the root, for the dictionary-level add line. */
  rootKeys: string[];
};

const getObjectKeys = (node: ContentNode | undefined): string[] =>
  node && typeof node === 'object' && !Array.isArray(node)
    ? Object.keys(node)
    : [];

/**
 * "Add field" line closing an object group (inline key input), or
 * "Add item" line closing an array group (adds an empty item at once).
 */
export const ContentGridAddLine: FC<ContentGridAddLineProps> = ({
  addLine,
  gridTemplateColumns,
  rootKeys,
}) => {
  const { dictionary } = useContentGrid();
  const { addEditedContent } = useEditedContent();
  const content = useIntlayer('content-grid');
  const [isEditing, setIsEditing] = useState(false);
  const [fieldKey, setFieldKey] = useState('');
  const [error, setError] = useState<string | undefined>();

  const localId = dictionary.localId as LocalDictionaryId;
  const parentKeyPath: KeyPath[] = addLine.parentRow?.rootKeyPath ?? [];
  const existingKeys = addLine.parentRow
    ? getObjectKeys(addLine.parentRow.rootNode)
    : rootKeys;

  const addItem = () => {
    const items = (addLine.parentRow?.rootNode ??
      []) as unknown as ContentNode[];

    addEditedContent(
      localId,
      getEmptyNode(items[0]) ?? '',
      [...parentKeyPath, { type: NodeTypes.ARRAY, key: items.length }],
      false
    );
  };

  const reset = () => {
    setIsEditing(false);
    setFieldKey('');
    setError(undefined);
  };

  const submitField = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedKey = fieldKey.trim();

    if (trimmedKey === '') return setError(content.keyRequired.value);
    if (existingKeys.includes(trimmedKey)) {
      return setError(content.keyExists.value);
    }

    addEditedContent(localId, '', [
      ...parentKeyPath,
      { type: NodeTypes.OBJECT, key: trimmedKey },
    ]);
    reset();
  };

  const label = addLine.kind === 'item' ? content.addItem : content.addField;

  return (
    <div className="grid min-w-full" style={{ gridTemplateColumns }}>
      <div
        className={cn(PATH_COLUMN_CLASS_NAME, 'items-center')}
        style={getIndentStyle(addLine.depth)}
      >
        <IndentGuides depth={addLine.depth} />
        <span className="w-3.5 shrink-0" />
        {isEditing ? (
          <form
            onSubmit={submitField}
            className="flex min-w-0 flex-1 flex-col gap-1"
          >
            <div className="flex items-center gap-1">
              <Input
                size="sm"
                dir="ltr"
                autoFocus
                className="font-mono"
                value={fieldKey}
                placeholder={content.fieldKeyPlaceholder.value}
                aria-label={content.fieldKeyPlaceholder.value}
                aria-invalid={error !== undefined}
                onChange={(event) => {
                  setFieldKey(event.currentTarget.value);
                  setError(undefined);
                }}
                onKeyDown={(event) => {
                  event.stopPropagation();
                  if (event.key === 'Escape') reset();
                }}
              />
              <Button
                type="submit"
                label={content.add.value}
                size="sm"
                color="text"
              >
                {content.add}
              </Button>
            </div>
            {error && <span className="text-error text-xs">{error}</span>}
          </form>
        ) : (
          <Button
            label={label.value}
            variant="hoverable"
            color="neutral"
            size="sm"
            Icon={Plus}
            onClick={() =>
              addLine.kind === 'item' ? addItem() : setIsEditing(true)
            }
          >
            {label}
          </Button>
        )}
      </div>
    </div>
  );
};
