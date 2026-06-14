import { type Dictionary, t } from 'intlayer';

const pricingDefault2 = {
  key: 'pricing',
  variant: 'default',
  item: 2,
  content: {
    plan: t({ en: 'Pro', fr: 'Pro', es: 'Pro' }),
    price: t({ en: '$29 / mo', fr: '29 € / mois', es: '29 $ / mes' }),
  },
} satisfies Dictionary;

export default pricingDefault2;
