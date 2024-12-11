import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'locale-metadata',
  content: {
    title: t({
      en: 'Internationalization (i18n) Next.js made easy | Intlayer',
      fr: 'Internationalisation (i18n) Next.js simplifiée | Intlayer',
      es: 'Internacionalización (i18n) Next.js hecha fácil | Intlayer',
    }),
    description: t({
      en: 'i18n for Next.js & React. Easily build multilingual sites with AI-powered visual editor for your translations. TypeScript internationalization.',
      fr: "i18n pour Next.js & React. Créez des sites multilingues grâce à un éditeur visuel boosté par l'IA pour vos traducciones. Internationalisation basée sur TypeScript.",
      es: 'i18n para Next.js & React. Crea sitios multilingües con un editor visual impulsado por IA para tus traducciones. Internacionalización con TypeScript.',
    }),
    keywords: t<string[]>({
      en: [
        'translation',
        'localization',
        'multilingual',
        'Internationalization',
        'i18n',
        'Web Development',
        'Next.js',
        'JavaScript',
        'Vite',
        'React',
        'CMS',
        'Content Management System',
      ],
      fr: [
        'Traduction',
        'Localisation',
        'Multilingue',
        'SEO',
        'Internationalisation',
        'i18n',
        'Développement Web',
        'Next.js',
        'JavaScript',
        'Vite',
        'React',
        'CMS',
        'Content Management System',
      ],
      es: [
        'Traducción',
        'Localización',
        'Multilingüe',
        'SEO',
        'Internacionalización',
        'i18n',
        'Next.js',
        'Desarrollo Web',
        'JavaScript',
        'Vite',
        'React',
        'CMS',
        'Content Management System',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
