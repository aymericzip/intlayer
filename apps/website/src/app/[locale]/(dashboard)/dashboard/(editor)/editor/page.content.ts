import { type Dictionary, t } from 'intlayer';

const profileDashboardContent = {
  key: 'editor-dashboard-page',
  content: {
    title: t({
      ar: 'محرر Intlayer',
      de: 'Intlayer-Editor',
      en: 'Intlayer Editor',
      'en-GB': 'Intlayer Editor',
      es: 'Editor de Intlayer',
      fr: 'Éditeur Intlayer',
      hi: 'Intlayer एडिटर',
      it: 'Editor Intlayer',
      ja: 'Intlayer エディタ',
      ko: 'Intlayer 편집기',
      pt: 'Editor do Intlayer',
      ru: 'Редактор Intlayer',
      tr: 'Intlayer Editör',
      zh: 'Intlayer 编辑器',
      pl: 'Edytor Intlayera',
    }),
  },
  title: 'Editor dashboard page',
  description:
    'Content declaration for the editor dashboard page within the Intlayer CMS dashboard. It defines the main title shown on the page.',
  tags: ['dashboard', 'editor', 'page content'],
} satisfies Dictionary;

export default profileDashboardContent;
