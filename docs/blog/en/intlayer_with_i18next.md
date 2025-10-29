---
createdAt: 2024-12-24
updatedAt: 2025-10-29
title: Migrate from i18next to Intlayer - Complete Integration Guide
description: Comprehensive guide to migrating from i18next to Intlayer or using them together. Learn the differences, configuration, and best practices for optimal internationalization in Next.js applications.
keywords:
  - Intlayer
  - i18next
  - Internationalisation
  - i18n
  - Localisation
  - Translation
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Migration
  - Integration
slugs:
  - blog
  - intlayer-with-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Complete rewrite with step-by-step guide and code examples
---

# Migrate from i18next to Intlayer: Complete Integration Guide

## Table of Contents

<TOC>

## What is i18next?

**i18next** is an open-source internationalization (i18n) framework designed for JavaScript applications. It has been widely used for managing translations, localization, and language switching in software projects for many years. While powerful and mature, i18next has some limitations that can complicate scalability and modern development workflows.

## What is Intlayer?

**Intlayer** is a modern, open-source internationalization framework designed to simplify multilingual support in web applications. Intlayer addresses many of the limitations found in traditional i18n solutions like i18next, offering a more flexible and developer-friendly approach to content declaration and management.

## Intlayer vs. i18next: Key Differences

Before diving into the integration, let's understand the key differences between these two frameworks:

### 1. Content Declaration & Dictionary Management

**i18next:**

- Requires translation dictionaries to be declared in specific folders (typically `public/locales/` or `locales/`)
- Separate JSON files for each namespace and locale
- Difficult to track which translations belong to which components
- Can complicate application scalability as the project grows

```plaintext
# i18next typical structure
locales/
├── en/
│   ├── common.json
│   ├── home.json
│   └── about.json
└── fr/
    ├── common.json
    ├── home.json
    └── about.json
```

**Intlayer:**

- Allows content to be declared right next to your components
- Co-location of content with components
- Automatic detection and adaptation when components move or are removed
- Better maintainability and developer experience

```plaintext
# Intlayer structure
components/
├── Header/
│   ├── Header.tsx
│   └── Header.content.ts    # Translations live with the component
└── Footer/
    ├── Footer.tsx
    └── Footer.content.ts
```

**Advantages:**

- **Simplified Content Editing**: Developers don't have to search through multiple folders to find the correct dictionary
- **Automatic Adaptation**: If a component changes location or is removed, Intlayer detects and adapts automatically
- **Better Code Organization**: Keeps related code together, improving maintainability

### 2. Configuration Complexity

**i18next:**

- Complex configuration, especially with server-side rendering
- Requires manual setup for Next.js middleware
- Separate configuration for client and server
- Multiple plugins needed for full functionality

```typescript
// i18next configuration can get complex
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    // ... many more options
  });
```

**Intlayer:**

- Streamlined configuration process
- Built-in support for Next.js with simple setup
- Unified configuration for client and server
- Minimal configuration required to get started

```typescript
// Intlayer configuration is straightforward
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### 3. TypeScript Integration

**i18next:**

- TypeScript support requires additional setup
- Type safety for translation keys is limited
- Requires manual type definitions
- Auto-completion is basic

**Intlayer:**

- First-class TypeScript support out of the box
- Fully typed content declarations
- Auto-generated types for all translations
- Excellent IDE auto-completion and error detection

```typescript
// Intlayer provides full type safety
import { t, type Dictionary } from "intlayer";

const content = {
  key: "homepage",
  content: {
    title: t({
      en: "Welcome to our site",
      fr: "Bienvenue sur notre site",
      es: "Bienvenido a nuestro sitio",
    }),
    description: t({
      en: "Get started by exploring our features",
      fr: "Commencez par explorer nos fonctionnalités",
      es: "Comience explorando nuestras características",
    }),
  },
} satisfies Dictionary;

