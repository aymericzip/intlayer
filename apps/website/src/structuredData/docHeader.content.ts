import { t, type DeclarationContent } from 'intlayer';

export default {
  key: 'creative-work-structured-data',
  content: {
    audienceType: t({
      en: 'Developers, Content Managers',
      fr: 'Développeurs, Responsables de contenu',
      es: 'Desarrolladores, Gestores de Contenido',
    }),
  },
} satisfies DeclarationContent;
