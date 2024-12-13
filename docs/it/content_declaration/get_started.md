# Iniziare la dichiarazione del tuo contenuto

## Configurare Intlayer per il tuo progetto

[Guarda come usare intlayer con NextJS](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md)

[Guarda come usare intlayer con ReactJS](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md)

[Guarda come usare intlayer con Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md)

## Installare il Pacchetto

Installa i pacchetti necessari usando npm:

```bash
npm install intlayer
```

```bash
yarn add intlayer
```

```bash
pnpm add intlayer
```

## Gestire il Tuo Contenuto

Crea e gestisci i tuoi dizionari di contenuto:

### Usando TypeScript

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent = {
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
    nestedContent: {
      id: "enumeration",
      numberOfCar: enu({
        "<-1": "Meno di meno di una macchina",
        "-1": "Meno di una macchina",
        "0": "Nessuna macchina",
        "1": "Una macchina",
        ">5": "Alcune macchine",
        ">19": "Molte macchine",
      }),
    },
  },
} satisfies DeclarationContent;

// Il contenuto deve essere esportato come predefinito
export default pageContent;
```

### Usando i moduli ECMAScript

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Inizia modificando",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
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

// Il contenuto deve essere esportato come predefinito
export default pageContent;
```

### Usando i moduli CommonJS

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Inizia modificando",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
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

// Il contenuto deve essere esportato come predefinito
module.exports = pageContent;
```

### Usando JSON

```json5
// src/app/[locale]/page.content.json

{
  id: "page",
  getStarted: {
    main: {
      nodeType: "translation",
      en: "Inizia modificando",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    },
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    nodeType: "enumeration",
    numberOfCar: {
      "<-1": "Meno di meno di una macchina",
      "-1": "Meno di una macchina",
      "0": "Nessuna macchina",
      "1": "Una macchina",
      ">5": "Alcune macchine",
      ">19": "Molte macchine",
    },
  },
}
```

Attenzione, la dichiarazione del contenuto JSON rende impossibile implementare [funzioni di fetching](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/function_fetching.md)
