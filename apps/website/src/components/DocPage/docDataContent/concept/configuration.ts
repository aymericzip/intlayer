import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { DocData } from '../../types';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getConfigurationData = (locale: Locales): DocData => ({
  docName: 'configuration',
  url: PagesRoutes.Doc_CLI,
  githubUrl: GithubRoutes.IntlayerCLI,
  createdAt: new Date('2024-08-13'),
  updatedAt: new Date('2024-08-13'),
  ...getIntlayer('doc-configuration-metadata', locale),
});
