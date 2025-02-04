import { BackgroundLayout } from '@components/BackgroundLayout';
import { LandingPage as LandingPageContent } from '@components/LandingPage';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const LandingPage: Next14PageIntlayer = ({ params: { locale } }) => (
  <>
    <WebsiteHeader />
    <SoftwareApplicationHeader />
    <ProductHeader />
    <IntlayerServerProvider locale={locale}>
      <BackgroundLayout>
        <LandingPageContent />
      </BackgroundLayout>
    </IntlayerServerProvider>
  </>
);
export default LandingPage;
