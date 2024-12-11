import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getEnvironmentNextJSNextJS14Data = (locale: Locales): DocData => ({
  docName: 'intlayer_with_nextjs_14',
  url: PagesRoutes.Doc_Environment_NextJS_14,
  githubUrl: GithubRoutes.IntlayerWithNextJS14,
  createdAt: new Date('2024-12-06'),
  updatedAt: new Date('2024-12-07'),
  ...getIntlayer('doc-intlayer-with-nextjs-14-metadata', locale),
});
