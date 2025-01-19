import { BackgroundLayout } from '@components/BackgroundLayout';
import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import { type Next14LayoutIntlayer } from 'next-intlayer';
export { generateMetadata } from './metadata';

export type BlogProps = {
  blog: string[];
};

const BlogLayout: Next14LayoutIntlayer<BlogProps> = ({
  children,
  params: { locale },
}) => (
  <BlogPageLayout locale={locale} displayBlogNavTitles={false}>
    <BackgroundLayout>{children}</BackgroundLayout>
  </BlogPageLayout>
);

export default BlogLayout;
