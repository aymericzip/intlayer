import { t, type DeclarationContent } from 'intlayer';

const projectDashboardContent = {
  key: 'projects-dashboard-page',
  content: {
    title: t({
      en: 'Projects settings',
      fr: 'Paramètres des projets',
      es: 'Configuración de proyectos',
    }),
  },
} satisfies DeclarationContent;

export default projectDashboardContent;
