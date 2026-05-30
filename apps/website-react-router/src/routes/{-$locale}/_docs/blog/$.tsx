import { Website_Blog_Path } from '@intlayer/design-system/routes';
import { type BlogKey, getBlog, getBlogMetadataBySlug } from '@intlayer/docs';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl, localeMap } from 'intlayer';
import { parseMarkdown } from 'react-intlayer/markdown';
import { BlogPageLayout } from '~/components/BlogPage/BlogPageLayout';
import { getPreviousNextBlogData } from '~/components/BlogPage/blogData';
import { DocHeader } from '~/components/DocPage/DocHeader/DocHeader';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '~/components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { CreativeWorkHeader } from '~/structuredData/CreativeWorkHeader';
import { urlRenamer } from '~/utils/markdown';

export const Route = createFileRoute('/{-$locale}/_docs/blog/$')({
  loader: async ({ params, request: _request }) => {
    const locale = (params.locale as string) ?? defaultLocale;
    const slugsStr = (params as any)['*'] || '';
    let slugs = slugsStr ? slugsStr.split('/') : [];

    const isMd = slugsStr.endsWith('.md');
    if (isMd) {
      slugs = slugs.map((slug: string, idx: number) =>
        idx === slugs.length - 1 ? slug.slice(0, -3) : slug
      );

      const blogsData = await getBlogMetadataBySlug(
        ['blog', ...slugs],
        locale,
        true
      );
      const exactMatch = blogsData.find(
        (blog) => blog.slugs.join('/') === ['blog', ...slugs].join('/')
      );

      if (!exactMatch) {
        return new Response('Not found', { status: 404 });
      }

      const file = await getBlog(exactMatch.docKey as BlogKey, locale);
      return new Response(file, {
        status: 200,
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
      });
    }

    const blogsData = await getBlogMetadataBySlug(
      ['blog', ...slugs],
      locale,
      true
    );
    const exactMatch = blogsData.find(
      (blog) => blog.slugs.join('/') === ['blog', ...slugs].join('/')
    );

    if (!exactMatch) {
      if (blogsData.length > 0) {
        throw redirect({
          to: getLocalizedUrl(blogsData[0].url, locale) as any,
        });
      }
      throw redirect({ to: getLocalizedUrl(Website_Blog_Path, locale) as any });
    }

    const blogData = exactMatch;
    const { prevBlogData, nextBlogData } = getPreviousNextBlogData(
      blogData.docKey as BlogKey,
      locale ?? defaultLocale
    );

    const file = await getBlog(blogData?.docKey as BlogKey, locale);
    const blogContent = urlRenamer(file, locale);
    const blogParsed = parseMarkdown(blogContent);

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
      blogData,
      blogContent,
      blogParsed,
      nextBlog,
      prevBlog,
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
      title: `${blogData.title} | Intlayer`,
      meta: [
        { name: 'description', content: blogData.description },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : keywords || '',
        },
        { property: 'og:url', content: getLocalizedUrl(absoluteUrl, locale) },
        { property: 'og:title', content: `${blogData.title} | Intlayer` },
        { property: 'og:description', content: blogData.description },
      ],
      links: [
        { rel: 'canonical', href: getLocalizedUrl(absoluteUrl, locale) },
        { rel: 'alternate', hrefLang: 'x-default', href: absoluteUrl },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(absoluteUrl, mapLocale),
        })),
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
  } = loaderData;

  return (
    <BlogPageLayout activeSlugs={slugs} locale={locale ?? defaultLocale}>
      <CreativeWorkHeader
        type="BlogPosting"
        creativeWorkName={blogData.title}
        creativeWorkDescription={blogData.description}
        creativeWorkContent={blogContent}
        keywords={
          Array.isArray(blogData.keywords)
            ? blogData.keywords.join(', ')
            : blogData.keywords || ''
        }
        dateModified={new Date(blogData.updatedAt)}
        datePublished={new Date(blogData.createdAt)}
        url={blogData.url}
      />
      <DocHeader {...blogData} markdownContent={blogContent} />
      <DocumentationRender>{blogParsed}</DocumentationRender>
      <DocPageNavigation nextDoc={nextBlog} prevDoc={prevBlog} />
    </BlogPageLayout>
  );
}
