---
createdAt: 2025-08-23
updatedAt: 2025-09-25
title: next-i18next vs next-intl vs Intlayer
description: Compare next-i18next with next-intl and Intlayer for the internationalization (i18n) of a Next.js app
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
---

# next-i18next VS next-intl VS intlayer | Next.js Internationalization (i18n)

Let’s take a look into the similarities and differences between three i18n options for Next.js: next-i18next, next-intl, and Intlayer.

This is not a full tutorial. It’s a comparison to help you pick.

We focus on **Next.js 13+ App Router** (with **React Server Components**) and evaluate:

1. **Architecture & content organization**
2. **TypeScript & safety**
3. **Missing translation handling**
4. **Routing & middleware**
5. **Performance & loading behavior**
6. **Developer experience (DX), tooling & maintenance**
7. **SEO & large-project scalability**

> **tl;dr**: All three can localize a Next.js app. If you want **component-scoped content**, **strict TypeScript types**, **build-time missing-key checks**, **tree-shaken dictionaries**, and **first-class App Router + SEO helpers**, **Intlayer** is the most complete, modern choice.

> One confusion often made by developers is to think that `next-intl` is the Next.js version of `react-intl`. It's not—`next-intl` is maintained by [Amann](https://github.com/amannn), while `react-intl` is maintained by [FormatJS](https://github.com/formatjs/formatjs).

---

## In short

- **next-intl** - Lightweight, straightforward message formatting with solid Next.js support. Centralized catalogs are common; DX is simple, but safety and large-scale maintenance remain mostly your responsibility.
- **next-i18next** - i18next in Next.js clothing. Mature ecosystem and features via plugins (e.g., ICU), but configuration can be verbose and catalogs tend to centralize as projects grow.
- **Intlayer** - Component-centric content model for Next.js, **strict TS typing**, **build-time checks**, **tree-shaking**, **built-in middleware & SEO helpers**, optional **Visual Editor/CMS**, and **AI-assisted translations**.

---

**October 2025:**

