---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Intlayer and next-i18next
description: Integrate Intlayer with next-i18next for a Next.js app
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internationalisation
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
---

# Next.js Internationalization (i18n) with next-i18next and Intlayer

Both next-i18next and Intlayer are open-source internationalization (i18n) frameworks designed for Next.js applications. They are widely used for managing translations, localization, and language switching in software projects.

Both solutions include three principal notions:

1. **Dictionary**: The method for defining the translatable content of your application.
   - Named `resource` in the case of `i18next`, the content declaration is a structured JSON object containing key-value pairs for translations in one or more languages. See [i18next documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/translation-function/essentials.md) for more information.
   - Named `content declaration file` in the case of `Intlayer`, the content declaration can be a JSON, JS, or TS file exporting the structured data. See [Intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/concept/content.md) for more information.

2. **Utilities**: Tools to build and interpret content declarations in the application, such as `getI18n()`, `useCurrentLocale()`, or `useChangeLocale()` for next-i18next, and `useIntlayer()` or `useLocale()` for Intlayer.

3. **Plugins and Middlewares**: Features for managing URL redirection, bundling optimization, and more, such as `next-i18next/middleware` for next-i18next or `intlayerMiddleware` for Intlayer.

## Intlayer vs. i18next: Key Differences

To explore the differences between i18next and Intlayer, check out our [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18next_vs_next-intl_vs_intlayer.md) blog post.

## How to Generate next-i18next Dictionaries with Intlayer

### Why Use Intlayer with next-i18next?

Intlayer content declaration files generally offer a better developer experience. They are more flexible and maintainable due to two main advantages:

1. **Flexible Placement**: An Intlayer content declaration file can be placed anywhere in the application's file tree, simplifying the management of duplicated or deleted components without leaving unused content declarations.

   Example file structures:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Content declaration file
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Content declaration file
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Content declaration file
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Content declaration file
               └── index.jsx
   ```

2. **Centralized Translations**: Intlayer stores all translations in a single file, ensuring no translation is missing. When using TypeScript, missing translations are automatically detected and reported as errors.

### Installation

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### Configuring Intlayer to Export i18next Dictionaries

> Exporting i18next resources does not ensure 1:1 compatibility with other frameworks. It's recommended to stick to an Intlayer-based configuration to minimise issues.

To export i18next resources, configure Intlayer in a `intlayer.config.ts` file. Example configurations:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

### Importing Dictionaries into Your i18next Configuration

To import the generated resources into your i18next configuration, use `i18next-resources-to-backend`. Below are examples:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### Dictionary

Examples of content declaration files in various formats:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### Build the next-i18next Resources

To build the next-i18next resources, run the following command:

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

This will generate resources in the `./i18next/resources` directory. The expected output:

```bash
.
└── i18next
    └── resources
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Note: The i18next namespace corresponds to the Intlayer declaration key.

### Implement Next.js Plugin

Once configured, implement the Next.js plugin to rebuild your i18next resources whenever Intlayer content declaration files are updated.

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Using Content in Next.js Components

After implementing the Next.js plugin, you can use the content in your components:

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```
