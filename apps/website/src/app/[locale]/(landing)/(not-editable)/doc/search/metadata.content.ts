import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'doc-search-metadata',
  content: {
    title: t({
      en: 'Search in documentation | Intlayer',
      fr: 'Rechercher dans la documentation | Intlayer',
      es: 'Buscar en la documentación | Intlayer',
    }),
    description: t({
      en: 'Search documentation',
      fr: 'Rechercher la documentation',
      es: 'Buscar documentación',
    }),

    keywords: t<string[]>({
      en: ['search', 'documentation', 'intlayer'],
      fr: ['rechercher', 'documentation', 'intlayer'],
      es: ['buscar', 'documentación', 'intlayer'],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
