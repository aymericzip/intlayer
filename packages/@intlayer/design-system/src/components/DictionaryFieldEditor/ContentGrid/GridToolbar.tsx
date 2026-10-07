'use client';

import { Button } from '@components/Button';
import { ClickOutsideDiv } from '@components/ClickOutsideDiv';
import { SearchInput } from '@components/Input';
import { KeyboardShortcut } from '@components/KeyboardShortcut';
import { LocaleSwitcherContent } from '@components/LocaleSwitcherContentDropDown';
import { Popover } from '@components/Popover';
import { TabSelector } from '@components/TabSelector';
import { Check, CornerDownRight, Sparkles } from 'lucide-react';
import { type FC, type ReactNode, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { type CellTarget, useContentGrid } from './ContentGridContext';
import type { CellStatus, CellStatusFilter } from './cellStatus';
import { StatusDot } from './StatusDot';

export type GridToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  statusFilter: CellStatusFilter;
  onStatusFilterChange: (filter: CellStatusFilter) => void;
  /** Status counts over the visible locales. */
  statusCounts: Record<CellStatus, number>;
  /** Visible locale columns. */
  localeKeys: string[];
  /** Jumps to the next missing cell; hidden when undefined. */
  onJumpToMissing?: () => void;
  /** Narrow layouts hide the multi-locale picker. */
  isNarrow: boolean;
};

const formatLocaleList = (locales: string[]): string =>
  locales.map((locale) => locale.toUpperCase()).join(', ');

type TranslateMissingButtonProps = {
  targets: CellTarget[];
  /** Locales the translation writes to. */
  targetLocales: string[];
  /** Visible locales skipped because the user cannot edit them. */
  skippedLocales: string[];
};

/**
 * Bulk AI action that names its targets ("Translate missing → FR, DE") and
 * asks for confirmation with the count before touching anything.
 */
const TranslateMissingButton: FC<TranslateMissingButtonProps> = ({
  targets,
  targetLocales,
  skippedLocales,
}) => {
  const { translateCells, isTranslating, sourceLocale } = useContentGrid();
  const content = useIntlayer('content-grid');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const isDisabled = targets.length === 0;
  const label = isDisabled
    ? content.fill.value
    : `${content.translateMissing.value} → ${formatLocaleList(targetLocales)}`;

  return (
    <ClickOutsideDiv
      onClickOutSide={() => setIsConfirmOpen(false)}
      listenForEscape
      disabled={!isConfirmOpen}
      className="inline-flex"
    >
      <Popover identifier="content-grid-translate-missing">
        <Button
          label={label}
          variant="outline"
          color="neutral"
          size="sm"
          roundedSize="md"
          Icon={Sparkles}
          isLoading={isTranslating}
          disabled={isDisabled || isTranslating}
          onClick={() => setIsConfirmOpen((isOpen) => !isOpen)}
        >
          <span dir="ltr">{label}</span>
        </Button>
        <Popover.Detail
          identifier="content-grid-translate-missing"
          isHidden={!isConfirmOpen}
          isOverable={false}
          displayArrow={false}
          xAlign="end"
          className="w-72 p-3 delay-0"
        >
          <div className="flex flex-col gap-3 text-sm">
            <p>
              {content.confirmTranslateDescription}{' '}
              <span className="font-mono" dir="ltr">
                {sourceLocale.toUpperCase()}
              </span>
            </p>
            <ul className="flex flex-col gap-1">
              {targetLocales.map((locale) => (
                <li
                  key={locale}
                  className="flex items-center justify-between font-mono text-xs"
                  dir="ltr"
                >
                  <span>{locale.toUpperCase()}</span>
                  <span>
                    {
                      targets.filter((target) => target.cellKey === locale)
                        .length
                    }
                  </span>
                </li>
              ))}
            </ul>
            {skippedLocales.length > 0 && (
              <p className="text-neutral text-xs">
                {content.skippedLocked}{' '}
                <span className="font-mono" dir="ltr">
                  {formatLocaleList(skippedLocales)}
                </span>
              </p>
            )}
            <div className="flex justify-end gap-2">
              <Button
                label={content.cancel.value}
                variant="outline"
                color="text"
                size="sm"
                onClick={() => setIsConfirmOpen(false)}
              >
                {content.cancel}
              </Button>
              <Button
                label={content.confirm.value}
                color="text"
                size="sm"
                onClick={() => {
                  setIsConfirmOpen(false);
                  translateCells(targets);
                }}
              >
                {content.confirm}
              </Button>
            </div>
          </div>
        </Popover.Detail>
      </Popover>
    </ClickOutsideDiv>
  );
};

