import { type Dictionary, t } from 'intlayer';

const dataContent = {
  key: 'data',
  content: {
    title: t({
      en: 'Data Content',
      fr: 'Contenu des données',
      es: 'Contenido de las datos',
    }),
    description: t({
      en: 'This data was fetched and localized on the server.',
      fr: 'Ces données ont été récupérées et localisées sur le serveur.',
      es: 'Estas datos fueron recuperados y localizados en el servidor.',
    }),
  },
} satisfies Dictionary;

export default dataContent;
