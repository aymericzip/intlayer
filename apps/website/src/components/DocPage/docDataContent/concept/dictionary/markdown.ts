import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationMarkdownData = (
  locale: Locales
): DocData => ({
  docName: 'dictionary__markdown',
  url: PagesRoutes.Doc_Dictionary_Markdown,
  githubUrl: GithubRoutes.Dictionary_Markdown,
  createdAt: new Date('2025-02-7'),
  updatedAt: new Date('2025-02-7'),
  ...getIntlayer('doc-dictionary-markdown-metadata', locale),
});
