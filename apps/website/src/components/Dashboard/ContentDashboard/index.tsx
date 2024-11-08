'use client';

import { DictionaryFieldEditor, Loader } from '@intlayer/design-system';
import { useGetDictionary } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, type FC } from 'react';
import { PagesRoutes } from '@/Routes';

type ContentDashboardContentProps = {
  dictionaryKey: string;
};

export const ContentDashboard: FC<ContentDashboardContentProps> = ({
  dictionaryKey,
}) => {
  const {
    data: dictionaryResult,
    isLoading,
    getDictionary,
  } = useGetDictionary();
  const router = useRouter();
  const dictionary = dictionaryResult?.data;

  useEffect(() => {
    getDictionary(dictionaryKey);
  }, [getDictionary, dictionaryKey]);

  return (
    <Suspense fallback={<Loader />}>
      <Loader isLoading={!dictionary || isLoading}>
        {dictionary && (
          <DictionaryFieldEditor
            dictionary={dictionary}
            onClickDictionaryList={() =>
              router.push(PagesRoutes.Dashboard_Content)
            }
          />
        )}
      </Loader>
    </Suspense>
  );
};
