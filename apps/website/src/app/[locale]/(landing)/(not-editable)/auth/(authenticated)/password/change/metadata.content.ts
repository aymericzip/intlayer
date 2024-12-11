import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'change-password-metadata',
  content: {
    title: t({
      en: 'Change Password | Intlayer',
      fr: 'Changer le mot de passe | Intlayer',
      es: 'Cambiar la contraseña | Intlayer',
    }),
    description: t({
      en: 'Secure your account by changing your current password. Keep your Intlayer account safe with a new password.',
      fr: 'Sécurisez votre compte en changeant votre mot de passe actuel. Gardez votre compte Intlayer en sécurité avec un nouveau mot de passe.',
      es: 'Asegura tu cuenta cambiando tu contraseña actual. Mantén segura tu cuenta de Intlayer con una nueva contraseña.',
    }),

    keywords: t<string[]>({
      en: [
        'Change password',
        'Account security',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      fr: [
        'Changer le mot de passe',
        'Sécurité du compte',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      es: [
        'Cambiar la contraseña',
        'Seguridad de la cuenta',
        'Intlayer',
        'React',
        'JavaScript',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
