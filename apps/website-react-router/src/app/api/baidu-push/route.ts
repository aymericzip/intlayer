import type { ActionFunctionArgs } from 'react-router';

export async function action({ request }: ActionFunctionArgs) {
  try {
    // Expecting an array of URLs in the request body
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return Response.json(
        { error: 'Invalid payload. Expected an array of URLs.' },
        { status: 400 }
      );
    }

    const token = process.env.NEXT_PUBLIC_BAIDU_PUSH_TOKEN;
    const site = process.env.NEXT_PUBLIC_URL;

    if (!token || !site) {
      return Response.json(
        {
          error:
            'Missing BAIDU_PUSH_TOKEN or NEXT_PUBLIC_URL environment variable.',
        },
        { status: 500 }
      );
    }

    const baiduApiUrl = `http://data.zz.baidu.com/urls?site=${site}&token=${token}`;

    // Baidu requires plain text, one URL per line
    const plainTextUrls = urls.join('\n');

    const response = await fetch(baiduApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: plainTextUrls,
    });

    const data = await response.json();

    // Baidu returns status 200 with an object containing { success: number, remain: number } on success
    return Response.json({ success: response.ok, baiduResponse: data });
  } catch {
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
