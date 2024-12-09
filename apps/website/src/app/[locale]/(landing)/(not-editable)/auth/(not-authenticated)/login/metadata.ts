import {
  type IConfigLocales,
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

  return {
    title: t<string>({
      en: 'Intlayer | Login',
      fr: 'Intlayer | Connexion',
      es: 'Intlayer | Iniciar sesión',
    }),
    description: t<string>({
      en: 'Log in to your Intlayer account to access exclusive content and manage your preferences.',
      fr: 'Connectez-vous à votre compte Intlayer pour accéder à du contenu exclusif et gérer vos préférences.',
      es: 'Inicie sesión en su cuenta de Intlayer para acceder a contenido exclusivo y administrar sus preferencias.',
    }),

    keywords: t<string[]>({
      en: [
        'Login',
        'Account',
        'Intlayer',
        'Access',
        'Authentication',
        'Sign in',
      ],
      fr: [
        'Connexion',
        'Compte',
        'Intlayer',
        'Accès',
        'Authentification',
        'Se connecter',
      ],
      es: [
        'Iniciar sesión',
        'Cuenta',
        'Intlayer',
        'Acceso',
        'Autenticación',
        'Ingresar',
      ],
    }),

    alternates: {
      canonical: PagesRoutes.Auth_SignIn,
      languages: getMultilingualUrls(PagesRoutes.Auth_SignIn),
    },
  };
};