/** Search, status filters, locale picker and bulk AI actions of the grid. */
export const GridToolbar: FC<GridToolbarProps> = ({
  query,
  onQueryChange,
  statusFilter,
  onStatusFilterChange,
  statusCounts,
  localeKeys,
  onJumpToMissing,
  isNarrow,
}) => {
  const {
    sourceLocale,
    lockedLocales,
    getMissingTargets,
    aiCellIds,
    acceptAllAICells,
  } = useContentGrid();
  const content = useIntlayer('content-grid');

  const targets = getMissingTargets(localeKeys);
  const targetLocales = localeKeys.filter(
    (locale) => locale !== sourceLocale && !lockedLocales.has(locale)
  );
  const skippedLocales = localeKeys.filter((locale) =>
    lockedLocales.has(locale)
  );

  const filters: {
    filter: CellStatusFilter;
    label: ReactNode;
    count?: number;
    status?: CellStatus;
  }[] = [
    { filter: 'all', label: content.filterAll },
    {
      filter: 'missing',
      label: content.filterMissing,
      count: statusCounts.missing,
      status: 'missing',
    },
    {
      filter: 'edited',
      label: content.filterEdited,
      count: statusCounts.edited,
      status: 'edited',
    },
    {
      filter: 'ai',
      label: content.filterAI,
      count: statusCounts.ai,
      status: 'ai',
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <div className="min-w-48 max-w-md flex-1">
          <SearchInput
            value={query}
            onChange={(event) => onQueryChange(event.currentTarget.value)}
            placeholder={content.searchPlaceholder.value}
            aria-label={content.searchPlaceholder.value}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!isNarrow && (
            <LocaleSwitcherContent
              size="sm"
              variant="outline"
              color="neutral"
              roundedSize="2xl"
            />
          )}
          <TranslateMissingButton
            targets={targets}
            targetLocales={targetLocales}
            skippedLocales={skippedLocales}
          />
          {aiCellIds.size > 0 && (
            <Button
              label={content.acceptAll.value}
              variant="hoverable"
              color="text"
              size="sm"
              roundedSize="md"
              Icon={Check}
              onClick={acceptAllAICells}
            >
              {content.acceptAll}
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 py-3">
        <TabSelector
          selectedChoice={statusFilter}
          hoverable
          color="text"
          className="w-auto"
          tabs={filters.map(({ filter, label, count, status }) => (
            <button
              key={filter}
              type="button"
              aria-pressed={statusFilter === filter}
              data-active={statusFilter === filter}
              onClick={() => onStatusFilterChange(filter)}
              className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md px-4 py-1 font-medium text-sm transition-colors focus:outline-none"
            >
              {status && <StatusDot status={status} />}
              <span>{label}</span>
              {count !== undefined && (
                <span className="font-mono opacity-70">{count}</span>
              )}
            </button>
          ))}
        />
        {onJumpToMissing && statusCounts.missing > 0 && (
          <Button
            label={content.jumpToMissing.value}
            variant="hoverable"
            color="neutral"
            size="sm"
            roundedSize="md"
            Icon={CornerDownRight}
            className="ms-auto"
            onClick={onJumpToMissing}
          >
            {content.jumpToMissing}
          </Button>
        )}
        {onJumpToMissing && statusCounts.missing > 0 && (
          <KeyboardShortcut
            shortcut="J"
            size="sm"
            onTriggered={onJumpToMissing}
          />
        )}
      </div>
    </div>
  );
};
