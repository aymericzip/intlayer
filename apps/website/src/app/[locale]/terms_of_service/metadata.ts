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
      en: 'Intlayer | Terms of Service',
      fr: "Intlayer | Conditions d'utilisation",
      es: 'Intlayer | Términos de Servicio',
    }),
    description: t<string>({
      en: 'Review the terms under which Intlayer is provided. Understand the conditions for using our open-source tool, including commercial use, code modifications, and contribution guidelines. For further details, contact us at contact@intlayer.org.',
      fr: "Consultez les termes sous lesquels Intlayer est fourni. Comprenez les conditions d'utilisation de notre outil open-source, y compris l'utilisation commerciale, les modifications du code et les directives de contribution. Pour plus de détails, contactez-nous à contact@intlayer.org.",
      es: 'Revise los términos bajo los cuales se proporciona Intlayer. Entienda las condiciones para usar nuestra herramienta de código abierto, incluido el uso comercial, las modificaciones de código y las directrices de contribución. Para más detalles, contáctenos en contact@intlayer.org.',
    }),

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
