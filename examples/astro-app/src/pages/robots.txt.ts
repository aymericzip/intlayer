import type { APIRoute } from 'astro';

const isProd = import.meta.env.PROD; // Assumes standard Vite env vars

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = `
User-agent: *
${isProd ? 'Allow: /' : 'Disallow: /'}

Sitemap: ${new URL('/sitemap.xml', site).href}
`.trim();

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
