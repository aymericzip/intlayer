import { getDocArray } from '@components/DocPage/docData';
import type { MetadataRoute } from 'next';

const docs = getDocArray();

const sitemap = (): MetadataRoute.Sitemap =>
  docs.map((doc) => ({
    url: `${process.env.NEXT_PUBLIC_URL}${doc.url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}/es${doc.url}`,
        fr: `${process.env.NEXT_PUBLIC_URL}/fr${doc.url}`,
      },
    },
  }));

export default sitemap;
