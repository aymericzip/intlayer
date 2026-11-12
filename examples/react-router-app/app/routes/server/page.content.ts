import { type Dictionary, t } from 'intlayer';

const serverExampleContent = {
  key: 'server-example',
  content: {
    description: t({
      en: 'This data was fetched and localized on the server.',
      es: 'Estos datos fueron recuperados y localizados en el servidor.',
      fr: 'Ces données ont été récupérées et localisées sur le serveur.',
    }),
    title: t({
      en: 'Server-Side Content',
      es: 'Contenido del lado del servidor',
      fr: 'Contenu côté serveur',
    }),
  },
} satisfies Dictionary;

export default serverExampleContent;
