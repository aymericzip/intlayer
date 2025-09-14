import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import type { FC } from 'react';

const UsersAdminPageContent: FC = () => {
  return (
    <>
      <div>Users Admin Page under construction</div>
    </>
  );
};

const UsersAdminPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <UsersAdminPageContent />
    </IntlayerServerProvider>
  );
};

export default UsersAdminPage;
