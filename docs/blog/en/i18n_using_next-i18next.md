---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: How to internationalize your Next.js application using next-i18next
description: Set up i18n with next-i18next: best practices and SEO tips for multilingual Next.js apps, covering internationalization, content organization, and technical setup.
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Initial version
---

# How to internationalize your Next.js application using next-i18next in 2025

## Table of Contents

<TOC/>

## What is next-i18next?

**next-i18next** is a popular internationalization (i18n) solution for Next.js applications. While the original `next-i18next` package was designed for the Pages Router, this guide shows you how to implement i18next with the modern **App Router** using `i18next` and `react-i18next` directly.

With this approach, you can:

- **Organize translations** using namespaces (e.g., `common.json`, `about.json`) for better content management.
- **Load translations efficiently** by loading only the namespaces needed for each page, reducing bundle size.
- **Support both server and client components** with proper SSR and hydration handling.
- **Ensure TypeScript support** with type-safe locale configuration and translation keys.
- **Optimize for SEO** with proper metadata, sitemap, and robots.txt internationalization.

> See [Application Template](https://github.com/aymericzip/next-i18next-template) on GitHub.

As an alternative, you can also refer to the [next-intl guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_with_next-intl.md), or directly using [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md).

## Best Practices

Before we dive into the implementation, here are some best practices you should follow:

- **Set up TypeScript types** for your locales to ensure type safety throughout your application.
- **Augment i18next types** so translation keys are strongly typed across namespaces on both server and client.
- **Set HTML `lang` and `dir` attributes**: In your layout, compute `dir` based on locale and set `<html lang={locale} dir={dir}>` for proper accessibility and SEO.
- **Split messages by namespace**: Organize JSON files per locale and namespace (e.g., `common.json`, `about.json`) to load only what you need.
- **Minimize client payload**: On pages, send only required namespaces to your provider to reduce bundle size.
- **Prefer static pages**: Use `export const dynamic = 'force-static'` and generate static params for all locales when possible.
- **Keep server components synchronous**: Pass precomputed strings (translated labels, formatted numbers) rather than async calls or non-serializable functions to nested server components.

If you prefer, you can also refer to the [next-i18next guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_with_next-intl.md), or directly using [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md).

See the comparison in [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md).

---

## Step-by-Step Guide to Set Up i18next in a Next.js Application

Here's the project structure we'll be creating:

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Step 1: Install Dependencies

Install the necessary packages using npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: The core internationalization framework that handles translation loading and management.
- **react-i18next**: React bindings for i18next that provide hooks like `useTranslation` for client components.
- **i18next-resources-to-backend**: A plugin that enables dynamic loading of translation files, allowing you to load only the namespaces you need.

### Step 2: Configure Your Project

Create a configuration file to define your supported locales, default locale, and helper functions for URL localization. This file serves as the single source of truth for your i18n setup and ensures type safety throughout your application.

**Why this step is important**: Centralizing your locale configuration prevents inconsistencies and makes it easier to add or remove locales in the future. The helper functions ensure consistent URL generation for SEO and routing.

```ts fileName="i18n.config.ts"
// Define supported locales as a const array for type safety
// The 'as const' assertion makes TypeScript infer literal types instead of string[]
export const locales = ["en", "fr"] as const;

// Extract the Locale type from the locales array
// This creates a union type: "en" | "fr"
export type Locale = (typeof locales)[number];

// Set the default locale used when no locale is specified
export const defaultLocale: Locale = "en";

// Right-to-left languages that need special text direction handling
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Check if a locale requires RTL (right-to-left) text direction
// Used for languages like Arabic, Hebrew, Persian, and Urdu
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Generate a localized path for a given locale and path
// Default locale paths don't have a prefix (e.g., "/about" instead of "/en/about")
// Other locales are prefixed (e.g., "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// Base URL for absolute URLs (used in sitemaps, metadata, etc.)
const ORIGIN = "https://example.com";

// Generate an absolute URL with locale prefix
// Used for SEO metadata, sitemaps, and canonical URLs
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

### Step 3: Centralize Translation Namespaces

Create a single source of truth for every namespace your application exposes. Reusing this list keeps server, client, and tooling code in sync and unlocks strong typing for translation helpers.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Step 4: Strongly Type Translation Keys with TypeScript

Augment `i18next` to point at your canonical language files (usually English). TypeScript then infers valid keys per namespace, so calls to `t()` are checked end-to-end.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> Tip: Store this declaration under `src/types` (create the folder if it doesn't exist). Next.js already includes `src` in `tsconfig.json`, so the augmentation is picked up automatically.

With this in place you can rely on autocomplete and compile-time checks:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// ✅ typed: t("counter.increment")
// ❌ compile error: t("doesNotExist")

export type AboutTranslator = TFunction<"about">;
```

### Step 5: Set Up Server-Side i18n Initialization

Create a server-side initialization function that loads translations for server components. This function creates a separate i18next instance for server-side rendering, ensuring that translations are loaded before rendering.

**Why this step is important**: Server components need their own i18next instance because they run in a different context than client components. Pre-loading translations on the server prevents flash of untranslated content and improves SEO by ensuring search engines see translated content.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// Configure dynamic resource loading for i18next
// This function dynamically imports translation JSON files based on locale and namespace
// Example: locale="fr", namespace="about" -> imports "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Initialize i18next instance for server-side rendering
 *
 * @returns Initialized i18next instance ready for server-side use
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Create a new i18next instance (separate from client-side instance)
  const i18n = createInstance();

  // Initialize with React integration and backend loader
  await i18n
    .use(initReactI18next) // Enable React hooks support
    .use(backend) // Enable dynamic resource loading
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Load only specified namespaces for better performance
      defaultNS: "common", // Default namespace when none is specified
      interpolation: { escapeValue: false }, // Don't escape HTML (React handles XSS protection)
      react: { useSuspense: false }, // Disable Suspense for SSR compatibility
      returnNull: false, // Return empty string instead of null for missing keys
      initImmediate: false, // Defer initialization until resources are loaded (faster SSR)
    });
  return i18n;
}
```

### Step 6: Create Client-Side i18n Provider

Create a client component provider that wraps your application with i18next context. This provider receives pre-loaded translations from the server to prevent flash of untranslated content (FOUC) and avoid duplicate fetching.

**Why this step is important**: Client components need their own i18next instance that runs in the browser. By accepting pre-loaded resources from the server, we ensure seamless hydration and prevent content flashing. The provider also manages locale changes and namespace loading dynamically.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// Configure dynamic resource loading for client-side
// Same pattern as server-side, but this instance runs in the browser
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Pre-loaded resources from server (prevents FOUC - Flash of Untranslated Content)
  // Format: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Client-side i18n provider that wraps the app with i18next context
 * Receives pre-loaded resources from server to avoid re-fetching translations
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // Create i18n instance once using useState lazy initializer
  // This ensures the instance is created only once, not on every render
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // If resources are provided (from server), use them to avoid client-side fetching
        // This prevents FOUC and improves initial load performance
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Prevent undefined values from being returned
      });

    return i18nInstance;
  });

  // Update language when locale prop changes
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Ensure all required namespaces are loaded client-side
  // Using join("|") as dependency to compare arrays correctly
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Provide i18n instance to all child components via React context
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Step 7: Define Dynamic Locale Routes

Set up dynamic routing for locales by creating a `[locale]` directory in your app folder. This allows Next.js to handle locale-based routing where each locale becomes a URL segment (e.g., `/en/about`, `/fr/about`).

**Why this step is important**: Using dynamic routes enables Next.js to generate static pages for all locales at build time, improving performance and SEO. The layout component sets the HTML `lang` and `dir` attributes based on the locale, which is crucial for accessibility and search engine understanding.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Disable dynamic params - all locales must be known at build time
// This ensures static generation for all locale routes
export const dynamicParams = false;

/**
 * Generate static params for all locales at build time
 * Next.js will pre-render pages for each locale returned here
 * Example: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Root layout component that handles locale-specific HTML attributes
 * Sets the lang attribute and text direction (ltr/rtl) based on locale
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Validate locale from URL params
  // If invalid locale is provided, fall back to default locale
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // Determine text direction based on locale
  // RTL languages like Arabic need dir="rtl" for proper text rendering
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Step 8: Create Your Translation Files

Create JSON files for each locale and namespace. This structure allows you to organize translations logically and load only what you need for each page.

**Why this step is important**: Organizing translations by namespace (e.g., `common.json`, `about.json`) enables code splitting and reduces bundle size. You only load the translations needed for each page, improving performance.

```json fileName="src/locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="src/locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### Step 9: Utilize Translations in Your Pages

