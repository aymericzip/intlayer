import { type DeclarationContent, t } from 'intlayer';

export const registerStepContent = {
  key: 'register-step',
  content: {
    title: t({
      en: 'Create your account',
      fr: 'Créez votre compte',
      es: 'Crea tu cuenta',
    }),

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
  },
} satisfies DeclarationContent;

export default registerStepContent;
