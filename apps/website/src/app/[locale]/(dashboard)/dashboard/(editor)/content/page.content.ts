import { type Dictionary, t } from 'intlayer';

const contentDashboardContent = {
  key: 'content-dashboard-page',
  content: {
    title: t({
      ar: 'إدارة المحتوى',
      de: 'Inhaltsverwaltung',
      en: 'Content management',
      'en-GB': 'Content management',
      es: 'Gestión de contenido',
      fr: 'Gestion de contenu',
      hi: 'सामग्री प्रबंधन',
      it: 'Gestione dei contenuti',
      ja: 'コンテンツ管理',
      ko: '콘텐츠 관리',
      pt: 'Gestão de conteúdo',
      ru: 'Управление контентом',
      tr: 'İçerik yönetimi',
      zh: '内容管理',
      pl: 'Zarządzanie treścią',
    }),
  },
  title: 'Content dashboard page',
  description:
    'Content declaration for the content dashboard page within the CMS. It manages titles and labels used by the editor to handle multilingual content.',
  tags: ['cms', 'dashboard', 'content management'],
} satisfies Dictionary;

export default contentDashboardContent;
