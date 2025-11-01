---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: How to internationalize your Next.js application using next-intl
description: Set up i18n with next-intl: best practices and SEO tips for multilingual Next.js apps, covering internationalization, content organization, and technical setup.
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: Initial version
---

# How to internationalize your Next.js application using next-intl in 2025

## Table of Contents

<TOC/>

## What is next-intl?

**next-intl** is a popular internationalization (i18n) library designed specifically for Next.js App Router. It provides a seamless way to build multilingual Next.js applications with excellent TypeScript support and built-in optimizations.

With next-intl, you can:

- **Organize translations** using namespaces (e.g., `common.json`, `about.json`) for better content management.
- **Load translations efficiently** by loading only the namespaces needed for each page, reducing bundle size.
- **Support both server and client components** with proper SSR and hydration handling.
- **Ensure TypeScript support** with type-safe locale configuration and translation keys.
- **Benefit from built-in formatting** for dates, numbers, and other locale-specific formatting.
- **Optimize for SEO** with proper metadata, sitemap, and robots.txt internationalization.

> See [Application Template](https://github.com/aymericzip/next-intl-template) on GitHub.

If you prefer, you can also refer to the [next-i18next guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_next-i18next.md), or directly using [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-intl.md).

See the comparison in [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md).

## Best Practices

Before we dive into the implementation, here are some best practices you should follow:

- **Set up TypeScript types** for your locales to ensure type safety throughout your application.
- **Set HTML `lang` and `dir` attributes**: In your layout, compute `dir` using `getLocaleDirection(locale)` and set `<html lang={locale} dir={dir}>` for proper accessibility and SEO.
- **Split messages by namespace**: Organize JSON files per locale and namespace (e.g., `common.json`, `about.json`) to load only what you need.
- **Minimize client payload**: On pages, send only required namespaces to `NextIntlClientProvider` (e.g., `pick(messages, ['common', 'about'])`).
- **Prefer static pages**: Use `export const dynamic = 'force-static'` and generate static params for all locales when possible.
- **Keep server components synchronous**: Pass precomputed strings (translated labels, formatted numbers) rather than async calls or non-serializable functions to nested server components.

---

## Step-by-Step Guide to Set Up next-intl in a Next.js Application

Here's the project structure we'll be creating:

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── proxy.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

### Step 1: Install Dependencies

Install the necessary packages using npm:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: The core internationalization library for Next.js App Router that provides hooks, server functions, and client providers for managing translations.

### Step 2: Configure Your Project

Create a configuration file that defines your supported locales and sets up next-intl's request configuration. This file serves as the single source of truth for your i18n setup and ensures type safety throughout your application.

**Why this step is important**: Centralizing your locale configuration prevents inconsistencies and makes it easier to add or remove locales in the future. The `getRequestConfig` function runs on every request and loads only the translations needed for each page, enabling code-splitting and reducing bundle size.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Define supported locales with type safety
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// Load messages dynamically per locale to enable code-splitting
// Promise.all loads namespaces in parallel for better performance
async function loadMessages(locale: Locale) {
  // Load only the namespaces your layout/pages need
  const [common, about] = await Promise.all([
    import(`@/locales/${locale}/common.json`).then((m) => m.default),
    import(`@/locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

// Helper to generate localized URLs (e.g., /about vs /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig runs on every request and provides messages to server components
// This is where next-intl hooks into Next.js's server-side rendering
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

### Step 3: Define Dynamic Locale Routes

Set up dynamic routing for locales by creating a `[locale]` directory in your app folder. This allows Next.js to handle locale-based routing where each locale becomes a URL segment (e.g., `/en/about`, `/fr/about`).

**Why this step is important**: Using dynamic routes enables Next.js to generate static pages for all locales at build time, improving performance and SEO. The layout component sets the HTML `lang` and `dir` attributes based on the locale, which is crucial for accessibility and search engine understanding.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Pre-generate static pages for all locales at build time (SSG)
// This improves performance and SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // In Next.js App Router, params is a Promise (can be await'd)
  // This allows for dynamic route segments to be resolved asynchronously
  const { locale } = await params;

  // Critical: setRequestLocale tells next-intl which locale to use for this request
  // Without this, getTranslations() won't know which locale to use in server components
  setRequestLocale(locale);

  // Get text direction (LTR/RTL) for proper HTML rendering
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Messages are loaded server-side. Push only what's needed to the client.
  // This minimizes the JavaScript bundle sent to the browser
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Strictly server-side translations/formatting
  // These run on the server and can be passed as props to components
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider makes translations available to client components
    // Only pass the namespaces your client components actually use
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Step 4: Create Your Translation Files

Create JSON files for each locale and namespace. This structure allows you to organize translations logically and load only what you need for each page.

**Why this step is important**: Organizing translations by namespace (e.g., `common.json`, `about.json`) enables code splitting and reduces bundle size. You only load the translations needed for each page, improving performance.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### Step 5: Utilize Translations in Your Pages

Create a page component that loads translations on the server and passes them to both server and client components. This ensures that translations are loaded before rendering and prevents content flashing.

**Why this step is important**: Server-side loading of translations improves SEO and prevents FOUC (Flash of Untranslated Content). By using `pick` to send only required namespaces to the client provider, we minimize the JavaScript bundle sent to the browser.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Messages are loaded server-side. Push only what's needed to the client.
  // This minimizes the JavaScript bundle sent to the browser
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Strictly server-side translations/formatting
  // These run on the server and can be passed as props to components
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider makes translations available to client components
    // Only pass the namespaces your client components actually use
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Step 6: Use Translations in Client Components

Client components can use the `useTranslations` and `useFormatter` hooks to access translations and formatting functions. These hooks read from the `NextIntlClientProvider` context.

**Why this step is important**: Client components need React hooks to access translations. The `useTranslations` and `useFormatter` hooks integrate seamlessly with next-intl and provide reactive updates when the locale changes.

> Don't forget to add the required namespaces to the page's client messages (only include the namespaces your client components actually need).

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Scope directly to the nested object
  // useTranslations/useFormatter are hooks that read from NextIntlClientProvider context
  // They only work if the component is wrapped in NextIntlClientProvider
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

### Step 7: Use Translations in Server Components

Server components cannot use React hooks, so they receive translations and formatters via props from their parent components. This approach keeps server components synchronous and allows them to be nested inside client components.

**Why this step is important**: Server components that might be nested under client boundaries need to be synchronous. By passing translated strings and formatted values as props, we avoid async operations and ensure proper rendering. Pre-compute translations and formatting in the parent page component.

```tsx fileName="src/components/ServerComponent.tsx"
// Server components nested inside client components must be synchronous
// React can't serialize async functions across the server/client boundary
// Solution: pre-compute translations/formats in the parent and pass as props
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

> In your page/layout, use `getTranslations` and `getFormatter` from `next-intl/server` to pre-compute translations and formatting, then pass them as props to server components.

---

### (Optional) Step 8: Change the language of your content

To change the language of your content with next-intl, render locale-aware links that point to the same pathname while switching locale. The provider rewrites URLs automatically, so you only have to target the current route.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import Link from "next-intl/link";
import { useLocale } from "next-intl";
import { usePathname } from "next-intl/client";
import { locales, type Locale } from "@/i18n";

const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname() ?? "/";

  return (
    <nav aria-label="Language selector">
      <ul>
        {(locales as readonly Locale[]).map((locale) => (
          <li key={locale}>
            <Link
              href={pathname}
              locale={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
            >
              {localeLabels[locale] ?? locale.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### (Optional) Step 9: Use the localized Link component

`next-intl/link` provides a localized link component that automatically applies the active locale. You can use it like this:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import Link, { type LinkProps } from "next-intl/link";

return <Link href="/about">About</Link>;
```

### (Optional) Step 10: Access the active locale inside Server Actions

Server Actions can read the current locale using `next-intl/server`. This is useful for sending localized emails or storing language preferences alongside submitted data.

```ts fileName="src/app/actions/get-current-locale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Use the locale to select templates, analytics labels, etc.
  console.log(`Received contact form from locale ${locale}`);
}
```

> `getLocale` reads the locale set by `next-intl` proxy, so it works anywhere on the server: Route Handlers, Server Actions, and edge functions.

### (Optional) Step 11: Internationalize Your Metadata

Translating content is important, but the main goal of internationalization is to make your website more visible to the world. I18n is an incredible lever to improve your website visibility through proper SEO.

**Why this step is important**: Properly internationalized metadata helps search engines understand what languages are available on your pages. This includes setting hreflang meta tags, translating titles and descriptions, and ensuring canonical URLs are correctly set for each locale.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata runs for each locale, generating SEO-friendly metadata
// This helps search engines understand alternate language versions
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
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

### (Optional) Step 12: Internationalize Your Sitemap

Generate a sitemap that includes all locale versions of your pages. This helps search engines discover and index all language versions of your content.

**Why this step is important**: A properly internationalized sitemap ensures search engines can find and index all language versions of your pages. This improves visibility in international search results.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

// Generate sitemap with all locale variants for better SEO
// The alternates field tells search engines about language versions
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

### (Optional) Step 13: Internationalize Your robots.txt

Create a robots.txt file that properly handles all locale versions of your protected routes. This ensures that search engines don't index admin or dashboard pages in any language.

**Why this step is important**: Properly configuring robots.txt for all locales prevents search engines from indexing sensitive pages in any language. This is crucial for security and privacy.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Generate paths for all locales (e.g., /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### (Optional) Step 14: Set Up Proxy for Locale Routing

Create a proxy to automatically detect the user's preferred locale and redirect them to the appropriate locale-prefixed URL. next-intl provides a convenient proxy function that handles this automatically.

**Why this step is important**: Proxy ensures that users are automatically redirected to their preferred language when they visit your site. It also saves the user's preference for future visits, improving user experience.

```ts fileName="src/proxy.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

// Proxy runs before routes, handling locale detection and routing
// localeDetection: true uses Accept-Language header to auto-detect locale
export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Skip API, Next internals and static assets
  // Regex: match all routes except those starting with api, _next, or containing a dot (files)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (Optional) Step 15: Automate Your Translations Using Intlayer

Intlayer is a **free** and **open-source** library designed to assist the localization process in your application. While next-intl handles the translation loading and management, Intlayer helps automate the translation workflow.

**Why this step is important**: Managing translations manually can be time-consuming and error-prone. Intlayer automates translation testing, generation, and management, saving you time and ensuring consistency across your application.

Intlayer will allows your to:

- **Declare your content where you want in your codebase**
  Intlayer allows to declare your content where you want in your codebase using `.content.{ts|js|json}` files. It will allow a better organization of your content, ensuring better readability and maintainability of your codebase.

- **Test missing translations**
  Intlayer provide test functions to that can be integrated in your CI/CD pipeline, or in your unit tests. Learn more about [testing your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/testing.md).

- **Automate your translations**,
  Intlayer provide a CLI and a VSCode extension to automate your translations. It can be integrated in your CI/CD pipeline. Learn more about [automating your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md).
  You can use your **own API key, and the AI provider of your choice**. It also provide context aware translations, see [fill content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/autoFill.md).

- **Connect external content**
  Intlayer allows you to connect your content to an external content management system (CMS). To fetch it in a optimized way and insert it in your JSON resources. Learn more about [fetching external content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md).

- **Visual editor**
  Intlayer offers an free visual editor to edit your content using a visual editor. Learn more about [visual editing your translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md).

And more. To discover all the features provided by Intlayer, please refer to the [Interest of Intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md).
