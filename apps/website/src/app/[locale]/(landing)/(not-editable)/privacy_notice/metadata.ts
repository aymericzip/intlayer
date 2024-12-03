import { type IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';
import { defaultLocale, locales } from '../../../../../../intlayer.config';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  return {
    title: t<string>({
      en: 'Intlayer | Privacy Notice',
      fr: 'Intlayer | Avis de confidentialité',
      es: 'Intlayer | Aviso de privacidad',
    }),
    description: t<string>({
      en: 'Explore our Privacy Notice to understand how we use Google Analytics and handle your information. For privacy concerns, contact us at contact@intlayer.org.',
      fr: 'Découvrez notre avis de confidentialité et comment nous utilisons Google Analytics. Pour des questions de confidentialité, contactez-nous à contact@intlayer.org.',
      es: 'Conoce nuestro aviso de privacidad y cómo usamos Google Analytics. Para inquietudes de privacidad, contáctanos en contact@intlayer.org.',
    }),

    alternates: {
      canonical: PagesRoutes.PrivacyPolicy,
      languages: locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]:
            locale.toString() === defaultLocale.toString()
              ? PagesRoutes.PrivacyPolicy
              : `/${locale}/${PagesRoutes.PrivacyPolicy}`,
        }),
        {}
      ),
    },

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
  };
};
