import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getContentDeclarationEnumerationData = (
  locale: LocalesValues
): DocData => ({
  docName: 'dictionary__enumeration',
  url: PagesRoutes.Doc_Dictionary_Enumeration,
  githubUrl: GithubRoutes.Dictionary_Enumeration,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-dictionary-enumeration-metadata', locale),
});
