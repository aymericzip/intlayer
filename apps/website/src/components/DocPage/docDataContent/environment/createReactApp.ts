import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getEnvironmentCreateReactAppData = (locale: Locales): DocData => ({
  docName: 'intlayer_with_create_react_app',
  url: PagesRoutes.Doc_Environment_CRA,
  githubUrl: GithubRoutes.IntlayerWithReactCRA,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-intlayer-with-create-react-app-metadata', locale),
});
