import { PricingPage as PricingPageContent } from '@components/PricingPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const PricingPage: NextPageIntlayer = ({ params: { locale } }) => (
  <IntlayerServerProvider locale={locale}>
    <PricingPageContent />
  </IntlayerServerProvider>
);
export default PricingPage;
