export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return new Response(
        JSON.stringify({
          error: 'Invalid payload. Expected an array of URLs.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = import.meta.env.PUBLIC_BAIDU_PUSH_TOKEN;
    const site = import.meta.env.PUBLIC_URL;

    if (!token || !site) {
      return new Response(
        JSON.stringify({
          error: 'Missing BAIDU_PUSH_TOKEN or PUBLIC_URL environment variable.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
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
    return new Response(
      JSON.stringify({ success: response.ok, baiduResponse: data }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
