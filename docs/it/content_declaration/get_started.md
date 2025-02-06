# Iniziare la dichiarazione del tuo contenuto

## Estensioni dei file

Per impostazione predefinita, Intlayer monitora tutti i file con le seguenti estensioni per le dichiarazioni di contenuto:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

L'applicazione cercherà file che corrispondono al modello glob `./src/**/*{{locale}}.content.{ts,tsx,js,jsx,mjs,cjs}` per impostazione predefinita.

Queste estensioni predefinite sono adatte alla maggior parte delle applicazioni. Tuttavia, se hai requisiti specifici, fai riferimento alla [guida alla personalizzazione delle estensioni di contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md#content-configuration) per istruzioni su come gestirle.

Per un elenco completo delle opzioni di configurazione, visita la documentazione di configurazione.

## Dichiara il tuo contenuto

Crea e gestisci i tuoi dizionari di contenuto:

```typescript fileName="src/app/{{locale}}/page.content.ts" codeFormat="typescript"
import { t, enu, type DeclarationContent } from "intlayer";

interface Content {
  getStarted: {
    main: string;
    pageLink: string;
  };
  numberOfCar: string;
}

export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Inizia modificando",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Meno di meno di una macchina",
      "-1": "Meno di una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
  },
} satisfies Dictionary<Content>;
```

```javascript fileName="src/app/{{locale}}/page.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Inizia modificando",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Meno di meno di una macchina",
      "-1": "Meno di una macchina",
      0: "Nessuna macchina",
      1: "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
  },
};
```

```javascript fileName="src/app/{{locale}}/page.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
module.exports = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Inizia modificando",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Meno di meno di una macchina",
      "-1": "Meno di una macchina",
      0: "Nessuna macchina",
      1: "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    }),
  },
};
```

```json5 fileName="src/app/{{locale}}/page.content.json"  codeFormat="json"
{
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "Inizia modificando",
          "fr": "Commencez par éditer",
          "es": "Comience por editar",
        },
      },
      "pageLink": "src/app/page.tsx",
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Meno di meno di una macchina",
        "-1": "Meno di una macchina",
        "0": "Nessuna macchina",
        "1": "Una macchina",
        ">5": "Alcune macchine",
        ">19": "Molte macchine",
      },
    },
  },
}
```
