import { OrganizationsAdminPageContent } from '@components/AdminPage/AdminOrganizations/OrganizationsAdminPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const OrganizationsAdminPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <OrganizationsAdminPageContent />
    </IntlayerServerProvider>
  );
};

export default OrganizationsAdminPage;
