import { t, type Dictionary } from 'intlayer';

const homeScreenContent = {
  key: 'home-screen',
  content: {
    title: t({
      en: 'Welcome!',
      fr: 'Bienvenue!',
      es: '¡Bienvenido!',
    }),
    steps: {
      step1: {
        title: t({
          en: 'Step 1: Try it',
          fr: 'Étape 1 : Essayez-le',
          es: 'Paso 1: Pruébalo',
        }),
        description: {
          edit: t({
            en: 'Edit ',
            fr: 'Modifiez ',
            es: 'Edita ',
          }),
          path: 'app/(tabs)/index.tsx',
          toSeeChanges: t({
            en: 'to see changes. Press ',
            fr: 'pour voir les modifications. Appuyez sur ',
            es: 'para ver los cambios. Presiona ',
          }),
          toOpen: t({
            en: ' to open developer tools.',
            fr: ' pour ouvrir les outils de développement.',
            es: ' para abrir las herramientas de desarrollo.',
          }),
        },
        platformKeys: {
          ios: 'cmd + d',
          android: 'cmd + m',
          web: 'F12',
        },
      },
      step2: {
        title: t({
          en: 'Step 2: Explore',
          fr: 'Étape 2 : Explorez',
          es: 'Paso 2: Explora',
        }),
        description: t({
          en: "Tap the Explore tab to learn more about what's included in this starter app.",
          fr: "Appuyez sur l'onglet Explorer pour en savoir plus sur ce qui est inclus dans cette application de démarrage.",
          es: 'Toca la pestaña Explorar para aprender más sobre lo que incluye esta aplicación inicial.',
        }),
      },
      step3: {
        title: t({
          en: 'Step 3: Get a fresh start',
          fr: 'Étape 3 : Recommencez à zéro',
          es: 'Paso 3: Comienza de nuevo',
        }),
        description: {
          whenYoureReady: t({
            en: "When you're ready, run ",
            fr: 'Lorsque vous êtes prêt, exécutez ',
            es: 'Cuando estés listo, ejecuta ',
          }),
          npmRunResetProject: 'npm run reset-project',
          toGetFresh: t({
            en: ' to get a fresh ',
            fr: ' pour obtenir un nouveau répertoire ',
            es: ' para obtener un nuevo directorio ',
          }),
          appDirectory: 'app',
          directory: t({
            en: ' directory. This will move the current ',
            fr: " répertoire. Cela déplacera l'application actuelle ",
            es: ' directorio. Esto moverá la aplicación actual ',
          }),
          to: t({
            en: ' to ',
            fr: ' vers ',
            es: ' a ',
          }),
          appExample: 'app-example',
        },
      },
    },
  },
} satisfies Dictionary;

export default homeScreenContent;
