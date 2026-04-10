import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { Doc_Chat_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { ChatBot } from '#/components/ChatBot';
import { DocPageLayout } from '#/components/DocPage/DocPageLayout';

export const Route = createFileRoute('/{-$locale}/chat')({
  head: ({ params }) => {
    const { locale } = params;
    const path = Doc_Chat_Path;
    const content = getIntlayer('doc-chat-page', locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: `${content.title} | Intlayer` },
        { name: 'description', content: content.description },
        { property: 'og:title', content: `${content.title} | Intlayer` },
        { property: 'og:description', content: content.description },
      ],
    };
  },
  component: DocChatPage,
});

function DocChatPage() {
  const { title } = useIntlayer('doc-chat-page');

  return (
    <DocPageLayout displayAsideNavigation={false}>
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
