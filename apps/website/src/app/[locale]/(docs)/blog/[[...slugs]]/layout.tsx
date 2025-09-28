import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import { getBlogMetadataBySlug } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls, Locales } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams, NextLayoutIntlayer } from 'next-intlayer';

export type BlogProps = {
  slugs: string[];
};

export type BlogPageProps = LocalPromiseParams<BlogProps>;

export const generateStaticParams = async () => {
  const blogMetadata = await getBlogMetadataBySlug([]);

  const slugList: string[][] = blogMetadata.map((meta) => meta.slugs);

  return slugList;
};

export const generateMetadata = async ({
  params,
}: BlogPageProps): Promise<Metadata> => {
  const { locale, slugs } = await params;

  const blogsData = await getBlogMetadataBySlug(
    ['blog', ...slugs],
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
  const relativeUrl = blogData.relativeUrl;

  return {
    title: `${blogData.title} | Intlayer`,
    description: blogData.description,
    keywords: blogData.keywords,
    alternates: {
      canonical: getLocalizedUrl(relativeUrl, Locales.ENGLISH),
      languages: {
        ...getMultilingualUrls(relativeUrl),
        'x-default': getLocalizedUrl(relativeUrl, Locales.ENGLISH),
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

  return (
    <BlogPageLayout activeSections={slugs} locale={locale}>
      {children}
    </BlogPageLayout>
  );
};

export default BlogLayout;
