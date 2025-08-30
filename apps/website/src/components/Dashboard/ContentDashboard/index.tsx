'use client';

import { PagesRoutes } from '@/Routes';
import { DictionaryFieldEditor, Loader } from '@intlayer/design-system';
import {
  useGetAllDictionaries,
  useGetDictionary,
} from '@intlayer/design-system/hooks';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Suspense, type FC } from 'react';
import { EditorConfigurationProvider } from './ConfigurationProvider';

type ContentDashboardContentProps = {
  dictionaryKey: string;
};

export const ContentDashboard: FC<ContentDashboardContentProps> = ({
  dictionaryKey,
}) => {
  const { resolvedTheme } = useTheme();
  const { isLoading } = useGetAllDictionaries();
  const { data: dictionaryResult, isPending } = useGetDictionary(dictionaryKey);

  const router = useRouter();
  const dictionary = dictionaryResult?.data;

  return (
    <Suspense fallback={<Loader />}>
      <Loader isLoading={!dictionary || isPending || isLoading}>
        <EditorConfigurationProvider>
          {dictionary && (
            <DictionaryFieldEditor
              dictionary={dictionary}
              onClickDictionaryList={() =>
                router.push(PagesRoutes.Dashboard_Content)
              }
              isDarkMode={resolvedTheme === 'dark'}
              mode={['remote']}
              onDelete={() => {
                router.push(PagesRoutes.Dashboard_Content);
              }}
            />
          )}
        </EditorConfigurationProvider>
      </Loader>
    </Suspense>
  );
};
