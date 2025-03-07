import { t, type Dictionary } from 'intlayer';

const notFoundScreenContent = {
  key: 'not-found-screen',
  content: {
    screenTitle: t({
      en: 'Oops!',
      fr: 'Oups !',
      es: '¡Vaya!',
    }),
    title: t({
      en: "This screen doesn't exist.",
      fr: "Cet écran n'existe pas.",
      es: 'Esta pantalla no existe.',
    }),
    linkText: t({
      en: 'Go to home screen!',
      fr: "Aller à l'écran d'accueil !",
      es: '¡Ir a la pantalla de inicio!',
    }),
  },
} satisfies Dictionary;

export default notFoundScreenContent;
