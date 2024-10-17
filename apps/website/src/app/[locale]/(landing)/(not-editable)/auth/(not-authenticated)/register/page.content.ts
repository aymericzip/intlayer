import { t, type DeclarationContent } from 'intlayer';

const signUpContent = {
  key: 'sign-up-page',
  content: {
    title: t({
      en: 'Sign up',
      fr: 'Inscription',
      es: 'Registrarse',
    }),
    title2: t({
      en: 'Create an account',
      fr: 'Créer un compte',
      es: 'Crear una cuenta',
    }),
    description: t({
      en: 'Enter your email and password to create an account.',
      fr: 'Entrez votre adresse e-mail et votre mot de passe pour créer un compte.',
      es: 'Ingrese su correo electrónico y contraseña para crear una cuenta.',
    }),
  },
} satisfies DeclarationContent;

export default signUpContent;
