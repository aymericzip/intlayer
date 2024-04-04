import { t, type ContentModule } from 'intlayer';

const pageContent: ContentModule = {
  id: 'page',
  profileText: t({
    en: 'Manage profile',
    fr: 'Gérer le profil',
    es: 'Administrar perfil',
  }),
};

export default pageContent;
