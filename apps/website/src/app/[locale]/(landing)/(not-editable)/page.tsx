import { BackgroundLayout } from '@components/BackgroundLayout';
import { LandingPage as LandingPageContent } from '@components/LandingPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const LandingPage: NextPageIntlayer = ({ params: { locale } }) => (
  <IntlayerServerProvider locale={locale}>
    <BackgroundLayout hasSpotlight>
      <LandingPageContent />
    </BackgroundLayout>
  </IntlayerServerProvider>
);
export default LandingPage;
