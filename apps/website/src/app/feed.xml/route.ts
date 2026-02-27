import { getBlogMetadataBySlug, getDocMetadataBySlug } from '@intlayer/docs';
import RSS from 'rss';

export async function GET() {
  const blogs = await getBlogMetadataBySlug([]);
  const docs = await getDocMetadataBySlug([]);

  const allPosts = [...blogs, ...docs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const feed = new RSS({
    title: 'Intlayer',
    description:
      'Intlayer is a suite of tools designed to help you manage your internationalization. It is a layer of abstraction between the business logic and the data access layer.',
    site_url: process.env.NEXT_PUBLIC_URL!,
    feed_url: `${process.env.NEXT_PUBLIC_URL}/feed.xml`,
    copyright: `${new Date().getFullYear()} Intlayer`,
    language: 'en',
    pubDate: new Date(),
  });

  for (const post of allPosts) {
    feed.item({
      title: post.title,
      guid: post.url,
      url: post.url,
      date: post.createdAt,
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
