import { t, type DeclarationContent } from 'intlayer';

const searchTriggerContent: DeclarationContent = {
  key: 'search-trigger',
  content: {
    searchButton: {
      text: t({
        en: 'Search Documentation',
        fr: 'Rechercher la documentation',
        es: 'Buscar documentación',
      }),
      label: t({
        en: 'Click to search documentation',
        fr: 'Cliquez pour rechercher la documentation',
        es: 'Haga clic para buscar la documentación',
      }),
    },
  },
};

export default searchTriggerContent;
