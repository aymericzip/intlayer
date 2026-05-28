import { Website_NotFound_Path } from '@intlayer/design-system/routes';
import { getMultilingualUrls } from 'intlayer';
import type { MetadataRoute } from 'next';

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
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
});

export default robots;
