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
 * FNV-1a 32-bit hash of a string, used to derive a shuffle seed from a
 * document key.
 */
const hashString = (value: string): number => {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index++) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

/**
 * Mulberry32 pseudo-random generator returning values in [0, 1).
 * Deterministic for a given seed.
 */
const createRandomGenerator = (seed: number): (() => number) => {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let result = Math.imul(state ^ (state >>> 15), 1 | state);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Shuffles by sorting on a seeded random key per item, so the same seed always
 * yields the same order. Keeps the output stable between prerender, server and
 * client renders.
 */
const shuffleWithSeed = <ItemType,>(
  items: ItemType[],
  seed: number
): ItemType[] => {
  const random = createRandomGenerator(seed);

  return items
    .map((item) => ({ item, sortKey: random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ item }) => item);
};

/**
 * Displays a grid of related blog posts, excluding the currently-viewed post.
 * The selection is shuffled deterministically from the current document key.
 */
export const RelatedPosts: FC<RelatedPostsProps> = ({
  allBlogs,
  currentDocKey,
  count = 4,
}) => {
  const content = useIntlayer('related-posts');

  const relatedPosts = useMemo(() => {
    const candidates = allBlogs.filter((blog) => blog.docKey !== currentDocKey);

    const shuffled = shuffleWithSeed(candidates, hashString(currentDocKey));

    return shuffled.slice(0, count);
  }, [allBlogs, currentDocKey, count]);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 border-border border-t border-dashed pt-8">
      <h2 className="mb-4 font-semibold text-sm text-text">
        {content.relatedPosts}
      </h2>
      <div className="grid grid-cols-1 divide-dashed divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {relatedPosts.map((post) => (
          <div key={post.docKey} className="px-2">
            <Link
              to={post.relativeUrl}
              variant="invisible-link"
              label={content.visitBlogTitle({ title: post.title })}
              className="group flex flex-col gap-2.5 py-5 no-underline sm:px-5 last:sm:pr-0 first:sm:pl-0"
            >
              <p className="line-clamp-2 font-medium text-sm text-text-primary transition-colors group-hover:text-text-secondary group-hover:underline">
                {post.title}
              </p>
              {post.description && (
                <p className="line-clamp-2 text-neutral text-xs">
                  {post.description}
                </p>
              )}
              {post.author && (
                <p className="mt-auto text-neutral text-xs">
                  {post.author.name}
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

type LastPostsProps = {
  allBlogs: BlogMetadata[];
  locale: LocalesValues;
  currentDocKey?: string;
  count?: number;
};

/**
 * Displays a grid of the latest blog posts sorted by creation date.
 */
export const LastPosts: FC<LastPostsProps> = ({
  allBlogs,
  currentDocKey,
  count = 4,
}) => {
  const content = useIntlayer('related-posts');

  const lastPosts = useMemo(() => {
    const candidates = currentDocKey
      ? allBlogs.filter((blog) => blog.docKey !== currentDocKey)
      : allBlogs;

    const sorted = [...candidates].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return sorted.slice(0, count);
  }, [allBlogs, currentDocKey, count]);

  if (lastPosts.length === 0) return null;

  return (
    <section className="mt-16 border-border border-t border-dashed pt-8">
      <h2 className="mb-4 font-semibold text-sm text-text">
        {content.lastPosts}
      </h2>
      <div className="grid grid-cols-1 divide-dashed divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {lastPosts.map((post) => (
          <div key={post.docKey} className="px-2">
            <Link
              to={post.relativeUrl}
              variant="invisible-link"
              label={content.visitBlogTitle({ title: post.title })}
              className="group flex flex-col gap-2.5 py-5 no-underline sm:px-5 last:sm:pr-0 first:sm:pl-0"
            >
              <p className="line-clamp-2 font-medium text-sm text-text-primary transition-colors group-hover:text-text-secondary group-hover:underline">
                {post.title}
              </p>
              {post.description && (
                <p className="line-clamp-2 text-neutral text-xs">
                  {post.description}
                </p>
              )}
              {post.author && (
                <p className="mt-auto text-neutral text-xs">
                  {post.author.name}
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
