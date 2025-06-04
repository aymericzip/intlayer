import { t, type Dictionary } from 'intlayer';

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
    exploreDocs: t({
      en: 'Explore the Docs',
      fr: 'Explorer les Docs',
      es: 'Explorar los Docs',
    }),
    learnWithTutorials: t({
      en: 'Learn with Tutorials',
      fr: 'Apprendre avec les Tutoriels',
      es: 'Aprender con los Tutorios',
    }),
    cliDocs: 'CLI Docs',
    angularLanguageService: t({
      en: 'Angular Language Service',
      fr: 'Service de Langage Angular',
      es: 'Servicio de Lenguaje Angular',
    }),
    angularDevTools: 'Angular DevTools',
    github: 'Github',
    twitter: 'Twitter',
    youtube: 'Youtube',
  },
} satisfies Dictionary;

export default appContent;
