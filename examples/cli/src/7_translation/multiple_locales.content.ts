import { t, type DeclarationContent } from 'intlayer';

const multipleLocalsContent = {
  key: 'multiple_locals',
  content: {
    profileText: t({
      en: 'Manage profile',
      fr: 'Gérer le profil',
      es: 'Administrar perfil',
    }),
  },
} satisfies DeclarationContent;

export default multipleLocalsContent;
