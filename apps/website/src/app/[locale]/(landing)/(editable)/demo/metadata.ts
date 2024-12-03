import { type IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';
import { defaultLocale, locales } from '../../../../../../intlayer.config';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  return {
    title: t<string>({
      en: 'Intlayer | Demo',
      fr: 'Intlayer | Démo',
      es: 'Intlayer | Demostración',
    }),
    description: t<string>({
      en: 'Try the new Intlayer online editor. Empower your teams to take control of your content and transform your application into a CMS.',
      es: 'Pruebe el nuevo editor en línea de Intlayer. Permita que sus equipos tomen el control de su contenido y transformen su aplicación en un CMS.',
      fr: 'Essayez le nouveau Intlayer editeur online. Permettez à vos équipes de prendre la main sur votre contenu et transformez votre application en CMS.',
    }),

    alternates: {
      canonical: PagesRoutes.Demo,
      languages: locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]:
            locale.toString() === defaultLocale.toString()
              ? PagesRoutes.Demo
              : `/${locale}${PagesRoutes.Demo}`,
        }),
        {}
      ),
    },

    keywords: t<string[]>({
      en: [
        'Internationalization',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'Internationalisation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'Internacionalización',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
    }),
  };
};
