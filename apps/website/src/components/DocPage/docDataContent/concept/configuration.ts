import { GithubRoutes, PagesRoutes } from '@/Routes';
import { getIntlayer, LocalesValues } from 'intlayer';
import type { DocData } from '../../types';

export const getConfigurationData = (locale: LocalesValues): DocData => ({
  docName: 'configuration',
  url: PagesRoutes.Doc_Configuration,
  githubUrl: GithubRoutes.Configuration,
  createdAt: new Date('2024-08-13'),
  updatedAt: new Date('2024-08-13'),
  ...getIntlayer('doc-configuration-metadata', locale),
});
