import { t, type DeclarationContent } from 'intlayer';

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
    }),
  },
} satisfies DeclarationContent;
