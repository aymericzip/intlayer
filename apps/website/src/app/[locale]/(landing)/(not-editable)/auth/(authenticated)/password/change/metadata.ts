import {
  type IConfigLocales,
  getLocalizedUrl,
  getMultilingualUrls,
  getTranslationContent,
} from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const title = t<string>({
    en: 'Change Password | Intlayer',
    fr: 'Changer le mot de passe | Intlayer',
    es: 'Cambiar la contraseña | Intlayer',
  });

  const description = t<string>({
    en: 'Secure your account by changing your current password. Keep your Intlayer account safe with a new password.',
    fr: 'Sécurisez votre compte en changeant votre mot de passe actuel. Gardez votre compte Intlayer en sécurité avec un nouveau mot de passe.',
    es: 'Asegura tu cuenta cambiando tu contraseña actual. Mantén segura tu cuenta de Intlayer con una nueva contraseña.',
  });

  return {
    title,
    description,

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
      languages: getMultilingualUrls(PagesRoutes.Auth_ChangePassword),
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_ChangePassword}`,
        locale
      ),
      title,
      description,
    },
  };
};
