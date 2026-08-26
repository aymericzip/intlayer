import { getBlogMetadataBySlug, getDocMetadataBySlug } from '@intlayer/docs';
import RSS from 'rss';

/**
 * Parses a markdown frontmatter date, discarding unparsable values.
 *
 * A typo in the frontmatter (`2024-24-12`) builds an `Invalid Date` whose
 * `toISOString()` throws, which would fail the whole feed rather than a single
 * item, so unusable dates are treated as absent.
 *
 * @param rawDate - Raw frontmatter date value.
 * @returns The parsed date, or `undefined` when missing or unparsable.
 */
const parseFrontmatterDate = (rawDate?: string): Date | undefined => {
  if (!rawDate) return undefined;

  const parsedDate = new Date(rawDate);

  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
};

export async function GET() {
  const blogs = await getBlogMetadataBySlug([]);
  const docs = await getDocMetadataBySlug([]);

  const allPosts = [...blogs, ...docs].sort((a, b) => {
    const dateA =
      parseFrontmatterDate(a.createdAt ?? a.updatedAt)?.getTime() ?? 0;
    const dateB =
      parseFrontmatterDate(b.createdAt ?? b.updatedAt)?.getTime() ?? 0;
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
    const publishedDate = parseFrontmatterDate(post.createdAt);
    const updatedDate = parseFrontmatterDate(post.updatedAt) ?? publishedDate;

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
