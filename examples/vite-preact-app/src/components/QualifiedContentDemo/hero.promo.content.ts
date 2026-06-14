import { type Dictionary, t } from 'intlayer';

const heroPromo = {
  key: 'hero',
  variant: 'promo',
  content: {
    headline: t({
      en: '🎉 Black Friday — 50 % off all plans',
      fr: '🎉 Black Friday — 50 % de réduction sur tous les forfaits',
      es: '🎉 Black Friday — 50 % de descuento en todos los planes',
    }),
    subheadline: t({
      en: 'Limited time offer. Upgrade today and lock in your discount forever.',
      fr: "Offre à durée limitée. Passez à la version supérieure dès aujourd'hui et bénéficiez de votre réduction à vie.",
      es: 'Oferta por tiempo limitado. Actualiza hoy y conserva tu descuento para siempre.',
    }),
    ctaLabel: t({
      en: 'Claim discount',
      fr: 'Obtenir la réduction',
      es: 'Obtener descuento',
    }),
  },
} satisfies Dictionary;

export default heroPromo;
