import { UserAdminDetailPage } from '@components/AdminPage/AdminUsers/UserAdminDetailPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const UsersAdminDetailPage: NextPageIntlayer<{ id: string }> = async ({
  params,
}) => {
  const { locale, id } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <UserAdminDetailPage userId={id} />
    </IntlayerServerProvider>
  );
};

export default UsersAdminDetailPage;
