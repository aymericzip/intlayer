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
      en: 'Intlayer | Intlayer with React CRA',
      fr: 'Intlayer | Intlayer avec React CRA',
      es: 'Intlayer | Intlayer con React CRA',
    }),
    description: t<string>({
      en: 'Discover how to set up Intlayer with Create React App to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment configurer Intlayer avec Create React App pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
      es: 'Descubra cómo configurar Intlayer con Create React App para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),

    keywords: t<string[]>({
      en: [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Create React App',
        'CRA',
        'JavaScript',
        'React',
      ],
      fr: [
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Create React App',
        'CRA',
        'JavaScript',
        'React',
      ],
      es: [
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'Create React App',
        'CRA',
        'JavaScript',
        'React',
      ],
    }),
  };
};
