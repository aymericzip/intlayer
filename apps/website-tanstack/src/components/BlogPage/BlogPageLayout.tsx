import type { LocalesValues } from 'intlayer';
import { type FC, type ReactNode, Suspense } from 'react';
import { AsideNavigation } from '~/components/DocPage/AsideNavigation/AsideNavigation';
import { TOCProgressBar } from '~/components/DocPage/TOCProgressBar/TOCProgressBar';
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
    <div className="flex w-full bg-card max-md:flex-col md:h-[calc(100dvh-3.5rem)]">
      <aside className="z-40 flex-none">
        <BlogNavList
          blogData={blogData}
          activeSlugs={['blog', ...activeSlugs]}
        />
      </aside>
      <div className="mx-1 mb-3 flex min-h-0 min-w-0 flex-1 flex-row rounded-2xl border border-neutral/40 bg-background md:mr-2">
        <article
          className="no-scrollbar relative mb-3 h-full max-h-[calc(100vh-4.5rem)] w-auto flex-1 grow overflow-auto px-4 pb-24 max-md:pl-10 md:px-10"
          id="content"
        >
          <div className="m-auto max-w-3xl">
            <BlogBreadCrumb
              activeSections={activeSlugs}
              blogData={blogData}
              locale={locale}
            />
            {children}

            {currentBlogDocKey && <BlogCommentSection blogSlug={blogSlug} />}
          </div>

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
        </article>

        {displayAsideNavigation && (
          <aside className="flex flex-none flex-row max-lg:hidden">
            <TOCProgressBar />
            <AsideNavigation />
          </aside>
        )}
      </div>
    </div>
  );
};