// TypeScript knows exactly what keys and values are available
```

### 4. Consistency & Validation

**i18next:**

- Easy to miss translations for specific locales
- No built-in validation for translation completeness
- Can lead to runtime errors with missing keys
- Requires manual checking for consistency

**Intlayer:**

- Enforces translation completeness at build time
- Ensures all locales have all required keys
- TypeScript errors for missing translations
- Prevents runtime errors from missing content

### 5. Content Sharing Across Applications

**i18next:**

- Difficult to share translations across multiple apps
- Requires custom solutions for shared translations
- No standard approach for monorepo setups

**Intlayer:**

- Built-in support for sharing content declarations
- Works seamlessly in monorepo architectures
- Easy to share translations across multiple applications and libraries
- Promotes consistency across your entire codebase

### 6. Server Components & Next.js App Router

**i18next:**

- Limited support for Next.js App Router
- Complex setup for Server Components
- Requires workarounds for async components
- Documentation not always up-to-date with latest Next.js features

**Intlayer:**

- Native support for Next.js App Router
- First-class support for Server Components
- Optimized for Next.js 14, 15, and 16
- Works seamlessly with Turbopack and React Server Components

## When to Use i18next vs. Intlayer

### Use i18next if:

- You have an existing large application already using i18next
- You need specific i18next plugins or ecosystem tools
- You're working on a non-React application
- You need interpolation patterns that i18next handles uniquely

### Use Intlayer if:

- You're starting a new project
- You want better TypeScript integration
- You're building a modern Next.js application
- You want co-located translations with components
- You want better developer experience and maintainability
- You're working in a monorepo or multi-app architecture

### Use Both Together if:

- You're migrating a large existing codebase gradually
- You want to leverage Intlayer's content management while maintaining i18next compatibility
- You need to support legacy code while adopting modern patterns

---

## Step-by-Step Guide: Using Intlayer with i18next

This guide will show you how to set up a Next.js application with Intlayer, with optional i18next integration for backward compatibility or gradual migration.

### Step 1: Install Dependencies

Install the necessary packages for Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

If you plan to use i18next alongside Intlayer (for migration or compatibility):

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend @intlayer/sync-json-plugin
```

**What each package does:**

- **intlayer**: Core package providing internationalization tools for configuration management, translation, content declaration, transpilation, and CLI commands.
- **next-intlayer**: Integration package for Next.js with context providers, hooks, and plugins for Webpack/Turbopack.
- **i18next** (optional): The core i18next internationalization framework.
- **react-i18next** (optional): React bindings for i18next.
- **i18next-resources-to-backend** (optional): Dynamically imports i18next resources.
- **@intlayer/sync-json-plugin** (optional): Plugin to export Intlayer dictionaries as JSON files compatible with i18next.

### Step 2: Configure Your Project

Create an Intlayer configuration file to define your supported locales:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Add your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Add your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Add your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

**If you want to also export JSON dictionaries for i18next**, add the `syncJSON` plugin:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { syncJSON } = require("@intlayer/sync-json-plugin");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

module.exports = config;
```

> The `syncJSON` plugin will automatically generate JSON files compatible with i18next whenever you build your Intlayer dictionaries.

> **Important Note**: The exportation of i18next dictionaries is currently in beta and does not ensure a 1:1 compatibility with all i18next features. It is recommended to use Intlayer natively for the best experience, using i18next export only for gradual migration scenarios.

For a complete list of available configuration parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Step 3: Integrate Intlayer in Your Next.js Configuration

Configure your Next.js setup to use Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* your config options here */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your config options here */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your config options here */
};

module.exports = withIntlayer(nextConfig);
```

> The `withIntlayer()` plugin integrates Intlayer with Next.js, building content declaration files, monitoring them in development mode, and providing optimizations for Webpack or Turbopack. It's compatible with both Server and Client Components.

### Step 4: Define Dynamic Locale Routes