Create a page component that initializes i18next on the server and passes translations to both server and client components. This ensures that translations are loaded before rendering and prevents content flashing.

**Why this step is important**: Server-side initialization loads translations before the page renders, improving SEO and preventing FOUC. By passing pre-loaded resources to the client provider, we avoid duplicate fetching and ensure smooth hydration.

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * Server component page that handles i18n initialization
 * Pre-loads translations on the server and passes them to client components
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Define which translation namespaces this page needs
  // Reuse the centralized list for type safety and autocomplete
  const pageNamespaces = allNamespaces;

  // Initialize i18next on the server with required namespaces
  // This loads translation JSON files server-side
  const i18n = await initI18next(locale, pageNamespaces);

  // Get a fixed translation function for the "about" namespace
  // getFixedT locks the namespace, so t("title") instead of t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // Extract translation bundles from the i18n instance
  // This data is passed to I18nProvider to hydrate client-side i18n
  // Prevents FOUC (Flash of Untranslated Content) and avoids duplicate fetching
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### Step 10: Use Translations in Client Components

Client components can use the `useTranslation` hook to access translations. This hook provides access to the translation function and the i18n instance, allowing you to translate content and access locale information.

**Why this step is important**: Client components need React hooks to access translations. The `useTranslation` hook integrates seamlessly with i18next and provides reactive updates when the locale changes.

