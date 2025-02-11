import { type Locales, getIntlayer } from 'intlayer';
import type { DocData } from '../../types';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getIntroductionData = (locale: Locales): DocData => ({
  docName: 'introduction',
  url: PagesRoutes.Doc,
  githubUrl: GithubRoutes.Introduction,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-introduction-metadata', locale),
});
