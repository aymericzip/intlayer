import { GithubRoutes, PagesRoutes } from '@/Routes';
import { getIntlayer, LocalesValues } from 'intlayer';
import type { DocData } from '../../types';

export const getRoadmapData = (locale: LocalesValues): DocData => ({
  docName: 'roadmap',
  url: PagesRoutes.Doc_Roadmap,
  githubUrl: GithubRoutes.Roadmap,
  createdAt: new Date('2025-03-01'),
  updatedAt: new Date('2025-03-01'),
  ...getIntlayer('doc-roadmap-metadata', locale),
});
