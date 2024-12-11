import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'register-metadata',
  content: {
    title: t({
      en: 'Register | Intlayer',
      fr: 'Inscription | Intlayer',
      es: 'Registrarse | Intlayer',
    }),
    description: t({
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
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
