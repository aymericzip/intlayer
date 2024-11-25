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
    youReOrganizationIsAlreadySubscribed: {
      title: t({
        en: 'Your organization is already subscribed',
        fr: 'Votre organisation est déjà abonnée',
        es: 'Su organización ya está suscrita',
      }),
    },
    incorrectProductMessage: t({
      en: 'The current picked product is not valid. Please select a valid product.',
      fr: "Le produit actuellement sélectionné n'est pas valide. Veuillez sélectionner un produit valide.",
      es: 'El producto actualmente seleccionado no es válido. Por favor, seleccione un producto válido.',
    }),
    pickANewProductButton: {
      text: t({
        en: 'Pick a new product',
        fr: 'Choisissez un nouveau produit',
        es: 'Elija un nuevo producto',
      }),
      label: t({
        en: 'Pick a new product',
        fr: 'Choisissez un nouveau produit',
        es: 'Elija un nuevo producto',
      }),
    },
  },
} satisfies DeclarationContent;

export default paymentStepContent;
