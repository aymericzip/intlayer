const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function POST(request: Request) {
  try {
    // Expecting an array of URLs in the request body
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return jsonResponse(
        { error: 'Invalid payload. Expected an array of URLs.' },
        400
      );
    }

    // Best practice: Store token in .env (e.g., BAIDU_PUSH_TOKEN=igBZ4IS2CwB7KRmZ)
    // Hardcoded here for direct mapping to your example.
    const token = process.env.NEXT_PUBLIC_BAIDU_PUSH_TOKEN;
    const site = process.env.NEXT_PUBLIC_URL;

    if (!token || !site) {
      return jsonResponse(
        {
          error:
            'Missing BAIDU_PUSH_TOKEN or NEXT_PUBLIC_URL environment variable.',
        },
        500
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
    return jsonResponse({ success: response.ok, baiduResponse: data });
  } catch {
    return jsonResponse({ error: 'Internal Server Error' }, 500);
  }
}
