import { getBlogMetadataBySlug, getDocMetadataBySlug } from '@intlayer/docs';
import { createFileRoute } from '@tanstack/react-router';
import RSS from 'rss';

export const Route = createFileRoute('/feed.xml')({
  server: {
    handlers: {
      GET: async () => {
        const blogs = await getBlogMetadataBySlug([]);
        const docs = await getDocMetadataBySlug([]);

        const allPosts = [...blogs, ...docs].sort((a, b) => {
          const dateA =
            a.createdAt || a.updatedAt
              ? new Date(a.createdAt || a.updatedAt).getTime()
              : 0;
          const dateB =
            b.createdAt || b.updatedAt
              ? new Date(b.createdAt || b.updatedAt).getTime()
              : 0;
          return dateB - dateA;
        });

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
          const publishedDate = post.createdAt
            ? new Date(post.createdAt)
            : undefined;
          const updatedDate = post.updatedAt
            ? new Date(post.updatedAt)
            : publishedDate;

          feed.item({
            title: post.title,
            guid: post.url,
            url: post.url,
            date: updatedDate ?? new Date(),
            description: post.description,
            author: post.author?.name ?? post.author,
            custom_elements: publishedDate
              ? [
                  {
                    'atom:updated': (
                      updatedDate ?? publishedDate
                    ).toISOString(),
                  },
                ]
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
