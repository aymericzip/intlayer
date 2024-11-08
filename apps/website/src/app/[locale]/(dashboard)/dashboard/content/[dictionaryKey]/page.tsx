import { BackgroundLayout } from '@components/BackgroundLayout';
import { ContentDashboard } from '@components/Dashboard/ContentDashboard';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';

const DictionaryDashboardPage: NextPageIntlayer = ({
  params: { locale, dictionaryKey },
}) => {
  const { title } = useIntlayer('dictionary-dashboard-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="border-neutral dark:border-neutral-dark border-b-[0.5px] p-10 text-3xl ">
        {title}
      </h1>
      <div className="relative flex size-full flex-1 flex-col items-center">
        <div className="flex size-full flex-1 flex-col items-center p-10">
          <ContentDashboard dictionaryKey={dictionaryKey} />
        </div>
        <BackgroundLayout />
      </div>
    </IntlayerServerProvider>
  );
};

export default DictionaryDashboardPage;
