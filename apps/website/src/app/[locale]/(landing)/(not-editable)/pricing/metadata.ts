import { type IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';
import { defaultLocale, locales } from '../../../../../../intlayer.config';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  return {
    title: t<string>({
      en: 'Intlayer | Pricing',
      fr: 'Intlayer | Tarification',
      es: 'Intlayer | Precios',
    }),
    description: t<string>({
      en: 'Discover our pricing plans and get access to premium features with Intlayer. Choose the plan that suits you best.',
      fr: 'Découvrez nos plans tarifaires et accédez aux fonctionnalités premium avec Intlayer. Choisissez le plan qui vous convient le mieux.',
      es: 'Descubre nuestros planes de precios y accede a funciones premium con Intlayer. Elige el plan que mejor te convenga.',
    }),
    alternates: {
      canonical: PagesRoutes.Pricing,
      languages: locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]:
            locale.toString() === defaultLocale.toString()
              ? PagesRoutes.Pricing
              : `/${locale}${PagesRoutes.Pricing}`,
        }),
        {}
      ),
    },
    keywords: t<string[]>({
      en: [
        'Pricing',
        'Subscription',
        'Premium',
        'Plans',
        'Intlayer',
        'Internationalization',
        'nextjs',
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
        'nextjs',
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
        'nextjs',
        'React',
        'JavaScript',
      ],
    }),
  };
};
