---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: Getting Started with Intlayer in TanStack Start (React)
description: Add i18n to your TanStack Start app using Intlayer—component-level dictionaries, localized URLs, and SEO-friendly metadata.
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - tanstack-start
---

# Getting Started Internationalizing (i18n) with Intlayer and TanStack Start (React)

## What is Intlayer?

**Intlayer** is an open-source i18n toolkit for React apps. It gives you:

- **Component-local dictionaries** with TypeScript safety.
- **Dynamic metadata & routes** (SEO-ready).
- **Runtime locale switching** (and helpers to detect/persist locales).
- **Vite plugin** for build-time transforms + dev DX.

This guide shows how to wire Intlayer into a **TanStack Start** project (which uses Vite under the hood and TanStack Router for routing/SSR).

---

## Step 1: Install Dependencies

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer**: core (config, dictionaries, CLI/transforms).
- **react-intlayer**: `<IntlayerProvider>` + hooks for React.
- **vite-intlayer**: Vite plugin, plus optional middleware for locale detection/redirects (works in dev & SSR/preview; move to `dependencies` for production SSR).

---

## Step 2: Configure Intlayer

Create `intlayer.config.ts` at your project root:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // You can also tweak: contentDir, contentFileExtensions, middleware options, etc.
};

export default config;
```

CommonJS/ESM variants are identical to your original doc if you prefer `cjs`/`mjs`.

> Full config reference: see Intlayer’s configuration docs.

---

## Step 3: Add the Vite Plugin (and optional middleware)

**TanStack Start uses Vite**, so add Intlayer’s plugin(s) to your `vite.config.ts`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // Optional but recommended for locale detection, cookies & redirects:
    intLayerMiddlewarePlugin(),
  ],
});
```

> If you deploy SSR, move `vite-intlayer` to `dependencies` so the middleware runs in production.

---

## Step 4: Declare Your Content

Place your dictionaries anywhere under `./src` (default `contentDir`). Example:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({ en: "Vite logo", fr: "Logo Vite", es: "Logo Vite" }),
    reactLogo: t({ en: "React logo", fr: "Logo React", es: "Logo React" }),
    title: t({
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t<ReactNode>({
      en: (
        <>
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      en: "Click the logos to learn more",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

JSON/ESM/CJS variants work the same as in your original doc.

> TSX content? Don’t forget `import React from "react"` if your setup needs it.

---

## Step 5: Wrap TanStack Start with Intlayer

With TanStack Start, your **root route** is the right place to set providers.

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // Example of using a dictionary at the top level:
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

Then use your content in pages:

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> String attributes (`alt`, `title`, `aria-label`, …) need `.value`:
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## (Optional) Step 6: Locale Switching (Client)

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (Optional) Step 7: Localized Routing (SEO-friendly URLs)

You have **two good patterns** with TanStack Start. Pick one.

Create a dynamic segment folder `src/routes/$locale/` so your URLs are `/:locale/...`. In the `$locale` layout, validate the `params.locale`, set `<IntlayerProvider locale=...>`, and render an `<Outlet />`. This approach is straightforward, but you’ll mount the rest of your routes beneath `$locale`, and you’ll need an extra non-prefixed tree if you _don’t_ want the default locale prefixed.

---

## (Optional) Step 8: Update the URL when switching locale

With Pattern A (basepath), switching locales means **navigating to a different basepath**:

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // preserves history
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>English</button>
      <button onClick={() => change(Locales.FRENCH)}>Français</button>
      <button onClick={() => change(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (Optional) Step 9: `<html lang>` and `dir` (TanStack Start Document)

TanStack Start exposes a **Document** (root HTML shell) you can customize. Set `lang` and `dir` for accessibility/SEO:

```tsx fileName="src/routes/__root.tsx" {4,15}
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";

import { IntlayerProvider } from "react-intlayer";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <IntlayerProvider>
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          <Header />
          {children}
          <TanStackRouterDevtools />
          <Scripts />
        </body>
      </html>
    </IntlayerProvider>
  );
}
```

For client-side correction, you can also keep your small hook:

```tsx fileName="src/hooks/useI18nHTMLAttributes.ts"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

---

## (Optional) Step 10: Localized Link component

TanStack Router provides a `<Link/>`, but if you ever need a plain `<a>` that auto-prefixes internal URLs:

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> If you use Pattern A (basepath), TanStack’s `<Link to="/about" />` already resolves to `/fr/about` via `basepath`, so a custom link is optional.

---

## TypeScript

Include Intlayer’s generated types:

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

Ignore Intlayer’s generated artifacts:

```gitignore
.intlayer
```

---

## VS Code Extension

- **Intlayer VS Code Extension** → autocompletion, errors, inline previews, quick actions.
  Marketplace: `intlayer.intlayer-vs-code-extension`

---

## Go Further

- Visual Editor
- CMS mode
- Locale detection on the edge / adapters

---

## Doc History

| Version | Date       | Changes                         |
| ------- | ---------- | ------------------------------- |
| 1.0.0   | 2025-08-11 | TanStack Start adaptation added |
