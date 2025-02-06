import { Locales, getIntlayer } from 'intlayer';
import { DocData } from '../../types';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getCliData = (locale: Locales): DocData => ({
  docName: 'intlayer_cli',
  url: PagesRoutes.Doc_CLI,
  githubUrl: GithubRoutes.IntlayerCLI,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-cli-metadata', locale),
});
