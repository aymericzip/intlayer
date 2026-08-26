import { BackgroundLayout } from '@components/BackgroundLayout';
import { DashboardContentLayout } from '@components/Dashboard/DashboardContentLayout';
import { DictionaryLoaderPlayground } from '@components/Dashboard/Editor/DictionaryLoaderPlayground';
import {
  editor,
  internationalization,
  log,
  routing,
} from '@intlayer/config/built';
import { Loader } from '@intlayer/design-system/loader';
import { Website_Demo_Path } from '@intlayer/design-system/routes';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import dynamic from 'next/dynamic';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

const Editor = dynamic(
  () => import('@components/Dashboard/Editor').then((mod) => mod.Editor),
  {
    loading: () => <Loader />,
  }
);

const PlaygroundContent: FC = () => {
  const { title, description } = useIntlayer('playground-page');

  const applicationURL = `${process.env.NEXT_PUBLIC_URL}${Website_Demo_Path}`;

  const configuration = {
    internationalization,
    routing,
    log,
    ...{
      editor: {
        ...editor,
        applicationURL,
      },
    },
  };

  return (
    <DashboardContentLayout title={title}>
      <BackgroundLayout />
      <p className="m-auto my-3 max-w-3xl px-10 text-neutral text-sm">
        {description}
      </p>
      <div className="relative flex flex-1 flex-col items-center px-10 pb-5">
        <Editor
          configuration={configuration}
          DictionariesLoader={DictionaryLoaderPlayground}
        />
      </div>
    </DashboardContentLayout>
  );
};

const Playground: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <PlaygroundContent />
    </IntlayerServerProvider>
  );
};

export default Playground;
