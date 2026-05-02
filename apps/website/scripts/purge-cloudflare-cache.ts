const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!ZONE_ID || !API_TOKEN) {
  console.error(
    'Error: CLOUDFLARE_ZONE_ID or CLOUDFLARE_API_TOKEN is not set.'
  );
  process.exit(1);
}

console.log(`Purging Cloudflare cache for zone ${ZONE_ID}...`);

const url = process.env.NEXT_PUBLIC_URL;
let hosts: string[] | undefined;

if (url) {
  try {
    const hostname = new URL(url).hostname;
    hosts = [hostname];
    console.log(`Scoping purge to host: ${hostname}`);
  } catch (error) {
    console.error(
      `Warning: Invalid URL provided (${url}). Falling back to purge everything.`
    );
  }
}

try {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(hosts ? { hosts } : { purge_everything: true }),
    }
  );

  const data = (await response.json()) as {
    success: boolean;
    errors: { message: string }[];
  };

  if (response.ok && data.success) {
    console.log('Cloudflare cache purged successfully.');
  } else {
    console.error('Failed to purge Cloudflare cache:', data.errors);
    process.exit(1);
  }
} catch (error) {
  console.error('Error purging Cloudflare cache:', error);
  process.exit(1);
}

export {};
