import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import { getBlogData } from '@components/BlogPage/blogData';
import { getBlogMetadataBySlug } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls, Locales } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams, NextLayoutIntlayer } from 'next-intlayer';

export type BlogProps = {
  slugs: string[];
};

export type BlogPageProps = LocalPromiseParams<BlogProps>;

/**
 * Builds the static params for the blog catch-all route.
 *
 * The metadata slugs include the `blog` section prefix (e.g.
 * `['blog', 'i18n-meaning']`), while the route segment only holds the
 * remaining slugs, so the prefix is stripped. Entries resolving to an empty
 * slug list are dropped since a required catch-all segment cannot match them.
 */
export const generateStaticParams = async (): Promise<BlogProps[]> => {
  const blogMetadata = await getBlogMetadataBySlug([]);

  return blogMetadata
    .map((meta) => ({ slugs: meta.slugs.slice(1) }))
    .filter(({ slugs }) => slugs.length > 0);
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
        'x-default': getLocalizedUrl(absoluteUrl, Locales.ENGLISH),
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
