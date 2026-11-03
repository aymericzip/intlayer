import { type Dictionary, t } from 'intlayer';

export default {
  key: 'creative-work-structured-data',
  content: {
    audienceType: t({
      en: 'Developers, Content Managers',
      ar: 'المطورون ومديرو المحتوى',
      de: 'Entwickler, Inhaltsmanager',
      'en-GB': 'Developers, Content Managers',
      es: 'Desarrolladores, Gestores de Contenido',
      fr: 'Développeurs, Responsables de contenu',
      'he-IL': 'מפתחים, מנהלי תוכן',
      hi: 'डेवलपर्स, सामग्री प्रबंधक',
      id: 'Pengembang, Manajer Konten',
      it: 'Sviluppatori, Manager dei contenuti',
      ja: '開発者、コンテンツマネージャー',
      ko: '개발자, 콘텐츠 관리자',
      pl: 'Programiści, Menedżerowie treści',
      pt: 'Desenvolvedores, Gerentes de Conteúdo',
      ru: 'Разработчики, менеджеры контента',
      tr: 'Geliştiriciler, İçerik Yöneticileri',
      uk: 'Розробники, менеджери контенту',
      vi: 'Nhà phát triển (Developers), Quản trị nội dung (Content Managers)',
      zh: '开发者，内容经理',
    }),
  },
  title: 'Creative work structured data',
  description:
    'Structured data declaration for creative works. This dictionary defines metadata intended to improve SEO and content discoverability across search engines by identifying content type and audience targeting developers and content managers.',
  tags: ['structured data', 'SEO', 'creative work'],
} satisfies Dictionary;
