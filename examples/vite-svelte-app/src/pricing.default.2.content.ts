import { type Dictionary, t } from 'intlayer';

const pricingDefault2 = {
  key: 'pricing',
  variant: 'default',
  item: 2,
  content: {
    plan: 'Pro',
    price: t({ en: '$29 / mo', es: '29 $ / mes', fr: '29 € / mois' }),
  },
} satisfies Dictionary;

export default pricingDefault2;
