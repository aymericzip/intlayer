import type { MetadataRoute } from 'next';
import { locales } from '../../../intlayer.config';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/404', ...locales.map((locale) => `/${locale}/404`)],
  },
  sitemap: 'https://acme.com/sitemap.xml',
});

export default robots;
