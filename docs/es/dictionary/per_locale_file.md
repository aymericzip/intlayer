# Intlayer admite dos formas de declarar contenido multilingüe:

- Archivo único con todas las traducciones
- Un archivo por idioma (formato por idioma)

Esta flexibilidad permite:

- Migración sencilla desde otras herramientas i18n
- Soporte para flujos de trabajo de traducción automatizados
- Organización clara de las traducciones en archivos separados y específicos por idioma

## Archivo Único con Múltiples Traducciones

Este formato es ideal para:

- Iteración rápida en el código.
- Integración fluida con el CMS.

Este es el enfoque recomendado para la mayoría de los casos de uso. Centraliza las traducciones, facilitando la iteración e integración con el CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      es: "Título de mi componente",
      en: "Title of my component",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      es: "Título de mi componente",
      en: "Title of my component",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      es: "Título de mi componente",
      en: "Title of my component",
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
        "es": "Título de mi componente",
        "en": "Title of my component"
      }
    }
  }
}
```

> Recomendado: Este formato es el mejor cuando se utiliza el editor visual de Intlayer o se gestionan traducciones directamente en el código.

## Formato Por Idioma

Este formato es útil cuando:

- Deseas versionar o sobrescribir traducciones de forma independiente.
- Estás integrando flujos de trabajo de traducción automática o manual.

También puedes dividir las traducciones en archivos individuales por idioma especificando el campo `locale`:

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
};
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Title of my component" },
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
    multilingualContent: "Title of my component",
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
    "multilingualContent": "Title of my component",
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

> Importante: Asegúrate de que el campo `locale` esté definido. Indica a Intlayer qué idioma representa el archivo.

> Nota: En ambos casos, el archivo de declaración de contenido debe seguir el patrón de nomenclatura `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` para ser reconocido por Intlayer. El sufijo `.[locale]` es opcional y se utiliza solo como una convención de nomenclatura.

## Mezcla de Formatos

Puedes mezclar ambos enfoques para la misma clave de contenido. Por ejemplo:

Declara contenido predeterminado o base de forma estática (por ejemplo, `index.content.ts`).

Agrega o sobrescribe contenido específico por idioma en `index.content.json`, `index.fr.content.ts`, etc.

Esto es especialmente útil cuando:

- Deseas declarar tu contenido base de forma estática en tu base de código y completar automáticamente con traducciones en el CMS.

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
    multilingualContent: "Title of my component",
    projectName: "My project",
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

const intlayer = getIntlayer("hello-world"); // El idioma predeterminado es INGLÉS, por lo que devolverá el contenido en INGLÉS

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Resultado:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### Generación Automática de Traducciones

Usa el [CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md) para completar automáticamente traducciones faltantes basándote en tus servicios preferidos.
