---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Next.js Internationalization (i18n) with next-intl and Intlayer
description: Integrate Intlayer with next-intl for enhanced internationalization in Next.js applications. Learn how to structure translations, manage content, and leverage the best of both libraries.
keywords:
  - next-intl
  - Intlayer
  - Internationalization
  - i18n
  - Blog
  - Next.js
  - JavaScript
  - React
  - TypeScript
slugs:
  - blog
  - intlayer-with-next-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Change to syncJSON plugin
---

# Next.js Internationalization (i18n) with next-intl and Intlayer

## What is next-intl?

**[next-intl](https://github.com/amannn/next-intl)** is a popular open-source internationalization (i18n) library designed specifically for Next.js applications. It provides a comprehensive solution for managing translations, formatting dates and numbers, and handling locale routing.

Key features of next-intl include:

- **Server-side rendering support** for both App Router and Pages Router
- **Flexible message structure** using JSON files
- **Type-safe translations** with TypeScript support
- **Middleware for automatic locale detection** and routing
- **Rich formatting capabilities** for dates, times, numbers, and relative time

## What is Intlayer?

**[Intlayer](https://intlayer.org)** is an innovative, open-source internationalization (i18n) library that takes a different approach to content management. Instead of separating translations into JSON files, Intlayer allows you to declare your multilingual content directly alongside your components.

Key advantages of Intlayer include:

- **Flexible content placement**: Declare translations right next to the components that use them
- **Type-safe translations**: Automatic TypeScript type generation with full autocompletion
- **Rich content support**: Handle complex content structures including React components, dates, and more
- **Visual editor integration**: Manage translations through a visual interface
- **Advanced features**: Dynamic locale detection, SEO optimization, and more

## Table of Contents

<TOC>

## Intlayer vs. next-intl: Key Differences

Both next-intl and Intlayer are excellent i18n solutions for Next.js, but they take different approaches:

### Content Organization

**next-intl**: Uses centralized JSON files for each locale, typically organized like:

```
messages/
├── en.json
├── fr.json
└── es.json
```

**Intlayer**: Allows you to declare content alongside your components:

```
components/
└── MyComponent/
    ├── index.tsx
    └── index.content.ts  # Translations for this component
```

### Flexibility

**next-intl**: Great for traditional key-value translation patterns with JSON files.

**Intlayer**: Offers more flexibility with support for complex content structures, React components in translations, and powerful content management features.

### TypeScript Support

**next-intl**: Provides type safety through TypeScript integration.

**Intlayer**: Offers automatic type generation from your content declarations, ensuring complete type safety and better developer experience with autocompletion.

For a detailed comparison of Intlayer with other i18n libraries including next-intl, check out the [next-i18next vs. next-intl vs. Intlayer blog post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md).

## Why Use Intlayer with next-intl?

While you can choose to use either library exclusively, combining them can be beneficial in certain scenarios:

1. **Gradual Migration**: If you have an existing next-intl project and want to leverage Intlayer's features
2. **Component-Centric Workflow**: Use Intlayer's flexible content declaration alongside next-intl's infrastructure
3. **Best of Both Worlds**: Leverage next-intl's proven routing and formatting with Intlayer's developer experience

This guide shows you how to use Intlayer to generate next-intl compatible messages, allowing you to benefit from Intlayer's content declaration approach while maintaining compatibility with next-intl.

---

## Step-by-Step Guide to Set Up Intlayer with next-intl

### Step 1: Install Dependencies

Install the necessary packages:

```bash packageManager="npm"
npm install intlayer next-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intl @intlayer/sync-json-plugin
```

**Package descriptions:**

- **intlayer**: Core library for internationalization management, content declaration, and building
- **next-intl**: The next-intl library for Next.js internationalization
- **@intlayer/sync-json-plugin**: Plugin to export Intlayer content declarations to next-intl compatible JSON format

### Step 2: Configure Your Project

Create a configuration file to set up the locales and integration:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

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
  plugins: [
    syncJSON({
      // Configure where next-intl message files should be generated
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Add your other locales
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Add your other locales
    ],
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

> The `syncJSON` plugin tells Intlayer to export your content declarations to next-intl compatible JSON files. This allows you to write content using Intlayer's flexible format while consuming it through next-intl.

### Step 3: Integrate Intlayer in Your Next.js Configuration

If you plan to use additional Intlayer features beyond just generating next-intl messages, you can integrate Intlayer into your Next.js configuration:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* your config options here */
};

export default withIntlayer(nextConfig);
```

```javascript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your config options here */
};

export default withIntlayer(nextConfig);
```

```javascript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your config options here */
};

module.exports = withIntlayer(nextConfig);
```

> **Note**: This step is optional if you're only using Intlayer to generate next-intl messages. If you want to use Intlayer's hooks and components directly in your application, this integration is required.

### Step 4: Configure next-intl Middleware

Set up next-intl's middleware for automatic locale detection and routing:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // List of all supported locales
  locales: ["en", "fr", "es"],

  // Default locale when no preferred locale can be detected
  defaultLocale: "en",

  // Whether to redirect to the default locale
  localePrefix: "as-needed",
});

export const config = {
  // Matcher configuration to exclude specific paths
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fr", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const createMiddleware = require("next-intl/middleware");

module.exports = createMiddleware({
  locales: ["en", "fr", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

module.exports.config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

> This middleware handles automatic locale detection from the user's browser settings and manages locale-based routing. For more details, see the [next-intl middleware documentation](https://next-intl-docs.vercel.app/docs/routing/middleware).

### Step 5: Define Dynamic Locale Routes

Set up your application structure to support dynamic locale routing. For the App Router (Next.js 13+):

Remove everything from your root `RootLayout` and replace it with:

```tsx fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = RootLayout;
```

Then create a locale-specific layout in `[locale]` directory:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { ReactNode } from "react";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Ensure the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { NextIntlClientProvider } = require("next-intl");
const { getMessages } = require("next-intl/server");
const { notFound } = require("next/navigation");
const { routing } = require("@/i18n/routing");

async function LocaleLayout({ children, params: { locale } }) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

module.exports = LocaleLayout;
```

Create the routing configuration file:

```typescript fileName="src/i18n/routing.ts" codeFormat="typescript"
import { defineRouting } from "next-intl/routing";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "fr", "es"],
  defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
```

```javascript fileName="src/i18n/routing.mjs" codeFormat="esm"
import { defineRouting } from "next-intl/routing";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "fr", "es"],
  defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
```

```javascript fileName="src/i18n/routing.cjs" codeFormat="commonjs"
const { defineRouting } = require("next-intl/routing");
const { createSharedPathnamesNavigation } = require("next-intl/navigation");

const routing = defineRouting({
  locales: ["en", "fr", "es"],
  defaultLocale: "en",
});

const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);

module.exports = { routing, Link, redirect, usePathname, useRouter };
```

Create the next-intl configuration file:

```typescript fileName="src/i18n/request.ts" codeFormat="typescript"
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../intl/messages/${locale}.json`)).default,
  };
});
```

```javascript fileName="src/i18n/request.mjs" codeFormat="esm"
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../intl/messages/${locale}.json`)).default,
  };
});
```

