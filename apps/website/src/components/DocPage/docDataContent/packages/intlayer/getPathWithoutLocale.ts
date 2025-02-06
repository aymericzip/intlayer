import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerGetPathWithoutLocaleData = (
  locale: Locales
): DocData => ({
  docName: 'package__intlayer__getPathWithoutLocale',
  url: PagesRoutes['Doc_Packages_intlayer_getPathWithoutLocale'],
  githubUrl: GithubRoutes['Packages_intlayer_getPathWithoutLocale'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getPathWithoutLocale-intlayer-metadata', locale),
});
