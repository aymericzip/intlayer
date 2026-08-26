import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import {
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import { buildWebsiteJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BlogPageLayout } from '~/components/BlogPage/BlogPageLayout';
import { getBlogSection } from '~/components/BlogPage/blogData';
import { RelatedPosts } from '~/components/BlogPage/RelatedPosts';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { loadBlogNavData } from '~/serverFunctions/blog';

export const Route = createFileRoute('/{-$locale}/_docs/blog/')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const navData = await loadBlogNavData({ data: { locale } });
    return { locale, navData };
  },
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const websiteContent = getIntlayer('website-structured-data', locale);

    return {
      title: 'Blog | Intlayer',
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildWebsiteJsonLd({
              url: Website_Home,
              searchUrl: Website_Doc_Search,
              locales: locales as string[],
              keywords: websiteContent.keywords as string[],
              rssUrl: `${Website_Home}/feed.xml`,
            })
          ),
        },
      ],
    };
  },
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
      <H1 className="mt-10 font-bold text-4xl">{title}</H1>
      <div className="flex flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <Container
          border
          borderColor="neutral"
          className="mx-auto w-full max-w-4xl p-10"
          roundedSize="2xl"
        >
          <SearchView />
        </Container>
      </div>
    </BlogPageLayout>
  );
}
