import { t, type DeclarationContent } from 'intlayer';

const profileDashboardContent = {
  key: 'organization-dashboard-page',
  content: {
    title: t({
      en: 'Organization settings',
      fr: "Paramètres de l'organisation",
      es: 'Configuración de la organización',
    }),
  },
} satisfies DeclarationContent;

export default profileDashboardContent;
