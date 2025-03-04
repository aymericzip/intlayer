import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationConditionData = (
  locale: Locales
): DocData => ({
  docName: 'dictionary__condition',
  url: PagesRoutes.Doc_Dictionary_Condition,
  githubUrl: GithubRoutes.Dictionary_Condition,
  createdAt: new Date('2025-02-7'),
  updatedAt: new Date('2025-02-7'),
  ...getIntlayer('doc-dictionary-condition-metadata', locale),
});
