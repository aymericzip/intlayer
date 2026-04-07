import { BackgroundLayout } from '@components/BackgroundLayout';
import { ContentDashboard } from '@components/Dashboard/ContentDashboard';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

type DictionaryDashboardPageProps = {
  dictionaryKey: string;
};

const DictionaryDashboardPage: NextPageIntlayer<
  DictionaryDashboardPageProps
> = async ({ params }) => {
  const { locale, dictionaryKey } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <div className="flex min-h-0 w-full flex-1 flex-col items-stretch px-10">
        <ContentDashboard dictionaryKey={dictionaryKey} />
      </div>
      <BackgroundLayout />
    </IntlayerServerProvider>
  );
};

export default DictionaryDashboardPage;
