import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import { getBlogData } from '@components/BlogPage/blogData';
import type { NextLayoutIntlayer } from 'next-intlayer';

export { generateMetadata } from './metadata';

const BlogLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  const blogData = getBlogData(locale);

  return (
    <BlogPageLayout
      blogData={blogData}
      locale={locale}
      displayAsideNavigation={false}
    >
      {children}
    </BlogPageLayout>
  );
};

export default BlogLayout;
