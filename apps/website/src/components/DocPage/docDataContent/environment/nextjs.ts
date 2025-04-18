import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getEnvironmentNextJSNextJS15Data = (
  locale: LocalesValues
): DocData => ({
  docName: 'intlayer_with_nextjs_15',
  url: PagesRoutes.Doc_Environment_NextJS_15,
  githubUrl: GithubRoutes.IntlayerWithNextJS15,
  createdAt: new Date('2024-12-06'),
  updatedAt: new Date('2024-12-07'),
  ...getIntlayer('doc-intlayer-with-nextjs-15-metadata', locale),
});
