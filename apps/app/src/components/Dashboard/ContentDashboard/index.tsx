import {
  useGetDictionaries,
  useGetDictionary,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { DictionaryFieldEditor } from '@intlayer/design-system/dictionary-field-editor';
import { Loader } from '@intlayer/design-system/loader';
import { Pagination } from '@intlayer/design-system/pagination';
import { App_Dashboard_Dictionaries_Path } from '@intlayer/design-system/routes';
import { Tag } from '@intlayer/design-system/tag';
import { useDictionariesRecord } from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';
import { useQueryClient } from '@tanstack/react-query';
import { Pin, PinOff } from 'lucide-react';
import { type FC, Suspense, useMemo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useTheme } from '#/providers/ThemeProvider';
import { useDictionarySidebar } from '#hooks/useDictionarySidebar';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';

type ContentDashboardContentProps = {
  dictionaryKey: string;
};

/**
 * Derives the list of collection item numbers declared among a set of sibling
 * dictionaries, sorted ascending.
 */
const extractItemNumbers = (siblings: Dictionary[]): number[] =>
  [
    ...new Set(
      siblings.filter((d) => d.item !== undefined).map((d) => d.item as number)
    ),
  ].sort((a, b) => a - b);

/**
 * Derives the list of variant names declared among a set of sibling
 * dictionaries, preserving declaration order.
 */
const extractVariantNames = (siblings: Dictionary[]): string[] => [
  ...new Set(
    siblings
      .filter((d) => d.variant !== undefined)
      .map((d) => d.variant as string)
  ),
];

/**
 * Derives the list of meta IDs (as strings) declared among a set of sibling
 * dictionaries, preserving declaration order.
 */
const extractMetaIds = (siblings: Dictionary[]): string[] => [
  ...new Set(
    siblings.filter((d) => d.meta !== undefined).map((d) => String(d.meta!.id))
  ),
];

export const ContentDashboard: FC<ContentDashboardContentProps> = ({
  dictionaryKey,
}) => {
  const { resolvedTheme } = useTheme();
  const { data: dictionaryResult, isPending } = useGetDictionary(dictionaryKey);
  const { data: siblingsResult } = useGetDictionaries(
    { key: dictionaryKey, pageSize: 200 },
    { enabled: Boolean(dictionaryKey) }
  );
  const { localeDictionaries } = useDictionariesRecord();
  const queryClient = useQueryClient();
  const content = useIntlayer('content-dashboard');
  const {
    pinDictionary: pinDictionaryLabel,
    unpinDictionary: unpinDictionaryLabel,
  } = useIntlayer('dashboard-sidebar');
  const { pin, unpin, isPinned } = useDictionarySidebar();

  const navigate = useLocalizedNavigate();

  const remoteDictionary = dictionaryResult?.data;

  const localeDictionary = useMemo(
    () =>
      Object.values(localeDictionaries ?? {}).find(
        (d): d is Dictionary => d.key === dictionaryKey
      ),
    [localeDictionaries, dictionaryKey]
  );

  // All backend dictionaries sharing this key (items, variants, meta records)
  const siblings: Dictionary[] = useMemo(
    () => (siblingsResult?.data as Dictionary[] | undefined) ?? [],
    [siblingsResult]
  );

  const itemNumbers = useMemo(() => extractItemNumbers(siblings), [siblings]);
  const variantNames = useMemo(() => extractVariantNames(siblings), [siblings]);
  const metaIds = useMemo(() => extractMetaIds(siblings), [siblings]);

  const hasSiblingDimensions =
    itemNumbers.length > 0 || variantNames.length > 0 || metaIds.length > 0;

  // Selector state — null means "show base dictionary"
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedMetaId, setSelectedMetaId] = useState<string | null>(null);

  /** Find the sibling that best matches the current selector state. */
  const selectedSibling = useMemo<Dictionary | null>(() => {
    if (!selectedItem && !selectedVariant && !selectedMetaId) return null;
    return (
      siblings.find((d) => {
        const itemMatch = selectedItem === null || d.item === selectedItem;
        const variantMatch =
          selectedVariant === null || d.variant === selectedVariant;
        const metaMatch =
          selectedMetaId === null || String(d.meta?.id) === selectedMetaId;
        return itemMatch && variantMatch && metaMatch;
      }) ?? null
    );
  }, [siblings, selectedItem, selectedVariant, selectedMetaId]);

  const dictionary = selectedSibling ?? remoteDictionary ?? localeDictionary;

  const handleSave = () => {
    queryClient.invalidateQueries({ queryKey: ['dictionary', dictionaryKey] });
  };

  const currentItemPage =
    selectedItem !== null ? itemNumbers.indexOf(selectedItem) + 1 : 1;

  const currentMetaPage =
    selectedMetaId !== null ? metaIds.indexOf(selectedMetaId) + 1 : 1;

  const pinned = isPinned(dictionaryKey);

  return (
    <Suspense fallback={<Loader />}>
      <Loader isLoading={!dictionary && isPending}>
        <div className="flex h-full min-h-0 w-full flex-1 flex-col">
          {hasSiblingDimensions && (
            <div className="flex flex-col gap-3 border-neutral/20 border-b px-6 py-4">
              <span className="font-medium text-neutral text-sm">
                {String(content.siblings.title)}
              </span>

              <div className="flex flex-wrap items-center gap-6">
                {/* ── Collection items ───────────────────────────── */}
                {itemNumbers.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-neutral text-xs">
                      {String(content.siblings.collectionLabel)}
                    </span>
                    <Pagination
                      currentPage={currentItemPage}
                      totalPages={itemNumbers.length}
                      onPageChange={(page) => {
                        const itemNumber = itemNumbers[page - 1];
                        setSelectedItem(
                          itemNumber === itemNumbers[currentItemPage - 1] &&
                            selectedItem !== null
                            ? null
                            : (itemNumber ?? null)
                        );
                      }}
                      size="sm"
                    />
                  </div>
                )}

                {/* ── Variants ───────────────────────────────────── */}
                {variantNames.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-neutral text-xs">
                      {String(content.siblings.variantLabel)}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {variantNames.map((variantName) => {
                        const isActive = selectedVariant === variantName;
                        return (
                          <Button
                            key={variantName}
                            variant={isActive ? 'default' : 'outline'}
                            size="sm"
                            color="text"
                            label={variantName}
                            onClick={() =>
                              setSelectedVariant(isActive ? null : variantName)
                            }
                          >
                            {variantName}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── Meta / Dynamic records ─────────────────────── */}
                {metaIds.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-neutral text-xs">
                      {String(content.siblings.metaLabel)}
                    </span>
                    {metaIds.length <= 6 ? (
                      <div className="flex flex-wrap gap-1">
                        {metaIds.map((metaId) => {
                          const isActive = selectedMetaId === metaId;
                          return (
                            <Tag
                              key={metaId}
                              color={isActive ? 'purple' : 'neutral'}
                              size="xs"
                              className="cursor-pointer"
                              onClick={() =>
                                setSelectedMetaId(isActive ? null : metaId)
                              }
                            >
                              {metaId}
                            </Tag>
                          );
                        })}
                      </div>
                    ) : (
                      <Pagination
                        currentPage={currentMetaPage}
                        totalPages={metaIds.length}
                        onPageChange={(page) => {
                          const metaId = metaIds[page - 1];
                          setSelectedMetaId(metaId ?? null);
                        }}
                        size="sm"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {dictionary && (
            <DictionaryFieldEditor
              dictionary={dictionary}
              onClickDictionaryList={() =>
                navigate({ to: App_Dashboard_Dictionaries_Path })
              }
              isDarkMode={resolvedTheme === 'dark'}
              mode={['remote']}
              onDelete={() => {
                navigate({ to: App_Dashboard_Dictionaries_Path });
              }}
              onSave={handleSave}
              rightContent={
                <Button
                  variant="hoverable"
                  color="text"
                  size="icon-md"
                  Icon={pinned ? PinOff : Pin}
                  onClick={() => {
                    if (pinned) {
                      unpin(dictionaryKey);
                    } else {
                      pin(dictionaryKey);
                    }
                  }}
                  label={String(
                    pinned ? unpinDictionaryLabel : pinDictionaryLabel
                  )}
                />
              }
            />
          )}
        </div>
      </Loader>
    </Suspense>
  );
};
