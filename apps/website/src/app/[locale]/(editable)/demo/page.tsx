import { DemoPage } from '@components/DemoPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page: NextPageIntlayer = ({ params: { locale } }) => (
  <IntlayerServerProvider locale={locale}>
    <DemoPage />
  </IntlayerServerProvider>
);
export default Page;
