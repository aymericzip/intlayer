import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getCMSData = (locale: Locales): DocData => ({
  docName: 'intlayer_CMS',
  url: PagesRoutes.Doc_IntlayerCMS,
  githubUrl: GithubRoutes.IntlayerCMS,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-cms-metadata', locale),
});
