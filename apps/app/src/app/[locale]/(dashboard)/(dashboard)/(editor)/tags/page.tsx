import { BackgroundLayout } from '@components/BackgroundLayout';
import { DashboardContentLayout } from '@components/Dashboard/DashboardContentLayout';
import { TagList } from '@components/Dashboard/TagForm/TagList';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

const TagsDashboardPageContent: FC = () => {
  const { title } = useIntlayer('tags-dashboard-page');
  return (
    <DashboardContentLayout title={title}>
      <TagList />
      <BackgroundLayout />
    </DashboardContentLayout>
  );
};

const TagsDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <TagsDashboardPageContent />
    </IntlayerServerProvider>
  );
};

export default TagsDashboardPage;
