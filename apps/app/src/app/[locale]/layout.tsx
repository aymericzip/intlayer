import { IntlayerClientProvider, type NextLayoutIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { Suspense } from 'react';
import { AppProviders } from '@/providers/AppProviders';

export { generateStaticParams } from 'next-intlayer';
export { generateMetadata, viewport } from './metadata';

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <AppProviders>
        <Suspense>{children}</Suspense>
      </AppProviders>
    </IntlayerServerProvider>
  );
};

export default LandingLayout;
