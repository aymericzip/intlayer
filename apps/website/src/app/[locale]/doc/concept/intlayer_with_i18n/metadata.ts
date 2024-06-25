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
      en: 'Intlayer | Intlayer with i18n',
      fr: 'Intlayer | Intlayer avec i18n',
      es: 'Intlayer | Intlayer con i18n',
    }),
    description: t<string>({
      en: 'Discover how to use Intlayer with i18n to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment utiliser Intlayer avec i18n pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
      es: 'Descubra cómo usar Intlayer con i18n para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),

    keywords: t<string[]>({
      en: [
        'Intlayer with i18n',
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'Intlayer avec i18n',
        'Internationalisation',
        'Documentación',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'Intlayer con i18n',
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
