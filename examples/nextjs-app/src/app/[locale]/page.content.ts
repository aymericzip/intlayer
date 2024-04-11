import { t, type ContentModule } from 'intlayer';

const pageContent: ContentModule = {
  id: 'page',
  title: 'Example of Page content',
  profileText: t({
    en: 'Manage profile',
    fr: 'Gérer le profil',
    es: 'Administrar perfil',
  }),
};

export default pageContent;
