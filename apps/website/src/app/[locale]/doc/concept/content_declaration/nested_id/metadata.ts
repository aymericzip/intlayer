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
      en: 'Intlayer | Nested ID',
      fr: 'Intlayer | ID imbriqué',
      es: 'Intlayer | ID anidado',
    }),
    description: t<string>({
      en: 'Discover how to declare and use nested IDs in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment déclarer et utiliser des ID imbriqués dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
      es: 'Descubra cómo declarar y usar IDs anidados en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),

    keywords: t<string[]>({
      en: [
        'Nested ID',
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'ID imbriqué',
        'Internationalisation',
        'Documentación',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'ID anidado',
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
