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
    en: 'Forgotten Password | Intlayer',
    fr: 'Mot de passe oublié | Intlayer',
    es: 'Contraseña olvidada | Intlayer',
  });

  const description = t<string>({
    en: 'Recover your Intlayer account by resetting your forgotten password. Follow the instructions to restore access.',
    fr: "Récupérez votre compte Intlayer en réinitialisant votre mot de passe oublié. Suivez les instructions pour restaurer l'accès.",
    es: 'Recupera tu cuenta de Intlayer restableciendo tu contraseña olvidada. Sigue las instrucciones para restaurar el acceso.',
  });

  return {
    title,
    description,

    keywords: t<string[]>({
      en: [
        'Forgotten password',
        'Password recovery',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      fr: [
        'Mot de passe oublié',
        'Récupération de mot de passe',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      es: [
        'Contraseña olvidada',
        'Recuperación de contraseña',
        'Intlayer',
        'React',
        'JavaScript',
      ],
    }),

    alternates: {
      canonical: PagesRoutes.Auth_ResetPassword,
      languages: getMultilingualUrls(PagesRoutes.Auth_ResetPassword),
    },

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_ResetPassword}`,
        locale
      ),
      title,
      description,
    },
  };
};
