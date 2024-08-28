import { t, type DeclarationContent } from 'intlayer';

const loginButtonContent: DeclarationContent = {
  id: 'ext-login-button',
  span: t({
    en: 'or',
    fr: 'ou',
    es: 'o',
  }),
  github: {
    label: t({
      en: 'Sign in with GitHub',
      fr: 'Se connecter avec GitHub',
      es: 'Iniciar sesión con GitHub',
    }),
    ariaLabel: t({
      en: 'Sign in with GitHub',
      fr: 'Se connecter avec GitHub',
      es: 'Iniciar sesión con GitHub',
    }),
  },
  google: {
    label: t({
      en: 'Sign in with Google',
      fr: 'Se connecter avec Google',
      es: 'Iniciar sesión con Google',
    }),
    ariaLabel: t({
      en: 'Sign in with Google',
      fr: 'Se connecter avec Google',
      es: 'Iniciar sesión con Google',
    }),
  },
};

export default loginButtonContent;
