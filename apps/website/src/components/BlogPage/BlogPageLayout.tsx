import type { LocalesValues } from 'intlayer';
import { type FC, type ReactNode, Suspense } from 'react';
import { DocPageLayoutShell } from '~/components/DocPage/DocPageLayoutShell';
import { BlogBreadCrumb } from './BlogBreadCrumb';
import { BlogCommentSection } from './BlogCommentSection';
import { BlogNavList } from './BlogNavList';
import { getBlogSection } from './blogData';
import { LastPosts, RelatedPosts } from './RelatedPosts';
import type { Section } from './types';

type BlogPageLayoutProps = {
  children?: ReactNode;
  blogData: Section;
  activeSlugs?: string[];
  locale: LocalesValues;
  displayAsideNavigation?: boolean;
  /**
   * docKey of the currently-displayed post, used to exclude it from related
   * posts. When omitted related posts are still shown but may include the
   * current post.
   */
  currentBlogDocKey?: string;
  /** Content rendered after the main article area, outside the max-w-3xl constraint. */
  trailingContent?: ReactNode;
};

export const BlogPageLayout: FC<BlogPageLayoutProps> = ({
  children,
  blogData,
  locale,
  activeSlugs = [],
  displayAsideNavigation = true,
  currentBlogDocKey,
  trailingContent,
}) => {
  const { blog: allBlogs } = getBlogSection(blogData);
  const blogSlug = activeSlugs.join('/');

  return (
    <DocPageLayoutShell
      nav={
        <BlogNavList
          blogData={blogData}
          activeSlugs={['blog', ...activeSlugs]}
        />
      }
      breadcrumb={
        <BlogBreadCrumb
          activeSections={activeSlugs}
          blogData={blogData}
          locale={locale}
        />
      }
      innerTrailingContent={
        currentBlogDocKey ? <BlogCommentSection blogSlug={blogSlug} /> : null
      }
      trailingContent={
        <>
          {currentBlogDocKey && allBlogs.length > 1 && (
            <Suspense>
              <RelatedPosts
                allBlogs={allBlogs}
                currentDocKey={currentBlogDocKey}
                locale={locale}
              />
            </Suspense>
          )}

          {allBlogs.length > (currentBlogDocKey ? 1 : 0) && (
            <Suspense>
              <LastPosts
                allBlogs={allBlogs}
                currentDocKey={currentBlogDocKey}
                locale={locale}
              />
            </Suspense>
          )}

          {trailingContent}
        </>
      }
      displayAsideNavigation={displayAsideNavigation}
    >
      {children}
    </DocPageLayoutShell>
  );
};
