'use client';

import { Input } from '@components/Input';
import { SwitchSelector } from '@components/SwitchSelector';
import { AutoSizedTextArea } from '@components/TextArea';
import type { ContentNode } from '@intlayer/types/dictionary';
import { cn } from '@utils/cn';
import { Maximize2 } from 'lucide-react';
import {
  type FC,
  type KeyboardEvent,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { useContentGrid } from './ContentGridContext';
import type { ContentRow, LeafKind } from './flattenContentRows';
import { getCellPreview } from './gridRows';
import { StatusDot } from './StatusDot';

/** Leaf kinds edited in the focus pane rather than in the cell. */
const RICH_LEAF_KINDS: LeafKind[] = ['markdown', 'html', 'file', 'nested'];

/** True when a leaf row is edited in the focus pane. */
export const getIsRichRow = (row: ContentRow): boolean =>
  row.leafKind !== undefined && RICH_LEAF_KINDS.includes(row.leafKind);

const BOOLEAN_CHOICES = [
  { content: 'False', value: false },
  { content: 'True', value: true },
];

export type ContentGridCellProps = {
  row: ContentRow;
  cellKey: string;
  /** Opens the focus pane on this cell. */
  onOpenEditor: (rowId: string, cellKey: string) => void;
  /** Roving-focus coordinates, `row:column`. */
  position?: string;
  /** Shows the status marker (hidden in narrow lists that show it elsewhere). */
  showStatus?: boolean;
  className?: string;
};

type TextCellEditorProps = {
  value: string;
  isDisabled: boolean;
  onCommit: (value: string) => void;
  onStopEditing: () => void;
};

/** Auto-sized textarea keeping a local draft; commits on blur or Cmd+Enter. */
const TextCellEditor: FC<TextCellEditorProps> = ({
  value,
  isDisabled,
  onCommit,
  onStopEditing,
}) => {
  const { editValue } = useIntlayer('content-grid');
  const [draft, setDraft] = useState(value);
  const isCancelledRef = useRef(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Focus with the caret after the last character, not at the start
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    textArea.focus();
    textArea.setSelectionRange(textArea.value.length, textArea.value.length);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();

    if (event.key === 'Escape') {
      event.preventDefault();
      isCancelledRef.current = true;
      onStopEditing();
    } else if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      event.currentTarget.blur();
    }
  };

  return (
    <AutoSizedTextArea
      ref={textAreaRef}
      dir="auto"
      variant="invisible"
      className="min-h-0 w-full bg-transparent p-0 text-sm"
      aria-label={editValue.value}
      value={draft}
      disabled={isDisabled}
      onChange={(event) => setDraft(event.currentTarget.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => {
        if (!isCancelledRef.current && draft !== value) onCommit(draft);
        onStopEditing();
      }}
    />
  );
};

/**
 * One value of the grid. Plain values are edited in place; rich values
 * (markdown, html, file, nested) show a preview and open the focus pane.
 */
export const ContentGridCell: FC<ContentGridCellProps> = memo(
  ({ row, cellKey, onOpenEditor, position, showStatus = true, className }) => {
    const { getStatus, setCellValue } = useContentGrid();
    const content = useIntlayer('content-grid');
    const [isEditing, setIsEditing] = useState(false);
    const cellRef = useRef<HTMLDivElement>(null);

    const cell = row.cells[cellKey];
    const status = getStatus(row, cellKey);
    const isLocked = status === 'locked';
    const isReadonly = row.leafKind === 'readonly';
    const isRich = getIsRichRow(row);
    const value: ContentNode = cell?.value;

    const commit = (newValue: ContentNode) =>
      setCellValue(row, cellKey, newValue);

    const stopEditing = () => {
      setIsEditing(false);
      cellRef.current?.focus();
    };

    const activate = () => {
      if (isLocked || isReadonly) return;
      if (isRich) {
        onOpenEditor(row.id, cellKey);
        return;
      }
      if (row.leafKind === 'text' || row.leafKind === 'empty') {
        setIsEditing(true);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) return;
      if (event.key === 'Enter') {
        event.preventDefault();
        activate();
      }
    };

    const renderValue = () => {
      if (!cell) return null;

      if (isReadonly) {
        return (
          <span
            className="rounded-md border border-neutral/30 px-1.5 py-0.5 font-mono text-[10px] text-neutral"
            title={content.readonlyTooltip.value}
          >
            {content.readonlyChip}
          </span>
        );
      }

      if (row.leafKind === 'boolean') {
        return (
          <SwitchSelector
            choices={BOOLEAN_CHOICES}
            value={value === true}
            onChange={(newValue: boolean) => commit(newValue)}
            disabled={isLocked}
            color="text"
            size="xs"
          />
        );
      }

      if (row.leafKind === 'number') {
        return (
          <Input
            type="number"
            size="sm"
            dir="ltr"
            key={String(value)}
            defaultValue={typeof value === 'number' ? value : ''}
            disabled={isLocked}
            aria-label={content.editValue.value}
            onKeyDown={(event) => event.stopPropagation()}
            onBlur={(event) => {
              const parsed = Number(event.currentTarget.value);
              if (!Number.isNaN(parsed) && parsed !== value) commit(parsed);
            }}
          />
        );
      }

      if (isEditing) {
        return (
          <TextCellEditor
            value={typeof value === 'string' ? value : ''}
            isDisabled={isLocked}
            onCommit={commit}
            onStopEditing={stopEditing}
          />
        );
      }

      const preview = getCellPreview(value);

      return (
        <span
          dir="auto"
          className={cn(
            'line-clamp-3 min-w-0 flex-1 whitespace-pre-wrap break-words text-sm',
            preview === '' && 'text-neutral italic',
            isRich && 'line-clamp-1',
            isLocked && 'text-neutral'
          )}
          title={isRich ? preview : undefined}
        >
          {preview === '' ? content.emptyValue : preview}
        </span>
      );
    };

    return (
      // biome-ignore lint/a11y/useSemanticElements: roving-focus grid cell hosting inline editors
      <div
        ref={cellRef}
        role="gridcell"
        tabIndex={-1}
        data-grid-position={position}
        aria-readonly={isLocked || isReadonly}
        title={isLocked ? content.lockedTooltip.value : undefined}
        onClick={isEditing ? undefined : activate}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex min-h-10 w-full min-w-0 max-w-xl items-start gap-2.5 rounded-lg px-3 py-2.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-text/40',
          !isLocked && !isReadonly && 'cursor-text hover:bg-text/5',
          isRich && 'cursor-pointer',
          isLocked && 'cursor-not-allowed opacity-60',
          className
        )}
      >
        {showStatus && <StatusDot status={status} className="mt-0.5" />}
        {renderValue()}
        {isRich && !isLocked && (
          <Maximize2
            className="mt-0.5 size-3.5 shrink-0 text-neutral"
            aria-label={content.openEditor.value}
          />
        )}
      </div>
    );
  }
);

ContentGridCell.displayName = 'ContentGridCell';
