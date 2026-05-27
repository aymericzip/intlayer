import { getBlogMetadataBySlug, getDocMetadataBySlug } from '@intlayer/docs';
import RSS from 'rss';

export async function GET() {
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

  const feed = new RSS({
    title: 'Intlayer',
    description:
      'Intlayer is a suite of tools designed to help you manage your internationalization. It is a layer of abstraction between the business logic and the data access layer.',
    site_url: process.env.NEXT_PUBLIC_URL!,
    feed_url: new URL('/feed.xml', process.env.NEXT_PUBLIC_URL!).toString(),
    copyright: `${new Date().getFullYear()} Intlayer`,
    language: 'en',
    pubDate: new Date(),
  });

  for (const post of allPosts) {
    feed.item({
      title: post.title,
      guid: post.url,
      url: post.url,
      date:
        post.createdAt || post.updatedAt
          ? new Date(post.createdAt || post.updatedAt)
          : new Date(),
      description: post.description,
      author: post.author,
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
