import { Website_Blog_Path } from '@intlayer/design-system/routes';
import { type BlogKey, getBlog, getBlogMetadataBySlug } from '@intlayer/docs';
import {
  defaultLocale,
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import { parseMarkdown } from 'react-intlayer/markdown';
import { redirect } from 'react-router';
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

import type { Route } from './+types/blog-page';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data?.blogData) return [];

  const { blogData, locale } = data;
  const absoluteUrl = blogData.url;
  const keywords = blogData.keywords;

  return [
    { title: `${blogData.title} | Intlayer` },
    { name: 'description', content: blogData.description },
    {
      name: 'keywords',
      content: Array.isArray(keywords) ? keywords.join(', ') : keywords || '',
    },
    { property: 'og:url', content: getLocalizedUrl(absoluteUrl, locale!) },
    { property: 'og:title', content: `${blogData.title} | Intlayer` },
    { property: 'og:description', content: blogData.description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(absoluteUrl, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: absoluteUrl,
    },
    ...Object.entries(getMultilingualUrls(absoluteUrl)).map(([lang, url]) => ({
      tagName: 'link',
      rel: 'alternate',
      hrefLang: lang,
      href: url,
    })),
  ];
};

export async function loader({ request, params }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  const slugsStr = params['*'] || '';
  let slugs = slugsStr ? slugsStr.split('/') : [];

  const isMd = slugsStr.endsWith('.md');
  if (isMd) {
    slugs = slugs.map((slug, idx) =>
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
    const url = new URL(request.url);
    const format = (url.searchParams.get('format') || '').toLowerCase();
    const accept = request.headers.get('accept') || '';
    const baseHeaders: Record<string, string> = {
      'Cache-Control':
        'public, max-age=300, s-maxage=300, stale-while-revalidate=300',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': 'frame-ancestors *',
      Vary: 'Accept',
      'Content-Disposition': `inline; filename="${slugs[slugs.length - 1] || 'blog'}.md"`,
    };

    const method = request.method.toUpperCase();
    const isHead = method === 'HEAD';

    const wantsHtml =
      format === 'html' || (format === '' && accept.includes('text/html'));
    const wantsText =
      format === 'txt' ||
      (format === '' &&
        (accept.includes('text/plain') || accept.includes('*/*')));

    if (wantsHtml) {
      const htmlContent = `<!DOCTYPE html><html lang="${locale}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${
        (exactMatch as any).title || 'Blog'
      }</title><meta name="robots" content="all"></head><body><pre style="white-space: pre-wrap; font-family: monospace; line-height: 1.5; padding: 20px;">${file
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</pre></body></html>`;

      return new Response(isHead ? null : htmlContent, {
        status: 200,
        headers: {
          ...baseHeaders,
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }

    if (wantsText) {
      return new Response(isHead ? null : file, {
        status: 200,
        headers: {
          ...baseHeaders,
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    return new Response(isHead ? null : file, {
      status: 200,
      headers: {
        ...baseHeaders,
        'Content-Type': 'text/markdown; charset=utf-8',
      },
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
      throw redirect(getLocalizedUrl(blogsData[0].url, locale));
    }
    throw redirect(getLocalizedUrl(Website_Blog_Path, locale));
  }

  const blogData = exactMatch;

  const { prevBlogData, nextBlogData } = getPreviousNextBlogData(
    blogData.docKey as BlogKey,
    locale ?? defaultLocale
  );

  const file = await getBlog(blogData?.docKey as BlogKey, locale);

  const blogContent = urlRenamer(file, locale!);
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
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
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
