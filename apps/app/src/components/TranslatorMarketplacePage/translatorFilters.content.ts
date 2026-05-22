import { type Dictionary, t } from 'intlayer';

const translatorFiltersContent = {
  key: 'translator-filters',
  content: {
    filters: t({
      en: 'Filters',
    }),

    sourceLanguage: t({
      en: 'Source language',
    }),

    targetLanguage: t({
      en: 'Target language',
    }),

    minRating: t({
      en: 'Min rating',
    }),

    any: t({
      en: 'Any',
    }),

    maxPriceHr: t({
      en: 'Max price / hr ($)',
    }),

    clearFilters: t({
      en: 'Clear filters',
    }),

    egEn: t({
      en: 'e.g. en',
    }),

    egFr: t({
      en: 'e.g. fr',
    }),

    fourPlusStars: t({
      en: '4+ stars',
    }),

    fourPointFivePlusStars: t({
      en: '4.5+ stars',
    }),

    eg100: t({
      en: 'e.g. 100',
    }),
  },
} satisfies Dictionary;

export default translatorFiltersContent;
