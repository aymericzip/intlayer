import { BackgroundLayout } from '@components/BackgroundLayout';
import { Editor } from '@components/Dashboard/Editor';
import { DictionaryLoaderPlayground } from '@components/Dashboard/Editor/DictionaryLoaderPlayground';
import baseConfiguration from '@intlayer/config/built';
import { ConfigurationProvider } from '@intlayer/editor-react';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

export { generateMetadata } from './metadata';

const PlaygroundContent: FC = () => {
  const { title, description } = useIntlayer('playground-page');

  const applicationURL = `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Demo}`;

  const configuration = {
    ...baseConfiguration,
    ...{
      editor: {
        ...(baseConfiguration.editor ?? {}),
        applicationURL,
      },
    },
  };

  return (
    <>
      <h1 className="border-neutral border-b-[0.5px] p-10 text-3xl">{title}</h1>
      <div className="relative flex size-full flex-1 flex-col">
        <BackgroundLayout />
        <p className="m-auto my-3 max-w-3xl px-10 text-neutral text-sm">
          {description}
        </p>
        <div className="relative flex flex-1 flex-col items-center px-10 pb-5">
          <ConfigurationProvider configuration={configuration}>
            <Editor
              configuration={configuration}
              DictionariesLoader={DictionaryLoaderPlayground}
            />
          </ConfigurationProvider>
        </div>
      </div>
    </>
  );
};

const Playground: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PlaygroundContent />
    </IntlayerServerProvider>
  );
};

export default Playground;
