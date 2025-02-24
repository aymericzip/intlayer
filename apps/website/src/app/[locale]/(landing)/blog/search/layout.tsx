import { BackgroundLayout } from '@components/BackgroundLayout';
import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import { type NextLayoutIntlayer } from 'next-intlayer';
export { generateMetadata } from './metadata';

export type BlogProps = {
  blog: string[];
};

const BlogLayout: NextLayoutIntlayer<BlogProps> = async ({
  children,
  params,
}) => {
  const { locale } = await params;
  return (
    <BlogPageLayout locale={locale} displayBlogNavTitles={false}>
      {children}
    </BlogPageLayout>
  );
};

export default BlogLayout;
