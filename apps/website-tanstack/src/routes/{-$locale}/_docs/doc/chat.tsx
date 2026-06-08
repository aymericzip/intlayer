import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import {
  External_Github,
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { ChatBot } from '~/components/ChatBot';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import { loadNavData } from '~/serverFunctions/docs';

export const Route = createFileRoute('/{-$locale}/_docs/doc/chat')({
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const navData = await loadNavData({ data: { locale } });
    return { locale, navData };
  },
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;

    const websiteContent = getIntlayer('website-structured-data', locale);
    const orgContent = getIntlayer('organization-structured-data', locale);

    return {
      title: 'Chat with Documentation | Intlayer',
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: Website_Home,
            name: 'Intlayer',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${Website_Doc_Search}?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
            inLanguage: locales,
            keywords: websiteContent.keywords,
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Intlayer',
            url: Website_Home,
            logo: {
              '@type': 'ImageObject',
              url: `${Website_Home}/assets/logo.png`,
            },
            foundingDate: '2024',
            slogan: orgContent.slogan,
            knowsAbout: orgContent.knowsAbout,
            sameAs: [External_Github, 'https://twitter.com/intlayer'],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'contact@intlayer.org',
              contactType: 'customer support',
              url: Website_Home,
              availableLanguage: locales,
            },
          }),
        },
      ],
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
