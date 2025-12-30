---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: How to translate your Next.js 15 using next-i18next – i18n guide 2026
description: A practical, production-ready guide to internationalize a Next.js 15 App Router app with i18next/next-i18next and enhance it with Intlayer.
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Translate your Next.js 15 using next-i18next website using Intlayer | Internationalization (i18n)

### Who this guide is for

- **Junior**: Follow the exact steps and copy the code blocks. You’ll get a working multilingual app.
- **Mid-level**: Use the checklists and best-practice callouts to avoid common pitfalls.
- **Senior**: Skim the high-level structure, SEO, and automation sections; you’ll find sensible defaults and extension points.

### What you’ll build

- App Router project with localized routes (e.g., `/`, `/fr/...`)
- i18n config with locales, default locale, RTL support
- Server-side i18n initialization and a client provider
- Namespaced translations loaded on-demand
- SEO with `hreflang`, localized `sitemap`, `robots`
- Middleware for locale routing
- Intlayer integration to automate translation workflows (tests, AI fill, JSON sync)

> Note: next-i18next is built on top of i18next. This guide uses the i18next primitives compatible with next-i18next in the App Router, while keeping the architecture simple and production-ready.
> For a broader comparison, see [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Project structure

Install the next-i18next dependencies:

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="bun"
bun add next-i18next i18next react-i18next i18next-resources-to-backend
```

Start with a clear structure. Keep messages split by locale and namespace.

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

Checklist (mid/senior):

- Keep one JSON per namespace per locale
- Do not over-centralize messages; use small, page/feature-scoped namespaces
- Avoid importing all locales at once; load only what you need

---

## 2) Install dependencies

```bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

If you plan to use next-i18next APIs or config interop, also:

```bash
pnpm add next-i18next
```

---

## 3) Core i18n config

Define locales, default locale, RTL, and helpers for localized paths/URLs.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

Senior note: If you use `next-i18next.config.js`, keep it aligned with `i18n.config.ts` to avoid drift.

---

## 4) Server-side i18n initialization

Initialize i18next on the server with a dynamic backend that imports only the required locale/namespace JSON.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Load JSON resources from src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

Mid note: Keep the namespace list short per page to limit payload. Avoid global “catch-all” bundles.

---

## 5) Client provider for React components

Wrap client components with a provider that mirrors the server config and loads only the requested namespaces.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: bundle }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

Junior tip: You don’t need to pass all messages to the client. Start with the page’s namespaces only.

---

## 6) Localized layout and routes

Set language and direction, and pre-generate routes per locale to favor static rendering.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) Example page with server + client usage

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Force static rendering for the page
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

Translations (one JSON per namespace under `src/locales/...`):

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

Client component (loads only the required namespace):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
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

> Ensure the page/provider includes only the namespaces you need (e.g., `about`).
> If you use React < 19, memoize heavy formatters like `Intl.NumberFormat`.

Synchronous server component embedded under a client boundary:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: Metadata, Hreflang, Sitemap, Robots

Translating content is a means to improve reach. Wire up multilingual SEO thoroughly.

Best practices:

- Set `lang` and `dir` at the root
- Add `alternates.languages` for each locale (+ `x-default`)
- List translated URLs in `sitemap.xml` and use `hreflang`
- Exclude localized private areas (e.g., `/fr/admin`) in `robots.txt`

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Import the correct JSON bundle from src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
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
    locales.map((locale) => [locale, abs(locale, "/about")])
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
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) Middleware for locale routing

Detect locale and redirect to a localized route if missing.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // exclude files with extensions

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Match all paths except the ones starting with these and files with an extension
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Performance and DX best practices

- **Set html `lang` and `dir`**: Done in `src/app/[locale]/layout.tsx`.
- **Split messages by namespace**: Keep bundles small (`common.json`, `about.json`, etc.).
- **Minimize client payload**: On pages, pass only required namespaces to the provider.
- **Prefer static pages**: Use `export const dynamic = 'force-static'` and `generateStaticParams` per locale.
- **Sync server components**: Pass precomputed strings/formatting instead of async calls at render time.
- **Memoize heavy operations**: Especially in client code for older React versions.
- **Cache and headers**: Prefer static or `revalidate` over dynamic rendering when feasible.

---

## 11) Testing and CI

- Add unit tests for components using `t` to ensure keys exist.
- Validate that each namespace has the same keys across locales.
- Surface missing keys during CI before deploy.

Intlayer will automate much of this (see next section).

---

## 12) Add Intlayer on top (automation)

Intlayer helps you keep JSON translations in sync, test for missing keys, and fill with AI when desired.

Install the intlayer dependencies:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Add package scripts:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Common flows:

- `pnpm i18n:test` in CI to fail builds on missing keys
- `pnpm i18n:fill` locally to propose AI translations for newly added keys

> You can provide CLI arguments; see the [Intlayer CLI docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

---

## 13) Troubleshooting

- **Keys not found**: Ensure the page/provider lists the correct namespaces and the JSON file exists under `src/locales/<locale>/<namespace>.json`.
- **Wrong language/flash of English**: Double-check locale detection in `middleware.ts` and provider `lng`.
- **RTL layout issues**: Verify `dir` is derived from `isRtl(locale)` and that your CSS respects `[dir="rtl"]`.
- **SEO alternates missing**: Confirm `alternates.languages` includes all locales and `x-default`.
- **Bundles too large**: Split namespaces further and avoid importing entire `locales` trees on the client.

---

## 14) What’s next

- Add more locales and namespaces as features grow
- Localize error pages, emails, and API-driven content
- Extend Intlayer workflows to auto-open PRs for translation updates

If you prefer a starter, try the template: `https://github.com/aymericzip/intlayer-next-i18next-template`.
