import { BackgroundLayout } from '@components/BackgroundLayout';
import { DemoPage } from '@components/DemoPage';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page: Next14PageIntlayer = ({ params: { locale } }) => (
  <IntlayerServerProvider locale={locale}>
    <BackgroundLayout>
      <DemoPage />
    </BackgroundLayout>
  </IntlayerServerProvider>
);
export default Page;
