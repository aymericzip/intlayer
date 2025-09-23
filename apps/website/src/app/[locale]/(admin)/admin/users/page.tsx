import { UsersAdminPageContent } from '@components/AdminPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const UsersAdminPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <UsersAdminPageContent />
    </IntlayerServerProvider>
  );
};

export default UsersAdminPage;
