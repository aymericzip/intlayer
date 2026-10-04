import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { Website_Doc_Chat_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { ChatBot } from '~/components/ChatBot';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import { loadNavData } from '~/serverFunctions/docs';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/_docs/doc/chat')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const [siteStructuredData, metadata, navData] = await Promise.all([
      getSiteStructuredData({ data: locale }),
      getIntlayerAsync('doc-chat-page-metadata', locale),
      // DocPageLayout renders the tree synchronously: it must be resolved
      loadNavData({ data: { locale } }),
    ]);

    return {
      locale,
      navData,
      siteStructuredData,
      metadata,
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = Website_Doc_Chat_Path;
    const { siteStructuredData, metadata } = loaderData;
    const { title, description } = metadata;

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
      scripts: [...getSiteStructuredDataScripts(siteStructuredData)],
    };
  },
  component: DocumentationChatPage,
});

function DocumentationChatPage() {
  const { locale, navData } = Route.useLoaderData();
  const { title } = useIntlayer('doc-chat-page');

  return (
    <DocPageLayout
      docData={navData}
      locale={locale}
      displayAsideNavigation={false}
    >
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
    </DocPageLayout>
  );
}
