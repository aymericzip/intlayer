import { type Dictionary, t } from 'intlayer';

const pricingPromo2 = {
  key: 'pricing',
  variant: 'promo',
  item: 2,
  content: {
    plan: 'Pro',
    price: t({
      en: '$14.50 / mo (-50%)',
      es: '14,50 $ / mes (-50%)',
      fr: '14,50 € / mois (-50%)',
    }),
  },
} satisfies Dictionary;

export default pricingPromo2;
