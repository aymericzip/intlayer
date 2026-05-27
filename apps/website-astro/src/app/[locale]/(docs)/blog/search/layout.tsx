import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';

export { generateMetadata } from './metadata';

const BlogLayout = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <BlogPageLayout locale={locale} displayAsideNavigation={false}>
      {children}
    </BlogPageLayout>
  );
};

export default BlogLayout;
