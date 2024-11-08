import { t, type DeclarationContent } from 'intlayer';

const contentDashboardContent = {
  key: 'dictionary-dashboard-page',
  content: {
    title: t({
      en: 'Edit dictionary',
      fr: 'Modifier le dictionnaire',
      es: 'Editar diccionario',
    }),
  },
} satisfies DeclarationContent;

export default contentDashboardContent;
