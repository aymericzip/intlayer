import { TranslateDashboard } from '@components/Dashboard/TranslateDashboard';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

export { generateMetadata } from './metadata';

const TranslateDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <div className="relative flex flex-1 flex-col items-center">
        <TranslateDashboard />
      </div>
    </IntlayerServerProvider>
  );
};

export default TranslateDashboardPage;
