import { type Dictionary, t } from 'intlayer';

export default {
  key: 'creative-work-structured-data',
  content: {
    audienceType: t({
      en: 'Developers, Content Managers',
      'en-GB': 'Developers, Content Managers',
      fr: 'Développeurs, Responsables de contenu',
      es: 'Desarrolladores, Gestores de Contenido',
      de: 'Entwickler, Inhaltsmanager',
      ja: '開発者、コンテンツマネージャー',
      ko: '개발자, 콘텐츠 관리자',
      zh: '开发者，内容经理',
      it: 'Sviluppatori, Manager dei contenuti',
      pt: 'Desenvolvedores, Gerentes de Conteúdo',
      hi: 'डेवलपर्स, सामग्री प्रबंधक',
      ar: 'المطورون ومديرو المحتوى',
      ru: 'Разработчики, менеджеры контента',
      tr: 'Geliştiriciler, İçerik Yöneticileri',
      pl: 'Programiści, Menedżerowie treści',
      id: 'Pengembang, Manajer Konten',
      vi: 'Nhà phát triển (Developers), Quản trị nội dung (Content Managers)',
      uk: 'Розробники, контент-менеджери',
    }),
  },
  title: 'Creative work structured data',
  description:
    'Structured data declaration for creative works. This dictionary defines metadata intended to improve SEO and content discoverability across search engines by identifying content type and audience targeting developers and content managers.',
  tags: ['structured data', 'SEO', 'creative work'],
} satisfies Dictionary;
