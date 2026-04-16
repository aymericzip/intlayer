import { DictionaryFieldEditor } from '@intlayer/design-system/dictionary-field-editor';
import { useGetDictionary } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { App_Dashboard_Dictionaries_Path } from '@intlayer/design-system/routes';
import { useQueryClient } from '@tanstack/react-query';
import { type FC, Suspense } from 'react';
import { useTheme } from '#/providers/ThemeProvider';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';

type ContentDashboardContentProps = {
  dictionaryKey: string;
};

export const ContentDashboard: FC<ContentDashboardContentProps> = ({
  dictionaryKey,
}) => {
  const { resolvedTheme } = useTheme();
  const { data: dictionaryResult, isPending } = useGetDictionary(dictionaryKey);
  const queryClient = useQueryClient();

  const navigate = useLocalizedNavigate();
  const dictionary = dictionaryResult?.data;

  const handleSave = () => {
    // usePushDictionaries only invalidates ['dictionaries'] / ['dictionariesKeys'],
    // not the single-dictionary query — refresh it explicitly so the UI
    // shows the saved content.
    queryClient.invalidateQueries({ queryKey: ['dictionary', dictionaryKey] });
  };

  return (
    <Suspense fallback={<Loader />}>
      <Loader isLoading={!dictionary || isPending}>
        <div className="flex h-full min-h-0 w-full flex-1 flex-col">
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
            />
          )}
        </div>
      </Loader>
    </Suspense>
  );
};
