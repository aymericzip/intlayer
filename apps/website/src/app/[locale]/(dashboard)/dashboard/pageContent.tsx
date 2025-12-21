'use client';

import type { SessionAPI } from '@intlayer/backend';
import { Loader } from '@intlayer/design-system';
import { useSession } from '@intlayer/design-system/hooks';
import { getLocalizedUrl, type LocalesValues } from 'intlayer';
import { useRouter } from 'next/navigation';
import { type FC, useEffect } from 'react';
import { PagesRoutes } from '@/Routes';

type DashboardPageContentProps = {
  sessionServer?: SessionAPI | null;
  locale: LocalesValues;
};

export const DashboardPageContent: FC<DashboardPageContentProps> = ({
  sessionServer,
  locale,
}) => {
  const router = useRouter();
  const { session: sessionClient } = useSession();

  const session = sessionServer ?? sessionClient;

  useEffect(() => {
    if (session?.organization && session?.project) {
      router.push(getLocalizedUrl(PagesRoutes.Dashboard_Dictionaries, locale));
    } else if (session?.organization) {
      router.push(getLocalizedUrl(PagesRoutes.Dashboard_Projects, locale));
    } else {
      router.push(getLocalizedUrl(PagesRoutes.Dashboard_Organization, locale));
    }
  }, [session]);

  return <Loader />;
};
