import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';
import { getLocaleFromPath } from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { Route } from './+types/doc-search-page';

export const meta: Route.MetaFunction = () => {
  return [{ title: `Search Documentation | Intlayer` }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  return { locale };
}

export default function DocumentationSearchPage({
  loaderData,
}: Route.ComponentProps) {
  const { locale } = loaderData;
  const { title } = useIntlayer('doc-search-page');

  return (
    <DocPageLayout locale={locale} displayAsideNavigation={false}>
      <WebsiteHeader />
      <H1>{title}</H1>
      <div className="flex flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-4xl p-10" roundedSize="2xl">
          <Suspense fallback={<Loader />}>
            <SearchView />
          </Suspense>
        </Container>
      </div>
    </DocPageLayout>
  );
}
