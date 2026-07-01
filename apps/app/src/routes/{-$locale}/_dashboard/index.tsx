import type { SessionAPI } from '@intlayer/backend';
import {
  App_Auth_SignIn_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
  App_Demo_Path,
  App_Init_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer, useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { DashboardOverview } from '#components/Dashboard/DashboardOverview';
import { refetchFreshSession, sessionQueryOptions } from '#utils/auth.tsx';
import { IS_SELF_HOSTED } from '#utils/selfHosted';
import { setupStatusQueryOptions } from '#utils/setupStatus';

export const Route = createFileRoute('/{-$locale}/_dashboard/')({
  beforeLoad: async ({ context, params }) => {
    const { locale } = params;
    let session: SessionAPI | null =
      await context.queryClient.ensureQueryData(sessionQueryOptions);

    // Client cache is empty — verify with the backend in case the user just
    // logged in server-side and the client cache hasn't caught up yet.
    if (!session) {
      session = await refetchFreshSession(context.queryClient);
    }

    if (session) {
      // A project is selected → render the overview (handled by the component).
      // Otherwise route the user to the step they still need to complete.
      if (session.organization && !session.project) {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Projects_Path}`,
          params: { locale },
        });
      } else if (!session.organization) {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Organization_Path}`,
          params: { locale },
        });
      }

      return;
    }

    // Unauthenticated visitor on the app root. On the hosted cloud, bootstrap a
    // read-only demo session. On a self-hosted instance, send them to the init
    // flow when the first super-admin still has to be created, otherwise to the
    // sign-in page.
    if (IS_SELF_HOSTED) {
      const isSetupRequired = await context.queryClient.ensureQueryData(
        setupStatusQueryOptions
      );

      if (isSetupRequired) {
        throw redirect({
          to: `/{-$locale}${App_Init_Path}`,
          params: { locale },
        });
      }

      throw redirect({
        to: `/{-$locale}${App_Auth_SignIn_Path}`,
        params: { locale },
      });
    }

    throw redirect({
      to: `/{-$locale}${App_Demo_Path}`,
      params: { locale },
    });
  },
  component: DashboardIndexPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('dashboard-overview', locale);

    return {
      meta: [
        { title: content.metadata.title },
        { name: 'description', content: content.metadata.description },
      ],
    };
  },
});

function DashboardIndexPage() {
  const { locale } = useLocale();
  const { title } = useIntlayer('dashboard-overview');

  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <DashboardContentLayout title={title}>
        <DashboardOverview />
      </DashboardContentLayout>
    </AuthenticationBarrier>
  );
}
