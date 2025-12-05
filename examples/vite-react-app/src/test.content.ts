import { type Dictionary, t } from 'intlayer';

const helloWorldContent = {
  key: 'hello-world',
  content: {
    thisIsASentenceIf: t({
      en: 'This is a sentence if a state (should be extracted)',
      fr: 'Ceci est une phrase si un état (doit être extrait)',
      es: 'Esta es una frase si un estado (debe extraerse)',
    }),
    imAListOfItems: t({
      en: "I'm a list of items (should be extracted as returned by the function)",
      fr: "Je suis une liste d'éléments (doit être extrait telle que retournée par la fonction)",
      es: 'Soy una lista de elementos (debe extraerse tal como la devuelve la función)',
    }),
    imAListOfItems1: t({
      en: "I'm a list of items (should be extracted as returned by the function)",
      fr: "Je suis une liste d'éléments (doit être extrait telle que retournée par la fonction)",
      es: 'Soy una lista de elementos (debe extraerse tal como la devuelve la función)',
    }),
    imASecondListOf: t({
      en: "I'm a second list of items",
      fr: "Je suis une deuxième liste d'éléments",
      es: 'Soy una segunda lista de elementos (debe extraerse)',
    }),
    imASecondListOf1: t({
      en: "I'm a second list of items",
      fr: "Je suis une deuxième liste d'éléments",
      es: 'Soy una segunda lista de elementos (debe extraerse)',
    }),
    imASecondListOf2: t({
      en: "I'm a second list of items",
      fr: "Je suis une deuxième liste d'éléments",
      es: 'Soy una segunda lista de elementos (debe extraerse)',
    }),
    thisIsASentenceIf1: t({
      en: 'This is a sentence if a state changed. Because state is returned as reactNode, this sentence should be extracted',
      fr: "Ceci est une phrase si l'état a changé. Parce que l'état est retourné en tant que ReactNode, cette phrase doit être extraite",
      es: 'Esta es una frase si un estado cambió. Como el estado se devuelve como reactNode, esta frase debe extraerse',
    }),
    helloWorldShouldBeExtracted: t({
      en: 'Hello World (should be extracted)',
      fr: 'Bonjour le monde (doit être extrait)',
      es: 'Hola Mundo (debe extraerse)',
    }),
    imATestShouldBe: t({
      en: "I'm a test (should be extracted)",
      fr: 'Je suis un test (doit être extrait)',
      es: 'Soy una prueba (debe extraerse)',
    }),
    thisIsATestShould: t({
      en: 'This is a test (should be extracted)',
      fr: 'Ceci est un test (doit être extrait)',
      es: 'Esta es una prueba (debe extraerse)',
    }),
    clickedShouldBeExtracted: t({
      en: 'Clicked (should be extracted)',
      fr: 'Cliqué (doit être extrait)',
      es: 'Pulsado (debe extraerse)',
    }),
    clickMeShouldBeExtracted: t({
      en: 'Click me (should be extracted)',
      fr: 'Cliquez-moi (doit être extrait)',
      es: 'Haz clic en mí (debe extraerse)',
    }),
    thisIsThePlaceholderShould: t({
      en: 'This is the placeholder (should be extracted)',
      fr: "Ceci est le texte d'espace réservé (doit être extrait)",
      es: 'Este es el marcador de posición (debe extraerse)',
    }),
    thisIsTheAriaLabel: t({
      en: 'This is the aria-label (should be extracted)',
      fr: "Ceci est l'aria-label (doit être extrait)",
      es: 'Esta es la aria-label (debe extraerse)',
    }),
    thisIsTheTextOf: t({
      en: 'This is the text of the option 1 (should be extracted)',
      fr: "Ceci est le texte de l'option 1 (doit être extrait)",
      es: 'Este es el texto de la opción 1 (debe extraerse)',
    }),
    thisIsTheTextOf1: t({
      en: 'This is the text of the option 2 (should be extracted)',
      fr: "Ceci est le texte de l'option 2 (doit être extrait)",
      es: 'Este es el texto de la opción 2 (debe extraerse)',
    }),
    thisIsTheTextOf2: t({
      en: 'This is the text of the option 3 (should be extracted)',
      fr: "Ceci est le texte de l'option 3 (doit être extrait)",
      es: 'Este es el texto de la opción 3 (debe extraerse)',
    }),
    thisIsAStringIncluding: t({
      en: 'This is a string including \'"!@#$%^&*()_+-=[]',
      fr: 'Ceci est une chaîne incluant \'"!@#$%^&*()_+-=[]',
      es: 'Esta es una cadena que incluye \'"!@#$%^&*()_+-=[]',
    }),
    thisIsAParagraphOn: t({
      en: 'This is a paragraph on several lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      fr: 'Ceci est un paragraphe sur plusieurs lignes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      es: 'Este es un párrafo en varias líneas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    }),
    thisTextShouldBeExtracted: t({
      en: 'This text should be extracted',
      fr: 'Ce texte doit être extrait',
      es: 'Este texto debe extraerse',
    }),
    clickMeShouldBeExtracted1: t({
      en: 'Click me (should be extracted)',
      fr: 'Cliquez-moi (doit être extrait)',
      es: 'Haz clic en mí (debe extraerse)',
    }),
    helloWorld2ShouldBe: t({
      en: 'Hello World 2 (should be extracted)',
      fr: 'Bonjour le monde 2 (doit être extrait)',
      es: 'Hola Mundo 2 (debe extraerse)',
    }),
    helloWorld2ShouldBe1: t({
      en: 'Hello World 2 (should be extracted)',
      fr: 'Bonjour le monde 2 (doit être extrait)',
      es: 'Hola Mundo 2 (debe extraerse)',
    }),
    thisIsATest2: t({
      en: 'This is a test 2 (should be extracted)',
      fr: 'Ceci est un test 2 (doit être extrait)',
      es: 'Esta es una prueba 2 (debe extraerse)',
    }),
    thisIsARandomFunction: t({
      en: "This is a random function return should be extracted because it's returned by the function",
      fr: 'Ceci est une valeur de fonction aléatoire qui doit être extraite car elle est renvoyée par la fonction',
      es: 'Este es el valor devuelto por una función aleatoria y debe extraerse porque se devuelve por la función',
    }),
  },
  title: 'Hello World content',
  description:
    "Content dictionary for the 'hello-world' example. Contains multiple localized strings used across a component or page, including sentences, list items, UI labels, placeholders, aria labels, options, paragraphs and test strings for extraction and localization.",
  tags: ['hello world', 'content', 'example', 'localization', 'ui', 'test'],
} satisfies Dictionary;

export default helloWorldContent;
