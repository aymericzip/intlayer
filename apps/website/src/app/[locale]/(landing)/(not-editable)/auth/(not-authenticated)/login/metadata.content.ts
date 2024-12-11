import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'login-metadata',
  content: {
    title: t({
      en: 'Login | Intlayer',
      fr: 'Connexion | Intlayer',
      es: 'Iniciar sesión | Intlayer',
    }),
    description: t({
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
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
