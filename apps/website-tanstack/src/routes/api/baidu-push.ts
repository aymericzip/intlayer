import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/baidu-push')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { urls } = await request.json();

          if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return Response.json(
              { error: 'Invalid payload. Expected an array of URLs.' },
              { status: 400 }
            );
          }

          const token = import.meta.env.VITE_BAIDU_PUSH_TOKEN;
          const site = import.meta.env.VITE_URL;

          if (!token || !site) {
            return Response.json(
              {
                error:
                  'Missing BAIDU_PUSH_TOKEN or VITE_URL environment variable.',
              },
              { status: 500 }
            );
          }

          const baiduApiUrl = `http://data.zz.baidu.com/urls?site=${site}&token=${token}`;
          const plainTextUrls = urls.join('\n');

          const response = await fetch(baiduApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: plainTextUrls,
          });

          const data = await response.json();
          return Response.json({ success: response.ok, baiduResponse: data });
        } catch {
          return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 }
          );
        }
      },
    },
  },
});
