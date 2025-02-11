import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationTranslationData = (
  locale: Locales
): DocData => ({
  docName: 'dictionary__translation',
  url: PagesRoutes.Doc_Dictionary_Translation,
  githubUrl: GithubRoutes.Dictionary_Translation,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-dictionary-translation-metadata', locale),
});
