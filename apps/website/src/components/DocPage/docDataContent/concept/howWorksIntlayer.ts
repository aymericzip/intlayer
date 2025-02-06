import { Locales, getIntlayer } from 'intlayer';
import { DocData } from '../../types';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getHowWorksIntlayerData = (locale: Locales): DocData => ({
  docName: 'how_works_intlayer',
  url: PagesRoutes.Doc_HowWorksIntlayer,
  githubUrl: GithubRoutes.HowWorksIntlayer,
  createdAt: new Date('2024-08-12'),
  updatedAt: new Date('2024-08-12'),
  ...getIntlayer('doc-how-works-intlayer-metadata', locale),
});
