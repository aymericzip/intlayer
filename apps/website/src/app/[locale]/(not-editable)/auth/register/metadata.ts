import { type IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';
import { locales } from '../../../../../../intlayer.config';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  return {
    title: t<string>({
      en: 'Intlayer | Register',
      fr: 'Intlayer | Inscription',
      es: 'Intlayer | Registrarse',
    }),
    description: t<string>({
      en: 'Create a new account on Intlayer to start exploring personalized content and features.',
      fr: 'Créez un nouveau compte sur Intlayer pour commencer à explorer des contenus et fonctionnalités personnalisés.',
      es: 'Crea una nueva cuenta en Intlayer para comenzar a explorar contenido y funciones personalizadas.',
    }),

    keywords: t<string[]>({
      en: ['Register', 'Sign up', 'Intlayer', 'Account', 'React', 'JavaScript'],
      fr: [
        'Inscription',
        "S'inscrire",
        'Intlayer',
        'Compte',
        'React',
        'JavaScript',
      ],
      es: [
        'Registrarse',
        'Crear cuenta',
        'Intlayer',
        'Cuenta',
        'React',
        'JavaScript',
      ],
    }),

    alternates: {
      canonical: PagesRoutes.Auth_SignUp,
      languages: locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]: `/${locale}${PagesRoutes.Auth_SignUp}`,
        }),
        {}
      ),
    },
  };
};
