import { Website_NotFound_Path } from '@intlayer/design-system/routes';
import { getMultilingualUrls } from 'intlayer';

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

function getRobotsConfig() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: getAllUrls([Website_NotFound_Path]),
    },
    host: import.meta.env.VITE_URL,
    sitemap: [
      `${import.meta.env.VITE_URL}/sitemap.xml`,
      `${import.meta.env.VITE_CMS_URL}/sitemap.xml`,
    ],
  };
}

export async function loader() {
  const robotsConfig = getRobotsConfig();
  let text = '';

  const rules = Array.isArray(robotsConfig.rules)
    ? robotsConfig.rules
    : [robotsConfig.rules];

  for (const rule of rules) {
    if (rule.userAgent) {
      const agents = Array.isArray(rule.userAgent)
        ? rule.userAgent
        : [rule.userAgent];
      for (const agent of agents) {
        text += `User-agent: ${agent}\n`;
      }
    }
    if (rule.allow) {
      const allows = Array.isArray(rule.allow) ? rule.allow : [rule.allow];
      for (const allow of allows) {
        text += `Allow: ${allow}\n`;
      }
    }
    if (rule.disallow) {
      const disallows = Array.isArray(rule.disallow)
        ? rule.disallow
        : [rule.disallow];
      for (const disallow of disallows) {
        text += `Disallow: ${disallow}\n`;
      }
    }
  }

  if (robotsConfig.host) {
    text += `Host: ${robotsConfig.host}\n`;
  }

  if (robotsConfig.sitemap) {
    const sitemaps = Array.isArray(robotsConfig.sitemap)
      ? robotsConfig.sitemap
      : [robotsConfig.sitemap];
    for (const sitemap of sitemaps) {
      text += `Sitemap: ${sitemap}\n`;
    }
  }

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
