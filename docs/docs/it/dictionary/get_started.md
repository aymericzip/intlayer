---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Dizionario | Iniziare
description: Scopri come dichiarare e utilizzare dizionari nel tuo sito web multilingue. Segui i passaggi in questa documentazione online per configurare il tuo progetto in pochi minuti.
keywords:
  - Iniziare
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
---

# Iniziare la dichiarazione del tuo contenuto

<iframe title="i18n, Markdown, JSON… una soluzione unica per gestire tutto | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Estensioni dei file

Per impostazione predefinita, Intlayer monitora tutti i file con le seguenti estensioni per le dichiarazioni di contenuto:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

L'applicazione cercherà per impostazione predefinita i file che corrispondono al pattern glob `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

Queste estensioni predefinite sono adatte alla maggior parte delle applicazioni. Tuttavia, se hai requisiti specifici, consulta la [guida alla personalizzazione delle estensioni di contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#content-configuration) per le istruzioni su come gestirle.

Per un elenco completo delle opzioni di configurazione, visita la documentazione sulla configurazione.

## Dichiara il tuo contenuto

Crea e gestisci i tuoi dizionari:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Ciao Mondo", // Contenuto stringa
        numberContent: 123, // Contenuto numero
        booleanContent: true, // Contenuto booleano
        javaScriptContent: `${process.env.NODE_ENV}`, // Contenuto JavaScript
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Meno di meno uno auto",
      "-1": "Meno uno auto",
      "0": "Nessuna auto",
      "1": "Una auto",
      ">5": "Alcune auto",
      ">19": "Molte auto",
    }),
    conditionalContent: cond({
      true: "La validazione è abilitata",
      false: "La validazione è disabilitata",
    }),
    insertionContent: insert("Ciao {{name}}!"),
    nestedContent: nest(
      "navbar", // La chiave del dizionario da annidare
      "login.button" // [Opzionale] Il percorso al contenuto da annidare
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Esempio di Markdown"),

    /*
     * Disponibile solo usando `react-intlayer` o `next-intlayer`
     */
    jsxContent: <h1>Il mio titolo</h1>,
  },
} satisfies Dictionary<Content>; // [opzionale] Dictionary è generico e ti permette di rafforzare il formato del tuo dizionario
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Ciao Mondo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // Contenuto JavaScript dinamico
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Meno di meno uno auto",
      "-1": "Meno uno auto",
      "0": "Nessuna auto",
      "1": "Una auto",
      ">5": "Alcune auto",
      ">19": "Molte auto",
    }),
    conditionalContent: cond({
      true: "La validazione è abilitata",
      false: "La validazione è disabilitata",
    }),
    insertionContent: insert("Ciao {{name}}!"),
    nestedContent: nest(
      "navbar", // La chiave del dizionario da annidare
      "login.button" // [Opzionale] Il percorso al contenuto da annidare
    ),
    markdownContent: md("# Esempio di Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Disponibile solo usando `react-intlayer` o `next-intlayer`
    jsxContent: <h1>Il mio titolo</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Ciao Mondo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // Contenuto JavaScript dinamico
      },
      imbricatedArray: [1, 2, 3], // Array annidato
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "Contenuto francese",
      es: "Contenuto spagnolo",
    }),
    quantityContent: enu({
      "<-1": "Meno di meno uno auto",
      "-1": "Meno uno auto",
      "0": "Nessuna auto",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
    conditionalContent: cond({
      true: "La validazione è abilitata",
      false: "La validazione è disabilitata",
    }),
    insertionContent: insert("Ciao {{name}}!"),
    nestedContent: nest(
      "navbar", // La chiave del dizionario da nidificare
      "login.button" // [Opzionale] Il percorso al contenuto da nidificare
    ),
    markdownContent: md("# Esempio di Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Disponibile solo usando `react-intlayer` o `next-intlayer`
    jsxContent: <h1>Il mio titolo</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
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
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Ciao {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Esempio di Markdown",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
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

## Imbricazione di funzioni

Puoi senza problemi imbricare funzioni dentro altre funzioni.

Esempio :

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` restituisce `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenuto composito che imbrica condizione, enumerazione e contenuto multilingue
    // `getIntlayer('page','en').advancedContent(true)(10)` restituisce 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` restituisce `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenuto composito che imbrica condizione, enumerazione e contenuto multilingue
    // `getIntlayer('page','en').advancedContent(true)(10)` restituisce 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` restituisce `['Ciao', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenuto composito che combina condizione, enumerazione e contenuto multilingue
    // `getIntlayer('page','en').advancedContent(true)(10) restituisce 'Più elementi trovati'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
/        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
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

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` restituisce `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenuto composito che combina condizione, enumerazione e contenuto multilingue
    // `getIntlayer('page','en').advancedContent(true)(10) restituisce 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
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
            en: "Hi",
            fr: "Salut",
            es: "Hola",
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
                "en": "No items found",
                "it": "Nessun elemento trovato",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "it": "Un elemento trovato",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "it": "Più elementi trovati",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

## Risorse Aggiuntive

Per maggiori dettagli su Intlayer, fare riferimento alle seguenti risorse:

- [Documentazione sulla Dichiarazione di Contenuti per Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/per_locale_file.md)
- [Documentazione sul Contenuto di Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md)
- [Documentazione sul Contenuto di Enumerazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/enumeration.md)
- [Documentazione del Contenuto Condizionale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/condition.md)
- [Documentazione del Contenuto di Inserimento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion.md)
- [Documentazione del Contenuto File](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/file.md)
- [Documentazione del Contenuto Annidato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/nesting.md)
- [Documentazione del Contenuto Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md)
- [Documentazione del Contenuto di Recupero Funzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/function_fetching.md)

## Cronologia del Documento

- 5.5.10 - 2025-06-29: Storia iniziale
