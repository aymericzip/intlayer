import { BackgroundLayout } from '@components/BackgroundLayout';
import { ProjectForm } from '@components/Dashboard/ProjectForm';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

const ProjectsDashboardPageContent: FC = () => {
  const { title } = useIntlayer('projects-dashboard-page');

  return (
    <>
      <h1 className="border-neutral border-b-[0.5px] p-10 text-3xl">{title}</h1>
      <div className="relative flex size-full flex-1 flex-col items-center">
        <BackgroundLayout />
        <div className="flex flex-1 flex-col items-center justify-center p-10">
          <ProjectForm />
        </div>
      </div>
    </>
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
