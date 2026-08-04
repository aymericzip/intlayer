import { getBlogMetadataBySlug, getDocMetadataBySlug } from '@intlayer/docs';
import RSS from 'rss';

/**
 * Parses a frontmatter date value into a `Date`.
 *
 * Malformed values (for example a swapped `2024-24-12`) yield an
 * `Invalid Date`, whose `toISOString()` throws a `RangeError`. Returning
 * `undefined` instead keeps a single bad document from breaking the feed.
 *
 * @param value - Raw frontmatter date value.
 * @returns A valid `Date`, or `undefined` when the value cannot be parsed.
 */
const parseValidDate = (value: string | Date | undefined): Date | undefined => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export async function GET() {
  const blogs = await getBlogMetadataBySlug([]);
  const docs = await getDocMetadataBySlug([]);

  const allPosts = [...blogs, ...docs].sort((a, b) => {
    const dateA = parseValidDate(a.createdAt ?? a.updatedAt)?.getTime() ?? 0;
    const dateB = parseValidDate(b.createdAt ?? b.updatedAt)?.getTime() ?? 0;
    return dateB - dateA;
  });

  const feed = new RSS({
    title: 'Intlayer',
    description:
      'Intlayer is a suite of tools designed to help you manage your internationalization. It is a layer of abstraction between the business logic and the data access layer.',
    site_url: process.env.NEXT_PUBLIC_URL!,
    feed_url: new URL('/feed.xml', process.env.NEXT_PUBLIC_URL!).toString(),
    copyright: `${new Date().getFullYear()} Intlayer`,
    language: 'en',
    pubDate: new Date(),
    custom_namespaces: {
      atom: 'http://www.w3.org/2005/Atom',
    },
  });

  for (const post of allPosts) {
    const publishedDate = parseValidDate(post.createdAt);
    const updatedDate = parseValidDate(post.updatedAt) ?? publishedDate;

    feed.item({
      title: post.title,
      guid: post.url,
      url: post.url,
      date: updatedDate ?? new Date(),
      description: post.description,
      author: post.author?.name ?? post.author,
      custom_elements: publishedDate
        ? [{ 'atom:updated': (updatedDate ?? publishedDate).toISOString() }]
        : undefined,
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
