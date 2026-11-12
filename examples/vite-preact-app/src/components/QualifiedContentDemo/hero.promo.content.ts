import { type Dictionary, t } from 'intlayer';

const heroPromo = {
  key: 'hero',
  variant: 'promo',
  content: {
    ctaLabel: t({
      en: 'Claim discount',
      es: 'Obtener descuento',
      fr: 'Obtenir la réduction',
    }),
    headline: t({
      en: '🎉 Black Friday — 50 % off all plans',
      es: '🎉 Black Friday — 50 % de descuento en todos los planes',
      fr: '🎉 Black Friday — 50 % de réduction sur tous les forfaits',
    }),
    subheadline: t({
      en: 'Limited time offer. Upgrade today and lock in your discount forever.',
      es: 'Oferta por tiempo limitado. Actualiza hoy y conserva tu descuento para siempre.',
      fr: "Offre à durée limitée. Passez à la version supérieure dès aujourd'hui et bénéficiez de votre réduction à vie.",
    }),
  },
} satisfies Dictionary;

export default heroPromo;
