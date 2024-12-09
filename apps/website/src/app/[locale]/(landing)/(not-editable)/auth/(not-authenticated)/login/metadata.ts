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
    en: 'Login | Intlayer',
    fr: 'Connexion | Intlayer',
    es: 'Iniciar sesión | Intlayer',
  });

  const description = t<string>({
    en: 'Log in to your Intlayer account to access exclusive content and manage your preferences.',
    fr: 'Connectez-vous à votre compte Intlayer pour accéder à du contenu exclusif et gérer vos préférences.',
    es: 'Inicie sesión en su cuenta de Intlayer para acceder a contenido exclusivo y administrar sus preferencias.',
  });

  return {
    title,
    description,

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

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignIn}`,
        locale
      ),
      title,
      description,
    },
  };
};
