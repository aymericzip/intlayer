import {
  cond,
  type Dictionary,
  enu,
  file,
  gender,
  html,
  insert,
  md,
  plural,
  t,
} from 'intlayer';

const fakeFetch = async () =>
  new Promise<string>((resolve) =>
    setTimeout(() => resolve('Content fetched from server'), 200)
  );

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
      fr: "Félicitations ! Votre application est en cours d'exécution. 🎉",
      es: '¡Felicidades! Tu aplicación está en ejecución. 🎉',
    }),

    // Markdown
    markdownContent: md(
      '# Markdown Title\n\nThis is **bold** text in markdown.'
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

    // Plural
    pluralContent: plural({
      one: t({
        en: '{{count}} item',
        fr: '{{count}} article',
        es: '{{count}} artículo',
      }),
      other: t({
        en: '{{count}} items',
        fr: '{{count}} articles',
        es: '{{count}} artículos',
      }),
    }),

    // Array of strings
    arrayStrings: ['item1', 'item2', 'item3'],

    // Array of translations
    arrayTranslations: [
      t({ en: 'First', fr: 'Premier', es: 'Primero' }),
      t({ en: 'Second', fr: 'Deuxième', es: 'Segundo' }),
      t({ en: 'Third', fr: 'Troisième', es: 'Tercero' }),
    ],

    // Array of objects
    arrayObjects: [
      {
        name: t({ en: 'Alice', fr: 'Alice', es: 'Alice' }),
        role: t({ en: 'Developer', fr: 'Développeuse', es: 'Desarrolladora' }),
      },
      {
        name: t({ en: 'Bob', fr: 'Bob', es: 'Bob' }),
        role: t({ en: 'Designer', fr: 'Concepteur', es: 'Diseñador' }),
      },
    ],
  },
} satisfies Dictionary;

export default appContent;
