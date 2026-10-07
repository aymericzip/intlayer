'use client';

import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { DropDown } from '@components/DropDown';
import { Checkbox } from '@components/Input/Checkbox';
import { SearchInput } from '@components/Input/SearchInput';
import { Tag } from '@components/Tag';
import { useConfiguration, useEditedContent } from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { cn } from '@utils/cn';
import { MoveVertical } from 'lucide-react';
import { type FC, useMemo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { formatDictionaryVariant } from '../dictionaryVariant';
import {
  buildUseIntlayerSnippet,
  type ContentSummary,
  getBaseSibling,
  getContentSummary,
  getItemNumbers,
  getShapeDrift,
  getVariantIdentities,
  type SiblingSelection,
  type VariantIdentity,
} from './siblingSelection';

/** Above this number of items, the item list gets a search and a filter. */
const SEARCHABLE_ITEM_THRESHOLD = 8;

export type DictionarySiblingSwitcherProps = {
  dictionaryKey: string;
  /** Every dictionary sharing the key (base, items, variants). */
  siblings: Dictionary[];
  selectedItem: number | null;
  selectedVariant: string | null;
  onSelect: (selection: SiblingSelection) => void;
  /** Single context dropdown, for the visual editor side panel. */
  isCompact?: boolean;
  className?: string;
};

type ItemEntry = {
  item: number;
  summary: ContentSummary;
  completeness: number;
  missingKeys: string[];
  hasUnsavedChanges: boolean;
};

const getAverageCompleteness = (summary: ContentSummary): number => {
  const ratios = Object.values(summary.completenessByLocale);
  if (ratios.length === 0) return 1;

  return ratios.reduce((total, ratio) => total + ratio, 0) / ratios.length;
};

/** True when the edited-content store holds unsaved edits for a sibling. */
type EditedContentRecord = ReturnType<typeof useEditedContent>['editedContent'];

const getHasUnsavedChanges = (
  sibling: Dictionary,
  editedContent: EditedContentRecord
): boolean =>
  sibling.localId !== undefined &&
  editedContent?.[sibling.localId as LocalDictionaryId] !== undefined;

const formatPercent = (ratio: number): string => `${Math.round(ratio * 100)}%`;

/** Small amber dot marking a sibling with unsaved edits. */
const UnsavedDot: FC = () => (
  <span
    aria-hidden
    className="inline-block size-1.5 shrink-0 rounded-full bg-warning"
  />
);

/**
 * Picks the collection item and/or variant of a dictionary key. Renders
 * nothing for keys without items or variants. The full matrix of
 * item × variant combinations is never drawn: one selector per axis.
 */
export const DictionarySiblingSwitcher: FC<DictionarySiblingSwitcherProps> = ({
  dictionaryKey,
  siblings,
  selectedItem,
  selectedVariant,
  onSelect,
  isCompact = false,
  className,
}) => {
  const content = useIntlayer('sibling-switcher');
  const configuration = useConfiguration();
  const { editedContent } = useEditedContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [isIncompleteOnly, setIsIncompleteOnly] = useState(false);

  const locales = useMemo(
    () => (configuration?.internationalization?.locales ?? []).map(String),
    [configuration]
  );
  const sourceLocale = String(
    configuration?.internationalization?.defaultLocale ?? locales[0] ?? 'en'
  );

  const itemNumbers = useMemo(() => getItemNumbers(siblings), [siblings]);
  const variants = useMemo(() => getVariantIdentities(siblings), [siblings]);
  const baseSibling = useMemo(() => getBaseSibling(siblings), [siblings]);
  const shapeDrift = useMemo(() => getShapeDrift(siblings), [siblings]);

  const itemEntries = useMemo<ItemEntry[]>(
    () =>
      itemNumbers.map((item) => {
        const itemSiblings = siblings.filter(
          (sibling) => sibling.item === item
        );
        // Summarize the entry under the selected variant when it exists
        const summarizedSibling =
          itemSiblings.find(
            (sibling) =>
              selectedVariant !== null &&
              sibling.variant !== undefined &&
              formatDictionaryVariant(sibling.variant) === selectedVariant
          ) ?? itemSiblings[0];
        const summary = getContentSummary(
          summarizedSibling?.content,
          locales,
          sourceLocale
        );

        return {
          item,
          summary,
          completeness: getAverageCompleteness(summary),
          missingKeys: shapeDrift[item] ?? [],
          hasUnsavedChanges: itemSiblings.some((sibling) =>
            getHasUnsavedChanges(sibling, editedContent)
          ),
        };
      }),
    [
      itemNumbers,
      siblings,
      selectedVariant,
      locales,
      sourceLocale,
      shapeDrift,
      editedContent,
    ]
  );

  if (itemNumbers.length === 0 && variants.length === 0) return null;

  const selectedVariantIdentity = variants.find(
    (variant) => variant.identity === selectedVariant
  );
  const snippet = buildUseIntlayerSnippet(
    dictionaryKey,
    selectedItem,
    selectedVariantIdentity
  );
  const isSearchable = itemEntries.length > SEARCHABLE_ITEM_THRESHOLD;
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleItemEntries = itemEntries.filter(
    (entry) =>
      (!isIncompleteOnly ||
        entry.completeness < 1 ||
        entry.missingKeys.length > 0) &&
      (normalizedQuery === '' ||
        String(entry.item).includes(normalizedQuery) ||
        entry.summary.preview.toLowerCase().includes(normalizedQuery))
  );

  const selectItem = (item: number | null) =>
    onSelect({ item, variant: selectedVariant });
  const selectVariant = (variant: string | null) =>
    onSelect({ item: selectedItem, variant });

  const getVariantSibling = (
    variant: VariantIdentity
  ): Dictionary | undefined =>
    siblings.find(
      (sibling) =>
        sibling.variant !== undefined &&
        formatDictionaryVariant(sibling.variant) === variant.identity &&
        (selectedItem === null || sibling.item === selectedItem)
    );

  const renderVariantLabel = (variant: VariantIdentity) => (
    <span
      className={cn(
        'flex items-center gap-1.5',
        variant.isStructured && 'font-mono'
      )}
      dir={variant.isStructured ? 'ltr' : undefined}
    >
      {typeof variant.primaryValue === 'string'
        ? variant.primaryValue
        : JSON.stringify(variant.primaryValue)}
      {variant.isDefault && (
        <span className="font-normal opacity-70">({content.defaultTag})</span>
      )}
    </span>
  );

  const contextLabel = [
    dictionaryKey,
    ...(selectedVariantIdentity
      ? [
          typeof selectedVariantIdentity.primaryValue === 'string'
            ? selectedVariantIdentity.primaryValue
            : JSON.stringify(selectedVariantIdentity.primaryValue),
        ]
      : []),
    ...(selectedItem !== null
      ? [String(content.itemLabel({ item: String(selectedItem) }))]
      : []),
  ].join(' · ');

  const renderBaseEntry = (onClick: () => void, isActive: boolean) =>
    baseSibling && (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isActive}
        className={cn(
          'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-start text-sm transition-colors',
          isActive ? 'bg-text/10 font-semibold' : 'hover:bg-text/5'
        )}
      >
        <span className="font-medium">{content.baseLabel}</span>
        <span className="truncate text-neutral text-xs">
          {content.baseDescription}
        </span>
        {getHasUnsavedChanges(baseSibling, editedContent) && <UnsavedDot />}
      </button>
    );

  const renderItemEntry = (entry: ItemEntry, onClick: () => void) => {
    const isActive = selectedItem === entry.item;
    const completenessTitle = Object.entries(entry.summary.completenessByLocale)
      .map(([locale, ratio]) => `${locale}: ${formatPercent(ratio)}`)
      .join(' · ');

    return (
      <button
        key={entry.item}
        type="button"
        onClick={onClick}
        aria-pressed={isActive}
        className={cn(
          'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-start text-sm transition-colors',
          isActive ? 'bg-text/10' : 'hover:bg-text/5'
        )}
      >
        <span className="w-8 shrink-0 font-mono text-neutral text-xs" dir="ltr">
          #{entry.item}
        </span>
        <span
          className={cn(
            'min-w-0 flex-1 truncate',
            isActive && 'font-semibold',
            !entry.summary.preview && 'text-neutral italic'
          )}
          dir="auto"
        >
          {entry.summary.preview || content.emptyPreview}
        </span>
        {entry.hasUnsavedChanges && <UnsavedDot />}
        {entry.missingKeys.length > 0 && (
          <Tag color="warning" size="xs" className="shrink-0">
            {content.missingKeys} {entry.missingKeys.join(', ')}
          </Tag>
        )}
        {!isCompact && (
          <span
            className="flex w-24 shrink-0 items-center gap-2"
            title={`${content.completenessLabel.value} — ${completenessTitle}`}
          >
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-neutral/20">
              <span
                className={cn(
                  'block h-full rounded-full',
                  entry.completeness >= 1 ? 'bg-success' : 'bg-warning'
                )}
                style={{ width: formatPercent(entry.completeness) }}
              />
            </span>
            <span className="w-8 text-end text-neutral text-xs">
              {formatPercent(entry.completeness)}
            </span>
          </span>
        )}
      </button>
    );
  };

  const renderVariantChip = (variant: VariantIdentity, onClick: () => void) => {
    const isActive = selectedVariant === variant.identity;
    const variantSibling = getVariantSibling(variant);

    return (
      <div key={variant.identity} className="flex flex-col gap-0.5">
        <Button
          variant={isActive ? 'default' : 'outline'}
          size="sm"
          color="text"
          label={variant.identity}
          aria-pressed={isActive}
          onClick={onClick}
        >
          <span className="flex items-center gap-1.5">
            {renderVariantLabel(variant)}
            {variantSibling &&
              getHasUnsavedChanges(variantSibling, editedContent) && (
                <UnsavedDot />
              )}
          </span>
        </Button>
        {variant.aliases.length > 0 && (
          <span className="px-1 text-neutral text-xs">
            {content.alsoAnswersTo}{' '}
            <span className="font-mono" dir="ltr">
              {variant.aliases
                .map((alias) =>
                  typeof alias === 'string' ? alias : JSON.stringify(alias)
                )
                .join(', ')}
            </span>
          </span>
        )}
      </div>
    );
  };

  if (isCompact) {
    const dropdownIdentifier = `sibling-switcher-${dictionaryKey}`;

    return (
      <div
        className={cn(
          'rounded-xl border border-text text-foreground transition-colors',
          className
        )}
      >
        <DropDown identifier={dropdownIdentifier}>
          <DropDown.Trigger
            identifier={dropdownIdentifier}
            label={content.contextLabel.value}
            color="text"
            variant="hoverable"
            roundedSize="xl"
          >
            <span className="flex w-full items-center justify-between gap-2">
              <span className="truncate font-mono text-xs" dir="ltr">
                {contextLabel}
              </span>
              <MoveVertical className="shrink-0" size={16} />
            </span>
          </DropDown.Trigger>
          <DropDown.Panel
            identifier={dropdownIdentifier}
            isOverable
            isFocusable
            align="start"
          >
            <Container
              className="flex max-h-[60vh] w-72 flex-col gap-3 overflow-y-auto p-2"
              transparency="xs"
              border
              roundedSize="xl"
              borderColor="text"
            >
              {itemEntries.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="px-2 font-medium text-neutral text-xs">
                    {content.itemsLabel}
                  </span>
                  {renderBaseEntry(
                    () => selectItem(null),
                    selectedItem === null
                  )}
                  {itemEntries.map((entry) =>
                    renderItemEntry(entry, () => selectItem(entry.item))
                  )}
                </div>
              )}
              {variants.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="px-2 font-medium text-neutral text-xs">
                    {content.variantsLabel}
                  </span>
                  <div className="flex flex-wrap gap-1 px-1">
                    {variants.map((variant) =>
                      renderVariantChip(variant, () =>
                        selectVariant(
                          selectedVariant === variant.identity
                            ? null
                            : variant.identity
                        )
                      )
                    )}
                  </div>
                </div>
              )}
            </Container>
          </DropDown.Panel>
        </DropDown>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {variants.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="font-medium text-neutral text-xs">
            {content.variantsLabel}
          </span>
          <div className="flex flex-wrap items-start gap-1">
            {itemEntries.length === 0 && baseSibling && (
              <Button
                variant={selectedVariant === null ? 'default' : 'outline'}
                size="sm"
                color="text"
                label={content.baseLabel.value}
                aria-pressed={selectedVariant === null}
                onClick={() => selectVariant(null)}
              >
                {content.baseLabel}
              </Button>
            )}
            {variants.map((variant) =>
              renderVariantChip(variant, () =>
                selectVariant(
                  selectedVariant === variant.identity ? null : variant.identity
                )
              )
            )}
          </div>
          {selectedVariantIdentity && !selectedVariantIdentity.isDefault && (
            <span className="text-neutral text-xs">
              {content.inheritanceHint}
            </span>
          )}
        </div>
      )}

      {itemEntries.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-medium text-neutral text-xs">
              {content.itemsLabel}
            </span>
            {variants.length > 0 && (
              <span className="text-neutral text-xs">
                {content.combinations({
                  items: String(itemEntries.length),
                  variants: String(variants.length),
                  total: String(itemEntries.length * variants.length),
                })}
              </span>
            )}
          </div>

          {isSearchable && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="min-w-48 flex-1">
                <SearchInput
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={content.searchItems.value}
                  aria-label={content.searchItems.value}
                />
              </div>
              <Checkbox
                name="sibling-switcher-incomplete-only"
                label={content.incompleteOnly}
                checked={isIncompleteOnly}
                onChange={(event) => setIsIncompleteOnly(event.target.checked)}
                size="sm"
              />
            </div>
          )}

          <div className="flex max-h-72 flex-col gap-0.5 overflow-y-auto">
            {renderBaseEntry(() => selectItem(null), selectedItem === null)}
            {visibleItemEntries.map((entry) =>
              renderItemEntry(entry, () => selectItem(entry.item))
            )}
            {visibleItemEntries.length === 0 && (
              <span className="px-3 py-2 text-neutral text-sm">
                {content.noMatchingItem}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-neutral text-xs">{content.codeSnippetLabel}</span>
        <CopyToClipboard text={snippet} className="text-xs" size={12}>
          <code className="font-mono text-xs" dir="ltr">
            {snippet}
          </code>
        </CopyToClipboard>
      </div>
    </div>
  );
};
