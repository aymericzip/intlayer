import { type Locales, getIntlayer } from 'intlayer';
import type { DocData } from '../../types';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getRoadmapData = (locale: Locales): DocData => ({
  docName: 'roadmap',
  url: PagesRoutes.Doc_Roadmap,
  githubUrl: GithubRoutes.Roadmap,
  createdAt: new Date('2025-03-01'),
  updatedAt: new Date('2025-03-01'),
  ...getIntlayer('doc-roadmap-metadata', locale),
});
