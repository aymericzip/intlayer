import { PricingPage as PricingPageContent } from '@components/PricingPage';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const PricingPage: Next14PageIntlayer = ({ params: { locale } }) => (
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
