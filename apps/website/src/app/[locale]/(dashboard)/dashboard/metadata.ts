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
    en: 'Dashboard | Intlayer',
    fr: 'Tableau de bord | Intlayer',
    es: 'Panel de control | Intlayer',
  });

  const description = t<string>({
    en: 'Manage your website content with the Intlayer dashboard. Edit, add, or delete projects, dictionaries, and other content. Control user access to various items.',
    fr: "Gérez le contenu de votre site Web avec le tableau de bord Intlayer. Modifiez, ajoutez ou supprimez des projets, des dictionnaires et d'autres contenus. Contrôlez l'accès des utilisateurs à différents éléments.",
    es: 'Administra el contenido de tu sitio web con el panel de control de Intlayer. Edita, añade o elimina proyectos, diccionarios y otros contenidos. Controla el acceso de los usuarios a diversos elementos.',
  });

  return {
    title,
    description,

    keywords: t<string[]>({
      en: [
        'Dashboard',
        'Content Management',
        'Projects',
        'Dictionaries',
        'User Access',
        'Edit Content',
      ],
      fr: [
        'Tableau de bord',
        'Gestion de contenu',
        'Projets',
        'Dictionnaires',
        'Accès utilisateur',
        'Modifier le contenu',
      ],
      es: [
        'Panel de control',
        'Gestión de contenido',
        'Proyectos',
        'Diccionarios',
        'Acceso de usuarios',
        'Editar contenido',
      ],
    }),
    alternates: {
      canonical: PagesRoutes.Dashboard,
      languages: getMultilingualUrls(PagesRoutes.Dashboard),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL!}${PagesRoutes.Dashboard}`,
        locale
      ),
    },
  };
};
