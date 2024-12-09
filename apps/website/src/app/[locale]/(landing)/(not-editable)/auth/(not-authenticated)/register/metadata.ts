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
    en: 'Register | Intlayer',
    fr: 'Inscription | Intlayer',
    es: 'Registrarse | Intlayer',
  });

  const description = t<string>({
    en: 'Create a new account on Intlayer to start exploring personalized content and features.',
    fr: 'Créez un nouveau compte sur Intlayer pour commencer à explorer des contenus et fonctionnalités personnalisés.',
    es: 'Crea una nueva cuenta en Intlayer para comenzar a explorar contenido y funciones personalizadas.',
  });

  return {
    title,
    description,

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
      languages: getMultilingualUrls(PagesRoutes.Auth_SignUp),
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignUp}`,
        locale
      ),
      title,
      description,
    },
  };
};
