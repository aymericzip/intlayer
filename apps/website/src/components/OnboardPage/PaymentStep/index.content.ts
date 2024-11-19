import { type DeclarationContent, t } from 'intlayer';

export const paymentStepContent = {
  key: 'payment-step',
  content: {
    title: t({
      en: 'Payment',
      fr: 'Paiement',
      es: 'Pago',
    }),
    paymentDetails: {
      title: t({
        en: 'Payment Details',
        fr: 'Détails du paiement',
        es: 'Detalles del pago',
      }),
    },
  },
} satisfies DeclarationContent;

export default paymentStepContent;
