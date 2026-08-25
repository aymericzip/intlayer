import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { createFileRoute, defer } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { ChatBot } from '~/components/ChatBot';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import { loadNavData } from '~/serverFunctions/docs';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/_docs/doc/chat')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    // The chat view is independent of the navigation tree, so stream the
    // sidebar in via `defer` instead of blocking the route transition on it.
    return {
      locale,
      navData: defer(loadNavData({ data: { locale } })),
      siteStructuredData: await getSiteStructuredData(locale),
    };
  },
  staleTime: Infinity,
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const { siteStructuredData } = loaderData;

    return {
      title: 'Chat with Documentation | Intlayer',
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
