import {
  useGetDictionaries,
  useGetDictionary,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { DictionaryFieldEditor } from '@intlayer/design-system/dictionary-field-editor';
import { Loader } from '@intlayer/design-system/loader';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { App_Dashboard_Dictionaries_Path } from '@intlayer/design-system/routes';
import { useDictionariesRecord } from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';
import { useQueryClient } from '@tanstack/react-query';
import { Lock, Pin, PinOff } from 'lucide-react';
import { type FC, Suspense, useEffect, useMemo } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useTheme } from '#/providers/ThemeProvider';
import { useDictionarySidebar } from '#hooks/useDictionarySidebar';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';

type ContentDashboardContentProps = {
  dictionaryKey: string;
};

export const ContentDashboard: FC<ContentDashboardContentProps> = ({
  dictionaryKey,
}) => {
  const { resolvedTheme } = useTheme();
  const {
    data: dictionaryResult,
    isPending,
    isError,
  } = useGetDictionary(dictionaryKey);
  const { data: siblingsResult } = useGetDictionaries(
    { keys: [dictionaryKey], pageSize: 200 },
    { enabled: Boolean(dictionaryKey) }
  );
  const { localeDictionaries } = useDictionariesRecord();
  const queryClient = useQueryClient();
  const {
    pinDictionary: pinDictionaryLabel,
    unpinDictionary: unpinDictionaryLabel,
  } = useIntlayer('dashboard-sidebar');
  const { notAccessible } = useIntlayer('content-dashboard');
  const { pin, unpin, isPinned, trackVisit } = useDictionarySidebar();

  const navigate = useLocalizedNavigate();

  const remoteDictionary = dictionaryResult?.data;

  const localeDictionary = useMemo(
    () =>
      Object.values(localeDictionaries ?? {}).find(
        (d): d is Dictionary => d.key === dictionaryKey
      ),
    [localeDictionaries, dictionaryKey]
  );

  // Every dictionary sharing this key, as listed in the dictionary list:
  // backend ones plus local-only ones (not pushed yet, so without `id`)
  const siblings: Dictionary[] = useMemo(
    () => [
      ...((siblingsResult?.data as Dictionary[] | undefined) ?? []),
      ...Object.values(localeDictionaries ?? {}).filter(
        (localeOnlyDictionary): localeOnlyDictionary is Dictionary =>
          localeOnlyDictionary.key === dictionaryKey && !localeOnlyDictionary.id
      ),
    ],
    [siblingsResult, localeDictionaries, dictionaryKey]
  );

  // Item / variant selection is handled inside the editor
  const dictionary = remoteDictionary ?? localeDictionary;
  const isAccessible = Boolean(dictionary);

  // Only record dictionaries reachable from the active project, so a
  // dictionary of another project never lands in this project's sidebar.
  useEffect(() => {
    if (isAccessible) {
      trackVisit(dictionaryKey);
    }
  }, [dictionaryKey, isAccessible, trackVisit]);

  const handleSave = () => {
    queryClient.invalidateQueries({ queryKey: ['dictionary', dictionaryKey] });
  };

  const pinned = isPinned(dictionaryKey);

  return (
    <Suspense fallback={<Loader />}>
      <Loader isLoading={!dictionary && isPending && !isError}>
        <div className="flex h-full min-h-0 w-full flex-1 flex-col">
          {!dictionary && (isError || !isPending) && (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
              <Lock className="size-8 text-neutral" aria-hidden />
              <h1 className="text-xl font-bold">{notAccessible.title}</h1>
              <p className="max-w-md text-neutral">
                {notAccessible.description}
              </p>
              <Button
                type="button"
                variant="outline"
                color="text"
                label={notAccessible.backToDictionaries.value}
                onClick={() =>
                  navigate({ to: App_Dashboard_Dictionaries_Path })
                }
              >
                {notAccessible.backToDictionaries}
              </Button>
            </div>
          )}
          {dictionary && (
            <DictionaryFieldEditor
              dictionary={dictionary}
              siblings={siblings}
              onClickDictionaryList={() =>
                navigate({ to: App_Dashboard_Dictionaries_Path })
              }
              onOpenDictionary={(relatedDictionary) =>
                navigate({
                  to: '/dictionary/$dictionaryKey',
                  params: { dictionaryKey: relatedDictionary.key },
                })
              }
              onOpenTag={(tagKey) =>
                navigate({ to: '/tags/$tagKey', params: { tagKey } })
              }
              isDarkMode={resolvedTheme === 'dark'}
              mode={['remote']}
              onDelete={() => {
                navigate({ to: App_Dashboard_Dictionaries_Path });
              }}
              onSave={handleSave}
              rightContent={
                <PopoverStatic identifier={`pin-${dictionaryKey}`}>
                  <Button
                    type="button"
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
                    aria-label={String(
                      pinned ? unpinDictionaryLabel : pinDictionaryLabel
                    )}
                    title={String(
                      pinned ? unpinDictionaryLabel : pinDictionaryLabel
                    )}
                  />
                  <PopoverStatic.Detail
                    identifier={`pin-${dictionaryKey}`}
                    xAlign="end"
                  >
                    <Container padding="sm" roundedSize="xl">
                      <span className="text-nowrap">
                        {String(
                          pinned ? unpinDictionaryLabel : pinDictionaryLabel
                        )}
                      </span>
                    </Container>
                  </PopoverStatic.Detail>
                </PopoverStatic>
              }
            />
          )}
        </div>
      </Loader>
    </Suspense>
  );
};
