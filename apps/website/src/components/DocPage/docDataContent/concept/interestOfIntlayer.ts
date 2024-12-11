import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { DocData } from '../../types';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getInterestOfIntlayerData = (locale: Locales): DocData => ({
  docName: 'interest_of_intlayer',
  url: PagesRoutes.Doc_Interest,
  githubUrl: GithubRoutes.InterestOfIntlayer,
  createdAt: new Date('2024-08-14'),
  updatedAt: new Date('2024-08-14'),
  ...getIntlayer('doc-interest-of-intlayer-metadata', locale),
});
