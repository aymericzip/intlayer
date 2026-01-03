import { DiscussionsAdminPageContent } from '@components/Dashboard/AdminPage/AdminDiscussions/DiscussionsAdminPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const UsersAdminPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <DiscussionsAdminPageContent />
    </IntlayerServerProvider>
  );
};

export default UsersAdminPage;
