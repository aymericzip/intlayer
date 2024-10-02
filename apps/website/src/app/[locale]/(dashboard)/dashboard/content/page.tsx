import { BackgroundLayout } from '@components/BackgroundLayout';
import { ContentDashboard } from '@components/Dashboard/ContentDashboard';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';

const ContentDashboardPage: NextPageIntlayer = ({ params: { locale } }) => {
  const { title } = useIntlayer('content-dashboard-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="border-neutral dark:border-neutral-dark border-b-[0.5px] p-10 text-3xl ">
        {title}
      </h1>
      <BackgroundLayout>
        <div className="flex size-full flex-1 flex-col items-center p-10">
          <ContentDashboard />
        </div>
      </BackgroundLayout>
    </IntlayerServerProvider>
  );
};

export default ContentDashboardPage;
