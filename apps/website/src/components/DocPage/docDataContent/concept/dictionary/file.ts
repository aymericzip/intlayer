import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationFileData = (locale: Locales): DocData => ({
  docName: 'dictionary__file',
  url: PagesRoutes.Doc_Dictionary_File,
  githubUrl: GithubRoutes.Dictionary_File,
  createdAt: new Date('2025-03-13'),
  updatedAt: new Date('2025-03-13'),
  ...getIntlayer('doc-dictionary-file-metadata', locale),
});
