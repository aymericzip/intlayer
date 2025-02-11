import { BackgroundLayout } from '@components/BackgroundLayout';
import { DemoPage } from '@components/DemoPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <BackgroundLayout>
        <DemoPage />
      </BackgroundLayout>
    </IntlayerServerProvider>
  );
};
export default Page;
