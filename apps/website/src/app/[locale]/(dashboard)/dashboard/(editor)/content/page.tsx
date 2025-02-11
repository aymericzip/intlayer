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
      <h1 className="border-neutral dark:border-neutral-dark border-b-[0.5px] p-10 text-3xl">
        {title}
      </h1>
      <div className="relative flex size-full flex-1 flex-col items-center">
        <div className="flex size-full flex-1 flex-col items-center justify-center p-10">
          <DictionaryListDashboard />
        </div>
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
