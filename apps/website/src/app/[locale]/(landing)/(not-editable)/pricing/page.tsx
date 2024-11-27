import { PricingPage as PricingPageContent } from '@components/PricingPage';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const PricingPage: NextPageIntlayer = ({ params: { locale } }) => (
  <>
    <WebsiteHeader />
    <SoftwareApplicationHeader />
    <ProductHeader />

    <IntlayerServerProvider locale={locale}>
      <PricingPageContent />
    </IntlayerServerProvider>
  </>
);
export default PricingPage;
