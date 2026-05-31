import { getBlogMetadataBySlug, getDocMetadataBySlug } from '@intlayer/docs';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts.json')({
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

        return new Response(JSON.stringify(allPosts), {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        });
      },
    },
  },
});