```javascript fileName="src/i18n/request.cjs" codeFormat="commonjs"
const { getRequestConfig } = require("next-intl/server");
const { routing } = require("./routing");

module.exports = getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../intl/messages/${locale}.json`)).default,
  };
});
```

Update your Next.js config to use the next-intl plugin:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /* your config options here */
};

export default withNextIntl(nextConfig);
```

```javascript fileName="next.config.mjs" codeFormat="esm"
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your config options here */
};

export default withNextIntl(nextConfig);
```

```javascript fileName="next.config.cjs" codeFormat="commonjs"
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* your config options here */
};

module.exports = withNextIntl(nextConfig);
```

### Step 6: Declare Your Content

Create content declarations using Intlayer's flexible format:

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
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
    documentationLink: {
      text: t({
        en: "Read our documentation",
        fr: "Lisez notre documentation",
        es: "Lea nuestra documentación",
      }),
      href: "https://intlayer.org",
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
    documentationLink: {
      text: t({
        en: "Read our documentation",
        fr: "Lisez notre documentation",
        es: "Lea nuestra documentación",
      }),
      href: "https://intlayer.org",
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
    documentationLink: {
      text: t({
        en: "Read our documentation",
        fr: "Lisez notre documentation",
        es: "Lea nuestra documentación",
      }),
      href: "https://intlayer.org",
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
    "documentationLink": {
      "text": {
        "nodeType": "translation",
        "translation": {
          "en": "Read our documentation",
          "fr": "Lisez notre documentation",
          "es": "Lea nuestra documentación"
        }
      },
      "href": "https://intlayer.org"
    }
  }
}
```

> Your content declarations can be defined anywhere in your application as long as they are included in the `contentDir` directory (by default, `./src`) and match the content declaration file extension (by default, `.content.{ts,tsx,js,jsx,mjs,cjs,json}`).

> For more details about content declaration, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

### Step 7: Build and Generate next-intl Messages

Build your content declarations to generate next-intl compatible message files:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

This will generate resources in the `./intl/messages` directory. The expected output:

```bash
.
└── intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

Each JSON file contains compiled messages from all Intlayer content declarations, structured for next-intl consumption.

### Step 8: Utilize Content in Your Code

Access your translations in your components using next-intl's hooks:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from "next-intl";

const Page: FC = () => {
  const t = useTranslations("page");

  return (
    <div>
      <h1>{t("getStarted.main")}</h1>
      <code>{t("getStarted.pageLink")}</code>

      <a href={t("documentationLink.href")}>{t("documentationLink.text")}</a>
    </div>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("page");

  return (
    <div>
      <h1>{t("getStarted.main")}</h1>
      <code>{t("getStarted.pageLink")}</code>

      <a href={t("documentationLink.href")}>{t("documentationLink.text")}</a>
    </div>
  );
}
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const { useTranslations } = require("next-intl");

function Page() {
  const t = useTranslations("page");

  return (
    <div>
      <h1>{t("getStarted.main")}</h1>
      <code>{t("getStarted.pageLink")}</code>

      <a href={t("documentationLink.href")}>{t("documentationLink.text")}</a>
    </div>
  );
}

module.exports = Page;
```

> The first parameter of `useTranslations` corresponds to the `key` in your Intlayer content declaration. The nested properties are accessed using dot notation.

### (Optional) Step 9: Internationalization of Your Metadata

For metadata like page titles and descriptions:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      en: "My Application",
      fr: "Mon Application",
      es: "Mi Aplicación",
    }),
    description: t({
      en: "Welcome to my Next.js application",
      fr: "Bienvenue dans mon application Next.js",
      es: "Bienvenido a mi aplicación Next.js",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      en: "My Application",
      fr: "Mon Application",
      es: "Mi Aplicación",
    }),
    description: t({
      en: "Welcome to my Next.js application",
      fr: "Bienvenue dans mon application Next.js",
      es: "Bienvenido a mi aplicación Next.js",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      en: "My Application",
      fr: "Mon Application",
      es: "Mi Aplicación",
    }),
    description: t({
      en: "Welcome to my Next.js application",
      fr: "Bienvenue dans mon application Next.js",
      es: "Bienvenido a mi aplicación Next.js",
    }),
  },
};

module.exports = metadataContent;
```

Use in your layout or page:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

// ... rest of your layout
```

### (Optional) Step 10: Internationalization of sitemap.xml and robots.txt

For SEO optimization, internationalize your sitemap and robots files:

```typescript fileName="src/app/sitemap.ts" codeFormat="typescript"
import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://example.com",
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            `https://example.com/${locale}`,
          ])
        ),
      },
    },
  ];
}
```

```javascript fileName="src/app/sitemap.mjs" codeFormat="esm"
import { routing } from "@/i18n/routing";

