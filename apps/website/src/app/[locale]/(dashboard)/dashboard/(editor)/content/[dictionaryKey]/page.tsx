import { BackgroundLayout } from '@components/BackgroundLayout';
import { ContentDashboard } from '@components/Dashboard/ContentDashboard';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { FC } from 'react';

type DictionaryDashboardPageProps = {
  dictionaryKey: string;
};

const DictionaryDashboardPageContent: FC<DictionaryDashboardPageProps> = ({
  dictionaryKey,
}) => {
  const { title } = useIntlayer('dictionary-dashboard-page');

  return (
    <>
      <h1 className="border-neutral dark:border-neutral-dark border-b-[0.5px] p-10 text-3xl">
        {title}
      </h1>
      <div className="relative flex size-full flex-1 flex-col items-center">
        <div className="flex size-full flex-1 flex-col items-center p-10">
          <ContentDashboard dictionaryKey={dictionaryKey} />
        </div>
        <BackgroundLayout />
      </div>
    </>
  );
};

const DictionaryDashboardPage: NextPageIntlayer<
  DictionaryDashboardPageProps
> = async ({ params }) => {
  const { locale, dictionaryKey } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <DictionaryDashboardPageContent dictionaryKey={dictionaryKey} />
    </IntlayerServerProvider>
  );
};

export default DictionaryDashboardPage;
