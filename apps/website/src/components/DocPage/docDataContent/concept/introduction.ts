import { GithubRoutes, PagesRoutes } from '@/Routes';
import { LocalesValues, getIntlayer } from 'intlayer';
import type { DocData } from '../../types';

export const getIntroductionData = (locale: LocalesValues): DocData => ({
  docName: 'introduction',
  url: PagesRoutes.Doc,
  githubUrl: GithubRoutes.Introduction,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-introduction-metadata', locale),
});
