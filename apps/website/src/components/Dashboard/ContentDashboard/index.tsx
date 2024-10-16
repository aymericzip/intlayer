'use client';

import {
  DictionariesSelector,
  Loader,
  useEditionPanelStore,
} from '@intlayer/design-system';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intlayer';
import { Suspense, useEffect, type FC } from 'react';
import { PagesRoutes } from '@/Routes';

type ContentDashboardContentProps = {
  dictionaryId: string;
};

export const ContentDashboard: FC<ContentDashboardContentProps> = ({
  dictionaryId,
}) => {
  const { setFocusedContent, focusedContent } = useEditionPanelStore((s) => ({
    focusedContent: s.focusedContent,
    setFocusedContent: s.setFocusedContent,
  }));
  const { locale } = useLocale();
  const router = useRouter();

  useEffect(() => {
    if (dictionaryId !== focusedContent?.dictionaryId) {
      setFocusedContent({
        dictionaryId,
        keyPath: [],
        dictionaryPath: undefined,
      });
    }
  }, [dictionaryId, setFocusedContent]);

  return (
    <Suspense fallback={<Loader />}>
      <DictionariesSelector
        locale={locale}
        onClickDictionaryList={() => {
          router.push(PagesRoutes.Dashboard_Content);
        }}
      />
    </Suspense>
  );
};
