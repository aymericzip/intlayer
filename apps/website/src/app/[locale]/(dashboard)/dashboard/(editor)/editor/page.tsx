import { BackgroundLayout } from '@components/BackgroundLayout';
import { Editor } from '@components/Dashboard/Editor';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { FC } from 'react';

export { generateMetadata } from './metadata';

const OrganizationDashboardPageContent: FC = () => {
  const { title } = useIntlayer('editor-dashboard-page');

  return (
    <>
      <h1 className="border-neutral dark:border-neutral-dark border-b-[0.5px] p-10 text-3xl">
        {title}
      </h1>
      <div className="relative flex size-full flex-1 flex-col items-center">
        <BackgroundLayout />
        <Editor />
      </div>
    </>
  );
};

const OrganizationDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <OrganizationDashboardPageContent />
    </IntlayerServerProvider>
  );
};

export default OrganizationDashboardPage;
