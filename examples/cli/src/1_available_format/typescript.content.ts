import { t, type DeclarationContent } from 'intlayer';

const tsContent = {
  key: 'tsFile',
  content: {
    profileText: t({
      en: 'Manage profile',
      fr: 'Gérer le profil',
      es: 'Administrar perfil',
    }),
  },
} satisfies DeclarationContent;

export default tsContent;
