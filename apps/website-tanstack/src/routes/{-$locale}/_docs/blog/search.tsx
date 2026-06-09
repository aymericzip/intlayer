import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { createFileRoute, defer } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { BlogPageLayout } from '~/components/BlogPage/BlogPageLayout';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { loadBlogNavData } from '~/serverFunctions/blog';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';

export const Route = createFileRoute('/{-$locale}/_docs/blog/search')({
  loader: ({ params }) => {
    const { locale = defaultLocale } = params;
    // The search view is independent of the navigation tree, so stream the
    // sidebar in via `defer` instead of blocking the route transition on it.
    return { locale, navData: defer(loadBlogNavData({ data: { locale } })) };
  },
  head: () => ({
    title: 'Search Blog | Intlayer',
  }),
  component: BlogSearchPage,
});

function BlogSearchPage() {
  const { locale, navData } = Route.useLoaderData();
  const { title } = useIntlayer('blog-search-page');

  return (
    <BlogPageLayout
      blogData={navData}
      locale={locale}
      displayAsideNavigation={false}
    >
      <WebsiteHeader />
      <H1 className="mt-10 font-bold text-4xl">{title}</H1>
      <div className="flex flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-4xl p-10" roundedSize="2xl">
          <SearchView />
        </Container>
      </div>
    </BlogPageLayout>
  );
}
