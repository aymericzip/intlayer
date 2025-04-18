import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getContentDeclarationFileData = (
  locale: LocalesValues
): DocData => ({
  docName: 'dictionary__file',
  url: PagesRoutes.Doc_Dictionary_File,
  githubUrl: GithubRoutes.Dictionary_File,
  createdAt: new Date('2025-03-13'),
  updatedAt: new Date('2025-03-13'),
  ...getIntlayer('doc-dictionary-file-metadata', locale),
});
