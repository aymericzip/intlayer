import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getVisualEditorData = (locale: LocalesValues): DocData => ({
  docName: 'intlayer_visual_editor',
  url: PagesRoutes.Doc_IntlayerVisualEditor,
  githubUrl: GithubRoutes.IntlayerVisualEditor,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-visual-editor-metadata', locale),
});
