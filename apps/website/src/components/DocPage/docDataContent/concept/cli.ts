import { GithubRoutes, PagesRoutes } from '@/Routes';
import { getIntlayer, LocalesValues } from 'intlayer';
import type { DocData } from '../../types';

export const getCliData = (locale: LocalesValues): DocData => ({
  docName: 'intlayer_cli',
  url: PagesRoutes.Doc_CLI,
  githubUrl: GithubRoutes.IntlayerCLI,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-cli-metadata', locale),
});
