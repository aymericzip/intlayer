import { Website_Home_Path } from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { CompositeComponent } from '@tanstack/react-start/rsc';
import { defaultLocale, getLocalizedUrl } from 'intlayer';
import { type FC, lazy, Suspense } from 'react';
import { BlogPageLayout } from '~/components/BlogPage/BlogPageLayout';
import { DocHeader } from '~/components/DocPage/DocHeader/DocHeader';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '~/components/DocPage/DocPageNavigation/DocPageNavigation';
import { SectionScroller } from '~/components/DocPage/SectionScroller';
import { loadBlogNavData, loadBlogPage } from '~/serverFunctions/blog';

const I18nBenchmarkLazy = lazy(() =>
  import('~/components/I18nBenchmark').then((mod) => ({
    default: mod.I18nBenchmark,
  }))
);

type FrameworkKey = Parameters<typeof I18nBenchmarkLazy>[0]['initialFramework'];

const I18nBenchmarkSlot: FC<{ framework?: FrameworkKey }> = ({ framework }) => (
  <Suspense>
    <I18nBenchmarkLazy initialFramework={framework} />
  </Suspense>
);

import { getCreativeWorkHeader } from '@intlayer/design-system/structured-data';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/_docs/blog/$')({
  ssr: true,
  loader: async ({ params }) => {
    const locale = (params.locale as string) ?? defaultLocale;
    const slugsStr = (params as any)['*'] || '';
    const slugs = slugsStr ? slugsStr.split('/') : [];

    const [result, navData] = await Promise.all([
      loadBlogPage({ data: { locale, slugs } }),
      loadBlogNavData({ data: { locale } }),
    ]);

    const { exactMatch, blogsData, content } = result;

    if (!exactMatch) {
      if (blogsData.length > 0) {
        throw redirect({ to: blogsData[0].relativeUrl as any });
      }
      throw redirect({ to: Website_Home_Path as any });
    }

    const { blogContent, blogContentSrc, prevBlogData, nextBlogData } =
      content!;

    const nextBlog: DocPageNavigationProps['nextDoc'] = nextBlogData?.blogs
      ? {
          title: nextBlogData.title,
          url: getLocalizedUrl(nextBlogData.blogs.relativeUrl, locale),
        }
      : undefined;
    const prevBlog: DocPageNavigationProps['prevDoc'] = prevBlogData?.blogs
      ? {
          title: prevBlogData.title,
          url: getLocalizedUrl(prevBlogData.blogs.relativeUrl, locale),
        }
      : undefined;

    return {
      locale,
      slugs,
      blogData: exactMatch,
      blogContent,
      blogContentSrc,
      nextBlog,
      prevBlog,
      navData,
    };
  },
  head: ({ loaderData }) => {
    if (
      !loaderData ||
      typeof loaderData !== 'object' ||
      !('blogData' in loaderData)
    )
      return {};
    const { blogData, locale } = loaderData as any;
    const absoluteUrl = blogData.url;
    const keywords = blogData.keywords;

    return {
      meta: [
        { title: `${blogData.title} | Intlayer` },
        { name: 'description', content: blogData.description },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : keywords || '',
        },
        { property: 'og:url', content: getAbsoluteUrl(absoluteUrl) },
        { property: 'og:title', content: `${blogData.title} | Intlayer` },
        { property: 'og:description', content: blogData.description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(absoluteUrl) },
        ...getHreflangLinks(absoluteUrl),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            getCreativeWorkHeader({
              locale,
              type: 'BlogPosting',
              creativeWorkName: blogData.title,
              creativeWorkDescription: blogData.description,
              creativeWorkContent: loaderData.blogContent,
              keywords: Array.isArray(blogData.keywords)
                ? blogData.keywords.join(', ')
                : blogData.keywords || '',
              dateModified: new Date(blogData.updatedAt),
              datePublished: new Date(blogData.createdAt),
              url: blogData.url,
            })
          ),
        },
      ],
    };
  },
  component: BlogPage,
});

function BlogPage() {
  const loaderData = Route.useLoaderData();

  if (
    !loaderData ||
    typeof loaderData !== 'object' ||
    !('blogData' in loaderData)
  ) {
    return null;
  }

  const {
    locale,
    slugs,
    blogData,
    blogContent,
    blogContentSrc,
    nextBlog,
    prevBlog,
    navData,
  } = loaderData;

  return (
    <BlogPageLayout
      blogData={navData}
      activeSlugs={slugs}
      locale={locale ?? defaultLocale}
    >
      <DocHeader {...blogData} markdownContent={blogContent} />
      <Suspense>
        <SectionScroller />
      </Suspense>
      <CompositeComponent
        src={blogContentSrc}
        I18nBenchmarkComponent={I18nBenchmarkSlot}
      />
      <DocPageNavigation nextDoc={nextBlog} prevDoc={prevBlog} />
    </BlogPageLayout>
  );
}
