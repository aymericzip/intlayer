/** @jsxImportSource react */

import { ChatBot } from '@components/ChatBot';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

const DocChatContent: FC = () => {
  const { title } = useIntlayer('doc-chat-page');
  return (
    <>
      <WebsiteHeader />
      <div className="flex size-full flex-1 flex-col gap-20 p-10">
        <h1>{title}</h1>
        <div className="relative m-auto h-[calc(100vh-100px)] w-full max-w-2xl overflow-hidden rounded-2xl border p-6">
          <ChatBot />
        </div>
      </div>
    </>
  );
};

export const DocChatIsland: FC<{ locale: LocalesValues }> = ({ locale }) => (
  <WebsiteIslandWrapper locale={locale} footer={<></>}>
    <DocChatContent />
  </WebsiteIslandWrapper>
);
