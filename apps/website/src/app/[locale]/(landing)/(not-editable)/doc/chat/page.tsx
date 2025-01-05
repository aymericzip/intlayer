import { ChatBot } from '@components/ChatBot';
import { Container, H1 } from '@intlayer/design-system';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';

const DocumentationSearchPage: Next14PageIntlayer = ({
  params: { locale },
}) => {
  const { title } = useIntlayer('doc-chat-page', locale);
  return (
    <>
      <WebsiteHeader />
      <IntlayerServerProvider locale={locale}>
        <div className="flex size-full flex-1 flex-col gap-20 p-10">
          <H1>{title}</H1>
          <Container roundedSize="2xl" border background={false}>
            <ChatBot />
          </Container>
        </div>
      </IntlayerServerProvider>
    </>
  );
};

export default DocumentationSearchPage;
