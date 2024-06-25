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
      en: 'Intlayer | Configuration',
      fr: 'Intlayer | Configuration',
      es: 'Intlayer | Configuración',
    }),
    description: t<string>({
      en: 'Discover how to configure Intlayer to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment configurer Intlayer pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
      es: 'Descubra cómo configurar Intlayer para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),

    keywords: t<string[]>({
      en: [
        'Configuration',
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'Configuration',
        'Internationalisation',
        'Documentación',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'Configuración',
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
    }),
  };
};
