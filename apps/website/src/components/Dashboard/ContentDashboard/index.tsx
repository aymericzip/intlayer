'use client';

import { DictionaryFieldEditor, Loader } from '@intlayer/design-system';
import {
  useGetAllDictionaries,
  useGetDictionary,
} from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Suspense, type FC } from 'react';
import { EditorConfigurationProvider } from './ConfigurationProvider';
import { PagesRoutes } from '@/Routes';

type ContentDashboardContentProps = {
  dictionaryKey: string;
};

export const ContentDashboard: FC<ContentDashboardContentProps> = ({
  dictionaryKey,
}) => {
  const { resolvedTheme } = useTheme();
  const { isLoading } = useGetAllDictionaries();
  const { data: dictionaryResult, isWaitingData } = useGetDictionary({
    autoFetch: true,
    args: [dictionaryKey],
  });
  const router = useRouter();
  const dictionary = dictionaryResult?.data;

  return (
    <Suspense fallback={<Loader />}>
      <Loader isLoading={!dictionary || isWaitingData || isLoading}>
        <EditorConfigurationProvider>
          {dictionary && (
            <DictionaryFieldEditor
              dictionary={dictionary}
              onClickDictionaryList={() =>
                router.push(PagesRoutes.Dashboard_Content)
              }
              isDarkMode={resolvedTheme === 'dark'}
              mode="remote"
            />
          )}
        </EditorConfigurationProvider>
      </Loader>
    </Suspense>
  );
};
