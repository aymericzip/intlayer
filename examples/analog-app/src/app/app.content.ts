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
    // Function Fetching (Async)
    asyncFunctionContent: fakeFetch,

    // Enumeration
    cars: enu({
      '0': 'No cars',
      '1': 'One car',
      '>1': 'Multiple cars',
    }),

    // Condition
    conditionalContent: cond({
      true: 'Condition is TRUE',
      false: 'Condition is FALSE',
      fallback: 'Condition is UNKNOWN',
    }),

    congratulations: t({
      en: 'Congratulations! Your app is running. 🎉',
      es: '¡Felicidades! Tu aplicación está en ejecución. 🎉',
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
    }),

    // File
    fileContent: file('../assets/test.txt'),
    // Function Fetching (Sync)
    functionContent: () => 'This is content from a synchronous function',

    // Gender
    genderContent: gender({
      male: 'Hello Sir',
      female: 'Hello Madam',
      fallback: 'Hello Human',
    }),

    // HTML
    htmlContent: html(
      '<span style="color: blue;">This is blue HTML text</span>'
    ),

    // insert() wrapping html() — the `{{name}}` placeholder must be
    // interpolated inside the raw HTML string before it is rendered.
    insertHtmlContent: insert(
      t({
        en: html('Hello <b>{{name}}</b>'),
        es: html('Hola <b>{{name}}</b>'),
        fr: html('Bonjour <b>{{name}}</b>'),
      })
    ),

    // insert() wrapping md() — the `{{name}}` placeholder must be
    // interpolated inside the raw Markdown string before it is rendered.
    insertMdContent: insert(
      t({
        en: md('Hello **{{name}}**'),
        es: md('Hola **{{name}}**'),
        fr: md('Bonjour **{{name}}**'),
      })
    ),

    // Insertion
    insertionContent: insert('Hello {{name}}, welcome to {{city}}'),

    // Markdown
    markdownContent: md(
      '# Markdown Title \n\n This is **bold** text in markdown.'
    ),

    // Nested
    nested: {
      deep: {
        text: 'Deeply nested content',
      },
    },

    // Plural
    pluralContent: plural({
      one: t({
        en: '{{count}} item',
        es: '{{count}} artículo',
        fr: '{{count}} article',
      }),
      other: t({
        en: '{{count}} items',
        es: '{{count}} artículos',
        fr: '{{count}} articles',
      }),
    }),

    // plural() wrapping html() — the `{{count}}` placeholder must be
    // interpolated inside the raw HTML string before it is rendered.
    pluralHtmlContent: t({
      en: plural({
        one: html('<b>{{count}}</b> day'),
        other: html('<b>{{count}}</b> days'),
      }),
      es: plural({
        one: html('<b>{{count}}</b> día'),
        other: html('<b>{{count}}</b> días'),
      }),
      fr: plural({
        one: html('<b>{{count}}</b> jour'),
        other: html('<b>{{count}}</b> jours'),
      }),
    }),

    // plural() wrapping md() — the `{{count}}` placeholder must be
    // interpolated inside the raw Markdown string before it is rendered.
    pluralMdContent: t({
      en: plural({
        one: md('**{{count}}** day'),
        other: md('**{{count}}** days'),
      }),
      es: plural({
        one: md('**{{count}}** día'),
        other: md('**{{count}}** días'),
      }),
      fr: plural({
        one: md('**{{count}}** jour'),
        other: md('**{{count}}** jours'),
      }),
    }),

    title: t({
      en: 'Hello',
      es: 'Hola',
      fr: 'Bonjour',
    }),
  },
} satisfies Dictionary;

export default appContent;
