# Iniziare la dichiarazione del tuo contenuto

## Estensioni dei file

Per impostazione predefinita, Intlayer osserva tutti i file con le seguenti estensioni per le dichiarazioni di contenuto:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

L'applicazione cercherà i file che corrispondono al pattern glob `./src/**/*.content.{ts,tsx,js,mjs,cjs}` per impostazione predefinita.

Queste estensioni predefinite sono adatte per la maggior parte delle applicazioni. Tuttavia, se hai requisiti specifici, fai riferimento alla guida alla personalizzazione delle estensioni di contenuto per istruzioni su come gestirle.

Per un elenco completo delle opzioni di configurazione, visita la documentazione sulla configurazione.

## Dichiarare il tuo contenuto

Crea e gestisci i tuoi dizionari di contenuto:

### Usando typescript

```typescript
// src/app/[locale]/page.content.ts
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
      ">5": "Alcune auto",
      ">19": "Molte auto",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### Usando i moduli ECMAScript

```javascript
// src/app/[locale]/page.content.mjs

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
      ">5": "Alcune auto",
      ">19": "Molte auto",
    }),
  },
};
```

### Usando i moduli CommonJS

```javascript
// src/app/[locale]/page.content.cjs

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
      ">5": "Alcune auto",
      ">19": "Molte auto",
    }),
  },
};
```

### Usando JSON

```json5
// src/app/[locale]/page.content.json

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
        ">5": "Alcune auto",
        ">19": "Molte auto",
      },
    },
  },
}
```

Attenzione, la dichiarazione del contenuto JSON rende impossibile implementare [il recupero della funzione](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/function_fetching.md)
