import { ProjectAdminDetailPage } from '@components/Dashboard/AdminPage/AdminProjects/ProjectAdminDetailPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const ProjectsAdminDetailPage: NextPageIntlayer<{ id: string }> = async ({
  params,
}) => {
  const { locale, id } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <ProjectAdminDetailPage projectId={id} />
    </IntlayerServerProvider>
  );
};

export default ProjectsAdminDetailPage;
