import { type DeclarationContent, t } from 'intlayer';

const docNavTitlesContent = {
  key: 'doc-nav-titles',
  content: {
    title: t({
      en: 'In this page',
      fr: 'Dans cette page',
      es: 'En esta página',
    }),
  },
} satisfies DeclarationContent;

export default docNavTitlesContent;
