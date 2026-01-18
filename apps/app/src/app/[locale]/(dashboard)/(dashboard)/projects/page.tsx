import { BackgroundLayout } from '@components/BackgroundLayout';
import { DashboardContentLayout } from '@components/Dashboard/DashboardContentLayout';
import { ProjectForm } from '@components/Dashboard/ProjectForm';
import type { LocalesValues } from 'intlayer';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

export { generateMetadata } from './metadata';

const ProjectsDashboardPageContent: FC<{ locale: LocalesValues }> = ({
  locale,
}) => {
  const { title } = useIntlayer('projects-dashboard-page', locale);

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
      <Suspense>
        <ProjectsDashboardPageContent locale={locale} />
      </Suspense>
    </IntlayerServerProvider>
  );
};

export default ProjectsDashboardPage;
