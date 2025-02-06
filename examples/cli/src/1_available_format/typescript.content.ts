import { t, type Dictionary } from 'intlayer';

const tsContent = {
  key: 'tsFile',
  content: {
    profileText: t({
      en: 'Manage profile',
      fr: 'Gérer le profil',
      es: 'Administrar perfil',
    }),
  },
} satisfies Dictionary;

export default tsContent;
