import { t, type DeclarationContent } from 'intlayer';

const contentDashboardContent = {
  key: 'dictionary-dashboard-page',
  content: {
    title: t({
      en: 'Content management - Edit dictionary',
      fr: 'Gestion de contenu - Modifier le dictionnaire',
      es: 'Gestión de contenido - Editar diccionario',
    }),
  },
} satisfies DeclarationContent;

export default contentDashboardContent;
