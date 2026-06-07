import { createFileRoute } from '@tanstack/react-router';
import RSS from 'rss';
export const Route = createFileRoute('/test-rss')({
  server: {
    handlers: {
      GET: () => {
        try {
          const isRssConstructor = typeof RSS === 'function';
          return new Response(
            `RSS is constructor: ${isRssConstructor}\nRSS: ${JSON.stringify(RSS)}`,
            {
              headers: { 'Content-Type': 'text/plain' },
            }
          );
        } catch (e) {
          return new Response((e as Error).toString(), { status: 500 });
        }
      },
    },
  },
});
