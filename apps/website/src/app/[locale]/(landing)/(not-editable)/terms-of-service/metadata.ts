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
    en: 'Terms of Service | Intlayer',
    fr: "Conditions d'utilisation | Intlayer",
    es: 'Términos de Servicio | Intlayer',
  });

  const description = t<string>({
    en: "Review Intlayer's terms of use, including commercial use, code modifications, and contribution guidelines. For details, contact us at contact@intlayer.org.",
    fr: "Consultez les termes d'utilisation d'Intlayer, y compris l'utilisation commerciale, les modifications de code, et les directives de contribution. Pour plus de détails, contactez-nous à contact@intlayer.org.",
    es: 'Revise los términos de uso de Intlayer, incluido el uso comercial, las modificaciones de código y las directrices de contribución. Para más detalles, contáctenos en contact@intlayer.org.',
  });

  return {
    title,
    description,

    alternates: {
      canonical: PagesRoutes.TermsOfService,
      languages: getMultilingualUrls(PagesRoutes.TermsOfService),
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
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.TermsOfService}`,
        locale
      ),
      title,
      description,
    },
  };
};
