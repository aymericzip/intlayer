import { SearchView } from '@components/Search/SearchView';
import { Container } from '@intlayer/design-system';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const DocumentationPage: NextPageIntlayer = ({ params: { locale } }) => (
  <>
    <WebsiteHeader />
    <IntlayerServerProvider locale={locale}>
      <div className="flex size-full flex-1 items-baseline p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-3xl p-10" roundedSize="2xl">
          <SearchView />
        </Container>
      </div>
    </IntlayerServerProvider>
  </>
);

export default DocumentationPage;
