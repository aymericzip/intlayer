import { useSession } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { getLocalizedUrl } from 'intlayer';
import { useIntlayer, useLocale } from 'react-intlayer';
import { useEffect } from 'react';

export const Route = createFileRoute('/{-$locale}/_dashboard/')({
  component: DashboardIndex,
});

function DashboardIndex() {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const { session, revalidateSession } = useSession();

  useEffect(() => {
    const isProjectAdmin = session?.roles?.includes('project_admin');
    if (!isProjectAdmin) {
      revalidateSession();
    }
  }, []);

  useEffect(() => {
    if (session?.organization && session?.project) {
      void navigate({
        to: getLocalizedUrl(App_Dashboard_Dictionaries_Path, locale),
      });
    } else if (session?.organization) {
      void navigate({
        to: getLocalizedUrl(App_Dashboard_Projects_Path, locale),
      });
    } else {
      void navigate({
        to: getLocalizedUrl(App_Dashboard_Organization_Path, locale),
      });
    }
  }, [session]);

  return <Loader />;
}
