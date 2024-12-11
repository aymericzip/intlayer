import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { DocData } from '../../types';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getIntroductionData = (locale: Locales): DocData => ({
  docName: 'introduction',
  url: PagesRoutes.Doc_GetStarted,
  githubUrl: GithubRoutes.Introduction,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-introduction-metadata', locale),
});
