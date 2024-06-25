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
      en: 'Intlayer | Intlayer with Vite + React',
      fr: 'Intlayer | Intlayer avec Vite + React',
      es: 'Intlayer | Intlayer con Vite + React',
    }),
    description: t<string>({
      en: 'Discover how to use Intlayer with Vite + React to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment utiliser Intlayer avec Vite et React pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
      es: 'Descubra cómo usar Intlayer con Vite y React para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),

    keywords: t<string[]>({
      en: [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Vite',
        'React',
        'JavaScript',
      ],
      fr: [
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Vite',
        'React',
        'JavaScript',
      ],
      es: [
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'Vite',
        'React',
        'JavaScript',
      ],
    }),
  };
};
