import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'term-of-service-metadata',
  content: {
    title: t({
      en: 'Terms of Service | Intlayer',
      fr: "Conditions d'utilisation | Intlayer",
      es: 'Términos de Servicio | Intlayer',
    }),
    description: t({
      en: "Review Intlayer's terms of use, including commercial use, code modifications, and contribution guidelines. For details, contact us at contact@intlayer.org.",
      fr: "Consultez les termes d'utilisation d'Intlayer, y compris l'utilisation commerciale, les modifications de code, et les directives de contribution. Pour plus de détails, contactez-nous à contact@intlayer.org.",
      es: 'Revise los términos de uso de Intlayer, incluido el uso comercial, las modificaciones de código y las directrices de contribución. Para más detalles, contáctenos en contact@intlayer.org.',
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
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
