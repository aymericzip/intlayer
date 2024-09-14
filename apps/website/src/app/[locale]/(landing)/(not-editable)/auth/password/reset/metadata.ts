import { type IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';
import { locales } from '../../../../../../../../intlayer.config';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  return {
    title: t<string>({
      en: 'Intlayer | Forgotten Password',
      fr: 'Intlayer | Mot de passe oublié',
      es: 'Intlayer | Contraseña olvidada',
    }),
    description: t<string>({
      en: 'Recover your Intlayer account by resetting your forgotten password. Follow the instructions to restore access.',
      fr: "Récupérez votre compte Intlayer en réinitialisant votre mot de passe oublié. Suivez les instructions pour restaurer l'accès.",
      es: 'Recupera tu cuenta de Intlayer restableciendo tu contraseña olvidada. Sigue las instrucciones para restaurar el acceso.',
    }),

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
      languages: locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]: `/${locale}${PagesRoutes.Auth_ResetPassword}`,
        }),
        {}
      ),
    },
  };
};
