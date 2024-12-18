import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerGetLocaleLangData = (
  locale: Locales
): DocData => ({
  docName: 'package__intlayer__getLocaleLang',
  url: PagesRoutes['Doc_Packages_intlayer_getLocaleLang'],
  githubUrl: GithubRoutes['Packages_intlayer_getLocaleLang'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getLocaleLang-intlayer-metadata', locale),
});