Set up your Next.js application to handle dynamic locale routing.

First, update your root layout to remove the `<html>` and `<body>` tags:

```tsx fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers
  <>{children}</>
);

export default RootLayout;
```

```jsx fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // You can still wrap the children with other providers
  <>{children}</>
);

export default RootLayout;
```

```jsx fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // You can still wrap the children with other providers
  <>{children}</>
);

module.exports = {
  default: RootLayout,
};
```

> Keeping the `RootLayout` component empty allows you to set the [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) and [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) attributes on the `<html>` tag in the locale-specific layout.

Next, create a locale-specific layout in `[locale]` directory:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

Then, add the `generateStaticParams` function to pre-generate pages for all locales:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Line to insert

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /* ... Rest of the code */
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Line to insert

const LocaleLayout = async ({ children, params }) => {
  /* ... Rest of the code */
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Line to insert

const LocaleLayout = async ({ children, params }) => {
  /* ... Rest of the code */
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> The `[locale]` path segment is used to define the locale. Example: `/en/about` refers to `en` and `/fr/about` refers to `fr`.

> The `generateStaticParams` function ensures your application pre-builds the necessary pages for all locales, reducing runtime computation and improving user experience.

### Step 5: Declare Your Content

Create and manage your content declarations. This is where Intlayer truly shines compared to i18next.

Create content files next to your components:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

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
    docs: {
      title: t({
        en: "Documentation",
        fr: "Documentation",
        es: "Documentación",
      }),
      description: t({
        en: "Find in-depth information about Next.js features and API.",
        fr: "Trouvez des informations détaillées sur les fonctionnalités et l'API de Next.js.",
        es: "Encuentre información detallada sobre las características y la API de Next.js.",
      }),
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
    docs: {
      title: t({
        en: "Documentation",
        fr: "Documentation",
        es: "Documentación",
      }),
      description: t({
        en: "Find in-depth information about Next.js features and API.",
        fr: "Trouvez des informations détaillées sur les fonctionnalités et l'API de Next.js.",
        es: "Encuentre información detallada sobre las características y la API de Next.js.",
      }),
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
    docs: {
      title: t({
        en: "Documentation",
        fr: "Documentation",
        es: "Documentación",
      }),
      description: t({
        en: "Find in-depth information about Next.js features and API.",
        fr: "Trouvez des informations détaillées sur les fonctionnalités et l'API de Next.js.",
        es: "Encuentre información detallada sobre las características y la API de Next.js.",
      }),
    },
  },
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    },
    "docs": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Documentation",
          "fr": "Documentation",
          "es": "Documentación"
        }
      },
      "description": {
        "nodeType": "translation",
        "translation": {
          "en": "Find in-depth information about Next.js features and API.",
          "fr": "Trouvez des informations détaillées sur les fonctionnalités et l'API de Next.js.",
          "es": "Encuentre información detallada sobre las características y la API de Next.js."
        }
      }
    }
  }
}
```

> **Intlayer vs. i18next**: With i18next, you would need to create separate JSON files in a `locales/` folder. With Intlayer, content lives right next to your component, making it easier to maintain and refactor.

> Content declarations can be defined anywhere in your application as long as they are included in the `contentDir` directory (by default, `./src`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

### Step 6: Utilize Content in Your Code

Access your content dictionaries throughout your application using the `useIntlayer` hook:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <h2>{content.docs.title}</h2>
      <p>{content.docs.description}</p>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <h2>{content.docs.title}</h2>
      <p>{content.docs.description}</p>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider, useIntlayer } = require("next-intlayer/server");

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <h2>{content.docs.title}</h2>
      <p>{content.docs.description}</p>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

module.exports = Page;
```

**Key points:**

- **`IntlayerClientProvider`**: Provides the locale to client-side components. Can be placed in any parent component, but recommended in layouts for efficiency.
- **`IntlayerServerProvider`**: Provides the locale to server children. Cannot be set in the layout due to React's cache mechanism.
- **`useIntlayer("page")`**: Retrieves the content for the `page` dictionary key with full TypeScript support.

