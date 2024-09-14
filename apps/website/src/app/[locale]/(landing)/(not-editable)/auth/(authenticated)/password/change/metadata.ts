import { type IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';
import { locales } from '../../../../../../../../../intlayer.config';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  return {
    title: t<string>({
      en: 'Intlayer | Change Password',
      fr: 'Intlayer | Changer le mot de passe',
      es: 'Intlayer | Cambiar la contraseña',
    }),
    description: t<string>({
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

    alternates: {
      canonical: PagesRoutes.Auth_ChangePassword,
      languages: locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]: `/${locale}${PagesRoutes.Auth_ChangePassword}`,
        }),
        {}
      ),
    },
  };
};
