import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'pricing-metadata',
  content: {
    title: t({
      en: 'Pricing | Intlayer',
      fr: 'Tarification | Intlayer',
      es: 'Precios | Intlayer',
    }),
    description: t({
      en: 'Discover our pricing plans and get access to premium features with Intlayer. Choose the plan that suits you best.',
      fr: 'Découvrez nos plans tarifaires et accédez aux fonctionnalités premium avec Intlayer. Choisissez le plan qui vous convient le mieux.',
      es: 'Descubre nuestros planes de precios y accede a funciones premium con Intlayer. Elige el plan que mejor te convenga.',
    }),

    keywords: t<string[]>({
      en: [
        'Pricing',
        'Subscription',
        'Premium',
        'Plans',
        'Intlayer',
        'Internationalization',
        'Next.js',
        'React',
        'JavaScript',
      ],
      fr: [
        'Tarification',
        'Abonnement',
        'Premium',
        'Plans',
        'Intlayer',
        'Internationalisation',
        'Next.js',
        'React',
        'JavaScript',
      ],
      es: [
        'Precios',
        'Suscripción',
        'Premium',
        'Planes',
        'Intlayer',
        'Internacionalización',
        'Next.js',
        'React',
        'JavaScript',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
