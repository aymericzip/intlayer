import { t, type Dictionary } from 'intlayer';

const dashboardContent = {
  key: 'dashboard-page',
  content: {
    title: t({
      en: 'Dashboard',
      'en-GB': 'Dashboard',
      fr: 'Tableau de bord',
      es: 'Tablero',
      de: 'Armaturenbrett',
      ja: 'ダッシュボード',
      ko: '대시보드',
      zh: '仪表板',
      it: 'Cruscotto',
      pt: 'Painel',
      hi: 'डैशबोर्ड',
      ar: 'لوحة التحكم',
      ru: 'Панель управления',
      tr: 'Dashboard',
    }),
  },
} satisfies Dictionary;

export default dashboardContent;
