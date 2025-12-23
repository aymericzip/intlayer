import { BackgroundLayout } from '@components/BackgroundLayout';
import { DictionaryListDashboard } from '@components/Dashboard/DictionaryListDashboard';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

const ContentDashboardPageContent: FC = () => {
  return (
    <div className="relative flex flex-1 flex-col items-center">
      <DictionaryListDashboard />
      <BackgroundLayout />
    </div>
  );
};

const ContentDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <ContentDashboardPageContent />
    </IntlayerServerProvider>
  );
};

export default ContentDashboardPage;
