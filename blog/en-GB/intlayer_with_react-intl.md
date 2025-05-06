# React Internationalization (i18n) with **react-intl** and Intlayer

This guide shows how to integrate **Intlayer** with **react-intl** to manage translations in a React application. You’ll declare your translatable content with Intlayer and then consume those messages with **react-intl**, a popular library from the [FormatJS](https://formatjs.io/docs/react-intl) ecosystem.

## Overview

- **Intlayer** allows you to store translations in **component-level** content declaration files (JSON, JS, TS, etc.) within your project.
- **react-intl** provides React components and hooks (like `<FormattedMessage>` and `useIntl()`) to display localized strings.

By configuring Intlayer to **export** translations in a **react-intl–compatible** format, you can automatically **generate** and **update** the message files that `<IntlProvider>` (from react-intl) requires.

---

## Why Use Intlayer with react-intl?

1. **Per-Component Dictionarys**  
   Intlayer content declaration files can live alongside your React components, preventing “orphaned” translations if components are moved or removed. For example:

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Intlayer content declaration
               └── index.tsx          # React component
   ```

2. **Centralized Translations**  
   Each content declaration file collects all translations needed by a component. This is particularly helpful in TypeScript projects: missing translations can be caught at **compile time**.

3. **Automatic Build and Regeneration**  
   Whenever you add or update translations, Intlayer regenerates message JSON files. You can then pass these into react-intl’s `<IntlProvider>`.

---

## Installation

In a typical React project, install the following:

```bash
# with npm
npm install intlayer react-intl

# with yarn
yarn add intlayer react-intl

# with pnpm
pnpm add intlayer react-intl
```

### Why These Packages?

- **intlayer**: Core CLI and library that scans for content declarations, merges them, and builds dictionary outputs.
- **react-intl**: The main library from FormatJS that provides `<IntlProvider>`, `<FormattedMessage>`, `useIntl()` and other internationalization primitives.

> If you don’t already have React itself installed, you’ll need it, too (`react` and `react-dom`).

## Configuring Intlayer to Export react-intl Messages

In your project’s root, create **`intlayer.config.ts`** (or `.js`, `.mjs`, `.cjs`) like so:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Add as many locales as you wish
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Tells Intlayer to generate message files for react-intl
    dictionaryOutput: ["react-intl"],

    // The directory where Intlayer will write your message JSON files
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **Note**: For other file extensions (`.mjs`, `.cjs`, `.js`), see the [Intlayer docs](https://intlayer.org/en-GB/doc/concept/configuration) for usage details.

---

## Creating Your Intlayer Dictionarys

Intlayer scans your codebase (by default, under `./src`) for files matching `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`.  
Here’s a **TypeScript** example:

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" becomes the top-level message key in your react-intl JSON file
  key: "my-component",

  content: {
    // Each call to t() declares a translatable field
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

If you prefer JSON or different JS flavors (`.cjs`, `.mjs`), the structure is largely the same, see [Intlayer docs on content declaration](https://intlayer.org/en-GB/doc/concept/content).

---

## Building the react-intl Messages

To generate the actual message JSON files for **react-intl**, run:

```bash
# with npm
npx intlayer dictionaries build

# with yarn
yarn intlayer build

# with pnpm
pnpm intlayer build
```

This scans all `*.content.*` files, compiles them, and writes the results to the directory specified in your **`intlayer.config.ts`** , in this example, `./react-intl/messages`.  
A typical output might look like:

```bash
.
└── react-intl
    └── messages
        ├── en-GB.json
        ├── fr.json
        └── es.json
```

Each file is a JSON object whose **top-level keys** correspond to each **`content.key`** from your declarations. The **sub-keys** (like `helloWorld`) reflect the translations declared within that content item.

For example, the **en-GB.json** might look like:

```json filePath="react-intl/messages/en/my-component.json"
{
  "helloWorld": "Hello World",
  "description": "This is a description"
}
```

---

## Initializing react-intl in Your React App

### 1. Load the Generated Messages

Where you configure your app’s root component (e.g., `src/main.tsx` or `src/index.tsx`), you’ll need to:

1. **Import** the generated message files (either statically or dynamically).
2. **Provide** them to `<IntlProvider>` from `react-intl`.

A simple approach is to import them **statically**:

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// Import the JSON files from the build output.
// Alternatively, you can import dynamically based on the user's chosen locale.
import en from "../react-intl/messages/en-GB.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";

// If you have a mechanism to detect the user's language, set it here.
// For simplicity, let's pick English.
const locale = "en-GB";

// Collate messages in an object (or pick them dynamically)
const messagesRecord: Record<string, Record<string, any>> = {
  en: en,
  fr: fr,
  es: es,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messagesRecord[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **Tip**: For real projects, you might:
>
> - Dynamically load the JSON messages at runtime.
> - Use environment-based, browser-based, or user account–based locale detection.

### 2. Use `<FormattedMessage>` or `useIntl()`

Once your messages are loaded into `<IntlProvider>`, any child component can use react-intl to access localized strings. There are two main approaches:

- **`<FormattedMessage>`** component
- **`useIntl()`** hook

---

## Using Translations in React Components

### Approach A: `<FormattedMessage>`

For quick inline usage:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* “my-component.helloWorld” references the key from en-GB.json, fr.json, etc. */}
        <FormattedMessage id="my-component.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="my-component.description" />
      </p>
    </div>
  );
}
```

> The **`id`** prop in `<FormattedMessage>` must match the **top-level key** (`my-component`) plus any sub-keys (`helloWorld`).

### Approach B: `useIntl()`

For more dynamic usage:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "my-component.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "my-component.description" })}</p>
    </div>
  );
}
```

Either approach is valid , choose whichever style suits your app.

---

## Updating or Adding New Translations

1. **Add or modify** content in any `*.content.*` file.
2. Rerun `intlayer build` to regenerate the JSON files under `./react-intl/messages`.
3. React (and react-intl) will pick up the updates next time you rebuild or reload your application.

---

## TypeScript Integration (Optional)

If you’re using TypeScript, Intlayer can **generate type definitions** for your translations.

- Make sure `tsconfig.json` includes your `types` folder (or whichever output folder Intlayer generates) in the `"include"` array.

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

The generated types can help detect missing translations or invalid keys in your React components at compile time.

---

## Git Configuration

It’s common to **exclude** Intlayer’s internal build artifacts from version control. In your `.gitignore`, add:

```plaintext
# Ignore intlayer build artifacts
.intlayer
react-intl
```

Depending on your workflow, you may also want to ignore or commit the final dictionaries in `./react-intl/messages`. If your CI/CD pipeline regenerates them, you can safely ignore them; otherwise, commit them if you need them for production deployments.
