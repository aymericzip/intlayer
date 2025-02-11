import { type Locales, getIntlayer } from 'intlayer';
import type { DocData } from '../../types';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getConfigurationData = (locale: Locales): DocData => ({
  docName: 'configuration',
  url: PagesRoutes.Doc_Configuration,
  githubUrl: GithubRoutes.Configuration,
  createdAt: new Date('2024-08-13'),
  updatedAt: new Date('2024-08-13'),
  ...getIntlayer('doc-configuration-metadata', locale),
});
