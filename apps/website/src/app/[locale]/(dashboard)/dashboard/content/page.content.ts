import { t, type DeclarationContent } from 'intlayer';

const contentDashboardContent = {
  key: 'content-dashboard-page',
  content: {
    title: t({
      en: 'Content management',
      'en-GB': 'Content management',
      fr: 'Gestion de contenu',
      es: 'Gestión de contenido',
      de: 'Inhaltsverwaltung',
      ja: 'コンテンツ管理',
      ko: '콘텐츠 관리',
      zh: '内容管理',
      it: 'Gestione dei contenuti',
      pt: 'Gestão de conteúdo',
      hi: 'सामग्री प्रबंधन',
      ar: 'إدارة المحتوى',
      ru: 'Управление контентом',
    }),
  },
} satisfies DeclarationContent;

export default contentDashboardContent;
