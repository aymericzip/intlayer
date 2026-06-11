import type { BlogMetadata } from '@intlayer/docs';
import type { LocalesValues } from 'intlayer';
import { type FC, useMemo } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';

type RelatedPostsProps = {
  allBlogs: BlogMetadata[];
  currentDocKey: string;
  locale: LocalesValues;
  count?: number;
};

/**
 * Displays a grid of randomly-selected related blog posts,
 * excluding the currently-viewed post.
 */
export const RelatedPosts: FC<RelatedPostsProps> = ({
  allBlogs,
  currentDocKey,
  count = 4,
}) => {
  const content = useIntlayer('related-posts');

  const relatedPosts = useMemo(() => {
    const candidates = allBlogs.filter((blog) => blog.docKey !== currentDocKey);

    const shuffled = [...candidates].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, count);
  }, [allBlogs, currentDocKey, count]);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 border-border border-t pt-8">
      <h2 className="mb-4 font-semibold text-sm text-text">
        {content.relatedPosts}
      </h2>
      <div className="grid grid-cols-1 divide-y divide-dashed divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {relatedPosts.map((post) => (
          <div key={post.docKey} className="px-2">
            <Link
              to={post.relativeUrl}
              label={content.visitBlogTitle({ title: post.title })}
              className="group flex flex-col gap-2.5 py-5 no-underline sm:px-5 last:sm:pr-0 first:sm:pl-0"
            >
              <p className="line-clamp-2 font-medium text-sm text-text-primary transition-colors group-hover:text-text-secondary">
                {post.title}
              </p>
              {post.description && (
                <p className="line-clamp-2 text-neutral text-xs">
                  {post.description}
                </p>
              )}
              {post.author && (
                <p className="mt-auto text-neutral text-xs">{post.author}</p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
