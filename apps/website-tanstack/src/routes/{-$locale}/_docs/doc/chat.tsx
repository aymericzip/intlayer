import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { lazy, Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';

const ChatBot = lazy(() =>
  import('~/components/ChatBot').then((mod) => ({ default: mod.ChatBot }))
);

import { getWebsiteHeader } from '@intlayer/design-system/structured-data';
import { loadNavData } from '~/serverFunctions/docs';

export const Route = createFileRoute('/{-$locale}/_docs/doc/chat')({
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const navData = await loadNavData({ data: { locale } });
    return { locale, navData };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: 'Chat with Documentation | Intlayer' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(
          getWebsiteHeader({ locale: loaderData.locale })
        ),
      },
    ],
  }),
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
          <Suspense>
            <ChatBot />
          </Suspense>
        </Container>
      </div>
    </DocPageLayout>
  );
}
