import { type Dictionary, t } from 'intlayer';

const productAppleWatch = {
  key: 'product',
  variant: { id: 'apple-watch', category: 'wearables' },
  content: {
    name: t({
      en: 'Apple Watch Series 10',
      fr: 'Apple Watch Série 10',
      es: 'Apple Watch Serie 10',
    }),
    description: t({
      en: 'The thinnest Apple Watch ever, with the largest display.',
      fr: 'La montre Apple Watch la plus fine jamais conçue, avec le plus grand écran.',
      es: 'El Apple Watch más delgado de la historia, con la pantalla más grande.',
    }),
    price: t({
      en: '$399',
      fr: '399 €',
      es: '399 €',
    }),
  },
} satisfies Dictionary;

export default productAppleWatch;
