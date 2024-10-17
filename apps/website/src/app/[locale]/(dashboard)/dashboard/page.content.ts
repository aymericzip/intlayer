import { t, type DeclarationContent } from 'intlayer';

const dashboardContent = {
  key: 'dashboard-page',
  content: {
    title: t({
      en: 'Dashboard',
      fr: 'Se connecter',
      es: 'Iniciar sesión',
    }),
  },
} satisfies DeclarationContent;

export default dashboardContent;
