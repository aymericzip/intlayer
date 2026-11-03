import { type Dictionary, t } from 'intlayer';

const testContent = {
  key: 'test',
  content: {
    clickMeShouldBeExtracted: t({
      en: 'Click me (should be extracted)',
      es: 'Haz clic aquí (debería extraerse)',
      fr: 'Cliquez ici (doit être extrait)',
    }),
    helloWorld2ShouldBe: t({
      en: 'Hello World 2 (should be extracted)',
      es: 'Hola Mundo 2 (debería extraerse)',
      fr: 'Bonjour le monde 2 (doit être extrait)',
    }),
    helloWorldShouldBeExtracted: t({
      en: 'Hello World (should be extracted)',
      es: 'Hola Mundo (debería extraerse)',
      fr: 'Bonjour le monde (doit être extrait)',
    }),
    imAListOfItems: t({
      en: "I'm a list of items (should be extracted as returned by the function)",
      es: 'Soy una lista de elementos (debería extraerse tal como la devuelve la función)',
      fr: "Je suis une liste d'éléments (doit être extrait comme renvoyé par la fonction)",
    }),
    imAListOfItems1: t({
      en: "I'm a list of items (should be extracted as returned by the function)",
      es: 'Soy una lista de elementos (debería extraerse tal como la devuelve la función)',
      fr: "Je suis une liste d'éléments (doit être extrait comme renvoyé par la fonction)",
    }),
    imASecondListOf: t({
      en: "I'm a second list of items",
      es: 'Soy una segunda lista de elementos',
      fr: "Je suis une deuxième liste d'éléments",
    }),
    imASecondListOf1: t({
      en: "I'm a second list of items",
      es: 'Soy una segunda lista de elementos',
      fr: "Je suis une deuxième liste d'éléments",
    }),
    imASecondListOf2: t({
      en: "I'm a second list of items",
      es: 'Soy una segunda lista de elementos',
      fr: "Je suis une deuxième liste d'éléments",
    }),
    thisIsAParagraphOn: t({
      en: 'This is a paragraph on several lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      es: 'Este es un párrafo en varias líneas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      fr: 'Ceci est un paragraphe sur plusieurs lignes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    }),
    thisIsARandomFunction: t({
      en: "This is a random function return should be extracted because it's returned by the function",
      es: 'Esta es una devolución aleatoria de la función y debería extraerse porque es devuelta por la función',
      fr: "Ceci est un retour de fonction aléatoire qui doit être extrait parce qu'il est renvoyé par la fonction",
    }),
    thisIsASentenceIf: t({
      en: 'This is a sentence if a state (should be extracted)',
      es: 'Esta es una oración si hay un estado (debería extraerse)',
      fr: 'Ceci est une phrase si un état (doit être extrait)',
    }),
    thisIsASentenceIf1: t({
      en: 'This is a sentence if a state changed. Because state is returned as reactNode, this sentence should be extracted',
      es: 'Esta es una oración si el estado cambió. Porque el estado se devuelve como reactNode, esta oración debería extraerse',
      fr: "Ceci est une phrase si un état a changé. Parce que l'état est renvoyé en tant que reactNode, cette phrase doit être extraite",
    }),
    thisIsAStringIncluding: t({
      en: 'This is a string including \'"!@#$%^&*()_+-=[]',
      es: 'Esta es una cadena que incluye \'\\"!@#$%^&*()_+-=[]',
      fr: 'Ceci est une chaîne incluant \'"!@#$%^&*()_+-=[]',
    }),
    thisIsATestShould: t({
      en: 'This is a test (should be extracted)',
      es: 'Esto es una prueba (debería extraerse)',
      fr: 'Ceci est un test (doit être extrait)',
    }),
    thisIsTheAriaLabel: t({
      en: 'This is the aria-label (should be extracted)',
      es: 'Este es el aria-label (debería extraerse)',
      fr: "Ceci est l'aria-label (doit être extrait)",
    }),
    thisIsThePlaceholderShould: t({
      en: 'This is the placeholder (should be extracted)',
      es: 'Este es el marcador de posición (debería extraerse)',
      fr: 'Ceci est le placeholder (doit être extrait)',
    }),
    thisIsTheTextOf: t({
      en: 'This is the text of the option 1 (should be extracted)',
      es: 'Este es el texto de la opción 1 (debería extraerse)',
      fr: "Ceci est le texte de l'option 1 (doit être extrait)",
    }),
    thisIsTheTextOf1: t({
      en: 'This is the text of the option 2 (should be extracted)',
      es: 'Este es el texto de la opción 2 (debería extraerse)',
      fr: "Ceci est le texte de l'option 2 (doit être extrait)",
    }),
    thisIsTheTextOf2: t({
      en: 'This is the text of the option 3 (should be extracted)',
      es: 'Este es el texto de la opción 3 (debería extraerse)',
      fr: "Ceci est le texte de l'option 3 (doit être extrait)",
    }),
    thisTextShouldBeExtracted: t({
      en: 'This text should be extracted',
      es: 'Este texto debería extraerse',
      fr: 'Ce texte doit être extrait',
    }),
  },
  title: 'Test content',
  description:
    "Content dictionary for test-related UI strings used in the 'test' component/page. Includes labels, placeholders, aria-labels, option texts, sample paragraphs and other strings intended for localization and extraction.",
  tags: ['test', 'ui', 'localization', 'sample content'],
} satisfies Dictionary;

export default testContent;
