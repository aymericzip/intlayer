import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import {
  Website_Blog_Root_Path,
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import { buildWebsiteJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync, locales } from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BlogPageLayout } from '~/components/BlogPage/BlogPageLayout';
import { getBlogSection } from '~/components/BlogPage/blogData';
import { RelatedPosts } from '~/components/BlogPage/RelatedPosts';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { loadBlogNavData } from '~/serverFunctions/blog';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/_docs/blog/')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const [navData, websiteContent, metadata] = await Promise.all([
      loadBlogNavData({ data: { locale } }),
      getIntlayerAsync('website-structured-data', locale),
      getIntlayerAsync('blog-index-metadata', locale),
    ]);
    return { locale, navData, websiteContent, metadata };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = Website_Blog_Root_Path;
    const { websiteContent, metadata } = loaderData;
    const { title, description, keywords } = metadata;

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : String(keywords || ''),
        },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
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
