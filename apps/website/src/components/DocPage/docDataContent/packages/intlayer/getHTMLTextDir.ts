import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerGetHTMLTextDirData = (
  locale: Locales
): DocData => ({
  docName: 'package__intlayer__getHTMLTextDir',
  url: PagesRoutes['Doc_Packages_intlayer_getHTMLTextDir'],
  githubUrl: GithubRoutes['Packages_intlayer_getHTMLTextDir'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getHTMLTextDir-intlayer-metadata', locale),
});
