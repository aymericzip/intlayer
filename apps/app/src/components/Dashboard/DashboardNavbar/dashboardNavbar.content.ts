import { type Dictionary, t } from 'intlayer';

const dashboardNavbar1Content = {
  key: 'dashboard-navbar1',
  content: {
    dashboard: t({
      en: 'Dashboard',
      fr: 'Tableau de bord',
      es: 'Tablero',
      'en-GB': 'Dashboard',
      de: 'Dashboard',
      ja: 'ダッシュボード',
      ko: '대시보드',
      zh: '仪表板',
      it: 'Dashboard',
      pt: 'Painel',
      hi: 'डैशबोर्ड',
      ar: 'لوحة القيادة',
      ru: 'Панель управления',
      tr: 'Panel',
      pl: 'Panel',
      id: 'Panel Instrumen',
      vi: 'Bảng điều khiển',
      uk: 'Панель приладів',
    }),

    organizationAndProject: t({
      en: 'Organization and project',
      fr: 'Organisation et projet',
      es: 'Organización y proyecto',
      'en-GB': 'Organization and project',
      de: 'Organisation und Projekt',
      ja: '組織とプロジェクト',
      ko: '조직 및 프로젝트',
      zh: '组织和项目',
      it: 'Organizzazione e progetto',
      pt: 'Organização e projeto',
      hi: 'संगठन और परियोजना',
      ar: 'المنظمة والمشروع',
      ru: 'Организация и проект',
      tr: 'Organizasyon ve proje',
      pl: 'Organizacja i projekt',
      id: 'Organisasi dan proyek',
      vi: 'Tổ chức và dự án',
      uk: 'Організація та проєкт',
    }),
  },
  title: 'Dashboard Navbar 1',
  description:
    'Content for the dashboard navbar, including the dashboard link and organization/project labels.',
  tags: ['dashboard', 'navbar', 'navigation'],
} satisfies Dictionary;

export default dashboardNavbar1Content;