export default function sitemap() {
  return [
    {
      url: "https://example.com",
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            `https://example.com/${locale}`,
          ])
        ),
      },
    },
  ];
}
```

```javascript fileName="src/app/sitemap.cjs" codeFormat="commonjs"
const { routing } = require("@/i18n/routing");

function sitemap() {
  return [
    {
      url: "https://example.com",
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            `https://example.com/${locale}`,
          ])
        ),
      },
    },
  ];
}

module.exports = sitemap;
```

### (Optional) Step 11: Change the Language of Your Content

Create a language switcher component:

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { FC } from "react";

export const LanguageSwitcher: FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.mjx" codeFormat="esm"
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.csx" codeFormat="commonjs"
"use client";

const { useLocale } = require("next-intl");
const { useRouter, usePathname } = require("@/i18n/routing");
const { routing } = require("@/i18n/routing");

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

module.exports = { LanguageSwitcher };
```

### (Optional) Step 12: Creating a Localized Link Component

For locale-aware navigation, use the `Link` component from your routing configuration:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { Link } from "@/i18n/routing";
import type { ComponentProps, FC } from "react";

export const LocalizedLink: FC<ComponentProps<typeof Link>> = (props) => {
  return <Link {...props} />;
};
```

```jsx fileName="src/components/LocalizedLink.mjx" codeFormat="esm"
import { Link } from "@/i18n/routing";

