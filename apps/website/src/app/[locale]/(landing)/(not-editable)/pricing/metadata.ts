import {
  type IConfigLocales,
  getLocalizedUrl,
  getMultilingualUrls,
  getTranslationContent,
} from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const title = t<string>({
    en: 'Pricing | Intlayer',
    fr: 'Tarification | Intlayer',
    es: 'Precios | Intlayer',
  });

  const description = t<string>({
    en: 'Discover our pricing plans and get access to premium features with Intlayer. Choose the plan that suits you best.',
    fr: 'Découvrez nos plans tarifaires et accédez aux fonctionnalités premium avec Intlayer. Choisissez le plan qui vous convient le mieux.',
    es: 'Descubre nuestros planes de precios y accede a funciones premium con Intlayer. Elige el plan que mejor te convenga.',
  });

  return {
    title,
    description,
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
    alternates: {
      canonical: PagesRoutes.Pricing,
      languages: getMultilingualUrls(PagesRoutes.Pricing),
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Pricing}`,
        locale
      ),
      title,
      description,
    },
  };
};
