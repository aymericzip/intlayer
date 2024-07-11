import { type IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';

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
      en: "Explore Intlayer's commitment to privacy with our detailed Privacy Notice. Learn about our use of Google Analytics, our cookie policy, and how we handle user information. For any privacy concerns, contact us directly at contact@intlayer.org. Stay informed about any updates by visiting this page regularly.",
      fr: "Découvrez notre engagement envers la confidentialité avec notre avis de confidentialité détaillé. Découvrez notre utilisation de Google Analytics, notre politique de cookie, et comment nous traitons les informations de l'utilisateur. Pour toute question de confidentialité, contactez-nous directement à contact@intlayer.org. Restez informé des mises à jour en visitant cette page régulièrement.",
      es: 'Explora nuestro compromiso con la privacidad con nuestro aviso detallado de privacidad. Aprenda sobre nuestro uso de Google Analytics, nuestra política de cookies, y cómo manejamos la información de los usuarios. Para cualquier preocupación de privacidad, contáctenos directamente a contact@intlayer.org. Manténgase informado sobre cualquier actualización visitando esta página regularmente.',
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
  };
};
