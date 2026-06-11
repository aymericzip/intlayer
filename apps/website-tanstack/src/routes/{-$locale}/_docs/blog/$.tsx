import {
  External_Github,
  Website_Blog_Root,
  Website_Doc_Search,
  Website_Home,
  Website_Home_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, defer, redirect } from '@tanstack/react-router';
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

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toISOString().split('T')[0];

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
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: Website_Home,
            name: 'Intlayer',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${Website_Doc_Search}?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
            inLanguage: locales,
            keywords: websiteContent.keywords,
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Intlayer',
            url: Website_Home,
            logo: {
              '@type': 'ImageObject',
              url: `${Website_Home}/assets/logo.png`,
            },
            foundingDate: '2024',
            slogan: orgContent.slogan,
            knowsAbout: orgContent.knowsAbout,
            sameAs: [External_Github, 'https://twitter.com/intlayer'],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'contact@intlayer.org',
              contactType: 'customer support',
              url: Website_Home,
              availableLanguage: locales,
            },
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: Website_Home,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: Website_Blog_Root,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: blogData.title,
                item: blogData.url,
              },
            ],
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            creator: { '@type': 'Person', name: 'Aymeric Pineau' },
            name: blogData.title,
            description: blogData.description,
            url: blogData.url,
            datePublished: blogData.createdAt
              ? formatDate(blogData.createdAt)
              : undefined,
            dateModified: blogData.updatedAt
              ? formatDate(blogData.updatedAt)
              : undefined,
            keywords: Array.isArray(keywords)
              ? keywords.join(', ')
              : keywords || '',
            license:
              'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
            audience: {
              '@type': 'Audience',
              audienceType: creativeWorkContent.audienceType,
            },
          }),
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
