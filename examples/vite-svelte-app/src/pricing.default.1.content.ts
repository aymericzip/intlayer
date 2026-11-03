import { type Dictionary, t } from 'intlayer';

/**
 * Composite key `pricing` — collection (item) × variant.
 * Every declaration must carry BOTH dimensions.
 */
const pricingDefault1 = {
  key: 'pricing',
  variant: 'default',
  item: 1,
  content: {
    plan: t({ en: 'Starter', es: 'Inicial', fr: 'Débutant' }),
    price: t({ en: '$9 / mo', es: '9 $ / mes', fr: '9 € / mois' }),
  },
} satisfies Dictionary;

export default pricingDefault1;
