---
docName: dictionary__per_locale_file
url: https://intlayer.org/doc/concept/per-locale-file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Declaración de contenido `Por-Locale` en Intlayer
description: Descubre cómo declarar contenido por locale en Intlayer. Sigue la documentación para entender los diferentes formatos y casos de uso.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Por-Locale
  - TypeScript
  - JavaScript
---

# Declaración de contenido `Por-Locale` en Intlayer

Intlayer soporta dos formas de declarar contenido multilingüe:

- Archivo único con todas las traducciones
- Un archivo por locale (formato por-locale)

Esta flexibilidad permite:

- Migración sencilla desde otras herramientas i18n
- Soporte para flujos de trabajo de traducción automatizados
- Organización clara de las traducciones en archivos separados y específicos por locale

## Archivo único con múltiples traducciones

Este formato es ideal para:

- Iteración rápida en el código.
- Integración fluida con el CMS.

Este es el enfoque recomendado para la mayoría de los casos de uso. Centraliza las traducciones, facilitando la iteración y la integración con el CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Contenido de hola mundo con traducciones multilingües
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Contenido de hola mundo con traducciones multilingües
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Recomendado: Este formato es el mejor cuando se utiliza el editor visual de Intlayer o se gestionan las traducciones directamente en el código.

## Formato por idioma

Este formato es útil cuando:

- Deseas versionar o sobrescribir traducciones de forma independiente.
- Estás integrando flujos de trabajo de traducción automática o humana.

También puedes dividir las traducciones en archivos individuales por idioma especificando el campo locale:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Importante
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Importante
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Importante
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // Importante
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Importante
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Importante: Asegúrate de que el campo locale esté definido. Indica a Intlayer qué idioma representa el archivo.

> Nota: En ambos casos, el archivo de declaración de contenido debe seguir el patrón de nombres `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` para ser reconocido por Intlayer. El sufijo `.[locale]` es opcional y se usa solo como convención de nombres.

## Mezclando formatos

Puedes combinar ambos enfoques de declaración para la misma clave de contenido. Por ejemplo:

- Declara tu contenido base de forma estática en un archivo como index.content.ts.
- Añade o sobrescribe traducciones específicas en archivos separados como index.fr.content.ts o index.content.json.

Esta configuración es especialmente útil cuando:

- Quieres definir la estructura inicial del contenido en código.
- Planeas enriquecer o completar las traducciones más adelante usando el CMS o herramientas automatizadas.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Ejemplo

Aquí un archivo de declaración de contenido multilingüe:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Título de mi componente",
    projectName: "Mi proyecto",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer combina automáticamente archivos multilingües y por idioma.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // La configuración regional predeterminada es INGLÉS, por lo que devolverá el contenido en INGLÉS

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "Mi proyecto"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "Mi proyecto"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "Mi proyecto"
// }
```

### Generación Automática de Traducciones

Utilice el [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md) para completar automáticamente las traducciones faltantes según sus servicios preferidos.

## Historial del documento

- 5.5.10 - 2025-06-29: Historial inicial
