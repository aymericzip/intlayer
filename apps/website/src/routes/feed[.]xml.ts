import {
  type DocMetadata,
  getBlogMetadataBySlug,
  getDocMetadataBySlug,
} from '@intlayer/docs';
import { createFileRoute } from '@tanstack/react-router';
import RSS from 'rss';

/**
 * Entries without frontmatter (e.g. the repository readme) carry neither a
 * title nor slugs, and would otherwise be published as an empty feed item
 * pointing at the site root.
 */
const isPublishable = (post: DocMetadata): boolean =>
  Boolean(post.title) && post.slugs.length > 0;

/** Publication date used both to order the feed and as the item `pubDate`. */
const getPublishedDate = (post: DocMetadata): Date | undefined => {
  const rawDate = post.createdAt ?? post.updatedAt;

  return rawDate ? new Date(rawDate) : undefined;
};

export const Route = createFileRoute('/feed.xml')({
  server: {
    handlers: {
      GET: async () => {
        const blogs = await getBlogMetadataBySlug([]);
        const docs = await getDocMetadataBySlug([]);

        const allPosts = [...blogs, ...docs]
          .filter(isPublishable)
          .sort(
            (a, b) =>
              (getPublishedDate(b)?.getTime() ?? 0) -
              (getPublishedDate(a)?.getTime() ?? 0)
          );

        const siteUrl =
          import.meta.env.VITE_URL ?? import.meta.env.VITE_SITE_URL ?? '';

        const feed = new RSS({
          title: 'Intlayer',
          description:
            'Intlayer is a suite of tools designed to help you manage your internationalization.',
          site_url: siteUrl,
          feed_url: new URL('/feed.xml', siteUrl).toString(),
          copyright: `${new Date().getFullYear()} Intlayer`,
          language: 'en',
          pubDate: new Date(),
          custom_namespaces: {
            atom: 'http://www.w3.org/2005/Atom',
          },
        });

        for (const post of allPosts) {
          const publishedDate = getPublishedDate(post);
          const updatedDate = post.updatedAt
            ? new Date(post.updatedAt)
            : publishedDate;

          feed.item({
            title: post.title,
            guid: post.url,
            url: post.url,
            date: publishedDate ?? new Date(),
            description: post.description,
            author: post.author,
            custom_elements: updatedDate
              ? [{ 'atom:updated': updatedDate.toISOString() }]
              : undefined,
          });
        }

        return new Response(feed.xml({ indent: true }), {
          headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
        });
      },
    },
  },
});
