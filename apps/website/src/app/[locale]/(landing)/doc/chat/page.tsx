import { ChatBot } from '@components/ChatBot';
import { Container, H1 } from '@intlayer/design-system';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

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

const DocumentationSearchPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <DocumentationSearchPageContent />
    </IntlayerServerProvider>
  );
};

export default DocumentationSearchPage;
