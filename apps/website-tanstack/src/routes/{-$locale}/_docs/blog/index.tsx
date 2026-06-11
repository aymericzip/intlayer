import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BlogPageLayout } from '~/components/BlogPage/BlogPageLayout';
import { getBlogSection } from '~/components/BlogPage/blogData';
import { RelatedPosts } from '~/components/BlogPage/RelatedPosts';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { loadBlogNavData } from '~/serverFunctions/blog';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';

export const Route = createFileRoute('/{-$locale}/_docs/blog/')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const navData = await loadBlogNavData({ data: { locale } });
    return { locale, navData };
  },
  head: () => ({
    title: 'Blog | Intlayer',
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { locale, navData } = Route.useLoaderData();
  const { title } = useIntlayer('blog-search-page');
  const { blog: allBlogs } = getBlogSection(navData);

  return (
    <BlogPageLayout
      blogData={navData}
      locale={locale}
      displayAsideNavigation={false}
      trailingContent={
        <Suspense>
          <RelatedPosts
            allBlogs={allBlogs}
            currentDocKey=""
            locale={locale}
            count={12}
          />
        </Suspense>
      }
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
