import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getEnvironmentNextJSPageRouterData = (
  locale: Locales
): DocData => ({
  docName: 'intlayer_with_nextjs_page_router',
  url: PagesRoutes.Doc_Intlayer_with_NextJS_using_Page_Router,
  githubUrl: GithubRoutes.IntlayerWithNextJSUsingPageRouter,
  createdAt: new Date('2024-12-07'),
  updatedAt: new Date('2024-12-07'),
  ...getIntlayer('doc-intlayer-with-nextjs-page-router-metadata', locale),
});
