import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesIntlayerGetHTMLTextDirData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__intlayer__getHTMLTextDir',
  url: PagesRoutes['Doc_Packages_intlayer_getHTMLTextDir'],
  githubUrl: GithubRoutes['Packages_intlayer_getHTMLTextDir'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getHTMLTextDir-intlayer-metadata', locale),
});
