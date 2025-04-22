import {
  getBlogDataByPath,
  getBlogPathsArray,
} from '@components/BlogPage/blogData';
import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams, NextLayoutIntlayer } from 'next-intlayer';

export type BlogProps = {
  blog: string[];
};

export type BlogPageProps = LocalParams<BlogProps>;

export const generateStaticParams = () =>
  getBlogPathsArray().map((path) => ({
    blog: path,
  }));

export const generateMetadata = async ({
  params,
}: BlogPageProps): Promise<Metadata> => {
  const { locale, blog } = await params;

  const blogData = getBlogDataByPath(blog, locale);

  if (!blogData) {
    throw new Error(`Blog not found ${JSON.stringify(blog)}`);
  }

  return {
    title: `${blogData.title} | Intlayer`,
    description: blogData.description,
    keywords: blogData.keywords,
    alternates: {
      canonical: getLocalizedUrl(blogData.url, locale),
      languages: {
        ...getMultilingualUrls(blogData.url),
        'x-default': blogData.url,
      },
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${blogData.url}`,
        locale
      ),
      title: `${blogData.title} | Intlayer`,
      description: blogData.description,
    },
  };
};

const BlogLayout: NextLayoutIntlayer<BlogProps> = async ({
  children,
  params,
}) => {
  const { locale, blog } = await params;

  return (
    <BlogPageLayout activeSections={blog} locale={locale}>
      {children}
    </BlogPageLayout>
  );
};

export default BlogLayout;
