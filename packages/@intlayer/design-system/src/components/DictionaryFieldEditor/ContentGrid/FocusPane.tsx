'use client';

import { Button } from '@components/Button';
import { cn } from '@utils/cn';
import { ArrowLeft, Sparkles, X } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { TextEditor } from '../ContentEditorView/TextEditor';
import { useContentGrid } from './ContentGridContext';
import { type ContentRow, getCellId } from './flattenContentRows';
import {
  AI_BORDER_CLASS_NAME,
  AI_SURFACE_CLASS_NAME,
  AI_TEXT_CLASS_NAME,
} from './StatusDot';
import { TypeBadge } from './TypeBadge';

export type FocusPaneProps = {
  row: ContentRow;
  /** Locale (or shared key) the pane was opened on. */
  cellKey: string;
  /** Narrow layouts replace the list with the pane and show a back button. */
  isNarrow: boolean;
  onClose: () => void;
};

/**
 * Full editor for one field. Reuses the recursive {@link TextEditor}, so
 * markdown, html, file, nested and insertion editors behave as before.
 */
export const FocusPane: FC<FocusPaneProps> = ({
  row,
  cellKey,
  isNarrow,
  onClose,
}) => {
  const { dictionary, aiCellIds, acceptAICell, revertAICell } =
    useContentGrid();
  const content = useIntlayer('content-grid');

  const focusedCell = row.cells[cellKey] ?? Object.values(row.cells)[0];
  const section = row.rootKeyPath ? row.rootNode : focusedCell?.value;
  const keyPath = row.rootKeyPath ?? focusedCell?.keyPath ?? [];

  const aiCellIdsOfRow = Object.keys(row.cells)
    .map((key) => getCellId(row.id, key))
    .filter((cellId) => aiCellIds.has(cellId));

  return (
    <section
      aria-label={row.id}
      className="flex h-full min-h-0 w-full min-w-0 flex-col"
    >
      <header className="flex items-center gap-2 border-neutral/20 border-b px-3 py-2">
        {isNarrow && (
          <Button
            label={content.backToList.value}
            variant="hoverable"
            color="text"
            size="icon-md"
            Icon={ArrowLeft}
            onClick={onClose}
          />
        )}
        <span
          dir="ltr"
          className="min-w-0 truncate font-mono font-semibold text-sm"
          title={row.id}
        >
          {row.id}
        </span>
        <TypeBadge row={row} />
        {!isNarrow && (
          <Button
            label={content.close.value}
            variant="hoverable"
            color="text"
            size="icon-md"
            Icon={X}
            className="ms-auto"
            onClick={onClose}
          />
        )}
      </header>

      {aiCellIdsOfRow.length > 0 && (
        <div
          className={cn(
            'flex flex-wrap items-center gap-2 border-b px-3 py-2 text-sm',
            AI_BORDER_CLASS_NAME,
            AI_SURFACE_CLASS_NAME,
            AI_TEXT_CLASS_NAME
          )}
        >
          <Sparkles className="size-4 shrink-0" />
          <span className="flex-1">{content.aiBanner}</span>
          <Button
            label={content.revert.value}
            variant="outline"
            color="text"
            size="sm"
            onClick={() => aiCellIdsOfRow.forEach(revertAICell)}
          >
            {content.revert}
          </Button>
          <Button
            label={content.accept.value}
            color="text"
            size="sm"
            onClick={() => aiCellIdsOfRow.forEach(acceptAICell)}
          >
            {content.accept}
          </Button>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {focusedCell && (
          <TextEditor
            key={row.id}
            dictionary={dictionary}
            section={section}
            keyPath={keyPath}
          />
        )}
      </div>
    </section>
  );
};
