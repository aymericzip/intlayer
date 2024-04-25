import { t, type ContentModule } from 'intlayer';

interface ICustomContent {
  title: string;
  content: string;
}

const customContent: ContentModule = {
  id: 'custom_content',
  profileText: t<ICustomContent>({
    en: {
      title: 'Title of the page',
      content: 'Content of the page',
    },
    fr: {
      title: 'Titre de la page',
      content: 'Contenu de la page',
    },
    es: {
      title: 'Título de la página',
      content: 'Contenido de la página',
    },
  }),
};

export default customContent;
