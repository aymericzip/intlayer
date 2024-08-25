import { LandingPage } from '@components/LandingPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const ThermOfServicePage: NextPageIntlayer = ({ params: { locale } }) => (
  <IntlayerServerProvider locale={locale}>
    <LandingPage />
  </IntlayerServerProvider>
);
export default ThermOfServicePage;
