import { getPreviousNextBlogData } from '@components/BlogPage/blogData';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '@components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { getLocalizedUrl } from '@intlayer/core/localization';
import { Website_Blog_Path } from '@intlayer/design-system/routes';
import { type BlogKey, getBlog, getBlogMetadataBySlug } from '@intlayer/docs';
import { getCreativeWorkHeader } from '@intlayer/design-system/structured-data';
import { urlRenamer } from '@utils/markdown';
import { redirect } from 'next/navigation';
import type { LocalPromiseParams } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import type { BlogProps } from './layout';

const BlogPage = async ({ params }: LocalPromiseParams<BlogProps>) => {
  const { locale, slugs } = await params;
  const blogsData = await getBlogMetadataBySlug(slugs, locale);

  const filteredBlogsData = blogsData.filter(
    (blog) => blog.slugs.length === slugs.length + 1
  );

  if (!filteredBlogsData || filteredBlogsData.length === 0) {
    return redirect(Website_Blog_Path);
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
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getCreativeWorkHeader({ locale })),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getDocHeader({ locale })),
        }}
      />

      <DocumentationRender>{blogContent}</DocumentationRender>

      <DocPageNavigation nextDoc={nextBlog} prevDoc={prevBlog} />
    </IntlayerServerProvider>
  );
};
export default BlogPage;
