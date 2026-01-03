import { BackgroundLayout } from '@components/BackgroundLayout';
import { DashboardContentLayout } from '@components/Dashboard/DashboardContentLayout';
import { ProjectForm } from '@components/Dashboard/ProjectForm';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

const ProjectsDashboardPageContent: FC = () => {
  const { title } = useIntlayer('projects-dashboard-page');

  return (
    <DashboardContentLayout title={title}>
      <BackgroundLayout />
      <div className="flex w-full flex-1 flex-col items-center p-10">
        <ProjectForm />
      </div>
    </DashboardContentLayout>
  );
};

const ProjectsDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <ProjectsDashboardPageContent />
    </IntlayerServerProvider>
  );
};

export default ProjectsDashboardPage;
