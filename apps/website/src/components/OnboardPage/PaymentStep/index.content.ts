import { type DeclarationContent, t } from 'intlayer';

export const paymentStepContent = {
  key: 'payment-step',
  content: {
    title: t({
      en: 'Payment',
      fr: 'Paiement',
      es: 'Pago',
    }),
  },
} satisfies DeclarationContent;

export default paymentStepContent;
