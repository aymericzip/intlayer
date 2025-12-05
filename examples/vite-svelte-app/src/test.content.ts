import { type Dictionary, t } from 'intlayer';

const testContent = {
  key: 'test',
  content: {
    helloWorldShouldBeExtracted: t({
      en: 'Hello World (should be extracted)',
      fr: 'Bonjour le monde (doit être extrait)',
      es: 'Hola Mundo (debería extraerse)',
    }),
    thisIsATestShould: t({
      en: 'This is a test (should be extracted)',
      fr: 'Ceci est un test (doit être extrait)',
      es: 'Esto es una prueba (debería extraerse)',
    }),
    thisIsThePlaceholderShould: t({
      en: 'This is the placeholder (should be extracted)',
      fr: 'Ceci est le placeholder (doit être extrait)',
      es: 'Este es el marcador de posición (debería extraerse)',
    }),
    thisIsTheAriaLabel: t({
      en: 'This is the aria-label (should be extracted)',
      fr: "Ceci est l'aria-label (doit être extrait)",
      es: 'Este es el aria-label (debería extraerse)',
    }),
    thisIsTheTextOf: t({
      en: 'This is the text of the option 1 (should be extracted)',
      fr: "Ceci est le texte de l'option 1 (doit être extrait)",
      es: 'Este es el texto de la opción 1 (debería extraerse)',
    }),
    thisIsTheTextOf1: t({
      en: 'This is the text of the option 2 (should be extracted)',
      fr: "Ceci est le texte de l'option 2 (doit être extrait)",
      es: 'Este es el texto de la opción 2 (debería extraerse)',
    }),
    thisIsTheTextOf2: t({
      en: 'This is the text of the option 3 (should be extracted)',
      fr: "Ceci est le texte de l'option 3 (doit être extrait)",
      es: 'Este es el texto de la opción 3 (debería extraerse)',
    }),
    thisIsAStringIncluding: t({
      en: 'This is a string including \'"!@#$%^&*()_+-=[]',
      fr: 'Ceci est une chaîne incluant \'"!@#$%^&*()_+-=[]',
      es: 'Esta es una cadena que incluye \'\\"!@#$%^&*()_+-=[]',
    }),
    thisIsAParagraphOn: t({
      en: 'This is a paragraph on several lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      fr: 'Ceci est un paragraphe sur plusieurs lignes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      es: 'Este es un párrafo en varias líneas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    }),
    thisTextShouldBeExtracted: t({
      en: 'This text should be extracted',
      fr: 'Ce texte doit être extrait',
      es: 'Este texto debería extraerse',
    }),
    clickMeShouldBeExtracted: t({
      en: 'Click me (should be extracted)',
      fr: 'Cliquez ici (doit être extrait)',
      es: 'Haz clic aquí (debería extraerse)',
    }),
    helloWorld2ShouldBe: t({
      en: 'Hello World 2 (should be extracted)',
      fr: 'Bonjour le monde 2 (doit être extrait)',
      es: 'Hola Mundo 2 (debería extraerse)',
    }),
    thisIsARandomFunction: t({
      en: "This is a random function return should be extracted because it's returned by the function",
      fr: "Ceci est un retour de fonction aléatoire qui doit être extrait parce qu'il est renvoyé par la fonction",
      es: 'Esta es una devolución aleatoria de la función y debería extraerse porque es devuelta por la función',
    }),
    thisIsASentenceIf: t({
      en: 'This is a sentence if a state (should be extracted)',
      fr: 'Ceci est une phrase si un état (doit être extrait)',
      es: 'Esta es una oración si hay un estado (debería extraerse)',
    }),
    imAListOfItems: t({
      en: "I'm a list of items (should be extracted as returned by the function)",
      fr: "Je suis une liste d'éléments (doit être extrait comme renvoyé par la fonction)",
      es: 'Soy una lista de elementos (debería extraerse tal como la devuelve la función)',
    }),
    imAListOfItems1: t({
      en: "I'm a list of items (should be extracted as returned by the function)",
      fr: "Je suis une liste d'éléments (doit être extrait comme renvoyé par la fonction)",
      es: 'Soy una lista de elementos (debería extraerse tal como la devuelve la función)',
    }),
    imASecondListOf: t({
      en: "I'm a second list of items",
      fr: "Je suis une deuxième liste d'éléments",
      es: 'Soy una segunda lista de elementos',
    }),
    imASecondListOf1: t({
      en: "I'm a second list of items",
      fr: "Je suis une deuxième liste d'éléments",
      es: 'Soy una segunda lista de elementos',
    }),
    imASecondListOf2: t({
      en: "I'm a second list of items",
      fr: "Je suis une deuxième liste d'éléments",
      es: 'Soy una segunda lista de elementos',
    }),
    thisIsASentenceIf1: t({
      en: 'This is a sentence if a state changed. Because state is returned as reactNode, this sentence should be extracted',
      fr: "Ceci est une phrase si un état a changé. Parce que l'état est renvoyé en tant que reactNode, cette phrase doit être extraite",
      es: 'Esta es una oración si el estado cambió. Porque el estado se devuelve como reactNode, esta oración debería extraerse',
    }),
  },
  title: 'Test content',
  description:
    "Content dictionary for test-related UI strings used in the 'test' component/page. Includes labels, placeholders, aria-labels, option texts, sample paragraphs and other strings intended for localization and extraction.",
  tags: ['test', 'ui', 'localization', 'sample content'],
} satisfies Dictionary;

export default testContent;
