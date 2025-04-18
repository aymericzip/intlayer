import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getContentDeclarationInsertionData = (
  locale: LocalesValues
): DocData => ({
  docName: 'dictionary__insertion',
  url: PagesRoutes.Doc_Dictionary_Insertion,
  githubUrl: GithubRoutes.Dictionary_Insertion,
  createdAt: new Date('2025-03-13'),
  updatedAt: new Date('2025-03-13'),
  ...getIntlayer('doc-dictionary-insertion-metadata', locale),
});
