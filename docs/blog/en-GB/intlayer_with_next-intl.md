---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer and next-intl
description: Integrate Intlayer with next-intl for the internationalization (i18n) of a React app
keywords:
  - next-intl
  - Intlayer
  - Internationalisation
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
---

# Next.js Internationalization (i18n) with next-intl and Intlayer

Both next-intl and Intlayer are open-source internationalization (i18n) frameworks designed for Next.js applications. They are widely used for managing translations, localization, and language switching in software projects.

They share three principal notions:

1. **Dictionary**: The method for defining the translatable content of your application.

   - Named `content declaration file` in Intlayer, which can be a JSON, JS, or TS file exporting the structured data. See [Intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/concept/content) for more information.
   - Named `messages` or `locale messages` in next-intl, usually in JSON files. See [next-intl documentation](https://github.com/amannn/next-intl) for more information.

2. **Utilities**: Tools to build and interpret content declarations in the application, such as `useIntlayer()` or `useLocale()` for Intlayer, and `useTranslations()` for next-intl.

3. **Plugins and Middlewares**: Features for managing URL redirection, bundling optimization, and more, e.g., `intlayerMiddleware` for Intlayer or [`createMiddleware`](https://github.com/amannn/next-intl) for next-intl.

## Intlayer vs. next-intl: Key Differences

For a deeper analysis of how Intlayer compares to other i18n libraries for Next.js (such as next-intl), check out the [next-i18next vs. next-intl vs. Intlayer blog post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/i18next_vs_next-intl_vs_intlayer.md).

## How to Generate next-intl Messages with Intlayer

### Why Use Intlayer with next-intl?

Intlayer content declaration files generally offer a better developer experience. They are more flexible and maintainable due to two main advantages:

1. **Flexible Placement**: You can place an Intlayer content declaration file anywhere in your application’s file tree. This makes it easy to rename or delete components without leaving unused or dangling message files.

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

2. **Centralized Translations**: Intlayer stores all translations in a single content declaration, ensuring no translation is missing. In TypeScript projects, missing translations are flagged automatically as type errors, providing immediate feedback to developers.

### Installation

To use Intlayer and next-intl together, install both libraries:

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### Configuring Intlayer to Export next-intl Messages

> **Note:** Exporting messages from Intlayer for next-intl can introduce slight differences in structure. If possible, keep an Intlayer-only or next-intl-only flow to simplify the integration. If you do need to generate next-intl messages from Intlayer, follow the steps below.

Create or update an `intlayer.config.ts` file (or `.mjs` / `.cjs`) in the root of your project:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // Use the next-intl output
    nextIntlMessagesDir: "./intl/messages", // Where to save next-intl messages
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
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
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
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### Dictionary

Below are examples of content declaration files in multiple formats. Intlayer will compile these into message files that next-intl can consume.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-component",
  "content": {
    "helloWorld": {
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

### Build the next-intl Messages

To build the message files for next-intl, run:

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

This will generate resources in the `./intl/messages` directory (as configured in `intlayer.config.*`). The expected output:

```bash
.
└── intl
    └── messages
       └── en-GB
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Each file includes compiled messages from all Intlayer content declarations. The top-level keys typically match your `content.key` fields.

### Using next-intl in Your Next.js App

> For more details, see the official [next-intl usage docs](https://github.com/amannn/next-intl#readme).

1. **Create a Middleware (optional):**  
   If you want to manage automatic locale detection or redirection, use next-intl’s [createMiddleware](https://github.com/amannn/next-intl#createMiddleware).

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["en", "fr", "es"],
     defaultLocale: "en",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **Create a `layout.tsx` or `_app.tsx` to Load Messages:**  
   If you’re using the App Router (Next.js 13+), create a layout:

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';


   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
           <NextIntlClientProvider locale={params.locale} messages={messages}>
             {children}
           </NextIntlClientProvider>
         </body>
       </html>
     );
   }
   ```

   If you’re using the Pages Router (Next.js 12 or below), load messages in `_app.tsx`:

   ```typescript fileName="pages/_app.tsx"
   import type { AppProps } from 'next/app';
   import { NextIntlProvider } from 'next-intl';

   function MyApp({ Component, pageProps }: AppProps) {
     return (
       <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages}>
         <Component {...pageProps} />
       </NextIntlProvider>
     );
   }

   export default MyApp;
   ```

3. **Fetch Messages Server-Side (Pages Router example):**

   ```typescript fileName="pages/index.tsx"
   import { GetServerSideProps } from "next";
   import HomePage from "../components/HomePage";

   export default HomePage;

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     const messages = (await import(`../intl/messages/${locale}.json`)).default;

     return {
       props: {
         locale,
         messages,
       },
     };
   };
   ```

### Using Content in Next.js Components

Once the messages are loaded into next-intl, you can use them in your components via the `useTranslations()` hook:

```typescript fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from 'next-intl';

const MyComponent: FC = () => {
  const t = useTranslations('my-component');
  // 'my-component' corresponds to the content key in Intlayer

  return (
    <div>
      <h1>{t('helloWorld')}</h1>
    </div>
  );
};

export default MyComponent;
```

```jsx fileName="src/components/MyComponent/index.jsx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("my-component");

  return (
    <div>
      <h1>{t("helloWorld")}</h1>
    </div>
  );
}
```

**That’s it!** Whenever you update or add new Intlayer content declaration files, re-run the `intlayer build` command to regenerate your next-intl JSON messages. next-intl will pick up the updated content automatically.
