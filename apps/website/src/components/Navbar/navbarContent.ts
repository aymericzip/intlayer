import type { NavSection } from '@intlayer/design-system';
import { t } from 'intlayer';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { signOut } from 'next-auth/react';
import { PagesRoutes } from '@/Routes';

type SectionsContent = {
  sections: NavSection[];
  bottomSections: NavSection[];
  logo: {
    label: string;
    onClick: () => void;
  };
  profile: {
    label: string;
  };
  login: {
    text: string;
    label: string;
    onClick: () => void;
  };
};

export const getNavbarContent = (
  isLoggedIn: boolean,
  router: AppRouterInstance
): SectionsContent => ({
  logo: {
    label: t({
      en: 'Company logo - Go to home page',
      fr: "Logo de l'entreprise - Aller à la page d’accueil",
      es: 'Logotipo de la empresa - Ir a la página de inicio',
    }),
    onClick: () => router.push(PagesRoutes.Home),
  },
  sections: [
    {
      id: 'about',
      title: t({
        en: 'About',
        fr: 'A propos',
        es: 'Acerca de',
      }),
      url: PagesRoutes.Home,
      onClick: () => router.push(PagesRoutes.Home),
      label: t({
        en: 'Go to home',
        fr: 'Aller à la page d’accueil',
        es: 'Ir a la página de inicio',
      }),
    },

    {
      id: 'services',
      title: t({
        en: 'Services',
        fr: 'Services',
        es: 'Servicios',
      }),
      url: PagesRoutes.Home,
      onClick: () => router.push(PagesRoutes.Home),

      label: t({
        en: 'Go to services',
        fr: 'Aller à la page des services',
        es: 'Ir a la página de servicios',
      }),
    },

    {
      id: 'projects',
      title: t({
        en: 'Projects',
        fr: 'Projets',
        es: 'Proyectos',
      }),
      url: PagesRoutes.Home,
      onClick: () => router.push(PagesRoutes.Home),
      label: t({
        en: 'Go to projects',
        fr: 'Aller à la page des projets',
        es: 'Ir a la página de proyectos',
      }),
    },

    {
      id: 'contact',
      title: t({
        en: 'Contact',
        fr: 'Contact',
        es: 'Contacto',
      }),
      url: PagesRoutes.Home,
      onClick: () => router.push(PagesRoutes.Home),
      label: t({
        en: 'Go to contact',
        fr: 'Aller à la page de contact',
        es: 'Ir a la página de contacto',
      }),
    },
  ],
  bottomSections: [
    isLoggedIn
      ? {
          id: 'logout',
          title: t({
            en: 'Logout',
            fr: 'Déconnexion',
            es: 'Cerrar sesión',
          }),
          onClick: () => void signOut(),
          label: t({
            en: 'Logout',
            fr: 'Se déconnecter',
            es: 'Cerrar sesión',
          }),
        }
      : {
          id: 'login',
          url: '/auth/signin',
          title: t({
            en: 'Login',
            fr: 'Connexion',
            es: 'Iniciar sesión',
          }),
          onClick: () => router.push(PagesRoutes.LogIn),
          label: t({
            en: 'Go to login page',
            fr: 'Aller à la page de connexion',
            es: 'Ir a la página de inicio de sesión',
          }),
        },
  ],
  profile: {
    label: t({
      en: 'Manage profile',
      fr: 'Gérer le profil',
      es: 'Administrar perfil',
    }),
  },
  login: {
    text: t({
      en: 'Login',
      fr: 'Connexion',
      es: 'Iniciar sesión',
    }),
    label: t({
      en: 'Login to app',
      fr: "Connexion à l'application",
      es: 'Iniciar sesión en la aplicación',
    }),
    onClick: () => router.push(PagesRoutes.LogIn),
  },
});