export const LocalizedLink = (props) => {
  return <Link {...props} />;
};
```

```jsx fileName="src/components/LocalizedLink.csx" codeFormat="commonjs"
const { Link } = require("@/i18n/routing");

const LocalizedLink = (props) => {
  return <Link {...props} />;
};

module.exports = { LocalizedLink };
```

Use it in your application:

```tsx
import { LocalizedLink } from "@/components/LocalizedLink";

export default function Navigation() {
  return (
    <nav>
      <LocalizedLink href="/">Home</LocalizedLink>
      <LocalizedLink href="/about">About</LocalizedLink>
      <LocalizedLink href="/contact">Contact</LocalizedLink>
    </nav>
  );
}
```

---

## Updating or Adding New Translations

1. **Add or modify** content in any `*.content.*` file
2. Run `intlayer build` to regenerate the JSON files
3. Next.js (and next-intl) will automatically pick up the changes on the next rebuild or in development mode

---

## TypeScript Configuration

Intlayer provides **autogenerated type definitions** for your content. Ensure TypeScript picks them up:

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ... your other compiler options
  },
  "include": [
    "src",
    ".intlayer/**/*.ts", // Include Intlayer auto-generated types
  ],
}
```

This provides autocompletion and type checking for your translation keys.

---

## Git Configuration

It's recommended to ignore auto-generated Intlayer files:

```plaintext fileName=".gitignore"
# Ignore files generated by Intlayer
.intlayer
intl
```

These files can be regenerated during your build process and don't need to be committed to version control.

---

## Further Resources and Learning

- **[Intlayer Documentation](https://intlayer.org)**: Comprehensive guides and API reference
- **[next-intl Documentation](https://next-intl-docs.vercel.app)**: Official next-intl documentation
- **[Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**: Manage translations through a visual interface
- **[Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md)**: Command-line tools for managing translations

By combining Intlayer's flexible content declaration approach with next-intl's proven routing and middleware capabilities, you can create a powerful internationalization solution for your Next.js application. This hybrid approach allows you to leverage the best features of both libraries while maintaining a clean, maintainable codebase.
