import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'not-found-metadata',
  content: {
    title: t({
      en: '404 - Page Not Found | Intlayer',
      fr: '404 - Page Non Trouvée | Intlayer',
      es: '404 - Página No Encontrada | Intlayer',
    }),
    description: t({
      en: 'Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Navigate back to our homepage or use the search function to find what you need.',
      fr: "Oups ! La page que vous recherchez a peut-être été supprimée, a changé de nom ou est temporairement indisponible. Retournez à notre page d'accueil ou utilisez la fonction de recherche pour trouver ce dont vous avez besoin.",
      es: '¡Vaya! La página que busca pudo haber sido eliminada, haber cambiado de nombre o estar temporalmente no disponible. Navegue de vuelta a nuestra página principal o utiliza la función de búsqueda para encontrar lo que necesitas.',
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
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
