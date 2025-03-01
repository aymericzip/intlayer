# Iniziare la dichiarazione del tuo contenuto

## Estensioni dei file

Per impostazione predefinita, Intlayer monitora tutti i file con le seguenti estensioni per le dichiarazioni di contenuto:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

L'applicazione cercherà i file che corrispondono al pattern glob `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` per impostazione predefinita.

Queste estensioni predefinite sono adatte per la maggior parte delle applicazioni. Tuttavia, se hai requisiti specifici, consulta la [guida alla personalizzazione delle estensioni di contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md#content-configuration) per istruzioni su come gestirle.

Per un elenco completo delle opzioni di configurazione, visita la documentazione di configurazione.

## Dichiarare il tuo contenuto

Crea e gestisci i tuoi dizionari:

```tsx fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
    };
    multilingualContent: string;
    quantityContent: string;
    conditionalContent: string;
    nestedContent: string;
    markdownContent: string;
    externalContent: string;
  };
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Ciao Mondo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "Contenuto in inglese",
      "en-GB": "Contenuto in inglese (UK)",
      fr: "Contenuto in francese",
      es: "Contenuto in spagnolo",
    }),
    quantityContent: enu({
      "<-1": "Meno di meno una macchina",
      "-1": "Meno una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
    conditionalContent: cond({
      true: "La validazione è abilitata",
      false: "La validazione è disabilitata",
    }),
    nestedContent: nest(
      "navbar", // La chiave del dizionario da annidare
      "login.button" // [Opzionale] Il percorso del contenuto da annidare
    ),
    externalContent: async () => await fetch("https://example.com"),
    markdownContent: md("# Esempio di Markdown"),

    /*
     * Disponibile solo utilizzando `react-intlayer` o `next-intlayer`
     */
    jsxContent: <h1>Il mio titolo</h1>,
  },
} satisfies Dictionary<Content>; // [opzionale] Dictionary è generico e ti permette di rafforzare la formattazione del tuo dizionario
```

```javascript fileName="src/example.content.mjs" codeFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Ciao Mondo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "Contenuto in inglese",
      "en-GB": "Contenuto in inglese (UK)",
      fr: "Contenuto in francese",
      es: "Contenuto in spagnolo",
    }),
    quantityContent: enu({
      "<-1": "Meno di meno una macchina",
      "-1": "Meno una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
    conditionalContent: cond({
      true: "La validazione è abilitata",
      false: "La validazione è disabilitata",
    }),
    nestedContent: nest(
      "navbar", // La chiave del dizionario da annidare
      "login.button" // [Opzionale] Il percorso del contenuto da annidare
    ),
    markdownContent: md("# Esempio di Markdown"),
    externalContent: async () => await fetch("https://example.com"),

    // Disponibile solo utilizzando `react-intlayer` o `next-intlayer`
    jsxContent: <h1>Il mio titolo</h1>,
  },
};
```

```javascript fileName="src/example.content.cjs" codeFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Ciao Mondo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "Contenuto in inglese",
      "en-GB": "Contenuto in inglese (UK)",
      fr: "Contenuto in francese",
      es: "Contenuto in spagnolo",
    }),
    quantityContent: enu({
      "<-1": "Meno di meno una macchina",
      "-1": "Meno una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
    conditionalContent: cond({
      true: "La validazione è abilitata",
      false: "La validazione è disabilitata",
    }),
    nestedContent: nest(
      "navbar", // La chiave del dizionario da annidare
      "login.button" // [Opzionale] Il percorso del contenuto da annidare
    ),
    markdownContent: md("# Esempio di Markdown"),
    externalContent: async () => await fetch("https://example.com"),

    // Disponibile solo utilizzando `react-intlayer` o `next-intlayer`
    jsxContent: <h1>Il mio titolo</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  codeFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Ciao Mondo",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Contenuto in inglese",
        "en-GB": "Contenuto in inglese (UK)",
        "fr": "Contenuto in francese",
        "es": "Contenuto in spagnolo",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Nessuna macchina",
        "1": "Una macchina",
        "<-1": "Meno di meno una macchina",
        "-1": "Meno una macchina",
        ">5": "Alcune macchine",
        ">19": "Molte macchine",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "La validazione è abilitata",
        "false": "La validazione è disabilitata",
      },
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Esempio di Markdown",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Il mio titolo"],
      },
    },
  },
}
```

## Imbricazione delle funzioni

Puoi senza problemi imbricare funzioni in altre.

Esempio:

```javascript fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` restituisce `['Ciao', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Ciao",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenuto composito che imbrica condizione, enumerazione e contenuto multilingue
    // `getIntlayer('page','en').advancedContent(true)(10) restituisce 'Trovati più elementi'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "Nessun elemento trovato",
          fr: "Aucun élément trouvé",
          es: "Ningún elemento encontrado",
        }),
        "1": t({
          en: "Un elemento trovato",
          fr: "Un élément trouvé",
          es: "Un elemento encontrado",
        }),
        ">1": t({
          en: "Trovati più elementi",
          fr: "Plusieurs éléments trouvés",
          es: "Se encontraron múltiples elementos",
        }),
      }),
      false: t({
        en: "Nessun dato valido disponibile",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjs" codeFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` restituisce `['Ciao', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Ciao",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenuto composito che imbrica condizione, enumerazione e contenuto multilingue
    // `getIntlayer('page','en').advancedContent(true)(10) restituisce 'Trovati più elementi'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "Nessun elemento trovato",
          fr: "Aucun élément trouvé",
          es: "Ningún elemento encontrado",
        }),
        "1": t({
          en: "Un elemento trovato",
          fr: "Un élément trouvé",
          es: "Un elemento encontrado",
        }),
        ">1": t({
          en: "Trovati più elementi",
          fr: "Plusieurs éléments trouvés",
          es: "Se encontraron múltiples elementos",
        }),
      }),
      false: t({
        en: "Nessun dato valido disponibile",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjs" codeFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` restituisce `['Ciao', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Ciao",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenuto composito che imbrica condizione, enumerazione e contenuto multilingue
    // `getIntlayer('page','en').advancedContent(true)(10) restituisce 'Trovati più elementi'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "Nessun elemento trovato",
          fr: "Aucun élément trouvé",
          es: "Ningún elemento encontrado",
        }),
        "1": t({
          en: "Un elemento trovato",
          fr: "Un élément trouvé",
          es: "Un elemento encontrado",
        }),
        ">1": t({
          en: "Trovati più elementi",
          fr: "Plusieurs éléments trouvés",
          es: "Se encontraron múltiples elementos",
        }),
      }),
      false: t({
        en: "Nessun dato valido disponibile",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  codeFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "en": "Ciao",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "Nessun elemento trovato",
                "fr": "Aucun élément trouvé",
                "es": "Ningún elemento encontrado",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "Un elemento trovato",
                "fr": "Un élément trouvé",
                "es": "Un elemento encontrado",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Trovati più elementi",
                "fr": "Plusieurs éléments trouvés",
                "es": "Se encontraron múltiples elementos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "Nessun dato valido disponibile",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```
