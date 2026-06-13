import {
  External_Github,
  Website_Blog_Root,
  Website_Doc_Search,
  Website_Home,
  Website_Home_Path,
} from '@intlayer/design-system/routes';
import {
  buildAuthorJsonLd,
  buildBreadcrumbsJsonLd,
  buildCreativeWorkJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, getLocalizedUrl, locales } from 'intlayer';
import { BlogPageLayout } from '~/components/BlogPage/BlogPageLayout';
import { DocHeader } from '~/components/DocPage/DocHeader/DocHeader';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '~/components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadBlogNavData, loadBlogPage } from '~/serverFunctions/blog';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/_docs/blog/$')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
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

    const { blogContent, blogParsed, prevBlogData, nextBlogData } = content!;

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
      blogParsed,
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
    const localeStr = (locale as string) ?? defaultLocale;

    const websiteContent = getIntlayer('website-structured-data', localeStr);
    const orgContent = getIntlayer('organization-structured-data', localeStr);
    const creativeWorkContent = getIntlayer(
      'creative-work-structured-data',
      localeStr
    );

    return {
      title: `${blogData.title} | Intlayer`,
      meta: [
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
        {
          rel: 'alternate',
          type: 'text/markdown',
          href: `${getAbsoluteUrl(absoluteUrl)}.md`,
        },
        ...getHreflangLinks(absoluteUrl),
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
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildOrganizationJsonLd({
              url: Website_Home,
              logoUrl: `${Website_Home}/assets/logo.png`,
              slogan: String(orgContent.slogan),
              knowsAbout: orgContent.knowsAbout as string[],
              sameAs: [External_Github, 'https://twitter.com/intlayer'],
              availableLanguages: locales as string[],
            })
          ),
        },
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
    blogContent,
    blogParsed,
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
      <DocHeader {...blogData} markdownContent={blogContent} />
      <DocumentationRender>{blogParsed}</DocumentationRender>
      <DocPageNavigation nextDoc={nextBlog} prevDoc={prevBlog} />
    </BlogPageLayout>
  );
}
