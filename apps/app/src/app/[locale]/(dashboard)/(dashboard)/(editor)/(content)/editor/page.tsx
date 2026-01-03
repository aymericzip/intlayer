import { Editor } from '@components/Dashboard/Editor';
import { DictionaryLoaderDashboard } from '@components/Dashboard/Editor/DictionaryLoaderDashboard';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

export { generateMetadata } from './metadata';

const EditorDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <div className="flex size-full flex-1 flex-col items-center justify-center p-2">
        <Editor DictionariesLoader={DictionaryLoaderDashboard} />
      </div>
    </IntlayerServerProvider>
  );
};

export default EditorDashboardPage;
