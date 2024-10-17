import { t, type DeclarationContent } from 'intlayer';

const signInContent = {
  key: 'sign-in-page',
  content: {
    title: t({
      en: 'Sign in',
      fr: 'Se connecter',
      es: 'Iniciar sesión',
    }),
    title2: t({
      en: 'Sign in',
      fr: 'Se connecter',
      es: 'Se iniciar sesión',
    }),
    description: t({
      en: 'Enter your email and password to log in.',
      fr: 'Entrez votre adresse e-mail et votre mot de passe pour vous connecter.',
      es: 'Ingrese su correo electrónico y contraseña para iniciar sesión.',
    }),
  },
} satisfies DeclarationContent;

export default signInContent;
