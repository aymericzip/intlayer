# Intlayer supports two ways to declare multilingual content:

- Single file with all translations
- One file per locale (per-locale format)

This flexibility enables:

- Easy migration from other i18n tools
- Support for automated translation workflows
- Clear organisation of translations into separate, locale-specific files

## Single File with Multiple Translations

This format is ideal for:

- Quick iteration in code.
- Seamless integration with the CMS.

This is the recommended approach for most use cases. It centralises translations, making it easy to iterate and integrate with the CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      "en-GB": "Title of my component",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      "en-GB": "Title of my component",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      "en-GB": "Title of my component",
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
        "en-GB": "Title of my component",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Recommended: This format is best when using Intlayer's visual editor or managing translations directly in the code.

## Per-Locale Format

This format is useful when:

- You want to version or override translations independently.
- You're integrating machine or human translation workflows.

You can also split translations into individual locale files by specifying the locale field:

```tsx fileName="hello-world.en-GB.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Important
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Important
  content: { multilingualContent: "Título de mi componente" },
};
```

```js fileName="hello-world.en-GB.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Important
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.en-GB.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Important
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en-GB.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Important
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
  locale: Locales.SPANISH, // Important
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en-GB.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en-GB", // Important
  "content": {
    "multilingualContent": "Title of my component",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Important
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Important: Make sure the locale field is defined. It tells Intlayer which language the file represents.

> Note: In both cases, the content declaration file must follow the naming pattern `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` to be recognised by Intlayer. The `.[locale]` suffix is optional and used only as a naming convention.

## Mixing Formats

You can mix both approaches for the same content key. For example:

Declare default or base content statically (e.g., `index.content.ts`)

Add or override locale-specific content in `index.content.json`, `index.fr.content.ts`, etc.

This is especially useful when:

- You want to declare your base content statically in your codebase and fill automatically with translations in the CMS.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Example

Here a multilingual content declaration file:

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
        "en-GB": "Title of my component",
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer merges multilingual and per-locale files automatically.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // Default locale is ENGLISH, so it will return the ENGLISH content

console.log(JSON.stringify(intlayer, null, 2));
// Result:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Result:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Result:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### Automatic Translation Generation

Use the [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_cli.md) to auto-fill missing translations based on your preferred services.
