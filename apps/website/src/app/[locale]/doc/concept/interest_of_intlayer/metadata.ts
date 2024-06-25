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
      en: 'Intlayer | Interest of Intlayer',
      fr: "Intlayer | Intérêt d'Intlayer",
      es: 'Intlayer | Interés de Intlayer',
    }),
    description: t<string>({
      en: 'Discover the interest of Intlayer in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: "Découvrez l'intérêt d'Intlayer dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.",
      es: 'Descubra el interés de Intlayer en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),

    keywords: t<string[]>({
      en: [
        'Interest of Intlayer',
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        "Intérêt d'Intlayer",
        'Internationalisation',
        'Documentación',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'Interés de Intlayer',
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
