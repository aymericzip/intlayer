import {
  type IConfigLocales,
  getLocalizedUrl,
  getMultilingualUrls,
  getTranslationContent,
} from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const title = t<string>({
    en: 'Privacy Notice | Intlayer',
    fr: 'Avis de confidentialité | Intlayer',
    es: 'Aviso de privacidad | Intlayer',
  });

  const description = t<string>({
    en: 'Learn about our Privacy Notice and how we use Google Analytics and handle your information. For privacy concerns, contact us at contact@intlayer.org.',
    fr: 'Découvrez notre avis de confidentialité et comment nous utilisons Google Analytics. Pour des questions de confidentialité, contactez-nous à contact@intlayer.org.',
    es: 'Conoce nuestro aviso de privacidad y cómo usamos Google Analytics. Para inquietudes de privacidad, contáctanos en contact@intlayer.org.',
  });

  return {
    title,
    description,

    alternates: {
      canonical: PagesRoutes.PrivacyPolicy,
      languages: getMultilingualUrls(PagesRoutes.PrivacyPolicy),
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
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.PrivacyPolicy}`,
        locale
      ),
      title,
      description,
    },
  };
};
