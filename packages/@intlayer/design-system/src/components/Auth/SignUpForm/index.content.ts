import { t } from 'react-intlayer';

export const getSignUpContent = () => ({
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
  passwordConfirmationInput: {
    label: t({
      en: 'Password Confirmation',
      fr: 'Confirmation du mot de passe',
      es: 'Confirmación de contraseña',
    }),
    placeholder: t({
      en: 'Enter password again',
      fr: 'Entrez votre mot de passe à nouveau',
      es: 'Ingrese su contraseña nuevamente',
    }),
  },
  signUpButton: {
    text: t({
      en: 'Create account',
      fr: 'Créer un compte',
      es: 'Crear una cuenta',
    }),
    ariaLabel: t({
      en: 'Submit form to create account',
      fr: 'Soumettre le formulaire pour créer un compte',
      es: 'Enviar formulario para crear cuenta',
    }),
  },
  loginLink: {
    message: t({
      en: 'You already have an account?',
      fr: 'Vous avez déjà un compte ?',
      es: '¿Ya tienes una cuenta?',
    }),
    text: t({
      en: 'Log in',
      fr: 'Se connecter',
      es: 'Iniciar sesión',
    }),
    ariaLabel: t({
      en: 'Click to go to login page',
      fr: 'Cliquez pour aller à la page de connexion',
      es: 'Haz clic para ir a la página de inicio de sesión',
    }),
  },
});
