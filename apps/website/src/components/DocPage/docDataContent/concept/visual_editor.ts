import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getVisualEditorData = (locale: Locales): DocData => ({
  docName: 'intlayer_visual_editor',
  url: PagesRoutes.Doc_IntlayerVisualEditor,
  githubUrl: GithubRoutes.IntlayerVisualEditor,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-visual-editor-metadata', locale),
});
