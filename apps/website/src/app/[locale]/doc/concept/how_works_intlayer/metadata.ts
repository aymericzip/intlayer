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
      en: 'Intlayer | How works Intlayer',
      fr: 'Intlayer | Comment Intlayer fonctionne',
      es: 'Intlayer | Cómo funciona Intlayer',
    }),
    description: t<string>({
      en: 'Discover how Intlayer works. See the steps used by Intlayer in your application. See what does the different packages do.',
      fr: 'Découvrez comment Intlayer fonctionne. Voir les étapes utilisées par Intlayer dans votre application. Voir ce qui fait les différents packages.',
      es: 'Descubra cómo Intlayer funciona. Vea las pasos utilizados por Intlayer en su aplicación. Vea lo que hace los diferentes paquetes.',
    }),

    keywords: t<string[]>({
      en: [
        'Package',
        'Functioning',
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'Package',
        'Fonctionnement',
        'Internationalisation',
        'Documentación',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'Package',
        'Funcionamiento',
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
