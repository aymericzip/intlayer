import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { getLocaleFromPath } from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BlogPageLayout } from '~/components/BlogPage/BlogPageLayout';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';

import type { Route } from './+types/blog-search-page';

export const meta: Route.MetaFunction = () => {
  return [{ title: `Search Blog | Intlayer` }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  return { locale };
}

export default function BlogSearchPage({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;
  const { title } = useIntlayer('blog-search-page');

  return (
    <BlogPageLayout locale={locale} displayAsideNavigation={false}>
      <WebsiteHeader />
      <H1 className="mt-10 font-bold text-4xl">{title}</H1>
      <div className="flex flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-4xl p-10" roundedSize="2xl">
          <Suspense fallback={<Loader />}>
            <SearchView />
          </Suspense>
        </Container>
      </div>
    </BlogPageLayout>
  );
}
