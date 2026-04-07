'use client';

import type { SessionAPI } from '@intlayer/backend';
import { useSession } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
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
  const { session: sessionClient, revalidateSession } = useSession();

  const session = sessionServer ?? sessionClient;

  useEffect(() => {
    // If not admin, try to revalidate session to get project admin role
    const isProjectAdmin = session?.roles?.includes('project_admin');
    if (!isProjectAdmin) {
      revalidateSession();
    }
  }, []);

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
