import { BackgroundLayout } from '@components/BackgroundLayout';
import { DashboardContentLayout } from '@components/Dashboard/DashboardContentLayout';
import { TagDetails } from '@components/Dashboard/TagForm/TagDetails';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

type DictionaryDashboardPageProps = {
  tagKey: string;
};

const DictionaryDashboardPageContent: FC<DictionaryDashboardPageProps> = ({
  tagKey,
}) => {
  const { title } = useIntlayer('tag-dashboard-page');

  return (
    <DashboardContentLayout title={title}>
      <div className="flex w-full flex-1 flex-col items-center p-10">
        <TagDetails tagKey={tagKey} />
      </div>
      <BackgroundLayout />
    </DashboardContentLayout>
  );
};

const DictionaryDashboardPage: NextPageIntlayer<
  DictionaryDashboardPageProps
> = async ({ params }) => {
  const { locale, tagKey } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <DictionaryDashboardPageContent tagKey={tagKey} />
    </IntlayerServerProvider>
  );
};

export default DictionaryDashboardPage;
