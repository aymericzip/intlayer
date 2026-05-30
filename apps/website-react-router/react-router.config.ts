import {
  getBlogMetadataBySlug,
  getDocMetadataBySlug,
  getFrequentQuestionMetadataBySlug,
} from '@intlayer/docs';
import type { Config } from '@react-router/dev/config';
import { getMultilingualUrls, localeFlatMap } from 'intlayer';
import { resourceRoutes, staticRoutes } from './src/app/routes';

const getPathsFromUrl = (url: string) => {
  try {
    const urls = [url, ...Object.values(getMultilingualUrls(url))];

    return urls.map((url) => {
      const pathname = url.startsWith('http') ? new URL(url).pathname : url;
      return pathname;
    });
  } catch {
    return [url];
  }
};

export default {
  appDirectory: 'src/app',
  ssr: true,
  future: {
    v8_middleware: true,
  },
  prerender: {
    paths: async () => {
      const staticPaths = localeFlatMap(({ urlPrefix }) =>
        staticRoutes.map((route) => `${urlPrefix}${route}`)
      );

      const resourcePaths = [...resourceRoutes];

      const [docs, blogs, FAQs] = await Promise.all([
        getDocMetadataBySlug([]),
        // getBlogMetadataBySlug([]),
        // getFrequentQuestionMetadataBySlug([]),
      ]);

      const docPaths = docs.flatMap((doc) => getPathsFromUrl(doc.url));
      // const blogPaths = blogs.flatMap((blog) => getPathsFromUrl(blog.url));
      // const faqPaths = FAQs.flatMap((faq) => getPathsFromUrl(faq.url));

      const allPaths = Array.from(
        new Set([
          ...staticPaths,
          ...resourcePaths,
          ...docPaths,
          // ...blogPaths,
          // ...faqPaths,
        ])
      );

      return allPaths;
    },
    unstable_concurrency: 10,
  },
} satisfies Config;
