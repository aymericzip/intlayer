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

    // plural() wrapping html() — the `{{count}}` placeholder must be
    // interpolated inside the raw HTML string before it is rendered.
    pluralHtmlContent: t({
      en: plural({
        one: html('<b>{{count}}</b> day'),
        other: html('<b>{{count}}</b> days'),
      }),
      fr: plural({
        one: html('<b>{{count}}</b> jour'),
        other: html('<b>{{count}}</b> jours'),
      }),
      es: plural({
        one: html('<b>{{count}}</b> día'),
        other: html('<b>{{count}}</b> días'),
      }),
    }),

    // insert() wrapping html() — the `{{name}}` placeholder must be
    // interpolated inside the raw HTML string before it is rendered.
    insertHtmlContent: insert(
      t({
        en: html('Hello <b>{{name}}</b>'),
        fr: html('Bonjour <b>{{name}}</b>'),
        es: html('Hola <b>{{name}}</b>'),
      })
    ),

    // plural() wrapping md() — the `{{count}}` placeholder must be
    // interpolated inside the raw Markdown string before it is rendered.
    pluralMdContent: t({
      en: plural({
        one: md('**{{count}}** day'),
        other: md('**{{count}}** days'),
      }),
      fr: plural({
        one: md('**{{count}}** jour'),
        other: md('**{{count}}** jours'),
      }),
      es: plural({
        one: md('**{{count}}** día'),
        other: md('**{{count}}** días'),
      }),
    }),

    // insert() wrapping md() — the `{{name}}` placeholder must be
    // interpolated inside the raw Markdown string before it is rendered.
    insertMdContent: insert(
      t({
        en: md('Hello **{{name}}**'),
        fr: md('Bonjour **{{name}}**'),
        es: md('Hola **{{name}}**'),
      })
    ),

    // File
    fileContent: file('../assets/test.txt'),
  },
} satisfies Dictionary;

export default appContent;
