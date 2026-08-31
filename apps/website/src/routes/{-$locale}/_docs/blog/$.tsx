import {
  Website_Blog_Root,
  Website_Home,
  Website_Home_Path,
} from '@intlayer/design-system/routes';
import {
  buildAuthorJsonLd,
  buildBreadcrumbsJsonLd,
  buildCreativeWorkJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl } from 'intlayer';
import { BlogPageLayout } from '~/components/BlogPage/BlogPageLayout';
import { DocHeader } from '~/components/DocPage/DocHeader/DocHeader';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '~/components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadBlogNavData, loadBlogPage } from '~/serverFunctions/blog';
import { getCanonicalSlugs } from '~/utils/canonicalSlugs';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getCreativeWorkStructuredData,
  getSiteStructuredData,
  getSiteStructuredDataScripts,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/_docs/blog/$')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const slugsStr = (params as any)['*'] || '';
    const slugs = getCanonicalSlugs('blog', slugsStr, locale);

    const [result, navData, siteStructuredData, creativeWorkContent] =
      await Promise.all([
        loadBlogPage({ data: { locale, slugs } }),
        loadBlogNavData({ data: { locale } }),
        getSiteStructuredData({ data: locale }),
        getCreativeWorkStructuredData({ data: locale }),
      ]);

    const { exactMatch, blogsData, content } = result;

    if (!exactMatch) {
      if (blogsData.length > 0) {
        throw redirect({
          to: getLocalizedUrl(blogsData[0].relativeUrl, locale) as any,
        });
      }
      throw redirect({ to: getLocalizedUrl(Website_Home_Path, locale) });
    }

    const { blogParsed, codeStyleSheet, prevBlogData, nextBlogData } = content!;

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
      siteStructuredData,
      creativeWorkContent,
      locale,
      slugs,
      blogData: exactMatch,
      blogParsed,
      codeStyleSheet,
      nextBlog,
      prevBlog,
      navData,
    };
  },
  staleTime: Infinity,
  head: ({ loaderData }) => {
    if (
      !loaderData ||
      typeof loaderData !== 'object' ||
      !('blogData' in loaderData)
    )
      return {};
    const { blogData, locale, siteStructuredData, creativeWorkContent } =
      loaderData as any;
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
        { rel: 'canonical', href: getAbsoluteUrl(absoluteUrl, locale) },
        {
          rel: 'alternate',
          type: 'text/markdown',
          href: `${getAbsoluteUrl(absoluteUrl)}.md`,
        },
        ...getHreflangLinks(absoluteUrl),
      ],
      scripts: [
        ...getSiteStructuredDataScripts(siteStructuredData),
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildBreadcrumbsJsonLd({
              breadcrumbs: [
                { name: 'Home', url: Website_Home },
                { name: 'Blog', url: Website_Blog_Root },
                { name: blogData.title, url: blogData.url },
              ],
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildCreativeWorkJsonLd({
              type: 'BlogPosting',
              name: blogData.title,
              description: blogData.description,
              content: '',
              keywords: Array.isArray(keywords)
                ? keywords.join(', ')
                : keywords || '',
              datePublished: blogData.createdAt
                ? new Date(blogData.createdAt)
                : undefined,
              dateModified: blogData.updatedAt
                ? new Date(blogData.updatedAt)
                : undefined,
              url: blogData.url,
              author: buildAuthorJsonLd(blogData.author),
              version: blogData.history?.[0]?.version,
              audienceType: String(creativeWorkContent.audienceType),
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
    blogParsed,
    codeStyleSheet,
    nextBlog,
    prevBlog,
    navData,
  } = loaderData;

  return (
    <BlogPageLayout
      blogData={navData}
      activeSlugs={slugs}
      locale={locale ?? defaultLocale}
      currentBlogDocKey={blogData.docKey}
    >
      <DocHeader {...blogData} />
      <DocumentationRender codeStyleSheet={codeStyleSheet}>
        {blogParsed}
      </DocumentationRender>
      <DocPageNavigation nextDoc={nextBlog} prevDoc={prevBlog} />
    </BlogPageLayout>
  );
}
