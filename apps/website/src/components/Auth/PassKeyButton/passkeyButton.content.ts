import { type Dictionary, t } from 'intlayer';

const passkeyButtonContent = {
  key: 'passkey-button',
  content: {
    text: t({
      en: 'Use Passkey',
      fr: 'Utiliser une clé',
      es: 'Usar llave',
    }),
    ariaLabel: t({
      en: 'Sign in with passkey',
      fr: 'Se connecter avec une clé de sécurité',
      es: 'Iniciar sesión con llave',
    }),
  },
} satisfies Dictionary;

export default passkeyButtonContent;
