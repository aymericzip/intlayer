import { BackgroundLayout } from '@components/BackgroundLayout';
import { DictionaryListDashboard } from '@components/Dashboard/DictionaryListDashboard';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

const ContentDashboardPageContent: FC = () => {
  const { title } = useIntlayer('content-dashboard-page');

  return (
    <>
      <h1 className="border-neutral border-b-[0.5px] p-6 text-3xl">{title}</h1>
      <div className="relative flex flex-1 flex-col items-center">
        <DictionaryListDashboard />
        <BackgroundLayout />
      </div>
    </>
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
