import { type Dictionary, t } from 'intlayer';

const translatorMarketplacePageContent = {
  key: 'translator-marketplace-page',
  content: {
    title: t({
      en: 'Translator Marketplace',
      fr: 'Place de marché des traducteurs',
      es: 'Mercado de traductores',
    }),
    description: t({
      en: 'Book professional human translators to review and refine your AI-generated content.',
      fr: "Réservez des traducteurs humains professionnels pour réviser et affiner votre contenu généré par l'IA.",
      es: 'Reserva traductores humanos profesionales para revisar y perfeccionar tu contenido generado por IA.',
    }),
    noTranslatorsFound: t({
      en: 'No translators found matching your criteria.',
      fr: 'Aucun traducteur trouvé correspondant à vos critères.',
      es: 'No se encontraron traductores que coincidan con sus criterios.',
    }),
  },
} satisfies Dictionary;

export default translatorMarketplacePageContent;
