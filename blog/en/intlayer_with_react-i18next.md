---
blogName: intlayer_with_react-i18next
url: /blog/intlayer-with-react-i18next
githubUrl: https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_react-i18next.md
createdAt: 2025-01-02
updatedAt: 2025-01-02
title: Intlayer and react-i18next
description: Compare Intlayer with react-i18next for a React app
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
---

# React Internationalization (i18n) with react-i18next and Intlayer

## Overview

- **Intlayer** helps you manage translations via **component-level** content declaration files.
- **react-i18next** is a popular React integration for **i18next** that provides hooks like `useTranslation` to fetch localized strings in your components.

When combined, Intlayer can **export** dictionaries in **i18next-compatible JSON** so that react-i18next can **consume** them at runtime.

## Why Use Intlayer with react-i18next?

**Intlayer** content declaration files offer a better developer experience because they are:

1. **Flexible in File Placement**  
   Put each content declaration file right next to the component that needs it. This structure allows you to keep translations co-located, preventing orphaned translations when components move or get deleted.

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

2. **Centralized Translations**  
   A single content declaration file collects all necessary translations for a component, making missing translations easier to catch.  
   With TypeScript, you even get compile-time errors if translations are missing.

## Installation

In a Create React App project, install these dependencies:

```bash
# With npm
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# With yarn
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# With pnpm
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### What Are These Packages?

- **intlayer** – The CLI and core library for managing i18n configurations, content declarations, and building dictionary outputs.
- **react-intlayer** – React-specific integration for Intlayer, providing notably some script to automate the build of dictionaries.
- **react-i18next** – React-specific integration library for i18next, including the `useTranslation` hook.
- **i18next** – The underlying framework for translation handling.
- **i18next-resources-to-backend** – An i18next backend that dynamically imports JSON resources.

## Configuring Intlayer to Export i18next Dictionaries

Create (or update) your `intlayer.config.ts` in the root of your project:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Add as many locales as you wish
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Tell Intlayer to create i18next-compatible JSON
    dictionaryOutput: ["i18next"],

    // Choose an output directory for the generated resources
    // This folder will be created if it doesn't exist yet.
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **Note**: If you’re not using TypeScript, you can create this config file as `.cjs`, `.mjs`, or `.js` (see the [Intlayer docs](https://intlayer.org/en/doc/concept/configuration) for details).

## Building the i18next Resources

Once your content declarations are in place (next section), run the **Intlayer build command**:

```bash
# With npm
npx run intlayer build
```

```bash
# With yarn
yarn intlayer build
```

```bash
# With pnpm
pnpm intlayer build
```

> This will generate your i18next resources inside the `./i18next/resources` directory by default.

A typical output might look like this:

```bash
.
└── i18next
    └── resources
       ├── en
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

Where each **Intlayer** declaration key is used as an **i18next namespace** (e.g., `my-content.json`).

## Importing Dictionaries into Your react-i18next Configuration

To dynamically load these resources at runtime, use [`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend). For instance, create an `i18n.ts` (or `.js`) file in your project:

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // react-i18next plugin
  .use(initReactI18next)
  // dynamically load resources
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // Adjust the import path to your resources directory
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // Initialize i18next
  .init({
    // Fallback locale
    fallbackLng: "en",

    // You can add other i18next config options here, see:
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
  });

export default i18next;
```

Then, in your **root** or **index** file (e.g., `src/index.tsx`), import this `i18n` setup **before** rendering the `App`:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// Initialize i18n before anything else
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Creating and Managing Your Dictionarys

Intlayer extracts translations from “content declaration files” located anywhere under `./src` (by default).  
Here’s a minimal example in TypeScript:

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // The "key" will be your i18next namespace (e.g., "my-component")
  key: "my-component",
  content: {
    // Each "t" call is a separate translation node
    heading: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "My i18n description text...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies Dictionary;

export default content;
```

If you prefer JSON, `.cjs`, or `.mjs`, refer to the [Intlayer docs](https://intlayer.org/en/doc/concept/content).

> By default, valid content declarations match the file extension pattern:

> `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`

## Using the Translations in React Components

After you’ve **built** your Intlayer resources and configured react-i18next, you can directly use the `useTranslation` hook from **react-i18next**.  
For instance:

```tsx title="src/components/MyComponent/MyComponent.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * The i18next "namespace" is the Intlayer `key` from "MyComponent.content.ts"
 * so we'll pass "my-component" to useTranslation().
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> Note that the `t` function references **keys** inside your generated JSON. For an Intlayer content entry named `heading`, you’ll use `t("heading")`.

## Optional: Integrate with Create React App Scripts (CRACO)

**react-intlayer** provides a CRACO-based approach for custom builds and dev server configuration. If you want Intlayer’s build step integrated seamlessly, you can:

1. **Install react-intlayer** (if you haven’t):
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **Adjust your `package.json` scripts** to use `react-intlayer` scripts:

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > `react-intlayer` scripts are based on [CRACO](https://craco.js.org/). You can also implement your own setup based on the intlayer craco plugin. [See example here](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

Now, running `npm run build`, `yarn build`, or `pnpm build` triggers both Intlayer and CRA builds.

## TypeScript Configuration

**Intlayer** provides **autogenerated type definitions** for your content. To ensure TypeScript picks them up, add **`types`** (or `types` if you configured differently) to your `tsconfig.json` **include** array:

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> This will let TypeScript infer the shape of your translations for better autocompletion and error detection.

## Git Configuration

It is recommended to **ignore** auto-generated files and folders from Intlayer. Add this line to your `.gitignore`:

```plaintext
# Ignore the files generated by Intlayer
.intlayer
i18next
```

You typically do **not** commit these resources or `.intlayer` internal build artifacts, as they can be regenerated on each build.
