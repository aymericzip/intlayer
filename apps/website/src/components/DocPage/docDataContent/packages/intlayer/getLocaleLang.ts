import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesIntlayerGetLocaleLangData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__intlayer__getLocaleLang',
  url: PagesRoutes['Doc_Packages_intlayer_getLocaleLang'],
  githubUrl: GithubRoutes['Packages_intlayer_getLocaleLang'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getLocaleLang-intlayer-metadata', locale),
});
