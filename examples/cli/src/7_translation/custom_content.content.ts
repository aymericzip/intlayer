import { t, type DeclarationContent } from 'intlayer';

interface ICustomContent {
  title: string;
  content: string;
}

const customContent: DeclarationContent = {
  key: 'custom_content',
  content: {
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
  },
} satisfies DeclarationContent;

export default customContent;
