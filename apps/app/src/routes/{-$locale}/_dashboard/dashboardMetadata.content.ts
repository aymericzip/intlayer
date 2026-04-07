import { type Dictionary, t } from 'intlayer';

const dashboardMetadataContent = {
  key: 'dashboard-metadata',
  content: {
    metadata: {
      title: t({
        en: 'Dashboard | Intlayer',
        'en-GB': 'Dashboard | Intlayer',
        fr: 'Tableau de bord | Intlayer',
        es: 'Panel de control | Intlayer',
        de: 'Dashboard | Intlayer',
        ja: 'ダッシュボード | Intlayer',
        ko: '대시보드 | Intlayer',
        zh: '仪表板 | Intlayer',
        it: 'Cruscotto | Intlayer',
        pt: 'Painel | Intlayer',
        hi: 'डैशबोर्ड | Intlayer',
        ar: 'لوحة التحكم | Intlayer',
        ru: 'Приборная панель | Intlayer',
        tr: 'Dashboard | Intlayer',
        pl: 'Panel | Intlayer',
        id: 'Dashboard | Intlayer',
        vi: 'Dashboard | Intlayer',
        uk: 'Панель керування | Intlayer',
      }),
      description: t({
        en: 'Manage your projects and dictionaries in the Intlayer dashboard.',
        'en-GB': 'Manage your projects and dictionaries in the Intlayer dashboard.',
        fr: 'Gérez vos projets et dictionnaires dans le tableau de bord Intlayer.',
        es: 'Administra tus proyectos y diccionarios en el panel de control de Intlayer.',
        de: 'Verwalten Sie Ihre Projekte und Wörterbücher im Intlayer-Dashboard.',
        ja: 'Intlayerダッシュボードでプロジェクトと辞書を管理します。',
        ko: 'Intlayer 대시보드에서 프로젝트와 사전을 관리하세요.',
        zh: '在Intlayer仪表板中管理您的项目和字典。',
        it: 'Gestisci i tuoi progetti e dizionari nel dashboard di Intlayer.',
        pt: 'Gerencie seus projetos e dicionários no painel do Intlayer.',
        hi: 'Intlayer डैशボード में अपने प्रोजेक्ट और शब्दकोशों को प्रबंधित करें।',
        ar: 'قم بإدارة مشاريعك وقواميسك في لوحة تحكم Intlayer.',
        ru: 'Управляйте своими проектами и словарями в панели управления Intlayer.',
        tr: 'Intlayer kontrol panelinde projelerinizi ve sözlüklerinizi yönetin.',
        pl: 'Zarządzaj swoimi projektami i słownikami w panelu Intlayer.',
        id: 'Kelola proyek dan kamus Anda di dashboard Intlayer.',
        vi: 'Quản lý các dự án và từ điển của bạn trên Dashboard Intlayer.',
        uk: 'Керуйте своїми проектами та словниками на панелі керування Intlayer.',
      }),
    },
  },
  title: 'Dashboard metadata',
  description: 'Metadata for the dashboard pages',
  tags: ['dashboard', 'metadata'],
} satisfies Dictionary;

export default dashboardMetadataContent;
