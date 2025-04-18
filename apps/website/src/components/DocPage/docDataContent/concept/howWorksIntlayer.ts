import { GithubRoutes, PagesRoutes } from '@/Routes';
import { getIntlayer, LocalesValues } from 'intlayer';
import type { DocData } from '../../types';

export const getHowWorksIntlayerData = (locale: LocalesValues): DocData => ({
  docName: 'how_works_intlayer',
  url: PagesRoutes.Doc_HowWorksIntlayer,
  githubUrl: GithubRoutes.HowWorksIntlayer,
  createdAt: new Date('2024-08-12'),
  updatedAt: new Date('2024-08-12'),
  ...getIntlayer('doc-how-works-intlayer-metadata', locale),
});
