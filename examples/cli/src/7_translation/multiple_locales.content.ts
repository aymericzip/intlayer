import { t, type ContentModule } from 'intlayer';

const multipleLocalsContent: ContentModule = {
  id: 'multiple_locals',
  profileText: t({
    en: 'Manage profile',
    fr: 'Gérer le profil',
    es: 'Administrar perfil',
  }),
};

export default multipleLocalsContent;
