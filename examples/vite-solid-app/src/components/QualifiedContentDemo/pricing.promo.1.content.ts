import { type Dictionary, t } from 'intlayer';

const pricingPromo1 = {
  key: 'pricing',
  variant: 'promo',
  item: 1,
  content: {
    plan: t({ en: 'Starter', fr: 'Débutant', es: 'Inicial' }),
    price: t({
      en: '$4.50 / mo (-50%)',
      fr: '4,50 € / mois (-50%)',
      es: '4,50 $ / mes (-50%)',
    }),
  },
} satisfies Dictionary;

export default pricingPromo1;
