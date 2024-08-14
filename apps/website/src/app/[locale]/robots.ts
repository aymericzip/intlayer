import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/404'],
  },
  sitemap: 'https://acme.com/sitemap.xml',
});

export default robots;
