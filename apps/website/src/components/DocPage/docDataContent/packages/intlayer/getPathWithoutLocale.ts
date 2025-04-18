import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesIntlayerGetPathWithoutLocaleData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__intlayer__getPathWithoutLocale',
  url: PagesRoutes['Doc_Packages_intlayer_getPathWithoutLocale'],
  githubUrl: GithubRoutes['Packages_intlayer_getPathWithoutLocale'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getPathWithoutLocale-intlayer-metadata', locale),
});
