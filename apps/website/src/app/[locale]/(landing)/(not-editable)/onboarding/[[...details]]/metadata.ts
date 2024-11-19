import { type IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';
import { locales } from '../../../../../../../intlayer.config';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  return {
    title: t<string>({
      en: 'Intlayer | Onboarding',
      fr: 'Intlayer | Intégration',
      es: 'Intlayer | Incorporación',
    }),
    description: t<string>({
      en: 'Get started with Intlayer by completing the onboarding process. Follow each step to set up your account efficiently.',
      fr: "Commencez avec Intlayer en complétant le processus d'intégration. Suivez chaque étape pour configurer votre compte efficacement.",
      es: 'Comienza con Intlayer completando el proceso de incorporación. Sigue cada paso para configurar tu cuenta de manera eficiente.',
    }),

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
      languages: locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]: `/${locale}${PagesRoutes.Onboarding}`,
        }),
        {}
      ),
    },
  };
};
