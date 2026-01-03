import { CMSLandingPage } from '@components/CMSLandingPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <CMSLandingPage />
    </IntlayerServerProvider>
  );
};

export default Page;
