import { BackgroundLayout } from '@components/BackgroundLayout';
import { DictionaryListDashboard } from '@components/Dashboard/DictionaryListDashboard';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';

const ContentDashboardPage: Next14PageIntlayer = ({ params: { locale } }) => {
  const { title } = useIntlayer('content-dashboard-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="border-neutral dark:border-neutral-dark border-b-[0.5px] p-10 text-3xl">
        {title}
      </h1>
      <div className="relative flex size-full flex-1 flex-col items-center">
        <div className="flex size-full flex-1 flex-col items-center justify-center p-10">
          <DictionaryListDashboard />
        </div>
        <BackgroundLayout />
      </div>
    </IntlayerServerProvider>
  );
};

export default ContentDashboardPage;
