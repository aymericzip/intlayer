import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { Doc_Chat_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  getMultilingualUrls,
  Locales,
} from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { ChatBot } from '#/components/ChatBot';
import { DocPageLayout } from '#/components/DocPage/DocPageLayout';

export const Route = createFileRoute('/{-$locale}/chat')({
  head: ({ params }) => {
    const locale = ((params as { locale?: string }).locale ??
      defaultLocale) as any;
    const content = getIntlayer('doc-chat-page', locale);

    return {
      meta: [
        { title: `${content.title} | Intlayer` },
        { name: 'description', content: content.title as string },
      ],
      links: [
        { rel: 'canonical', href: getLocalizedUrl(Doc_Chat_Path, locale) },
        ...Object.entries(getMultilingualUrls(Doc_Chat_Path)).map(
          ([lang, url]) => ({
            rel: 'alternate',
            hrefLang: lang,
            href: url as string,
          })
        ),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(Doc_Chat_Path, Locales.ENGLISH),
        },
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
