import { t, type DeclarationContent } from 'intlayer';

const contentDashboardContent = {
  key: 'content-dashboard-page',
  content: {
    title: t({
      en: 'Content management',
      fr: 'Gestion de contenu',
      es: 'Gestión de contenido',
    }),
  },
} satisfies DeclarationContent;

export default contentDashboardContent;
