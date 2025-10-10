import { ProjectsAdminPageContent } from '@components/AdminPage/AdminProjects/ProjectsAdminPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const ProjectsAdminPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <ProjectsAdminPageContent />
    </IntlayerServerProvider>
  );
};

export default ProjectsAdminPage;
