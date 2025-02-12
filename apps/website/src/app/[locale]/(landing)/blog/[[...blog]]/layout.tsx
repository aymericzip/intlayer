import {
  getBlogPathsArray,
  getBlogDataByPath,
  checkIfBlogPathExists,
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
  const isBlogPathExists = checkIfBlogPathExists(blog);
  const blogPath = isBlogPathExists ? blog : [];

  const blogData = getBlogDataByPath(blogPath, locale);

  if (!blogData) {
    throw new Error(`Blog not found ${JSON.stringify(blogPath)}`);
  }

  return {
    title: `${blogData.title} | Intlayer`,
    description: blogData.description,
    keywords: blogData.keywords,
    alternates: {
      canonical: blogData.url,
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
  const isBlogPathExists = checkIfBlogPathExists(blog);
  const blogPath = isBlogPathExists ? blog : [];

  return (
    <BlogPageLayout activeSections={blogPath} locale={locale}>
      {children}
    </BlogPageLayout>
  );
};

export default BlogLayout;
