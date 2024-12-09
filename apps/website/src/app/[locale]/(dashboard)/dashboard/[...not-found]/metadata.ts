import {
  type IConfigLocales,
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

  return {
    title: t<string>({
      en: 'Intlayer | 404 - Page Not Found',
      fr: 'Intlayer | 404 - Page Non Trouvée',
      es: 'Intlayer | 404 - Página No Encontrada',
    }),
    description: t<string>({
      en: 'Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Navigate back to our homepage or use the search function to find what you need.',
      fr: "Oups ! La page que vous recherchez a peut-être été supprimée, a changé de nom ou est temporairement indisponible. Retournez à notre page d'accueil ou utilisez la fonction de recherche pour trouver ce dont vous avez besoin.",
      es: '¡Vaya! La página que busca pudo haber sido eliminada, haber cambiado de nombre o estar temporalmente indisponible. Navegue de vuelta a nuestra página principal o use la función de búsqueda para encontrar lo que necesita.',
    }),

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
      url: `${process.env.NEXT_PUBLIC_URL}/404`,
      title: t<string>({
        en: '404 Not Found',
        fr: '404 Non Trouvée',
        es: '404 No Encontrada',
      }),
      description: t<string>({
        en: 'This is a 404 page. The content you are looking for does not exist or has been moved.',
        fr: "Ceci est une page 404. Le contenu que vous cherchez n'existe pas ou a été déplacé.",
        es: 'Esta es una página 404. El contenido que busca no existe o ha sido movido.',
      }),
      type: 'website',
    },
  };
};
