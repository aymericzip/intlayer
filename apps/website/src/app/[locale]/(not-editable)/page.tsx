import { LandingPage } from '@components/LandingPage';
import { ProductHunt } from '@components/ProductHunt';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const Page: NextPageIntlayer = ({ params: { locale } }) => (
  <IntlayerServerProvider locale={locale}>
    <LandingPage />
    <ProductHunt />
  </IntlayerServerProvider>
);
export default Page;
