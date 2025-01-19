import {
  getBlogPathsArray,
  getBlogDataByPath,
} from '@components/BlogPage/blogData';
import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams, Next14LayoutIntlayer } from 'next-intlayer';

export type BlogProps = {
  blog: string[];
};

export type BlogPageProps = LocalParams<BlogProps>;

export const generateStaticParams = () =>
  getBlogPathsArray().map((path) => ({
    blog: path,
  }));

export const generateMetadata = ({
  params: { locale, blog },
}: BlogPageProps): Metadata => {
  const blogData = getBlogDataByPath(blog, locale);

  if (!blogData) {
    throw new Error(`Blog not found ${JSON.stringify(blog)}`);
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

const BlogLayout: Next14LayoutIntlayer<BlogProps> = ({
  children,
  params: { blog, locale },
}) => (
  <BlogPageLayout activeSections={blog} locale={locale}>
    {children}
  </BlogPageLayout>
);

export default BlogLayout;
