import { BlogRender } from '@components/BlogPage/BlogRender';
import { getPreviousNextBlogData } from '@components/BlogPage/blogData';
import { DocHeader } from '@components/DocPage/DocHeader/DocHeader';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '@components/DocPage/DocPageNavigation/DocPageNavigation';
import { type BlogKey, getBlog, getBlogMetadataBySlug } from '@intlayer/docs';
import { CreativeWorkHeader } from '@structuredData/CreativeWorkHeader';
import { urlRenamer } from '@utils/markdown';
import { getLocalizedUrl } from 'intlayer';
import { redirect } from 'next/navigation';
import type { LocalPromiseParams } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { PagesRoutes } from '@/Routes';
import type { BlogProps } from './layout';

const BlogPage = async ({ params }: LocalPromiseParams<BlogProps>) => {
  const { locale, slugs } = await params;
  const blogsData = await getBlogMetadataBySlug(slugs, locale);

  const filteredBlogsData = blogsData.filter(
    (blog) => blog.slugs.length === slugs.length + 1
  );

  if (!filteredBlogsData || filteredBlogsData.length === 0) {
    return redirect(PagesRoutes.Blog);
  }

  const blogData = filteredBlogsData[0];

  const { prevBlogData, nextBlogData } = getPreviousNextBlogData(
    blogData.docKey as BlogKey,
    locale
  );

  const file = await getBlog(blogData?.docKey as BlogKey, locale);

  const blogContent = urlRenamer(file, locale);

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

  return (
    <IntlayerServerProvider locale={locale}>
      <CreativeWorkHeader
        creativeWorkName={blogData.title}
        creativeWorkDescription={blogData.description}
        creativeWorkContent={blogContent}
        keywords={blogData.keywords.join(', ')}
        dateModified={new Date(blogData.updatedAt)}
        datePublished={new Date(blogData.createdAt)}
        url={blogData.url}
      />
      <DocHeader {...blogData} markdownContent={blogContent} locale={locale} />

      <BlogRender>{blogContent}</BlogRender>

      <DocPageNavigation nextDoc={nextBlog} prevDoc={prevBlog} />
    </IntlayerServerProvider>
  );
};
export default BlogPage;
