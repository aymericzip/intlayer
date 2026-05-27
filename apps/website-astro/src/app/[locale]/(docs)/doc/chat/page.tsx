import { ChatBot } from '@components/ChatBot';
import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

const DocumentationSearchPageContent: FC = () => {
  const { title } = useIntlayer('doc-chat-page');

  return (
    <>
      <WebsiteHeader />
      <div className="flex size-full flex-1 flex-col gap-20 p-10">
        <H1>{title}</H1>
        <Container
          roundedSize="2xl"
          border
          padding="lg"
          className="relative m-auto h-[calc(100vh-100px)] w-full max-w-2xl overflow-hidden"
        >
          <ChatBot />
        </Container>
      </div>
    </>
  );
};

const DocumentationSearchPage = async () => {
  return <DocumentationSearchPageContent />;
};

export default DocumentationSearchPage;
