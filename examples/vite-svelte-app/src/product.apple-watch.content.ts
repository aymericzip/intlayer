import { type Dictionary, t } from 'intlayer';

const productAppleWatch = {
  key: 'product',
  variant: { id: 'apple-watch', category: 'wearables' },
  content: {
    description: t({
      en: 'The thinnest Apple Watch ever, with the largest display.',
      es: 'El Apple Watch más delgado de la historia, con la pantalla más grande.',
      fr: 'La montre Apple Watch la plus fine jamais conçue, avec le plus grand écran.',
    }),
    name: t({
      en: 'Apple Watch Series 10',
      es: 'Apple Watch Serie 10',
      fr: 'Apple Watch Série 10',
    }),
    price: t({
      en: '$399',
      es: '399 €',
      fr: '399 €',
    }),
  },
} satisfies Dictionary;

export default productAppleWatch;
