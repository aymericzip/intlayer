import { type Dictionary, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    title: t({
      en: 'Hello',
      fr: 'Bonjour',
      es: 'Hola',
    }),
    congratulations: t({
      en: 'Congratulations! Your app is running. 🎉',
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: '¡Felicidades! Tu aplicación está en ejecución. 🎉',
    }),
  },
} satisfies Dictionary;

export default appContent;
