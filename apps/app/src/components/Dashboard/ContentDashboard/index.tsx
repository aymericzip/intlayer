'use client';

import { DictionaryFieldEditor } from '@intlayer/design-system/dictionary-field-editor';
import { useGetDictionary } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { App_Dashboard_Dictionaries_Path } from '@intlayer/design-system/routes';
import { useRouter } from '#/hooks/navigation';
import { useTheme } from '#/providers/ThemeProvider';
import { type FC, Suspense } from 'react';
import { EditorConfigurationProvider } from './ConfigurationProvider';

type ContentDashboardContentProps = {
  dictionaryKey: string;
};

export const ContentDashboard: FC<ContentDashboardContentProps> = ({
  dictionaryKey,
}) => {
  const { resolvedTheme } = useTheme();
  const { data: dictionaryResult, isPending } = useGetDictionary(dictionaryKey);

  const router = useRouter();
  const dictionary = dictionaryResult?.data;

  return (
    <Suspense fallback={<Loader />}>
      <Loader isLoading={!dictionary || isPending}>
        <EditorConfigurationProvider>
          <div className="flex h-full min-h-0 w-full flex-1 flex-col">
            {dictionary && (
              <DictionaryFieldEditor
                dictionary={dictionary}
                onClickDictionaryList={() =>
                  router.push(App_Dashboard_Dictionaries_Path)
                }
                isDarkMode={resolvedTheme === 'dark'}
                mode={['remote']}
                onDelete={() => {
                  router.push(App_Dashboard_Dictionaries_Path);
                }}
              />
            )}
          </div>
        </EditorConfigurationProvider>
      </Loader>
    </Suspense>
  );
};
