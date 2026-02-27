import { getBlogMetadataBySlug, getDocMetadataBySlug } from '@intlayer/docs';

export async function GET() {
  const blogs = await getBlogMetadataBySlug([]);
  const docs = await getDocMetadataBySlug([]);

  const allPosts = [...blogs, ...docs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return new Response(JSON.stringify(allPosts), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
