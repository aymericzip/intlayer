import { useSession } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import {
  createFileRoute,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import { getLocalizedUrl } from 'intlayer';
import { useEffect } from 'react';

export const Route = createFileRoute('/{-$locale}/_dashboard/')({
  component: DashboardIndexPage,
});

function DashboardIndexPage() {
  const navigate = useNavigate();
  const { locale } = useParams({ strict: false });
  const { session, revalidateSession } = useSession();

  useEffect(() => {
    const isProjectAdmin = session?.roles?.includes('project_admin');
    if (!isProjectAdmin) {
      revalidateSession();
    }
  }, [session?.roles, revalidateSession]);

  useEffect(() => {
    if (session?.organization && session?.project) {
      navigate({
        to: getLocalizedUrl(App_Dashboard_Dictionaries_Path, locale),
      });
    } else if (session?.organization) {
      navigate({
        to: getLocalizedUrl(App_Dashboard_Projects_Path, locale),
      });
    } else {
      navigate({
        to: getLocalizedUrl(App_Dashboard_Organization_Path, locale),
      });
    }
  }, [session, navigate, locale]);

  return <Loader />;
}
