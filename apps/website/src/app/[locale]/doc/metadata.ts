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
      en: 'Intlayer | Documentation',
      fr: 'Intlayer | Documentation',
      es: 'Intlayer | Documentación',
    }),
    description: t<string>({
      en: 'Transform your website into a multilingual application in 2 minutes. Discover the full range of Intlayer features through this online documentation.',
      fr: "Transformez votre site web en application multilingue en 2 minutes. Découvrez l'ensemble des fonctionnalités de Intlayer à travers cette documentation en ligne.",
      es: 'Transforme su sitio web en una aplicación multilingüe en 2 minutos. Descubra todas las funcionalidades de Intlayer a través de esta documentación en línea.',
    }),

    keywords: t<string[]>({
      en: [
        'Documentation',
        'Internationalization',
        'Intlayer',
        'Next.js',
        'Vite',
        'JavaScript',
        'React',
      ],
      fr: [
        'Documentation',
        'Internationalisation',
        'Intlayer',
        'Vite',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'Documentation',
        'Internacionalización',
        'Intlayer',
        'Vite',
        'Next.js',
        'JavaScript',
        'React',
      ],
    }),
  };
};