**Client Component Example:**

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example");

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example");

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example");

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
    </div>
  );
};

exports.ClientComponentExample = ClientComponentExample;
```

**Server Component Example:**

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example");

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example");

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example");

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
    </div>
  );
};

exports.ServerComponentExample = ServerComponentExample;
```

> If you want to use your content in a `string` attribute, such as `alt`, `title`, `href`, `aria-label`, etc., you must call the value of the function:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.alt.value} />
> ```

> To learn more about the `useIntlayer` hook, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayer.md).

### (Optional) Step 7: Configure Proxy for Locale Detection

Set up proxy to automatically detect and redirect users to their preferred locale:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> The `intlayerProxy` detects the user's preferred locale from browser headers and cookies, then redirects them to the appropriate URL. It also saves the preference in a cookie for future visits.

### (Optional) Step 8: Internationalization of Your Metadata

To internationalize metadata (page titles, descriptions, etc.), use the `generateMetadata` function with `getIntlayer`:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "My Website - Home",
      fr: "Mon Site Web - Accueil",
      es: "Mi Sitio Web - Inicio",
    }),
    description: t({
      en: "Welcome to my multilingual website built with Intlayer and Next.js",
      fr: "Bienvenue sur mon site web multilingue construit avec Intlayer et Next.js",
      es: "Bienvenido a mi sitio web multilingüe construido con Intlayer y Next.js",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "My Website - Home",
      fr: "Mon Site Web - Accueil",
      es: "Mi Sitio Web - Inicio",
    }),
    description: t({
      en: "Welcome to my multilingual website built with Intlayer and Next.js",
      fr: "Bienvenue sur mon site web multilingue construit avec Intlayer et Next.js",
      es: "Bienvenido a mi sitio web multilingüe construido con Intlayer y Next.js",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "My Website - Home",
      fr: "Mon Site Web - Accueil",
      es: "Mi Sitio Web - Inicio",
    }),
    description: t({
      en: "Welcome to my multilingual website built with Intlayer and Next.js",
      fr: "Bienvenue sur mon site web multilingue construit avec Intlayer et Next.js",
      es: "Bienvenido a mi sitio web multilingüe construido con Intlayer y Next.js",
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "My Website - Home",
        "fr": "Mon Site Web - Accueil",
        "es": "Mi Sitio Web - Inicio"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to my multilingual website built with Intlayer and Next.js",
        "fr": "Bienvenue sur mon site web multilingue construit avec Intlayer et Next.js",
        "es": "Bienvenido a mi sitio web multilingüe construido con Intlayer y Next.js"
      }
    }
  }
}
```

Then use it in your layout or page:

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of your layout or page code
```

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of your layout or page code
```

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

module.exports = { generateMetadata };

// ... Rest of your layout or page code
```

> Learn more about Next.js metadata optimization in the [official Next.js documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optional) Step 9: Internationalization of sitemap.xml and robots.txt

Internationalize your `sitemap.xml` and `robots.txt` files:

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
  {
    url: "https://example.com/contact",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/contact") },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
  {
    url: "https://example.com/contact",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/contact") },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
  {
    url: "https://example.com/contact",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/contact") },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/admin", "/private"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/admin", "/private"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/admin", "/private"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> Learn more about sitemap optimization in the [Next.js sitemap documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) and about robots.txt in the [Next.js robots.txt documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Optional) Step 10: Change the Language of Your Content

To allow users to switch languages, use the `useLocale` hook and Next.js's `Link` component:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Ensures that "go back" browser button redirects to previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, locale)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, locale)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

exports.LocaleSwitcher = LocaleSwitcher;
```

