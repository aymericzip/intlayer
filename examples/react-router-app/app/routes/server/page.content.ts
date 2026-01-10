import { type Dictionary, t } from 'intlayer';

const serverExampleContent = {
  key: 'server-example',
  content: {
    title: t({
      en: 'Server-Side Content',
      fr: 'Contenu côté serveur',
      es: 'Contenido del lado del servidor',
    }),
    description: t({
      en: 'This data was fetched and localized on the server.',
      fr: 'Ces données ont été récupérées et localisées sur le serveur.',
      es: 'Estos datos fueron recuperados y localizados en el servidor.',
    }),
  },
} satisfies Dictionary;

export default serverExampleContent;
