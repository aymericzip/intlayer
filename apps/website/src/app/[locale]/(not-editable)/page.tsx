import { LandingPage } from '@components/LandingPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const Page: NextPageIntlayer = ({ params: { locale } }) => (
  <IntlayerServerProvider locale={locale}>
    <LandingPage />
  </IntlayerServerProvider>
);
export default Page;
