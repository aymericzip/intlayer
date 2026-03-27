'use client';

import type { SessionAPI } from '@intlayer/backend';
import { Loader } from '@intlayer/design-system';
import { useSession } from '@intlayer/design-system/hooks';
import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { getLocalizedUrl, type LocalesValues } from 'intlayer';
import { useRouter } from 'next/navigation';
import { type FC, useEffect } from 'react';

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
      router.push(getLocalizedUrl(App_Dashboard_Dictionaries_Path, locale));
    } else if (session?.organization) {
      router.push(getLocalizedUrl(App_Dashboard_Projects_Path, locale));
    } else {
      router.push(getLocalizedUrl(App_Dashboard_Organization_Path, locale));
    }
  }, [session]);

  return <Loader />;
};