| Library                | GitHub Stars                                                                                                                                                            | Total Commits                                                                                                                                                               | Last Commit                                                                                                                                  | First Version | NPM Version                                                                                                | NPM Downloads                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`  | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=flat&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=flat&label=commits)](https://github.com/aymericzip/intlayer/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=flat)](https://github.com/aymericzip/intlayer/commits)   | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=flat)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=flat)](https://www.npmjs.com/package/intlayer)         |
| `amannn/next-intl`     | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=flat&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)         | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=flat&label=commits)](https://github.com/amannn/next-intl/commits)         | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=flat)](https://github.com/amannn/next-intl/commits)         | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=flat)](https://www.npmjs.com/package/next-intl)       | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=flat)](https://www.npmjs.com/package/next-intl)       |
| `i18next/i18next`      | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=flat&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)           | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=flat&label=commits)](https://github.com/i18next/i18next/commits)           | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=flat)](https://github.com/i18next/i18next/commits)           | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=flat)](https://www.npmjs.com/package/i18next)           | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=flat)](https://www.npmjs.com/package/i18next)           |
| `i18next/next-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=flat&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=flat&label=commits)](https://github.com/i18next/next-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=flat)](https://github.com/i18next/next-i18next/commits) | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=flat)](https://www.npmjs.com/package/next-i18next) | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=flat)](https://www.npmjs.com/package/next-i18next) |

> Badges update automatically. Snapshots will vary over time.

[![Star History Chart](https://api.star-history.com/svg?repos=i18next/i18next&repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/i18next&i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## Side-by-Side Feature Comparison (Next.js focused)

| Feature                                       | `next-intlayer` (Intlayer)                                                                                                          | `next-intl`                                                                                              | `next-i18next`                                                                                           |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Translations Near Components**              | ✅ Yes, content collocated with each component                                                                                      | ❌ No                                                                                                    | ❌ No                                                                                                    |
| **TypeScript Integration**                    | ✅ Advanced, auto-generated strict types                                                                                            | ✅ Good                                                                                                  | ⚠️ Basic                                                                                                 |
| **Missing Translation Detection**             | ✅ TypeScript error hightlight and build-time error/warning                                                                         | ⚠️ Runtime fallback                                                                                      | ⚠️ Runtime fallback                                                                                      |
| **Rich Content (JSX/Markdown/components)**    | ✅ Direct support                                                                                                                   | ❌ Not designed for rich nodes                                                                           | ⚠️ Limited                                                                                               |
| **AI-powered Translation**                    | ✅ Yes, supports multiple AI providers. Usable using your own API keys. Considers the context of your application and content scope | ❌ No                                                                                                    | ❌ No                                                                                                    |
| **Visual Editor**                             | ✅ Yes, local Visual Editor + optional CMS; can externalize codebase content; embeddable                                            | ❌ No / available via external localization platforms                                                    | ❌ No / available via external localization platforms                                                    |
| **Localized Routing**                         | ✅ Yes, supports localized paths out of the box (works with Next.js & Vite)                                                         | ✅ Built-in, App Router supports `[locale]` segment                                                      | ✅ Built-in                                                                                              |
| **Dynamic Route Generation**                  | ✅ Yes                                                                                                                              | ✅ Yes                                                                                                   | ✅ Yes                                                                                                   |
| **Pluralization**                             | ✅ Enumeration-based patterns                                                                                                       | ✅ Good                                                                                                  | ✅ Good                                                                                                  |
| **Formatting (dates, numbers, currencies)**   | ✅ Optimized formatters (Intl under the hood)                                                                                       | ✅ Good (Intl helpers)                                                                                   | ✅ Good (Intl helpers)                                                                                   |
| **Content Format**                            | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                    | ✅ .json, .js, .ts                                                                                       | ⚠️ .json                                                                                                 |
| **ICU support**                               | ⚠️ WIP                                                                                                                              | ✅ Yes                                                                                                   | ⚠️ Via plugin (`i18next-icu`)                                                                            |
| **SEO Helpers (hreflang, sitemap)**           | ✅ Built-in tools: helpers for sitemap, robots.txt, metadata                                                                        | ✅ Good                                                                                                  | ✅ Good                                                                                                  |
| **Ecosystem / Community**                     | ⚠️ Smaller but growing fast and reactive                                                                                            | ✅ Good                                                                                                  | ✅ Good                                                                                                  |
| **Server-side Rendering & Server Components** | ✅ Yes, streamlined for SSR / React Server Components                                                                               | ⚠️ Supported at page level but need to pass t-functions on component tree for children server components | ⚠️ Supported at page level but need to pass t-functions on component tree for children server components |
| **Tree-shaking (load only used content)**     | ✅ Yes, per-component at build time via Babel/SWC plugins                                                                           | ⚠️ Partial                                                                                               | ⚠️ Partial                                                                                               |
| **Lazy loading**                              | ✅ Yes, per-locale / per-dictionary                                                                                                 | ✅ Yes (per-route/per-locale), need namespace management                                                 | ✅ Yes (per-route/per-locale), need namespace management                                                 |
| **Purge unused content**                      | ✅ Yes, per-dictionary at build time                                                                                                | ❌ No, can be managed manually with namespace management                                                 | ❌ No, can be managed manually with namespace management                                                 |
| **Management of Large Projects**              | ✅ Encourages modular, suited for design-system                                                                                     | ✅ Modular with setup                                                                                    | ✅ Modular with setup                                                                                    |
| **Testing Missing Translations (CLI/CI)**     | ✅ CLI: `npx intlayer content test` (CI-friendly audit)                                                                             | ⚠️ Not built-in; docs suggest `npx @lingual/i18n-check`                                                  | ⚠️ Not built-in; rely on i18next tools / runtime `saveMissing`                                           |

---

## Introduction

Next.js gives you built-in support for internationalized routing (e.g. locale segments). But that feature doesn’t do translations on its own. You still need a library to render localized content to your users.

Many i18n libraries exist, but in the Next.js world today, three are gaining traction: next-i18next, next-intl, and Intlayer.

---

## Architecture & scalability

- **next-intl / next-i18next**: Default to **centralized catalogs** per locale (plus **namespaces** in i18next). Works fine early on, but often becomes a big shared surface area with rising coupling and key churn.
- **Intlayer**: Encourages **per-component** (or per-feature) dictionaries **co-located** with the code they serve. This lowers cognitive load, eases duplication/migration of UI pieces, and reduces cross-team conflicts. Unused content is naturally easier to spot and purge.

**Why it matters:** In large codebases or design-system setups, **modular content** scales better than monolithic catalogs.

---

## Bundle sizes & dependencies

After building the application, the bundle is the JavaScript that the browser will load to render the page. Bundle size is therefore important for application performance.

Two components are important in the context of a multi-language application bundle:

- The application code
- The content loaded by the browser

## Application Code

The importance of application code is minimal in this case. All three solutions are tree-shakable, meaning that unused parts of the code are not included in the bundle.

Here's a comparison of the JavaScript bundle size loaded by the browser for a multi-language application with the three solutions.

If we don't need any formatter in the application, the list of exported functions after tree-shaking will be:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (Bundle size is 180.6 kB -> 78.6 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (Bundle size is 101.3 kB -> 31.4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (Bundle size is 80.7 kB -> 25.5 kB (gzip))

These functions are only wrappers around React context/state, so the total impact of the i18n library on bundle size is minimal.

> Intlayer is slightly bigger than `next-intl` and `next-i18next` because it includes more logic in the `useIntlayer` function. This is related to markdown and `intlayer-editor` integration.

## Content and Translations

This part is often ignored by developers, but let's consider the case of an application composed of 10 pages in 10 languages. Let's assume that each page integrates 100% unique content to simplify the calculation (in reality, much content is redundant between pages, e.g., page title, header, footer, etc.).

A user wanting to visit the `/fr/about` page will load the content of one page in a given language. Ignoring content optimization would mean loading 8,200% `((1 + (((10 pages - 1) × (10 languages - 1)))) × 100)` of the application content unnecessarily. Do you see the problem? Even if this content remains text, and while you probably prefer to think about optimizing your site's images, you're sending useless content across the globe and making users' computers process it for nothing.

Two important issues:

- **Splitting by route:**

  > If I'm on the `/about` page, I don't want to load the content of the `/home` page

- **Splitting by locale:**
  > If I'm on the `/fr/about` page, I don't want to load the content of the `/en/about` page

Again, all three solutions are aware of these issues and allow managing these optimizations. The difference between the three solutions is the DX (Developer Experience).

`next-intl` and `next-i18next` use a centralized approach to manage translations, allowing splitting JSON by locale and by sub-files. In `next-i18next`, we call the JSON files 'namespaces'; `next-intl` allows declaring messages. In `intlayer`, we call the JSON files 'dictionaries'.

- In the case of `next-intl`, like `next-i18next`, content is loaded at the page/layout level, then this content is loaded into a context provider. This means the developer must manually manage the JSON files that will be loaded for each page.

> In practice, this implies that developers often skip this optimization, preferring to load all content in the page's context provider for simplicity.

- In the case of `intlayer`, all content is loaded in the application. Then a plugin (`@intlayer/babel` / `@intlayer/swc`) takes care of optimizing the bundle by loading only the content used on the page. The developer therefore doesn't need to manually manage the dictionaries that will be loaded. This allows better optimization, better maintainability, and reduces development time.

As the application grows (especially when multiple developers work on the application), it's common to forget to remove content that's no longer used from JSON files.

> Note that all JSON is loaded in all cases (next-intl, next-i18next, intlayer).

This is why Intlayer's approach is more performant: if a component is no longer used, its dictionary is not loaded in the bundle.

How the library handles fallbacks is also important. Let's consider that the application is in English by default, and the user visits the `/fr/about` page. If translations are missing in French, we'll consider the English fallback.

In the case of `next-intl` and `next-i18next`, the library requires loading the JSON related to the current locale, but also to the fallback locale. Thus, considering that all content has been translated, each page will load 100% unnecessary content. **In comparison, `intlayer` processes the fallback at dictionary build time. Thus, each page will load only the content used.**

---

## Developer Experience

This part makes a deep comparison between the three solutions. Rather than considering simple cases, as described in the 'getting started' documentation for each solution, we will consider a real use case, more similar to a real project.

### App structure

The app structure is important to ensure good maintainability for your codebase.

### next-intl

```bash
.
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
├── i18n.ts
└── src
    ├── pages
    │   └── home.tsx
    └── components
        └── Navbar
            └── Navbar.tsx
```

### next-i18next

```bash
.
├── public
│   └── locales
│       ├── en
│       │  ├── home.json
│       │  └── navbar.json
│       ├── fr
│       │  ├── home.json
│       │  └── navbar.json
│       └── es
│          ├── home.json
│          └── navbar.json
├── next-i18next.config.js
├── pages
│   ├── _app.tsx
│   └── home.tsx
└── src
    └── components
        └── Navbar
            └── Navbar.tsx
```

### intlayer

```bash
.
├── intlayer.config.ts
└── src
    ├── pages
    │   ├── home.tsx
    │   └── home.content.ts
    └── components
        └── Navbar
            ├── Navbar.tsx
            └── navbar.content.ts
```

### Comparison

#### Configuration

Intlayer uses a centralized configuration file to set up your locale, middleware, build, etc.

#### Content declaration

The centralized type of architecture slows down the development process and makes the codebase more complex to maintain for several reasons:

1. **For any new component created, you should:**
   - Create the new resource/namespace in the `locales` folder
   - Remember to import the new namespace in your page
   - Translate your content (often done manually by copy/paste from AI providers)

2. **For any change made on your components, you should:**
   - Search for the related resource/namespace (far from the component)
   - Translate your content
   - Ensure your content is up to date for any locale
   - Verify your namespace doesn't include unused keys/values
   - Ensure the structure of your JSON files is the same for all locales

On professional projects using these solutions, localization platforms are often used to help manage the translation of your content. However, this can quickly become costly for large projects.

To solve this problem, Intlayer adopts an approach that scopes your content per-component and keeps your content close to your component, as we often do with CSS (`styled-components`), types, documentation (`storybook`), or unit tests (`jest`).

This approach allows you to:

1. **Increase the speed of development**
   - `.content.{{ts|mjs|cjs|json}}` files can be created using a VSCode extension
   - Autocompletion AI tools in your IDE (such as GitHub Copilot) can help you declare your content, reducing copy/paste

2. **Clean your codebase**
   - Reduce the complexity
   - Increase the maintainability

3. **Duplicate your components and their related content more easily (Example: login/register components, etc.)**
   - By limiting the risk of impacting other components' content
   - By copy/pasting your content from one application to another without external dependencies

4. **Avoid polluting your codebase with unused keys/values for unused components**
   - If you don't use a component, Intlayer will not import its related content
   - If you delete a component, you'll more easily remember to remove its related content as it will be present in the same folder

5. **Reduce reasoning cost for AI agents to declare your multilingual content**
   - The AI agent won't have to scan your entire codebase to know where to implement your content
   - Translations can easily be done by autocompletion AI tools in your IDE (such as GitHub Copilot)

6. **Optimize loading performance**
   - If a component is lazy-loaded, its related content will be loaded at the same time

### Setup and Loading Content

As mentioned previously, you must optimize how each JSON file is imported into your code.
How the library handles content loading is important.

#### next-intl

```tsx fileName="i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales = ["en", "fr", "es"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import pick from "lodash/pick";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  // Les messages sont chargés côté serveur via src/i18n/request.ts
  // (voir docs next-intl). Ici on ne pousse au client qu'un sous-ensemble
  // utile aux composants client (optimisation du payload).
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations } from "next-intl/server";
import { ClientComponent, ServerComponent } from "@components";

export default async function LandingPage({
  params,
}: {
  params: { locale: string };
}) {
  // Chargement strictement côté serveur (pas hydraté au client)
  const t = await getTranslations("about");

  return (
    <main>
      <h1>{t("title")}</h1>
      <ClientComponent />
      <ServerComponent />
    </main>
  );
}
```

#### next-i18next

```tsx fileName="next-i18next.config.js"
module.exports = {
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/_app.tsx"
import { appWithTranslation } from "next-i18next";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance } from "i18next";
import { ClientComponent, ServerComponent } from "@components";

export default function HomePage() {
  // Déclarez explicitement le namespace utilisé par ce composant
  const resources = await loadMessagesFor(locale); // your loader (JSON, etc.)

  const i18n = createInstance();
  i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: "en",
    resources,
    ns: ["common", "about"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

  const { t } = useTranslation("about");

  return (
    <I18nextProvider i18n={i18n}>
      <main>
        <h1>{t("title")}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </I18nextProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Ne préchargez que les namespaces nécessaires à CETTE page
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "about"])),
    },
  };
};
```

#### Intlayer

```tsx fileName="intlayer.config.ts"
export default {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </html>
  );
};

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </html>
  );
};

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

#### Comparison

In comparison to other solutions, Intlayer uses plugins to optimize the import of content at build time.

This means that the client context can be stored in the root layout, to reuse only one instance of the provider for all pages.

In comparison, the other solutions require rebuilding a custom provider for each page.

Intlayer also provides a Provider for your server components. We'll see why later.

### Usage in a client component

Let's take an example of a client component rendering a counter.

#### next-i18next

**Translations (must be real JSON in `public/locales/...`)**

```json fileName="public/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="public/locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Client component**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";

export default function ClientComponentExample() {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // next-i18next doesn't expose useNumber; use Intl.NumberFormat
  const nf = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{nf.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
}
```

> Don’t forget to add "about" namespace on the page serverSideTranslations
> We take here the version of react 19.x.x, but for lower versions, you will need to use useMemo to store the instance of the formatter as it's a heavy function

#### next-intl

**Translations (shape reused; load them into next-intl messages as you prefer)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Client component**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export default function ClientComponentExample() {
  // Scope directly to the nested object
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
}
```

> Don’t forget to add "about" message on the page client message

#### Intlayer

**Content**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**Client component**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

export default function ClientComponentExample() {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // returns strings
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
}
```

#### Comparison

- **Number formatting**
  - **next-i18next**: no `useNumber`; use `Intl.NumberFormat` (or i18next-icu).
  - **next-intl**: `useFormatter().number(value)`.
  - **Intlayer**: `useNumber()` built-in.

- **Keys**
  - Keep a nested structure (`about.counter.label`) and scope your hook accordingly (`useTranslation("about")` + `t("counter.label")` or `useTranslations("about.counter")` + `t("label")`).

- **File locations**
  - **next-i18next** expects JSON in `public/locales/{lng}/{ns}.json`.
  - **next-intl** is flexible; load messages however you configure.
  - **Intlayer** stores content in TS/JS dictionaries and resolves by key.

---

### Usage in a server component

We will take the case of a UI component. This component is a server component, and should be able to be inserted as a child of a client component. (page (server component) -> client component -> server component). As this component can be inserted as a child of a client component, it cannot be async.

### next-i18next

```tsx fileName="src/pages/about.tsx"
import React from "react";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type ServerComponentProps = {
  count: number;
  t: (key: string) => string;
  format: (value: number) => string;
};

export default function ServerComponent({
  t,
  format,
  count,
}: ServerComponentProps) {
  return (
    <div>
      <p>{format(count)}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
}
```

> As the server component cannot be async, you need to pass the translations and formatter function as props.
>
> - `const { t, i18n } = useTranslation("about");`
> - `const formatted = new Intl.NumberFormat(i18n.language).format(initialCount);`

---

### next-intl

```tsx fileName="src/components/ServerComponent.tsx"
import { getTranslations, getFormatter } from "next-intl/server";

export default async function ServerComponent({
  t,
  format,
  count,
}: {
  t: (key: string) => string;
  format: (value: number) => string;
  count: number;
}) {
  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")}>{t("increment")}</button>
    </div>
  );
}
```

> As the server component cannot be async, you need to pass the translations and formatter function as props.
>
> - `const t = await getTranslations("about.counter");`
> - `const format = await getFormatter();`

---

### Intlayer (App Router, Server Provider + Server hook)

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

const ServerComponent = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

> Intlayer exposes **server-safe** hooks via `next-intlayer/server`. To work, `useIntlayer` and `useNumber` use hooks-like syntax, similar to the client hooks, but depend under the hood on the server context (`IntlayerServerProvider`).

### Metadata / Sitemap / Robots

Translating content is great. But people usually forget that the main goal of internationalization is to make your website more visible to the world. I18n is an incredible lever to improve your website visibility.

Here's a list of good practices regarding multilingual SEO.

- set hreflang meta tags in the `<head>` tag
  > It helps search engines to understand what languages are available on the page
- list all pages translations in the sitemap.xml using `http://www.w3.org/1999/xhtml` XML schema
  >
- do not forget to exclude prefixed pages from the robots.txt (e.g. `/dashboard`, and `/fr/dashboard`, `/es/dashboard`)
  >
- use custom Link component to redirect to the most localized page (e.g. in french `<a href="/fr/about">A propos</a>` )
  >

Developers often forget to properly reference their pages across locales.

#### next-intl

```tsx fileName="src/app/[locale]/about/layout.tsx
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Rest of the page code
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

#### next-i18next

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Prefix path with locale unless it's the default locale */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Absolute URL helper */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Dynamically import the correct JSON file
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, abs(l, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

#### Intlayer

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Rest of the page code
````

```tsx fileName="src/app/about/page.tsx"
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer provides a `getMultilingualUrls` function to generate multilingual URLs for your sitemap.

---

#### Intlayer

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Rest of the code
````

```tsx fileName="src/app/about/page.tsx"
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer provides a `getMultilingualUrls` function to generate multilingual URLs for your sitemap.

---

## TypeScript & safety

- **next-intl**: Solid TypeScript support, but **keys aren’t strictly typed by default**; you’ll maintain safety patterns manually.
- **next-i18next**: Base typings for hooks; **strict key typing requires extra tooling/config**.
- **Intlayer**: **Generates strict types** from your content. **IDE autocompletion** and **compile-time errors** catch typos and missing keys before deploy.

**Why it matters:** Strong typing shifts failures **left** (CI/build) instead of **right** (runtime).

---

## Missing translation handling

- **next-intl / next-i18next**: Rely on **runtime fallbacks** (e.g., show the key or default locale). Build doesn’t fail.
- **Intlayer**: **Build-time detection** with **warnings/errors** for missing locales or keys.

**Why it matters:** Catching gaps during build prevents “mystery strings” in production and aligns with strict release gates.

---

## Routing, middleware & URL strategy

- All three work with **Next.js localized routing** on the App Router.
- **Intlayer** goes further with **i18n middleware** (locale detection via headers/cookies) and **helpers** to generate localized URLs and `<link rel="alternate" hreflang="…">` tags.

**Why it matters:** Fewer custom glue layers; **consistent UX** and **clean SEO** across locales.

---

## Server Components (RSC) alignment

- **All** support Next.js 13+.
- **Intlayer** smooths the **server/client boundary** with a consistent API and providers designed for RSC, so you don’t shuttle formatters or t-functions through component trees.

**Why it matters:** Cleaner mental model and fewer edge cases in hybrid trees.

---

## DX, tooling & maintenance

- **next-intl / next-i18next**: You’ll typically wire up external platforms for translations and editorial workflows.
- **Intlayer**: Ships a **free Visual Editor** and **optional CMS** (Git-friendly or externalized). Plus **VSCode extension** for content authoring and **AI-assisted translations** using your own provider keys.

## **Why it matters:** Lowers ops cost and shortens the loop between developers and content authors.

## And the winner is…

It’s not simple. Each option has trade-offs. Here’s how I see it:

- **next-intl** — simplest, lightweight, fewer decisions forced on you. If you want a **minimal** solution, you’re comfortable with centralized catalogs, and your app is **small to mid-size**.

- **next-i18next** — mature, full of features, lots of community plugins, but higher setup cost. If you need **i18next’s plugin ecosystem** (e.g., advanced ICU rules via plugins) and your team already knows i18next, accepting **more configuration** for flexibility.

- **Intlayer** — built for modern Next.js, with modular content, type safety, tooling, and less boilerplate. If you value **component-scoped content**, **strict TypeScript**, **build-time guarantees**, **tree-shaking**, and **batteries-included** routing/SEO/editor tooling - especially for **Next.js App Router**, design-systems and **large, modular codebases**.

If you prefer minimal setup and accept some manual wiring, next-intl is a good pick. If you need all the features and don’t mind complexity, next-i18next works. But if you want a modern, scalable, modular solution with built tools, Intlayer aims to give you that out of the box.

---

## Interoperability with `next-intl` and `next-i18next`

`intlayer` can also help to manage your `next-intl` and `next-i18next` namespaces.

Using `intlayer`, you can declare your content in the format of your favorite i18n library, and intlayer will generate your namespaces in the location of your choice (example: `/messages/{{locale}}/{{namespace}}.json`).

Refer to [`dictionaryOutput` and `i18nextResourcesDir` options](https://intlayer.org/doc/concept/configuration#content-configuration) for more details.

---

## GitHub STARs

GitHub stars are a strong indicator of a project's popularity, community trust, and long-term relevance. While not a direct measure of technical quality, they reflect how many developers find the project useful, follow its progress, and are likely to adopt it. For estimating the value of a project, stars help compare traction across alternatives and provide insights into ecosystem growth.

[![Star History Chart](https://api.star-history.com/svg?repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## Conclusion

All three libraries succeed at core localization. The difference is **how much work you must do** to achieve a robust, scalable setup in **modern Next.js**:

- With **Intlayer**, **modular content**, **strict TS**, **build-time safety**, **tree-shaken bundles**, and **first-class App Router + SEO tooling** are **defaults**, not chores.
- If your team prizes **maintainability and speed** in a multi-locale, component-driven app, Intlayer offers the **most complete** experience today.

Refer to ['Why Intlayer?' doc](https://intlayer.org/doc/why) for more details.
