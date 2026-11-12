import { type Dictionary, t } from 'intlayer';

const dataContent = {
  key: 'data',
  content: {
    description: t({
      en: 'This data was fetched and localized on the server.',
      es: 'Estas datos fueron recuperados y localizados en el servidor.',
      fr: 'Ces données ont été récupérées et localisées sur le serveur.',
    }),
    title: t({
      en: 'Data Content',
      es: 'Contenido de las datos',
      fr: 'Contenu des données',
    }),
  },
} satisfies Dictionary;

export default dataContent;
