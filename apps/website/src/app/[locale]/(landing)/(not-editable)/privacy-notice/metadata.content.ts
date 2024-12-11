import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'privacy-notice-metadata',
  content: {
    title: t({
      en: 'Privacy Notice | Intlayer',
      fr: 'Avis de confidentialité | Intlayer',
      es: 'Aviso de privacidad | Intlayer',
    }),
    description: t({
      en: 'Learn about our Privacy Notice and how we use Google Analytics and handle your information. For privacy concerns, contact us at contact@intlayer.org.',
      fr: 'Découvrez notre avis de confidentialité et comment nous utilisons Google Analytics. Pour des questions de confidentialité, contactez-nous à contact@intlayer.org.',
      es: 'Conoce nuestro aviso de privacidad y cómo usamos Google Analytics. Para inquietudes de privacidad, contáctanos en contact@intlayer.org.',
    }),

    keywords: t<string[]>({
      en: [
        'Cookies',
        'Tracking Technologies',
        'Analytics',
        'Email',
        'Privacy Notice',
        'Internationalization',
        'Intlayer',
        'JavaScript',
        'React',
      ],
      fr: [
        'Cookies',
        'Technologies de suivi',
        'Analytics',
        'Email',
        'Avis de confidentialité',
        'Internationalisation',
        'Intlayer',
        'JavaScript',
        'React',
      ],
      es: [
        'Aviso de privacidad',
        'Internacionalización',
        'Intlayer',
        'Tecnologías de seguimiento',
        'Análisis',
        'Email',
        'JavaScript',
        'React',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
