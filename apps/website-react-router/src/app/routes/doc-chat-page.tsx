import { ChatBot } from '@components/ChatBot';
import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import { getLocaleFromPath } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import type { Route } from './+types/doc-chat-page';

export const meta: Route.MetaFunction = () => {
  return [{ title: `Chat with Documentation | Intlayer` }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  return { locale };
}

export default function DocumentationChatPage({
  loaderData,
}: Route.ComponentProps) {
  const { locale } = loaderData;
  const { title } = useIntlayer('doc-chat-page');

  return (
    <DocPageLayout locale={locale} displayAsideNavigation={false}>
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
    </DocPageLayout>
  );
}
