'use client';

import {
  DictionaryFieldEditor,
  Loader,
  useAuth,
} from '@intlayer/design-system';
import {
  useGetAllDictionaries,
  useGetDictionary,
} from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Suspense, type FC } from 'react';
import { PagesRoutes } from '@/Routes';

type ContentDashboardContentProps = {
  dictionaryKey: string;
};

export const ContentDashboard: FC<ContentDashboardContentProps> = ({
  dictionaryKey,
}) => {
  const { session } = useAuth();
  const project = session?.project;
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
        {dictionary && (
          <DictionaryFieldEditor
            dictionary={dictionary}
            onClickDictionaryList={() =>
              router.push(PagesRoutes.Dashboard_Content)
            }
            isDarkMode={resolvedTheme === 'dark'}
            availableLocales={project?.locales ?? []}
            mode="remote"
          />
        )}
      </Loader>
    </Suspense>
  );
};
