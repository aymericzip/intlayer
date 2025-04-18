import { GithubRoutes, PagesRoutes } from '@/Routes';
import { getIntlayer, LocalesValues } from 'intlayer';
import type { DocData } from '../types';

export const getVSCodeExtensionData = (locale: LocalesValues): DocData => ({
  docName: 'vscode_extension',
  url: PagesRoutes.VS_Code_Extension,
  githubUrl: GithubRoutes['VS_Code_extension_intlayer'],
  createdAt: new Date('2025-03-17'),
  updatedAt: new Date('2025-03-17'),
  ...getIntlayer('doc-vscode-extension-metadata', locale),
});
