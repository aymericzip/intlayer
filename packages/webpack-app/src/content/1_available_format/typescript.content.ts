import { t, type ContentModule } from 'intlayer';

const tsContent: ContentModule = {
  id: 'tsFile',
  profileText: t({
    en: 'Manage profile',
    fr: 'Gérer le profil',
    es: 'Administrar perfil',
  }),
};

export default tsContent;
