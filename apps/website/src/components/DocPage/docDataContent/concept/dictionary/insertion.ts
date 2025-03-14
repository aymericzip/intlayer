import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationInsertionData = (
  locale: Locales
): DocData => ({
  docName: 'dictionary__insertion',
  url: PagesRoutes.Doc_Dictionary_Insertion,
  githubUrl: GithubRoutes.Dictionary_Insertion,
  createdAt: new Date('2025-03-13'),
  updatedAt: new Date('2025-03-13'),
  ...getIntlayer('doc-dictionary-insertion-metadata', locale),
});
