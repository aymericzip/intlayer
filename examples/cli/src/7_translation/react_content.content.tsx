import { t, type ContentModule } from 'intlayer';

const customContent: ContentModule = {
  id: 'react_content',
  profileText: t<JSX.Element>({
    en: <h1>Title of the page</h1>,
    fr: <h1>Titre de la page</h1>,
    es: <h1>Título de la página</h1>,
  }),
};

export default customContent;
