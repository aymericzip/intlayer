import { type Dictionary, t } from 'intlayer';

const dashboardContent = {
  key: 'dashboard-page',
  content: {
    title: t({
      ar: 'لوحة التحكم',
      de: 'Armaturenbrett',
      en: 'Dashboard',
      'en-GB': 'Dashboard',
      es: 'Tablero',
      fr: 'Tableau de bord',
      hi: 'डैशबोर्ड',
      it: 'Cruscotto',
      ja: 'ダッシュボード',
      ko: '대시보드',
      pt: 'Painel',
      ru: 'Панель управления',
      tr: 'Dashboard',
      zh: '仪表板',
      pl: 'Panel',
    }),
  },
  title: 'Dashboard page',
  description:
    'Content declaration for the dashboard page of the application. It serves as the main control panel for users to access key CMS features and data.',
  tags: ['dashboard', 'cms page'],
} satisfies Dictionary;

export default dashboardContent;
