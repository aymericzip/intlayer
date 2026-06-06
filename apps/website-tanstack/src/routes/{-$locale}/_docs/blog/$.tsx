import { Website_Home_Path } from '@intlayer/design-system/routes';
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
import { CreativeWorkHeader } from '~/structuredData/CreativeWorkHeader';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/_docs/blog/$')({
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
    >
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
