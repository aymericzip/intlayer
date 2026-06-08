import { getBlogMetadataBySlug, getDocMetadataBySlug } from '@intlayer/docs';

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

  return new Response(JSON.stringify(allPosts), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
