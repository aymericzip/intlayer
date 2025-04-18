import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getCMSData = (locale: LocalesValues): DocData => ({
  docName: 'intlayer_CMS',
  url: PagesRoutes.Doc_IntlayerCMS,
  githubUrl: GithubRoutes.IntlayerCMS,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-cms-metadata', locale),
});