> **Comparison with i18next**: With i18next, you would typically use the `useTranslation` hook and manually manage language switching. Intlayer's `useLocale` hook provides a more integrated experience with Next.js routing and automatic URL management.

> Documentation references:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)

### (Optional) Step 11: Using i18next Alongside Intlayer

If you need to maintain i18next compatibility during a gradual migration, you can configure i18next to load dictionaries exported by Intlayer:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../intl/messages/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../intl/messages/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const { initReactI18next } = require("react-i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../intl/messages/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
  });

module.exports = i18next;
```

**Usage in a component:**

```tsx fileName="src/components/LegacyComponent.tsx"
"use client";

import { useTranslation } from "react-i18next";

export const LegacyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("page:docs.title")}</h2>
      <p>{t("page:docs.description")}</p>
    </div>
  );
};
```

This approach allows you to:

- Use Intlayer's modern content declaration system
- Gradually migrate components from i18next to Intlayer
- Maintain compatibility with existing i18next code
- Export dictionaries in both formats during the transition

---

## Migration Strategy: From i18next to Intlayer

If you're migrating an existing application from i18next to Intlayer, follow this strategy:

### Phase 1: Setup (Week 1)

1. **Install Intlayer** alongside your existing i18next setup
2. **Configure Intlayer** with the `syncJSON` plugin to export dictionaries
3. **Test** that both systems work in parallel

### Phase 2: Gradual Migration (Weeks 2-N)

1. **Create Intlayer content files** for new features
2. **Migrate existing components** one at a time:
   - Create corresponding `.content.ts` files
   - Replace `useTranslation()` with `useIntlayer()`
   - Test thoroughly before moving to the next component
3. **Focus on high-value components** first (frequently edited, complex translations)

### Phase 3: Cleanup (Final Week)

1. **Remove i18next dependencies** once all components are migrated
2. **Delete old locale JSON files**
3. **Remove the `syncJSON` plugin** from your Intlayer config
4. **Update documentation** for your team

### Migration Checklist

- [ ] Intlayer installed and configured
- [ ] `syncJSON` plugin configured for i18next compatibility
- [ ] First component migrated and tested
- [ ] Team trained on Intlayer patterns
- [ ] 25% of components migrated
- [ ] 50% of components migrated
- [ ] 75% of components migrated
- [ ] 100% of components migrated
- [ ] i18next removed
- [ ] Documentation updated

---

## Advanced Configuration

### TypeScript Configuration

Ensure your TypeScript configuration includes the auto-generated types:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git Configuration

Ignore the generated files:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code Extension

For improved developer experience, install the official **Intlayer VS Code Extension**:

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys
- **Real-time error detection** for missing translations
- **Inline previews** of translated content
- **Quick actions** for creating and updating translations

> **Comparison with i18next**: While i18next has some IDE extensions, Intlayer's extension provides deeper integration with TypeScript and better auto-completion thanks to co-located content declarations.

---

## Conclusion

By following this comprehensive guide, you now have a fully internationalized Next.js application using Intlayer, with optional i18next compatibility for gradual migration.

**Key Takeaways:**

1. **Intlayer** offers a modern, developer-friendly approach to i18n that addresses many limitations of traditional solutions like i18next
2. **Co-located content** declarations improve maintainability and reduce errors
3. **First-class TypeScript support** provides excellent IDE integration and catches errors at build time
4. **Flexible migration** path allows gradual adoption without disrupting existing applications
5. **Built-in Next.js support** makes it the ideal choice for modern React applications

Whether you're starting a new project or migrating from i18next, Intlayer provides the tools and flexibility you need for a scalable, maintainable internationalization solution.

---

## Further Resources

- [Intlayer Documentation](https://intlayer.org)
- [Intlayer GitHub Repository](https://github.com/aymericzip/intlayer)
- [Next.js Internationalization Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)

<function_calls>
<invoke name="read_file">
<parameter name="target_file">docs/docs/en/intlayer_with_nextjs_16.md
