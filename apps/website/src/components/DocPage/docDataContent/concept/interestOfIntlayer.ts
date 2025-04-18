import { GithubRoutes, PagesRoutes } from '@/Routes';
import { getIntlayer, LocalesValues } from 'intlayer';
import type { DocData } from '../../types';

export const getInterestOfIntlayerData = (locale: LocalesValues): DocData => ({
  docName: 'interest_of_intlayer',
  url: PagesRoutes.Doc_Interest,
  githubUrl: GithubRoutes.InterestOfIntlayer,
  createdAt: new Date('2024-08-14'),
  updatedAt: new Date('2024-08-14'),
  ...getIntlayer('doc-interest-of-intlayer-metadata', locale),
});
