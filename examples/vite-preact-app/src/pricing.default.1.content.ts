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
    plan: t({ en: 'Starter', fr: 'Débutant', es: 'Inicial' }),
    price: t({ en: '$9 / mo', fr: '9 € / mois', es: '9 $ / mes' }),
  },
} satisfies Dictionary;

export default pricingDefault1;
