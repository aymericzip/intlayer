import { type Dictionary, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    hello: t({
      en: 'Hello',
      fr: 'Bonjour',
      es: 'Hola',
    }),
    congratulations: t({
      en: 'Congratulations! Your app is running. 🎉',
      fr: "Félicitations ! Votre application est en cours d'exécution. 🎉",
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
      es: 'Aprender con los Tutoriales',
    }),
    aiPromptBestPractices: t({
      en: 'Prompt and best practices for AI',
      fr: "Prompts et meilleures pratiques pour l'IA",
      es: 'Instrucciones y mejores prácticas para la IA',
    }),
    cliDocs: t({
      en: 'CLI Docs',
      fr: 'Docs CLI',
      es: 'Docs de CLI',
    }),
    angularLanguageService: t({
      en: 'Angular Language Service',
      fr: 'Service de Langage Angular',
      es: 'Servicio de Lenguaje Angular',
    }),
    angularDevTools: t({
      en: 'Angular DevTools',
      fr: 'DevTools Angular',
      es: 'DevTools de Angular',
    }),
    github: 'Github',
    x: 'X (Twitter)',
    youtube: 'Youtube',
  },
} satisfies Dictionary;

export default appContent;
