import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getEditorData = (locale: Locales): DocData => ({
  docName: 'intlayer_editor',
  url: PagesRoutes.Doc_IntlayerEditor,
  githubUrl: GithubRoutes.IntlayerEditor,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-editor-metadata', locale),
});
