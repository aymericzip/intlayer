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
      en: 'Intlayer | Terms of Service',
      fr: "Intlayer | Conditions d'utilisation",
      es: 'Intlayer | Términos de Servicio',
    }),
    description: t<string>({
      en: "Review Intlayer's terms of use, including commercial use, code modifications, and contribution guidelines. For details, contact us at contact@intlayer.org.",
      fr: "Consultez les termes d'utilisation d'Intlayer, y compris l'utilisation commerciale, les modifications de code, et les directives de contribution. Pour plus de détails, contactez-nous à contact@intlayer.org.",
      es: 'Revise los términos de uso de Intlayer, incluido el uso comercial, las modificaciones de código y las directrices de contribución. Para más detalles, contáctenos en contact@intlayer.org.',
    }),

    alternates: {
      canonical: PagesRoutes.TermsOfService,
      languages: locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]:
            locale.toString() === defaultLocale.toString()
              ? PagesRoutes.TermsOfService
              : `/${locale}${PagesRoutes.TermsOfService}`,
        }),
        {}
      ),
    },

    keywords: t<string[]>({
      en: [
        'Terms of Service',
        'Usage Policy',
        'Open Source',
        'Commercial Use',
        'Code Contributions',
        'Intlayer',
        'JavaScript',
        'React',
      ],
      fr: [
        "Conditions d'utilisation",
        "Politique d'utilisation",
        'Open Source',
        'Utilisation Commerciale',
        'Contributions au Code',
        'Intlayer',
        'JavaScript',
        'React',
      ],
      es: [
        'Términos de Servicio',
        'Política de Uso',
        'Código Abierto',
        'Uso Comercial',
        'Contribuciones de Código',
        'Intlayer',
        'JavaScript',
        'React',
      ],
    }),
  };
};
