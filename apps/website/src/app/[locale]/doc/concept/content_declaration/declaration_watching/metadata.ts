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
      en: 'Intlayer | Declaration file watching',
      fr: 'Intlayer | Actualisation des changements des fichiers de déclaration',
      es: 'Intlayer | Actualización de los cambios en los archivos de declaración',
    }),
    description: t({
      en: 'Watch your content declaration files for changes and rebuild dictionaries automatically. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Surveillez les fichiers de déclaration de contenu pour les modifications et reconstruisez automatiquement les dictionnaires. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
      es: 'Monitore sus archivos de declaración de contenido para cambios y reconstruya automáticamente los diccionarios. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),
    keywords: t({
      en: [
        'Update',
        'Content Declaration',
        'Internationalization',
        'Documentation',
        'Intlayer',
        'JavaScript',
        'React',
      ],
      fr: [
        'Mise à jour',
        'Déclaration de Contenu',
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'JavaScript',
        'React',
      ],
      es: [
        'Actualización',
        'Declaración de Contenido',
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'JavaScript',
        'React',
      ],
    }),
  };
};
