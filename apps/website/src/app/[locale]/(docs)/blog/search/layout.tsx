import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import { type NextLayoutIntlayer } from 'next-intlayer';
export { generateMetadata } from './metadata';

const BlogLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <BlogPageLayout locale={locale} displayAsideNavigation={false}>
      {children}
    </BlogPageLayout>
  );
};

export default BlogLayout;
