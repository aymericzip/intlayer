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
import { Pin, PinOff } from 'lucide-react';
import { type FC, Suspense, useMemo } from 'react';
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
  const { data: dictionaryResult, isPending } = useGetDictionary(dictionaryKey);
  const { data: siblingsResult } = useGetDictionaries(
    { key: dictionaryKey, pageSize: 200 },
    { enabled: Boolean(dictionaryKey) }
  );
  const { localeDictionaries } = useDictionariesRecord();
  const queryClient = useQueryClient();
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

  // All backend dictionaries sharing this key (items, variants)
  const siblings: Dictionary[] = useMemo(
    () => (siblingsResult?.data as Dictionary[] | undefined) ?? [],
    [siblingsResult]
  );

  // Item / variant selection is handled inside the editor
  const dictionary = remoteDictionary ?? localeDictionary;

  const handleSave = () => {
    queryClient.invalidateQueries({ queryKey: ['dictionary', dictionaryKey] });
  };

  const pinned = isPinned(dictionaryKey);

  return (
    <Suspense fallback={<Loader />}>
      <Loader isLoading={!dictionary && isPending}>
        <div className="flex h-full min-h-0 w-full flex-1 flex-col">
          {dictionary && (
            <DictionaryFieldEditor
              dictionary={dictionary}
              siblings={siblings}
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
