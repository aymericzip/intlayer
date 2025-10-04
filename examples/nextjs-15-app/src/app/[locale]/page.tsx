import { HomeContent } from '@components/HomeContent';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <HomeContent />
    </IntlayerServerProvider>
  );
};

export default Page;
