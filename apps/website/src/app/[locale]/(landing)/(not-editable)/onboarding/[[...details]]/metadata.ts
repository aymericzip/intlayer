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
    en: 'Onboarding | Intlayer',
    fr: 'Intégration | Intlayer',
    es: 'Incorporación | Intlayer',
  });

  const description = t<string>({
    en: 'Get started with Intlayer by completing the onboarding process. Follow each step to set up your account efficiently.',
    fr: "Commencez avec Intlayer en complétant le processus d'intégration. Suivez chaque étape pour configurer votre compte efficacement.",
    es: 'Comienza con Intlayer completando el proceso de incorporación. Sigue cada paso para configurar tu cuenta de manera eficiente.',
  });

  return {
    title,
    description,
    keywords: t<string[]>({
      en: [
        'Onboarding',
        'Account setup',
        'Intlayer',
        'React',
        'JavaScript',
        'User guide',
      ],
      fr: [
        'Intégration',
        'Configuration de compte',
        'Intlayer',
        'React',
        'JavaScript',
        'Guide utilisateur',
      ],
      es: [
        'Incorporación',
        'Configuración de cuenta',
        'Intlayer',
        'React',
        'JavaScript',
        'Guía del usuario',
      ],
    }),
    alternates: {
      canonical: PagesRoutes.Onboarding,
      languages: getMultilingualUrls(PagesRoutes.Onboarding),
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Onboarding}`,
        locale
      ),
      title,
      description,
    },
  };
};
