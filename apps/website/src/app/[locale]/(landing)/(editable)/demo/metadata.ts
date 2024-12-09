import {
  type IConfigLocales,
  getLocalizedUrl,
  getMultilingualUrls,
  getTranslationContent,
} from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const title = t<string>({
    en: 'Demo | Intlayer',
    fr: 'Démo | Intlayer',
    es: 'Demostración | Intlayer',
  });

  const description = t<string>({
    en: 'Try the new Intlayer online editor. Empower your teams to take control of your content and transform your application into a CMS.',
    es: 'Pruebe el nuevo editor en línea de Intlayer. Permita que sus equipos tomen el control de su contenido y transformen su aplicación en un CMS.',
    fr: 'Essayez le nouveau Intlayer editeur online. Permettez à vos équipes de prendre la main sur votre contenu et transformez votre application en CMS.',
  });

  return {
    title,
    description,

    alternates: {
      canonical: PagesRoutes.Demo,
      languages: getMultilingualUrls(PagesRoutes.Demo),
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

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Demo}`,
        locale
      ),
      title,
      description,
    },
  };
};
