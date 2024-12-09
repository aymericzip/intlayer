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
    en: '404 - Page Not Found | Intlayer',
    fr: '404 - Page Non Trouvée | Intlayer',
    es: '404 - Página No Encontrada | Intlayer',
  });

  const description = t<string>({
    en: 'Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Navigate back to our homepage or use the search function to find what you need.',
    fr: "Oups ! La page que vous recherchez a peut-être été supprimée, a changé de nom ou est temporairement indisponible. Retournez à notre page d'accueil ou utilisez la fonction de recherche pour trouver ce dont vous avez besoin.",
    es: '¡Ups! La página que estás buscando puede haber sido eliminada, cambiado de nombre o estar temporalmente no disponible. Vuelve a la página principal o utiliza la función de búsqueda para encontrar lo que necesitas.',
  });

  return {
    title,
    description,
    keywords: t<string[]>({
      en: [
        '404 error',
        'page not found',
        'error',
        'Intlayer',
        'JavaScript',
        'React',
        'web development',
        'i18n',
      ],
      fr: [
        'erreur 404',
        'page non trouvée',
        'erreur',
        'Intlayer',
        'JavaScript',
        'React',
        'développement web',
        'i18n',
      ],
      es: [
        'error 404',
        'página no encontrada',
        'error',
        'Intlayer',
        'JavaScript',
        'React',
        'desarrollo web',
        'i18n',
      ],
    }),

    alternates: {
      canonical: PagesRoutes.NotFound,
      languages: getMultilingualUrls(PagesRoutes.NotFound),
    },
    robots: 'noindex, follow', // Avoid indexing error pages
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.NotFound}`,
        locale
      ),
      title,
      description,
    },
  };
};
