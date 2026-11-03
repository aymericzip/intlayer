import { type Dictionary, t } from 'intlayer';

const dashboardMetadataContent = {
  key: 'dashboard-metadata',
  content: {
    metadata: {
      description: t({
        en: 'Manage your projects and dictionaries in the Intlayer dashboard.',
        ar: 'قم بإدارة مشاريعك وقواميسك في لوحة تحكم Intlayer.',
        de: 'Verwalten Sie Ihre Projekte und Wörterbücher im Intlayer-Dashboard.',
        'en-GB':
          'Manage your projects and dictionaries in the Intlayer dashboard.',
        es: 'Administra tus proyectos y diccionarios en el panel de control de Intlayer.',
        fr: 'Gérez vos projets et dictionnaires dans le tableau de bord Intlayer.',
        'he-IL': 'נהלו את הפרויקטים והמילונים שלכם בלוח הבקרה של Intlayer.',
        hi: 'Intlayer डैशボード में अपने प्रोजेक्ट और शब्दकोशों को प्रबंधित करें।',
        id: 'Kelola proyek dan kamus Anda di dashboard Intlayer.',
        it: 'Gestisci i tuoi progetti e dizionari nel dashboard di Intlayer.',
        ja: 'Intlayerダッシュボードでプロジェクトと辞書を管理します。',
        ko: 'Intlayer 대시보드에서 프로젝트와 사전을 관리하세요.',
        pl: 'Zarządzaj swoimi projektami i słownikami w panelu Intlayer.',
        pt: 'Gerencie seus projetos e dicionários no painel do Intlayer.',
        ru: 'Управляйте своими проектами и словарями в панели управления Intlayer.',
        tr: 'Intlayer kontrol panelinde projelerinizi ve sözlüklerinizi yönetin.',
        uk: 'Керуйте своїми проектами та словниками на панелі керування Intlayer.',
        vi: 'Quản lý các dự án và từ điển của bạn trên Dashboard Intlayer.',
        zh: '在Intlayer仪表板中管理您的项目和字典。',
      }),
      keywords: t({
        en: [
          'Intlayer',
          'Dashboard',
          'Localization',
          'Internationalization',
          'i18n',
          'CMS',
        ],

        ar: ['Intlayer', 'لوحة التحكم', 'الترجمة', 'التدويل', 'i18n', 'CMS'],
        de: [
          'Intlayer',
          'Dashboard',
          'Lokalisierung',
          'Internationalisierung',
          'i18n',
          'CMS',
        ],

        'en-GB': [
          'Intlayer',
          'Dashboard',
          'Localization',
          'Internationalization',
          'i18n',
          'CMS',
        ],
        es: [
          'Intlayer',
          'Panel de control',
          'Localización',
          'Internacionalización',
          'i18n',
          'CMS',
        ],

        fr: [
          'Intlayer',
          'Tableau de bord',
          'Localisation',
          'Internationalisation',
          'i18n',
          'CMS',
        ],

        'he-IL': ['Intlayer', 'לוח בקרה', 'לוקליזציה', 'בינאום', 'i18n', 'CMS'],

        hi: ['Intlayer', 'डैशबोर्ड', 'स्थानीयकरण', 'अंतर्राष्ट्रीयकरण', 'i18n', 'CMS'],
        id: [
          'Intlayer',
          'Dashboard',
          'Lokalisasi',
          'Internasionalisasi',
          'i18n',
          'CMS',
        ],

        it: [
          'Intlayer',
          'Cruscotto',
          'Localizzazione',
          'Internazionalizzazione',
          'i18n',
          'CMS',
        ],

        ja: [
          'Intlayer',
          'ダッシュボード',
          'ローカリゼーション',
          '国際化',
          'i18n',
          'CMS',
        ],

        ko: ['Intlayer', '대시보드', '현지화', '국제화', 'i18n', 'CMS'],
        pl: [
          'Intlayer',
          'Panel',
          'Lokalizacja',
          'Internacjonalizacja',
          'i18n',
          'CMS',
        ],

        pt: [
          'Intlayer',
          'Painel',
          'Localização',
          'Internacionalização',
          'i18n',
          'CMS',
        ],

        ru: [
          'Intlayer',
          'Приборная панель',
          'Локализация',
          'Интернационализация',
          'i18n',
          'CMS',
        ],

        tr: [
          'Intlayer',
          'Dashboard',
          'Yerelleştirme',
          'Uluslararasılaştırma',
          'i18n',
          'CMS',
        ],

        uk: [
          'Intlayer',
          'Панель керування',
          'Локалізація',
          'Інтернаціоналізація',
          'i18n',
          'CMS',
        ],

        vi: [
          'Intlayer',
          'Dashboard',
          'Bản địa hóa',
          'Quốc tế hóa',
          'i18n',
          'CMS',
        ],

        zh: ['Intlayer', '仪表板', '本地化', '国际化', 'i18n', 'CMS'],
      }),
      title: t({
        en: 'Dashboard | Intlayer',
        ar: 'لوحة التحكم | Intlayer',
        de: 'Dashboard | Intlayer',
        'en-GB': 'Dashboard | Intlayer',
        es: 'Panel de control | Intlayer',
        fr: 'Tableau de bord | Intlayer',
        'he-IL': 'לוח בקרה | Intlayer',
        hi: 'डैशबोर्ड | Intlayer',
        id: 'Dashboard | Intlayer',
        it: 'Cruscotto | Intlayer',
        ja: 'ダッシュボード | Intlayer',
        ko: '대시보드 | Intlayer',
        pl: 'Panel | Intlayer',
        pt: 'Painel | Intlayer',
        ru: 'Приборная панель | Intlayer',
        tr: 'Dashboard | Intlayer',
        uk: 'Панель керування | Intlayer',
        vi: 'Dashboard | Intlayer',
        zh: '仪表板 | Intlayer',
      }),
    },
  },
  title: 'Dashboard metadata',
  description: 'Metadata for the dashboard pages',
  tags: ['dashboard', 'metadata'],
} satisfies Dictionary;

export default dashboardMetadataContent;
