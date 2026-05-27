import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import { getBlogMetadataBySlug } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls, Locales } from 'intlayer';
import type { Metadata } from '@/types/next';
export type BlogProps = {
  slugs: string[];
};

export type BlogPageProps = {
  params: Promise<BlogProps & { locale: string }>;
  searchParams?: Promise<Record<string, string>>;
};

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

const BlogLayout = async ({ children, params }) => {
  const { locale, slugs } = await params;

  return (
    <BlogPageLayout activeSlugs={slugs} locale={locale}>
      {children}
    </BlogPageLayout>
  );
};

export default BlogLayout;
