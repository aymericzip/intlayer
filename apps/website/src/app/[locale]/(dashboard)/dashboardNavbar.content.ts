import type { DashboardFooterProps } from '@components/Dashboard/DashboardFooter';
import type { NavbarProps } from '@components/Dashboard/DashboardNavbar/DashboardNavbar';
import { type DeclarationContent, t } from 'intlayer';
import { PagesRoutes } from '@/Routes';

type Content = {
  navbarLinks: NavbarProps['links'];
  footerLinks: DashboardFooterProps['links'];
};

const dashboardNavbarContent: DeclarationContent<Content> = {
  id: 'dashboard-navbar-content',
  navbarLinks: [
    {
      url: PagesRoutes.Dashboard_Content,
      label: t({
        en: 'Go to content dashboard',
        fr: '',
        es: '',
      }),
      title: t({
        en: 'Content',
        fr: '',
        es: '',
      }),
    },
    {
      url: PagesRoutes.Dashboard_Projects,
      label: t({
        en: 'Go to projects dashboard',
        fr: '',
        es: '',
      }),
      title: t({
        en: 'Projects',
        fr: '',
        es: '',
      }),
    },
    {
      url: PagesRoutes.Dashboard_Organization,
      label: t({
        en: 'Go to organization dashboard',
        fr: '',
        es: '',
      }),
      title: t({
        en: 'Organization',
        fr: '',
        es: '',
      }),
    },
    {
      url: PagesRoutes.Dashboard_Profile,
      label: t({
        en: 'Go to profile dashboard',
        fr: '',
        es: '',
      }),
      title: t({
        en: 'Profile',
        fr: '',
        es: '',
      }),
    },
  ],
  footerLinks: [
    {
      href: PagesRoutes.Home,
      label: t({
        en: 'Go to home page',
        fr: '',
        es: '',
      }),
      text: t({
        en: 'Home',
        fr: '',
        es: '',
      }),
    },
    {
      href: PagesRoutes.Doc,
      label: t({
        en: 'Go to the documentation page',
        fr: '',
        es: '',
      }),
      text: t({
        en: 'Documentation',
        fr: '',
        es: '',
      }),
    },
    {
      href: PagesRoutes.PrivacyPolicy,
      label: t({
        en: 'Go to the privacy notice page',
        fr: '',
        es: '',
      }),
      text: t({
        en: 'Privacy Notice',
        fr: '',
        es: '',
      }),
    },
    {
      href: PagesRoutes.TermsOfService,
      label: t({
        en: 'Go to the terms of service page',
        fr: '',
        es: '',
      }),
      text: t({
        en: 'Terms of Service',
        fr: '',
        es: '',
      }),
    },
  ],
};

export default dashboardNavbarContent;
