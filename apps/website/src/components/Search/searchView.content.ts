import { t, type DeclarationContent } from 'intlayer';

const searchTriggerContent: DeclarationContent = {
  key: 'search-view',
  content: {
    noContentText: t({
      en: 'No results found',
      fr: 'Aucun résultat trouvé',
      es: 'No se encontraron resultados',
    }),
    searchInput: {
      label: t({
        en: 'Search documentation',
        fr: 'Rechercher la documentation',
        es: 'Buscar documentación',
      }),
      placeholder: t({
        en: 'Search documentation...',
        fr: 'Rechercher la documentation...',
        es: 'Buscar documentación...',
      }),
    },
    searchResultItemButton: {
      label: t({
        en: 'Click to view documentation',
        fr: 'Cliquez pour voir la documentation',
        es: 'Haga clic para ver la documentación',
      }),
    },
  },
};

export default searchTriggerContent;
