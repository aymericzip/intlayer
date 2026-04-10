import { Website_Blog, Website_Home } from '@intlayer/design-system/routes';
import type { BlogKey } from '@intlayer/docs';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl, localeMap } from 'intlayer';
import { BlogPageLayout } from '#/components/BlogPage/BlogPageLayout';
import { getPreviousNextBlogData } from '#/components/BlogPage/blogData';
import { DocHeader } from '#/components/DocPage/DocHeader/DocHeader';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '#/components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '#/components/DocPage/DocumentationRender';
import { BreadcrumbsHeader } from '#/structuredData/BreadcrumbsHeader';
import { CreativeWorkHeader } from '#/structuredData/CreativeWorkHeader';
import { urlRenamer } from '#/utils/markdown';

export const Route = createFileRoute('/{-$locale}/blog/$')({
  loader: async ({ params }) => {
    const { getBlog, getBlogMetadataBySlug } = await import('@intlayer/docs');
    const locale = ((params as { locale?: string }).locale ??
      defaultLocale) as string;
    const splat = (params as { _splat: string })._splat ?? '';
    const slugs = splat ? splat.split('/').filter(Boolean) : [];

    const blogsData = await getBlogMetadataBySlug(slugs, locale);
    const filteredBlogsData = blogsData.filter(
      (blog) => blog.slugs.length === slugs.length + 1
    );

    if (!filteredBlogsData || filteredBlogsData.length === 0) {
      throw redirect({ to: Website_Blog });
    }

    const blogData = filteredBlogsData[0];
    const { prevBlogData, nextBlogData } = getPreviousNextBlogData(
      blogData.docKey as BlogKey,
      locale
    );
    const file = await getBlog(blogData.docKey as BlogKey, locale);
    const blogContent = urlRenamer(file, locale);

    const prevBlog: DocPageNavigationProps['prevDoc'] = prevBlogData?.blogs
      ? {
          title: prevBlogData.title,
          url: getLocalizedUrl(prevBlogData.blogs.relativeUrl, locale),
        }
      : undefined;
    const nextBlog: DocPageNavigationProps['nextDoc'] = nextBlogData?.blogs
      ? {
          title: nextBlogData.title,
          url: getLocalizedUrl(nextBlogData.blogs.relativeUrl, locale),
        }
      : undefined;

    return {
      blogData,
      blogContent,
      slugs,
      locale,
      prevBlog,
      nextBlog,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { blogData, locale } = loaderData;
    const path = blogData.relativeUrl;

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: `${blogData.title} | Intlayer` },
        { name: 'description', content: blogData.description },
        { name: 'keywords', content: blogData.keywords.join(', ') },
        { property: 'og:title', content: `${blogData.title} | Intlayer` },
        { property: 'og:description', content: blogData.description },
        { property: 'og:url', content: blogData.url },
        { name: 'twitter:title', content: blogData.title },
        { name: 'twitter:description', content: blogData.description },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blogData.title,
            description: blogData.description,
            dateModified: new Date(blogData.updatedAt).toISOString(),
            datePublished: new Date(blogData.createdAt).toISOString(),
            url: blogData.url,
            keywords: blogData.keywords.join(', '),
          }),
        },
      ],
    };
  },
  component: BlogPage,
});

function BlogPage() {
  const { blogData, blogContent, slugs, prevBlog, nextBlog } =
    Route.useLoaderData();
  const { locale } = Route.useParams();

  return (
    <BlogPageLayout activeSlugs={slugs}>
      <BreadcrumbsHeader
        breadcrumbs={[
          {
            name: 'Intlayer',
            url: getLocalizedUrl(Website_Home, locale),
          },
          {
            name: 'Blog',
            url: getLocalizedUrl(Website_Blog, locale),
          },
          {
            name: blogData.title,
            url: getLocalizedUrl(blogData.relativeUrl, locale),
          },
        ]}
      />
      <CreativeWorkHeader
        creativeWorkName={blogData.title}
        creativeWorkDescription={blogData.description}
        creativeWorkContent={blogContent}
        keywords={blogData.keywords.join(', ')}
        url={getLocalizedUrl(blogData.relativeUrl, locale)}
        dateModified={new Date(blogData.updatedAt)}
        datePublished={new Date(blogData.createdAt)}
      />
      <DocHeader {...blogData} markdownContent={blogContent} />
      <DocumentationRender>{blogContent}</DocumentationRender>
      <DocPageNavigation nextDoc={nextBlog} prevDoc={prevBlog} />
    </BlogPageLayout>
  );
}
