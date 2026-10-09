'use client';

import { Button } from '@components/Button';
import { Popover } from '@components/Popover';
import { Tag } from '@components/Tag';
import { VirtualizedList } from '@components/VirtualizedList';
import type { ContentNode } from '@intlayer/types/dictionary';
import { cn } from '@utils/cn';
import { RotateCcw } from 'lucide-react';
import { type FC, memo, type ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { ChangeSetEntry } from './changeSet';
import { SHARED_CELL_KEY } from './flattenContentRows';

const PREVIEW_MAX_LENGTH = 60;

/** Fixed height of one entry row, in pixels (two truncated lines). */
const ENTRY_ROW_HEIGHT = 52;

const KIND_COLORS: Record<
  ChangeSetEntry['kind'],
  'success' | 'warning' | 'error'
> = {
  added: 'success',
  changed: 'warning',
  removed: 'error',
};

/** One-line preview of a content value, truncated. */
export const formatChangePreview = (
  value: ContentNode | undefined
): string | undefined => {
  if (value === undefined || value === null || value === '') return undefined;

  const text = typeof value === 'string' ? value : JSON.stringify(value);
  const singleLine = text.replace(/\s+/g, ' ').trim();

  return singleLine.length > PREVIEW_MAX_LENGTH
    ? `${singleLine.slice(0, PREVIEW_MAX_LENGTH)}…`
    : singleLine;
};

type ChangeSetEntryRowProps = {
  entry: ChangeSetEntry;
  onRevert?: (entry: ChangeSetEntry) => void;
};

/** One unsaved field: `path · locale`, before → after, and its revert. */
const ChangeSetEntryRow: FC<ChangeSetEntryRowProps> = memo(
  ({ entry, onRevert }) => {
    const content = useIntlayer('change-set');
    const previousPreview = formatChangePreview(entry.previousValue);
    const nextPreview = formatChangePreview(entry.nextValue);

    return (
      <div className="flex h-full items-start gap-2 overflow-hidden rounded-lg px-2 py-1.5 hover:bg-text/5">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate font-mono text-xs" dir="ltr">
              {entry.rowId}
              <span className="text-muted-foreground">
                {' · '}
                {entry.cellKey === SHARED_CELL_KEY
                  ? content.allLocales
                  : entry.cellKey}
              </span>
            </span>
            <Tag
              size="xs"
              color={KIND_COLORS[entry.kind]}
              className="ms-auto shrink-0"
            >
              {content[entry.kind]}
            </Tag>
          </div>
          <span className="flex min-w-0 items-center gap-1 text-xs">
            <span
              dir="auto"
              className={cn(
                'truncate text-muted-foreground',
                previousPreview && 'line-through'
              )}
            >
              {previousPreview ?? content.emptyValue}
            </span>
            <span className="shrink-0 text-muted-foreground">→</span>
            <span dir="auto" className="truncate">
              {nextPreview ?? content.emptyValue}
            </span>
          </span>
        </div>
        {onRevert && (
          <Button
            label={content.revertButton.label.value}
            Icon={RotateCcw}
            variant="hoverable"
            color="text"
            size="icon-sm"
            onClick={() => onRevert(entry)}
          />
        )}
      </div>
    );
  }
);

const getEntryKey = (entry: ChangeSetEntry) => entry.cellId;

export type ChangeSetPopoverProps = {
  /** Unsaved entries to list. */
  changeSet: ChangeSetEntry[];
  /** Restores one entry to its saved value. Omitted, entries are read-only. */
  onRevert?: (entry: ChangeSetEntry) => void;
  /** Trigger the popover opens from on hover / focus, e.g. the save button. */
  children: ReactNode;
  className?: string;
};

/**
 * Staging-area view of unsaved work, shown when hovering or focusing its
 * trigger: every edited field listed as `path · locale` with its
 * before → after preview and its own revert.
 *
 * Only the rows in view are mounted, so replacing a whole dictionary (hundreds
 * of entries) keeps the popover light to render and scroll.
 */
export const ChangeSetPopover: FC<ChangeSetPopoverProps> = ({
  changeSet,
  onRevert,
  children,
  className,
}) => {
  const content = useIntlayer('change-set');

  return (
    <Popover identifier="change-set" className={className}>
      {children}

      <Popover.Detail
        identifier="change-set"
        isFocusable
        xAlign="end"
        yAlign="above"
        roundedSize="2xl"
        className="flex max-h-96 w-[min(28rem,90vw)] cursor-default flex-col gap-2 overflow-hidden rounded-2xl p-3"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-sm">{content.title}</span>
          {changeSet.length > 0 && (
            <span className="text-muted-foreground text-xs tabular-nums">
              {changeSet.length}
            </span>
          )}
        </div>

        {changeSet.length === 0 ? (
          <span className="text-muted-foreground text-sm">
            {content.emptyList}
          </span>
        ) : (
          <VirtualizedList
            items={changeSet}
            itemHeight={ENTRY_ROW_HEIGHT}
            getItemKey={getEntryKey}
            renderItem={(entry) => (
              <ChangeSetEntryRow entry={entry} onRevert={onRevert} />
            )}
          />
        )}
      </Popover.Detail>
    </Popover>
  );
};
