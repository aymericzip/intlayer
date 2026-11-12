import { type Dictionary, t } from 'intlayer';

const productAirpods = {
  key: 'product',
  variant: { id: 'airpods-pro', category: 'audio' },
  content: {
    description: t({
      en: 'Active noise cancellation, adaptive audio, and up to 30 hours of battery life.',
      es: 'Cancelación activa de ruido, audio adaptativo y hasta 30 horas de batería.',
      fr: "Suppression active du bruit, audio adaptatif et jusqu'à 30 heures d'autonomie.",
    }),
    name: t({
      en: 'AirPods Pro (2nd generation)',
      es: 'AirPods Pro (2.ª generación)',
      fr: 'AirPods Pro (2e génération)',
    }),
    price: t({
      en: '$249',
      es: '249 €',
      fr: '249 €',
    }),
  },
} satisfies Dictionary;

export default productAirpods;
