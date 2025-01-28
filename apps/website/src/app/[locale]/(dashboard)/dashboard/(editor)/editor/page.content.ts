import { t, type DeclarationContent } from 'intlayer';

const profileDashboardContent = {
  key: 'editor-dashboard-page',
  content: {
    title: t({
      en: 'Intlayer Editor',
      'en-GB': 'Intlayer Editor',
      fr: 'Éditeur Intlayer',
      es: 'Editor de Intlayer',
      de: 'Intlayer-Editor',
      ja: 'Intlayer エディタ',
      ko: 'Intlayer 편집기',
      zh: 'Intlayer 编辑器',
      it: 'Editor Intlayer',
      pt: 'Editor do Intlayer',
      hi: 'Intlayer एडिटर',
      ar: 'محرر Intlayer',
      ru: 'Редактор Intlayer',
    }),
  },
} satisfies DeclarationContent;

export default profileDashboardContent;
