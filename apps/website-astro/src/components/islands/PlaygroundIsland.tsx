/** @jsxImportSource react */

import { BackgroundLayout } from '@components/BackgroundLayout';
import { DashboardContentLayout } from '@components/Dashboard/DashboardContentLayout';
import { Editor } from '@components/Dashboard/Editor';
import { DictionaryLoaderPlayground } from '@components/Dashboard/Editor/DictionaryLoaderPlayground';
import * as baseConfiguration from '@intlayer/config/built';
import { ConfigurationProvider } from '@intlayer/editor-react';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

const PlaygroundContent: FC<{ configuration: typeof baseConfiguration }> = ({
  configuration,
}) => {
  const { title, description } = useIntlayer('playground-page');
  return (
    <DashboardContentLayout title={title}>
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
    </DashboardContentLayout>
  );
};

export const PlaygroundIsland: FC<{
  locale: LocalesValues;
  applicationURL: string;
}> = ({ locale, applicationURL }) => {
  const configuration = {
    ...baseConfiguration,
    editor: {
      ...(baseConfiguration.editor ?? {}),
      applicationURL,
    },
  };

  return (
    <WebsiteIslandWrapper locale={locale}>
      <PlaygroundContent configuration={configuration} />
    </WebsiteIslandWrapper>
  );
};
