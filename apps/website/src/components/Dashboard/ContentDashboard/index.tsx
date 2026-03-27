'use client';

import { DictionaryFieldEditor, Loader } from '@intlayer/design-system';
import { useGetDictionary } from '@intlayer/design-system/hooks';
import { App_Dashboard_Dictionaries_Path } from '@intlayer/design-system/routes';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
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
        </EditorConfigurationProvider>
      </Loader>
    </Suspense>
  );
};
