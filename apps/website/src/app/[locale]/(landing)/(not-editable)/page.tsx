import { BackgroundLayout } from '@components/BackgroundLayout';
import { LandingPage as LandingPageContent } from '@components/LandingPage';
import { SoftwareApplicationHeader } from '@structuredData/FAQPageHeader';
import { ProductHeader } from '@structuredData/ProductHeader';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const LandingPage: NextPageIntlayer = ({ params: { locale } }) => (
  <>
    <WebsiteHeader />
    <SoftwareApplicationHeader />
    <ProductHeader />
    <IntlayerServerProvider locale={locale}>
      <BackgroundLayout hasSpotlight>
        <LandingPageContent />
      </BackgroundLayout>
    </IntlayerServerProvider>
  </>
);
export default LandingPage;
