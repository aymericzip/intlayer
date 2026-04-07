import { DictionaryListDashboard } from '@components/Dashboard/DictionaryListDashboard';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

export { generateMetadata } from './metadata';

const ContentDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <DictionaryListDashboard />
    </IntlayerServerProvider>
  );
};

export default ContentDashboardPage;
