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
      en: 'Intlayer | Intlayer with Next.js',
      fr: 'Intlayer | Intlayer avec Next.js',
      es: 'Intlayer | Intlayer con Next.js',
    }),
    description: t<string>({
      en: 'Discover how to use Intlayer with Next.js to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment utiliser Intlayer avec Next.js pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
      es: 'Descubra cómo usar Intlayer con Next.js para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),

    keywords: t<string[]>({
      en: [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
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
