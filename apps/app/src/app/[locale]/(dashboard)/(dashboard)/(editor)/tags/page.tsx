import { BackgroundLayout } from '@components/BackgroundLayout';
import { DashboardContentLayout } from '@components/Dashboard/DashboardContentLayout';
import { TagList } from '@components/Dashboard/TagForm/TagList';
import type { LocalesValues } from 'intlayer';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

export { generateMetadata } from './metadata';

const TagsDashboardPageContent: FC<{ locale: LocalesValues }> = ({
  locale,
}) => {
  const { title } = useIntlayer('tags-dashboard-page', locale);
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
      <Suspense>
        <TagsDashboardPageContent locale={locale} />
      </Suspense>
    </IntlayerServerProvider>
  );
};

export default TagsDashboardPage;
