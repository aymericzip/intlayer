import { BackgroundLayout } from '@components/BackgroundLayout';
import { Editor } from '@components/Dashboard/Editor';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';

export { generateMetadata } from './metadata';

const OrganizationDashboardPage: Next14PageIntlayer = ({
  params: { locale },
}) => {
  const { title } = useIntlayer('editor-dashboard-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="border-neutral dark:border-neutral-dark border-b-[0.5px] p-10 text-3xl">
        {title}
      </h1>
      <div className="relative flex size-full flex-1 flex-col items-center">
        <BackgroundLayout />
        <Editor />
      </div>
    </IntlayerServerProvider>
  );
};

export default OrganizationDashboardPage;