> Ensure the page/provider includes only the namespaces you need (e.g., `about`).  
> If you use React < 19, memoize heavy formatters like `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Client component example using React hooks for translations
 * Can use hooks like useState, useEffect, and useTranslation
 */
const ClientComponent = () => {
  // useTranslation hook provides access to translation function and i18n instance
  // Specify namespace to only load translations for "about" namespace
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Create locale-aware number formatter
  // i18n.language provides current locale (e.g., "en", "fr")
  // Intl.NumberFormat formats numbers according to locale conventions
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      {/* Format number using locale-specific formatting */}
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

### Step 11: Use Translations in Server Components

Server components cannot use React hooks, so they receive translations via props from their parent components. This approach keeps server components synchronous and allows them to be nested inside client components.

**Why this step is important**: Server components that might be nested under client boundaries need to be synchronous. By passing translated strings and locale information as props, we avoid async operations and ensure proper rendering.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "react-i18next";

type ServerComponentProps = {
  // Translation function passed from parent server component
  // Server components can't use hooks, so translations come via props
  // Strongly typed to the "about" namespace for compile-time safety
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Server component example - receives translations as props
 * Can be nested inside client components (async server components)
 * Cannot use React hooks, so all data must come from props or async operations
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Format number server-side using locale
  // This runs on the server during SSR, improving initial page load
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      {/* Use translation function passed as prop */}
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

### (Optional) Step 12: Change the language of your content

To change the language of your content in Next.js, the recommended way is to use locale-prefixed URLs and Next.js links. The example below reads the current locale from the route, strips it from the pathname, and renders one link per available locale.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { locales, defaultLocale, type Locale } from "@/i18n.config";

const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;
    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  const hrefForLocale = (nextLocale: Locale) => {
    if (nextLocale === defaultLocale) {
      return basePath;
    }
    return basePath === "/" ? `/${nextLocale}` : `/${nextLocale}${basePath}`;
  };

  return (
    <nav aria-label="Language selector">
      <ul>
        {(locales as readonly Locale[]).map((locale) => (
          <li key={locale}>
            <Link
              href={hrefForLocale(locale)}
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

### (Optional) Step 13: Build a localized Link component

Reusing localized URLs across your app keeps navigation consistent and SEO-friendly. Wrap `next/link` in a small helper that prefixes internal routes with the active locale while leaving external URLs untouched.

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
"use client";

import type { PropsWithChildren } from "react";
import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import {
  defaultLocale,
  locales,
  localizedPath,
  type Locale,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;

  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> Tip: Because `LocalizedLink` is a drop-in replacement, migrate gradually by swapping imports and letting the component handle locale-specific URLs.

### (Optional) Step 14: Access the active locale inside Server Actions

Server Actions often need the current locale for emails, logging, or third-party integrations. Combine the locale cookie set by your proxy with the `Accept-Language` header as a fallback.

```ts fileName="src/app/actions/get-current-locale.ts" codeFormat="typescript"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

