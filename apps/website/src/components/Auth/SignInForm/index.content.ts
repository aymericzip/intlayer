import { type DeclarationContent, t } from 'intlayer';

const signInContent: DeclarationContent = {
  id: 'sign-in-form',
  forgotPasswordLink: {
    ariaLabel: t({
      en: 'Forgot your password?',
      fr: 'Mot de passe oublié ?',
      es: '¿Olvidaste tu contraseña?',
    }),
    text: t({
      en: 'Forgot password?',
      fr: 'Mot de passe oublié ?',
      es: '¿Olvidaste tu contraseña?',
    }),
  },
  emailInput: {
    label: t({
      en: 'Email address',
      fr: 'Adresse e-mail',
      es: 'Dirección de correo electrónico',
    }),
    placeholder: t({
      en: 'Enter e-mail address',
      fr: 'Entrez votre adresse e-mail',
      es: 'Ingrese su dirección de correo electrónico',
    }),
  },
  passwordInput: {
    label: t({
      en: 'Password',
      fr: 'Mot de passe',
      es: 'Contraseña',
    }),
    placeholder: t({
      en: 'Enter password',
      fr: 'Entrez votre mot de passe',
      es: 'Ingrese su contraseña',
    }),
  },
  loginButton: {
    text: t({
      en: 'Log in',
      fr: 'Se connecter',
      es: 'Iniciar sesión',
    }),
    ariaLabel: t({
      en: 'Click to log in',
      fr: 'Cliquez pour vous connecter',
      es: 'Haga clic para iniciar sesión',
    }),
  },
  signInButton: {
    text: t({
      en: 'Log in',
      fr: 'Se connecter',
      es: 'Iniciar sesión',
    }),
    ariaLabel: t({
      en: 'Click to log in',
      fr: 'Cliquez pour vous connecter',
      es: 'Haga clic para iniciar sesión',
    }),
  },
  signUpLink: {
    message: t({
      en: 'Don’t have an account?',
      fr: 'Vous n’avez pas de compte ?',
      es: '¿No tienes una cuenta?',
    }),
    ariaLabel: t({
      en: 'Click to go to create an account page',
      fr: 'Cliquez pour aller à la page de création de compte',
      es: 'Haga clic para ir a la página de creación de cuenta',
    }),
    text: t({
      en: 'Create an account',
      fr: 'Créer un compte',
      es: 'Crear una cuenta',
    }),
  },
};

export default signInContent;
