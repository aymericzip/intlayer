import { t, type DeclarationContent } from 'intlayer';

const profileDashboardContent = {
  key: 'profile-dashboard-page',
  content: {
    title: t({
      en: 'Profile settings',
      fr: 'Paramètres de profil',
      es: 'Configuración de perfil',
    }),
  },
} satisfies DeclarationContent;

export default profileDashboardContent;
