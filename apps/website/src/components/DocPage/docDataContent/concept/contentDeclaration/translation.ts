import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationTranslationData = (
  locale: Locales
): DocData => ({
  docName: 'content_declaration__translation',
  url: PagesRoutes.Doc_ContentDeclaration_Translation,
  githubUrl: GithubRoutes.ContentDeclaration_Translation,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-content-declaration-translation-metadata', locale),
});
