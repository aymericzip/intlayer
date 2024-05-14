import { type DeclarationContent, t } from 'intlayer';
import { PagesRoutes } from '@/Routes';

// type SectionsContent = {
//   sections: NavSection[];
//   bottomSections: NavSection[];
//   logo: {
//     label: string;
//     onClick: () => void;
//   };
//   profile: {
//     label: string;
//   };
//   login: {
//     text: string;
//     label: string;
//     onClick: () => void;
//   };
// };

export const navbarContent: DeclarationContent = {
  id: 'navbar',
  logo: {
    label: t({
      en: 'Company logo - Go to home page',
      fr: "Logo de l'entreprise - Aller à la page d’accueil",
      es: 'Logotipo de la empresa - Ir a la página de inicio',
    }),
  },
  sections: [
    {
      id: 'home',
      title: t({
        en: 'Home',
        fr: 'Accueil',
        es: 'Inicio',
      }),
      url: PagesRoutes.Home,
      label: t({
        en: 'Go to home page',
        fr: 'Aller à la page d’accueil',
        es: 'Ir a la página de inicio',
      }),
    },
    {
      id: 'demo',
      title: t({
        en: 'Demo',
        fr: 'Démo',
        es: 'Demo',
      }),
      url: PagesRoutes.Demo,
      label: t({
        en: 'Go to demo page',
        fr: 'Aller à la page de démo',
        es: 'Ir a la página de demostración',
      }),
    },
  ],
  // bottomSections: {
  //   logout: {
  //     id: 'logout',
  //     url: '/auth/signout',
  //     title: t({
  //       en: 'Logout',
  //       fr: 'Déconnexion',
  //       es: 'Cerrar sesión',
  //     }),
  //     label: t({
  //       en: 'Logout',
  //       fr: 'Se déconnecter',
  //       es: 'Cerrar sesión',
  //     }),
  //   },
  //   login: {
  //     id: 'login',
  //     url: '/auth/signin',
  //     title: t({
  //       en: 'Login',
  //       fr: 'Connexion',
  //       es: 'Iniciar sesión',
  //     }),
  //     label: t({
  //       en: 'Go to login page',
  //       fr: 'Aller à la page de connexion',
  //       es: 'Ir a la página de inicio de sesión',
  //     }),
  //   },
  // },
  // profile: {
  //   label: t({
  //     en: 'Manage profile',
  //     fr: 'Gérer le profil',
  //     es: 'Administrar perfil',
  //   }),
  // },
  // login: {
  //   text: t({
  //     en: 'Login',
  //     fr: 'Connexion',
  //     es: 'Iniciar sesión',
  //   }),
  //   label: t({
  //     en: 'Login to app',
  //     fr: "Connexion à l'application",
  //     es: 'Iniciar sesión en la aplicación',
  //   }),
  // },
};
