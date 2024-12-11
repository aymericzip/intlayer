import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-intlayer-with-i18next-metadata',
  content: {
    title: t({
      en: 'Intlayer and i18next',
      fr: 'Intlayer et i18next',
      es: 'Intlayer y i18next',
    }),

    description: t({
      en: 'Compare Intlayer with i18next',
      fr: 'Comparer Intlayer avec i18next',
      es: 'Comparar Intlayer con i18next',
    }),
    keywords: t({
      en: [
        'i18next',
        'next-intl',
        'Intlayer',
        'Internationalization',
        'Documentation',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'i18next',
        'next-intl',
        'Intlayer',
        'Internationalisation',
        'Documentation',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'i18next',
        'next-intl',
        'Intlayer',
        'Internacionalización',
        'Documentación',
        'Next.js',
        'JavaScript',
        'React',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
