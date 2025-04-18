import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesLynxIntlayerData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__lynx-intlayer',
  url: PagesRoutes['Doc_Packages_lynx-intlayer'],
  githubUrl: GithubRoutes['Packages_lynx-intlayer'],
  createdAt: new Date('2025-03-13'),
  updatedAt: new Date('2025-03-13'),
  ...getIntlayer('doc-lynx-intlayer-metadata', locale),
});
