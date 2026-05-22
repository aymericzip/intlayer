import { type Dictionary, t } from 'intlayer';

const translatorProfilePageContent = {
  key: 'translator-profile-page',
  content: {
    translatorNotFound: t({
      en: 'Translator not found.',
      fr: 'Traducteur introuvable.',
      es: 'Traductor no encontrado.',
    }),
    fallbackName: t({
      en: 'Translator',
      fr: 'Traducteur',
      es: 'Traductor',
    }),
    reviewsCount: t({
      en: 'reviews',
      fr: 'avis',
      es: 'reseñas',
    }),
    missionsCompleted: t({
      en: 'missions completed',
      fr: 'missions terminées',
      es: 'misiones completadas',
    }),
    languagesTitle: t({
      en: 'Languages',
      fr: 'Langues',
      es: 'Idiomas',
    }),
    perHourLabel: t({
      en: 'per hour',
      fr: 'par heure',
      es: 'por hora',
    }),
    priceInfo: t({
      en: '~300 words/hr · price calculated automatically',
      fr: '~300 mots/h · prix calculé automatiquement',
      es: '~300 palabras/hr · precio calculado automáticamente',
    }),
    bookTranslatorButton: t({
      en: 'Book this translator',
      fr: 'Réserver ce traducteur',
      es: 'Reservar este traductor',
    }),
  },
} satisfies Dictionary;

export default translatorProfilePageContent;
