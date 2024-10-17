import type { DashboardFooterProps } from '@components/Dashboard/DashboardFooter';
import type { NavbarProps } from '@components/Dashboard/DashboardNavbar/DashboardNavbar';
import { type DeclarationContent, t } from 'intlayer';
import { PagesRoutes } from '@/Routes';

type Content = {
  navbarLinks: NavbarProps['links'];
  footerLinks: DashboardFooterProps['links'];
};

const dashboardNavbarContent = {
  key: 'dashboard-navbar-content',
  content: {
    navbarLinks: [
      {
        url: PagesRoutes.Dashboard_Content,
        label: t({
          en: 'Go to content dashboard',
          fr: 'Aller sur le tableau de bord de contenu',
          es: 'Ir al tablero de contenido',
        }),
        title: t({
          en: 'Content',
          fr: 'Contenu',
          es: 'Contenido',
        }),
      },
      {
        url: PagesRoutes.Dashboard_Projects,
        label: t({
          en: 'Go to projects dashboard',
          fr: 'Aller sur le tableau de bord des projets',
          es: 'Ir al tablero de proyectos',
        }),
        title: t({
          en: 'Projects',
          fr: 'Projets',
          es: 'Proyectos',
        }),
      },
      {
        url: PagesRoutes.Dashboard_Organization,
        label: t({
          en: 'Go to organization dashboard',
          fr: 'Aller sur le tableau de bord de l’organisation',
          es: 'Ir al tablero de organización',
        }),
        title: t({
          en: 'Organization',
          fr: 'Organisation',
          es: 'Organización',
        }),
      },
      {
        url: PagesRoutes.Dashboard_Profile,
        label: t({
          en: 'Go to profile dashboard',
          fr: 'Aller sur le tableau de bord du profil',
          es: 'Ir al tablero de perfil',
        }),
        title: t({
          en: 'Profile',
          fr: 'Profil',
          es: 'Perfil',
        }),
      },
    ],
    footerLinks: [
      {
        href: PagesRoutes.Home,
        label: t({
          en: 'Go to home page',
          fr: 'Aller sur la page d’accueil',
          es: 'Ir a la página de inicio',
        }),
        text: t({
          en: 'Home',
          fr: 'Accueil',
          es: 'Inicio',
        }),
      },
      {
        href: PagesRoutes.Doc,
        label: t({
          en: 'Go to the documentation page',
          fr: 'Aller sur la page de documentation',
          es: 'Ir a la página de documentación',
        }),
        text: t({
          en: 'Documentation',
          fr: 'Documentation',
          es: 'Documentación',
        }),
      },
      {
        href: PagesRoutes.PrivacyPolicy,
        label: t({
          en: 'Go to the privacy notice page',
          fr: 'Aller sur la page de mention de confidentialité',
          es: 'Ir a la página de aviso de privacidad',
        }),
        text: t({
          en: 'Privacy Notice',
          fr: 'Mention de confidentialité',
          es: 'Aviso de privacidad',
        }),
      },
      {
        href: PagesRoutes.TermsOfService,
        label: t({
          en: 'Go to the terms of service page',
          fr: 'Aller sur la page des conditions d’utilisation',
          es: 'Ir a la página de términos de servicio',
        }),
        text: t({
          en: 'Terms of Service',
          fr: 'Conditions d’utilisation',
          es: 'Términos de servicio',
        }),
      },
    ],
  },
} satisfies DeclarationContent<Content>;

export default dashboardNavbarContent;
