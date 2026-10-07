'use client';

import { Button } from '@components/Button';
import { Popover } from '@components/Popover';
import { Tag } from '@components/Tag';
import type { ContentNode } from '@intlayer/types/dictionary';
import { cn } from '@utils/cn';
import { RotateCcw } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { ChangeSetEntry } from './changeSet';
import { SHARED_CELL_KEY } from './flattenContentRows';

const PREVIEW_MAX_LENGTH = 60;

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

export type ChangeSetPopoverProps = {
  /** Unsaved entries to list. */
  changeSet: ChangeSetEntry[];
  /** Restores one entry to its saved value. */
  onRevert: (entry: ChangeSetEntry) => void;
  /** Trigger the popover opens from on hover / focus, e.g. the save button. */
  children: ReactNode;
  className?: string;
};

/**
 * Staging-area view of unsaved work, shown when hovering or focusing its
 * trigger: every edited field listed as `path · locale` with its
 * before → after preview and its own revert.
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
        <span className="font-semibold text-sm">{content.title}</span>

        {changeSet.length === 0 ? (
          <span className="text-muted-foreground text-sm">
            {content.emptyList}
          </span>
        ) : (
          <ul className="flex min-h-0 flex-col gap-1 overflow-y-auto">
            {changeSet.map((entry) => {
              const previousPreview = formatChangePreview(entry.previousValue);
              const nextPreview = formatChangePreview(entry.nextValue);

              return (
                <li
                  key={entry.cellId}
                  className="flex items-start gap-2 rounded-lg px-2 py-1.5 hover:bg-text/5"
                >
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
                        className="ml-auto shrink-0"
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
                  <Button
                    label={content.revertButton.label.value}
                    Icon={RotateCcw}
                    variant="hoverable"
                    color="text"
                    size="icon-sm"
                    onClick={() => onRevert(entry)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </Popover.Detail>
    </Popover>
  );
};
