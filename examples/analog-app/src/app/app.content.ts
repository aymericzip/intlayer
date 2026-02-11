import {
  cond,
  type Dictionary,
  enu,
  file,
  gender,
  html,
  insert,
  md,
  t,
} from 'intlayer';

// Mock async function
const fakeFetch = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('This is the content fetched from the server');
    }, 200);
  });
};

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

    // Markdown
    markdownContent: md(
      '# Markdown Title \n\n This is **bold** text in markdown.'
    ),

    // Enumeration
    cars: enu({
      '0': 'No cars',
      '1': 'One car',
      '>1': 'Multiple cars',
    }),

    // HTML
    htmlContent: html(
      '<span style="color: blue;">This is blue HTML text</span>'
    ),

    // Nested
    nested: {
      deep: {
        text: 'Deeply nested content',
      },
    },

    // Condition
    conditionalContent: cond({
      true: 'Condition is TRUE',
      false: 'Condition is FALSE',
      fallback: 'Condition is UNKNOWN',
    }),

    // Gender
    genderContent: gender({
      male: 'Hello Sir',
      female: 'Hello Madam',
      fallback: 'Hello Human',
    }),

    // Function Fetching (Sync)
    functionContent: () => 'This is content from a synchronous function',

    // Function Fetching (Async)
    asyncFunctionContent: fakeFetch,

    // Insertion
    insertionContent: insert('Hello {{name}}, welcome to {{city}}'),

    // File
    fileContent: file('../assets/test.txt'),
  },
} satisfies Dictionary;

export default appContent;
