import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import { getBlogData } from '@components/BlogPage/blogData';
import { getBlogMetadataBySlug } from '@intlayer/docs';
import {
  getSlugsStaticParams,
  type SlugsStaticParams,
} from '@utils/docMetadata';
import { defaultLocale, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams, NextLayoutIntlayer } from 'next-intlayer';

export type BlogProps = {
  slugs: string[];
};

export type BlogPageProps = LocalPromiseParams<BlogProps>;

export const generateStaticParams = async (): Promise<SlugsStaticParams[]> => {
  const blogMetadata = await getBlogMetadataBySlug([]);

  return getSlugsStaticParams(blogMetadata);
};

export const generateMetadata = async ({
  params,
}: BlogPageProps): Promise<Metadata> => {
  const { locale, slugs } = await params;

  const blogsData = await getBlogMetadataBySlug(
    ['blog', ...(slugs ?? [])],
    locale,
    true
  );

  const filteredBlogsData = blogsData.filter(
    (blog) => blog.slugs.length === slugs.length + 1
  );

  if (!filteredBlogsData || filteredBlogsData.length === 0) {
    return {};
  }

  const blogData = filteredBlogsData[0];

  const absoluteUrl = blogData.url;

  return {
    title: `${blogData.title} | Intlayer`,
    description: blogData.description,
    keywords: blogData.keywords,
    alternates: {
      canonical: getLocalizedUrl(absoluteUrl, locale),
      languages: {
        ...getMultilingualUrls(absoluteUrl),
        'x-default': getLocalizedUrl(absoluteUrl, defaultLocale),
      },
      types: {
        'text/markdown': `${getLocalizedUrl(absoluteUrl, locale)}.md`,
      },
    },
    openGraph: {
      url: getLocalizedUrl(absoluteUrl, locale),
      title: `${blogData.title} | Intlayer`,
      description: blogData.description,
    },
  };
};

const BlogLayout: NextLayoutIntlayer<BlogProps> = async ({
  children,
  params,
}) => {
  const { locale, slugs } = await params;
  const blogData = getBlogData(locale);

  const blogsData = await getBlogMetadataBySlug(
    ['blog', ...(slugs ?? [])],
    locale,
    true
  );

  const filteredBlogsData = blogsData.filter(
    (blog) => blog.slugs.length === slugs.length + 1
  );

  const currentBlogDocKey = filteredBlogsData[0]?.docKey;

  return (
    <BlogPageLayout
      blogData={blogData}
      activeSlugs={slugs}
      locale={locale}
      currentBlogDocKey={currentBlogDocKey}
    >
      {children}
    </BlogPageLayout>
  );
};

export default BlogLayout;
