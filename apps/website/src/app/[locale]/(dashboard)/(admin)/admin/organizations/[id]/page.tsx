import { OrganizationAdminDetailPage } from '@components/AdminPage/AdminOrganizations/OrganizationAdminDetailPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const OrganizationsAdminDetailPage: NextPageIntlayer<{ id: string }> = async ({
  params,
}) => {
  const { locale, id } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <OrganizationAdminDetailPage organizationId={id} />
    </IntlayerServerProvider>
  );
};

export default OrganizationsAdminDetailPage;
