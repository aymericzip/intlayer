import { App_Dashboard_Organization_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer, useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { ProjectForm } from '#components/Dashboard/ProjectForm';
import { validateAuth } from '#utils/auth';

export const Route = createFileRoute('/{-$locale}/_dashboard/projects')({
  beforeLoad: async ({ context, location, params }) => {
    const { locale } = params;

    await validateAuth({
      queryClient: context.queryClient,
      pathname: location.pathname,
      search: location.search,
      locale,
      accessRule: ['authenticated', 'organization-required'],
      redirectionRoute: App_Dashboard_Organization_Path,
    });
  },
  component: ProjectsPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('projects-dashboard-page', locale);

    return {
      title: content.metadata.title,
      meta: [
        {
          name: 'description',
          content: content.metadata.description,
        },
      ],
    };
  },
});

function ProjectsPage() {
  const { title } = useIntlayer('projects-dashboard-page');
  const { locale } = useLocale();

  return (
    <AuthenticationBarrier
      accessRule={['authenticated', 'organization-required']}
      locale={locale}
      redirectionRoute={App_Dashboard_Organization_Path}
    >
      <DashboardContentLayout title={title}>
        <BackgroundLayout />
        <div className="flex w-full flex-1 flex-col items-center p-10">
          <ProjectForm />
        </div>
      </DashboardContentLayout>
    </AuthenticationBarrier>
  );
}
