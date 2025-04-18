import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getEnvironmentNextJSNextJS14Data = (
  locale: LocalesValues
): DocData => ({
  docName: 'intlayer_with_nextjs_14',
  url: PagesRoutes.Doc_Environment_NextJS_14,
  githubUrl: GithubRoutes.IntlayerWithNextJS14,
  createdAt: new Date('2024-12-06'),
  updatedAt: new Date('2024-12-07'),
  ...getIntlayer('doc-intlayer-with-nextjs-14-metadata', locale),
});
