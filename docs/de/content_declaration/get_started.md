# Getting Started die Deklaration Ihres Inhalts

## Intlayer für Ihr Projekt konfigurieren

[Wie man intlayer mit NextJS verwendet](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)

[Wie man intlayer mit ReactJS verwendet](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)

[Wie man intlayer mit Vite und React verwendet](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md)

## Paket installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash
npm install intlayer
```

```bash
yarn add intlayer
```

```bash
pnpm add intlayer
```

## Verwalten Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltswörterbücher:

### Mit TypeScript

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    nestedContent: {
      id: "enumeration",
      numberOfCar: enu({
        "<-1": "Weniger als minus ein Auto",
        "-1": "Minus ein Auto",
        "0": "Keine Autos",
        "1": "Ein Auto",
        ">5": "Einige Autos",
        ">19": "Viele Autos",
      }),
    },
  },
} satisfies DeclarationContent;

// Inhalt sollte als Standard exportiert werden
export default pageContent;
```

### Mit ECMAScript-Modulen

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      0: "Keine Autos",
      1: "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
  },
};

// Inhalt sollte als Standard exportiert werden
export default pageContent;
```

### Mit CommonJS-Modulen

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      0: "Keine Autos",
      1: "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
  },
};

// Inhalt sollte als Standard exportiert werden
module.exports = pageContent;
```

### Mit JSON

```json5
// src/app/[locale]/page.content.json

{
  id: "page",
  getStarted: {
    main: {
      nodeType: "translation",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    },
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    nodeType: "enumeration",
    numberOfCar: {
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    },
  },
}
```

Achtung, die Deklaration des JSON-Inhalts macht die Implementierung von [Funktionsabruf](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/function_fetching.md) unmöglich.
