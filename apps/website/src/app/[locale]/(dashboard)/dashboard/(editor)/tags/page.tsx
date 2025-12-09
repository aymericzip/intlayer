import { BackgroundLayout } from '@components/BackgroundLayout';
import { TagList } from '@components/Dashboard/TagForm/TagList';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

const TagsDashboardPageContent: FC = () => {
  const { title } = useIntlayer('tags-dashboard-page');
  return (
    <>
      <h1 className="border-neutral border-b-[0.5px] p-10 text-3xl">{title}</h1>
      <div className="relative flex flex-1 flex-col items-center">
        <TagList />
        <BackgroundLayout />
      </div>
    </>
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