export async function subscribeToNewsletter(formData: FormData) {
  const locale = await getCurrentLocale();

  // Use the locale for localized side effects (emails, CRM, etc.)
  console.log(`Subscribing ${formData.get("email")} with locale ${locale}`);
}
```

> Because the helper relies on Next.js cookies and headers, it works in Route Handlers, Server Actions, and other server-only contexts.

### (Optional) Step 15: Internationalize Your Metadata

Translating content is important, but the main goal of internationalization is to make your website more visible to the world. I18n is an incredible lever to improve your website visibility through proper SEO.

**Why this step is important**: Properly internationalized metadata helps search engines understand what languages are available on your pages. This includes setting hreflang meta tags, translating titles and descriptions, and ensuring canonical URLs are correctly set for each locale.

Here's a list of good practices regarding multilingual SEO:

- Set hreflang meta tags in the `<head>` tag to help search engines understand what languages are available on the page
- List all page translations in the sitemap.xml using the `http://www.w3.org/1999/xhtml` XML schema
- Do not forget to exclude prefixed pages from the robots.txt (e.g., `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- Use custom Link component to redirect to the most localized page (e.g., in French `<a href="/fr/about">À propos</a>`)

Developers often forget to properly reference their pages across locales. Let's fix that:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Generate SEO metadata for each locale version of the page
 * This function runs for each locale at build time
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Dynamically import translation file for this locale
  // Used to get translated title and description for metadata
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Create hreflang mapping for all locales
  // Helps search engines understand language alternatives
  // Format: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // Canonical URL for this locale version
      canonical: absoluteUrl(locale, "/about"),
      // Language alternatives for SEO (hreflang tags)
      // "x-default" specifies the default locale version
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

### (Optional) Step 16: Internationalize Your Sitemap

Generate a sitemap that includes all locale versions of your pages. This helps search engines discover and index all language versions of your content.

**Why this step is important**: A properly internationalized sitemap ensures search engines can find and index all language versions of your pages. This improves visibility in international search results.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, absoluteUrl } from "@/i18n.config";

/**
 * Generate XML sitemap for SEO
 * Helps search engines discover and index all locale versions of pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Create language alternatives mapping for sitemap
  // Maps each locale to its absolute URL
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(locale, "/about")])
  );

  return [
    {
      url: absoluteUrl(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly", // How often the page typically changes
      priority: 0.7, // Relative priority (0.0 to 1.0)
      alternates: {
        // Language alternatives for this page
        // Helps search engines understand multilingual content
        languages: {
          ...languages,
          // x-default indicates the default locale version
          "x-default": absoluteUrl(defaultLocale, "/about"),
        },
      },
    },
  ];
}
```

### (Optional) Step 17: Internationalize Your robots.txt

Create a robots.txt file that properly handles all locale versions of your protected routes. This ensures that search engines don't index admin or dashboard pages in any language.

**Why this step is important**: Properly configuring robots.txt for all locales prevents search engines from indexing sensitive pages in any language. This is crucial for security and privacy.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Helper function to expand a path to all locale versions
 * Example: expandAllLocales("/dashboard") returns ["/dashboard", "/fr/dashboard"]
 * This ensures robots.txt blocks all locale versions of protected routes
 */
const expandAllLocales = (path: string) => [
  // Include default locale path (no prefix)
  localizedPath(defaultLocale, path),
  // Include all other locale-prefixed paths
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

/**
 * Generate robots.txt file
 * Controls which pages search engines can crawl
 */
export default function robots(): MetadataRoute.Robots {
  // List all paths that should be blocked for all locales
  // Prevents indexing of admin/dashboard pages in any language
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: {
      userAgent: "*", // Apply rules to all crawlers
      allow: ["/"], // Allow root path
      disallow, // Block specified paths
    },
    host: absoluteUrl(defaultLocale, "/"), // Canonical hostname
    sitemap: absoluteUrl(defaultLocale, "/sitemap.xml"), // Sitemap location
  };
}
```

### (Optional) Step 18: Set Up Middleware for Locale Routing

Create a proxy to automatically detect the user's preferred locale and redirect them to the appropriate locale-prefixed URL. This improves user experience by showing content in their preferred language.

**Why this step is important**: Middleware ensures that users are automatically redirected to their preferred language when they visit your site. It also saves the user's preference in a cookie for future visits.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Regex to match files with extensions (e.g., .js, .css, .png)
// Used to exclude static assets from locale routing
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Extract locale from Accept-Language header
 * Handles formats like "fr-CA", "en-US", etc.
 * Falls back to default locale if browser language is not supported
 */
const pickLocale = (accept: string | null) => {
  // Get first language preference (e.g., "fr-CA" from "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Extract base language code (e.g., "fr" from "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // Check if we support this locale, otherwise use default
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Next.js proxy for locale detection and routing
 * Runs on every request before the page renders
 * Automatically redirects to locale-prefixed URLs when needed
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy for Next.js internals, API routes, and static files
  // These should not be locale-prefixed
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Check if URL already has a locale prefix
  // Example: "/fr/about" or "/en" would return true
  const hasLocale = (locales as readonly string[]).some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  // If no locale prefix, detect locale and redirect
  if (!hasLocale) {
    // Try to get locale from cookie first (user preference)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Use cookie locale if valid, otherwise detect from browser headers
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // Clone URL to modify pathname
    const url = request.nextUrl.clone();
    // Add locale prefix to pathname
    // Handle root path specially to avoid double slash
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Create redirect response and set locale cookie
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Match all paths except:
    // - API routes (/api/*)
    // - Next.js internals (/_next/*)
    // - Static files (/static/*)
    // - Files with extensions (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (Optional) Step 19: Automate Your Translations Using Intlayer

Intlayer is a **free** and **open-source** library designed to assist the localization process in your application. While i18next handles the translation loading and management, Intlayer helps automate the translation workflow.

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
