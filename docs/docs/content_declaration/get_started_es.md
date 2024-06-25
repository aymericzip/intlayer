# Documentación del Paquete Intlayer

## Paquete intlayer

El paquete `intlayer` tiene como objetivo declarar tu contenido de una manera estructurada, utilizando JavaScript.

Para construir diccionarios a partir de esta declaración, puedes usar [intlayer-cli](https://github.com/aypineau/intlayer/blob/main/packages/intlayer-cli/readme_es.md).
Y para interpretar diccionarios de intlayer puedes usar intérpretes, como [react-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/react-intlayer/readme_es.md) o [next-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/next-intlayer/readme_es.md).

## Comenzando con Intlayer

[Mira cómo usar intlayer con NextJS](https://github.com/aypineau/intlayer/blob/main/readme_es.md)

### Instalar el Paquete

Instala los paquetes necesarios usando npm:

```bash
npm install intlayer
```

```bash
yarn install intlayer
```

```bash
pnpm install intlayer
```

### Gestiona tu Contenido

Crea y gestiona tus diccionarios de contenido:

#### Usando TypeScript

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent: DeclarationContent = {
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
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
};

// El contenido debe ser exportado por defecto
export default pageContent;
```

#### Usando módulos ECMAScript

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
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      0: "Sin coches",
      1: "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
};

// El contenido debe ser exportado por defecto
export default pageContent;
```

#### Usando módulos CommonJS

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
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      0: "Sin coches",
      1: "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
  },
};

// El contenido debe ser exportado por defecto
module.exports = pageContent;
```

#### Usando JSON

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
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    },
  },
}
```

Advertencia, la declaración de contenido JSON hace imposible implementar (funciones de obtención)[https://github.com/aypineau/intlayer/blob/main/docs/docs/content_declaration/function_fetching.md]
