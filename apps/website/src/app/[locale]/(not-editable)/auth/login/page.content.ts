import { t, type DeclarationContent } from 'intlayer';

const signInContent: DeclarationContent = {
  id: 'sign-in-page',
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
};

export default signInContent;
