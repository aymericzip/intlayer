import type { NavbarProps } from '@components/Dashboard/DashboardNavbar/DashboardNavbar';
import { type DeclarationContent, t } from 'intlayer';
import { PagesRoutes } from '@/Routes';

type Content = {
  links: NavbarProps['links'];
};

const dashboardNavbarContent: DeclarationContent<Content> = {
  id: 'dashboard-navbar-content',
  links: [
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
};

export default dashboardNavbarContent;
