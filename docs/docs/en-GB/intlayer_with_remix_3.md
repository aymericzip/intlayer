---
createdAt: 2026-09-09
updatedAt: 2026-09-21
title: "Remix 3 i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Remix 3 app. Translate with AI agents and optimise bundle size, SEO and performance."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Web Standards
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Use the remix-intlayer middleware and hooks"
  - version: 9.5.0
    date: 2026-09-09
    changes: "Initial documentation for Remix 3"
author: aymericzip
---

# Translate your Remix 3 website using Intlayer | Internationalisation (i18n)

This guide demonstrates how to integrate **Intlayer** for seamless internationalisation in **Remix 3** applications with locale-aware routing, type-safe content declarations, server-rendered JSX components, and cross-runtime support across Node.js, Bun, Deno, and Cloudflare Workers.

## What is Remix 3?

**Remix 3** represents a fundamental architectural shift towards a **composable, runtime-agnostic web framework built entirely on web standards**. Rather than being coupled to specific bundlers or proprietary server APIs, Remix 3 is distributed as single-purpose, composable packages:

- **`remix/fetch-router`** (or `remix/router`): Lightweight, standard-compliant routing built on the Fetch API (`Request` and `Response`).
- **`remix/ui`**: A JSX component model (`jsxImportSource: "remix/ui"`). A component is a setup function that returns a render function, so it looks like React but keeps state in plain JavaScript closures.
- **`remix/middleware/render`**: Installs `context.render(<Page />)` on every request, streaming the JSX tree to an HTML `Response`.
- **`remix/node-fetch-server`**: Server adapters for Node.js, while natively supporting Bun, Deno, and edge runtimes.
- **`remix/cookie`**: Cryptographically secure cookie parsing and serialisation.

Combined with **Intlayer** and the **`remix-intlayer`** package, a locale middleware plus the same `useIntlayer` / `useDictionary` / `useLocale` hooks as `react-intlayer`, bound to the Remix request context, you get a complete internationalisation system that delivers compile-time safety, automated AI translations, zero-overhead server rendering, and seamless locale routing.

## Table of Contents

<TOC/>

## Why Intlayer over alternatives?

Compared to traditional solutions like `i18next` or bespoke translation loaders, Intlayer offers an integrated developer experience optimised for modern web architecture:

<AccordionGroup>
<Accordion header="Full Remix 3 & Web Standards Coverage">

Intlayer is built to work seamlessly with web standards (`Request`, `Response`, `Headers`, and `URL`). `remix-intlayer` plugs into Remix 3's Fetch router as a lightweight middleware, extracting the locale from URL paths, cookies, or `Accept-Language` headers and exposing it to the rest of the request, handlers, views and `remix/ui` components, without passing it around or locking you into a specific runtime.

</Accordion>
<Accordion header="Type-Safe Content Declarations">

Say goodbye to loose JSON keys and runtime missing-key crashes. Intlayer enforces TypeScript checks across all declared locales, warning you at build time if a translation is missing or invalid.

</Accordion>
<Accordion header="Zero Bundle Overhead on the Server">

Remix 3 renders JSX components on the server and streams the HTML to the client. Only the resolved text for the requested locale ends up in the output stream. No client hydration bundles or bulky translation catalogues are needed unless a component is explicitly marked as a `clientEntry`.

</Accordion>
<Accordion header="AI Agent & Automation Ready">

Intlayer co-locates content declarations (`.content.ts`) with your route logic, reducing the token context required by Large Language Models (LLMs). Built-in CLI commands like `intlayer fill` and `intlayer test` let you automate translations in CI/CD pipelines at the cost of your own AI provider.

</Accordion>
<Accordion header="Visual Editor & CMS Integration">

Beyond code-first workflows, Intlayer provides a self-hosted [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) and a [Remote CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md) allowing non-technical editors, translators, and copywriters to update content without redeploying code.

</Accordion>
</AccordionGroup>

## Step-by-Step Guide

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalise your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Remix 3 Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See the [Application Template](https://github.com/aymericzip/intlayer-remix-3-template) on GitHub.

<Steps>
<Step number={1} title="Install Dependencies">

Install `intlayer`, `remix-intlayer` and `remix` (version 3) using your preferred package manager:

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: Core internationalisation engine providing configuration management, dictionary declaration (`t()`, `Dictionary`), CLI tools, and runtime interpreter.
- **`remix-intlayer`**: The Remix 3 integration: the `intlayer()` router middleware that resolves the locale of each request, and the `useIntlayer`, `useDictionary` and `useLocale` hooks that read it anywhere downstream.
- **`remix`**: The unified Remix 3 framework package exporting `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render`, and `remix/node-fetch-server`.

</Step>
<Step number={2} title="Configure Intlayer">

### Architecture

In this architecture, the `intlayer()` middleware of `remix-intlayer` is registered in `createRouter()` ahead of the `render()` middleware. It strips the locale prefix before the router matches, so routes are declared once in `src/routes.ts` without a `:locale` segment, and it runs the rest of the request inside an `AsyncLocalStorage` scope, which is what lets `useIntlayer` / `useLocale` read the locale with no argument in route handlers and `remix/ui` views. Content declarations are placed alongside your views in `src/`:

```bash
.
├── src
│   ├── home.content.ts               # Home page content declaration
│   ├── router.tsx                    # createRouter() with the intlayer() and render() middleware
│   ├── routes.ts                     # Type-safe routes, declared once without locale segment
│   ├── server.ts                     # fetch handler (Node.js, Bun, Deno, Cloudflare Workers)
│   └── views
│       ├── document.tsx              # HTML shell setting <html lang dir> from the locale
│       └── home.tsx                  # Localized page using useIntlayer / useLocale
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### Configuration

Create an `intlayer.config.ts` in the root of your project to declare your supported languages and internationalisation settings:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.FRENCH,
      Locales.SPANISH,
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
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.FRENCH,
      Locales.SPANISH,
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
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.FRENCH,
      Locales.SPANISH,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> For additional configuration settings, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

</Step>
<Step number={3} title="Declare Your Multilingual Content">

Declare your localised content in a `.content.ts` file:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      "en-GB": "Welcome to Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      "en-GB": "A composable, web-standard application with native i18n.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      "en-GB": "Switch language:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer also supports JSON, YAML, and CommonJS declaration formats. See the [Content Declaration Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md).

</Step>
<Step number={4} title="Build Intlayer Dictionaries">

Compile the dictionary definitions to generate TypeScript types and runtime registries:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

This compiles your content into the `.intlayer` artifact directory, enabling full TypeScript autocompletion and rapid dictionary lookup.

</Step>
<Step number={5} title="Add the Intlayer Middleware">

Remix 3 provides a composable middleware pipeline via `createRouter({ middleware: [...] })`.

`remix-intlayer` ships the `intlayer()` middleware. For each incoming request it resolves the locale using:

1. The URL, in every routing mode but `no-prefix`: the path prefix (e.g. `/en-GB` or `/fr`) or the `?locale=` search param.
2. The locale persisted by the client: the storage cookie (`INTLAYER_LOCALE`) or custom header (`x-intlayer-locale`).
3. Standard `Accept-Language` negotiation, falling back to your configured `defaultLocale`.

The result is stored in the Remix request context as `context.intlayer` (or `context.get(Intlayer)`), with `locale`, `defaultLocale` and `availableLocales`. The middleware then runs the rest of the request inside an `AsyncLocalStorage` scope bound to that context, which is what lets the hooks of the package read the locale with no argument, in route handlers, views and `remix/ui` components alike:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// Anywhere downstream of the middleware
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` or `useIntlayer("faq", { item: 2 })` override the request locale for one call, and `useDictionary(homeContent)` reads an imported dictionary instead of a key. Outside of a request the hooks fall back to the default locale.

> The middleware also prepares the Intlayer dictionaries when the server starts, so a missing `intlayer build` does not leave the registry empty.

</Step>
<Step number={6} title="Define Type-Safe Routes">

Define your application routes using `route()` from `remix/routes`:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Default locale route
  home: "/",

  // Localized route with dynamic :locale segment
  localizedHome: "/:locale",
});
```

Using `route()` gives you type-safe URL generation across your application:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "en-GB" }); // "/en-GB"
```

</Step>
<Step number={7} title="Render Localised Pages with JSX">

Remix 3 renders UI with JSX components from `remix/ui`. A component is a **setup function** that receives a `Handle` and returns a **render function**. Setup runs once per instance, render runs on every update, and props are read through `handle.props`.

Start with a shared `Document` shell that sets the `<html lang="..." dir="...">` attributes from the locale resolved by the middleware:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

Then create the home page. It reads the localised dictionary with `useIntlayer` and renders a language switcher:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Remix JSX is not React: `class` is written as-is (`className` is also accepted), and re-renders are triggered explicitly with `handle.update()`. Interpolated values are escaped automatically. The Intlayer hooks are plain functions reading the request scope, so they can be called from the setup function or the render function alike.

</Step>
<Step number={8} title="Wire Up the Router and Server">

Add the `render()` middleware from `remix/middleware/render` next to the Intlayer middleware. It installs `context.render(node, init)` on every request, which streams the JSX tree into an HTML `Response` (prepending `<!DOCTYPE html>` and setting the `Content-Type` header):

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialize router with Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale route
    home(context) {
      return context.render(<HomePage />);
    },

    // Localized route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` accepts an optional `ResponseInit` as second argument, e.g. `context.render(<NotFoundPage />, { status: 404 })`. The resolved locale stays reachable from the handler as `context.intlayer.locale`, for instance to build a `Response.json` payload.

Finally, expose the router through a standard `fetch` handler. The same router runs on Node.js, Bun, Deno, and Cloudflare Workers:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Bun / Deno / Cloudflare Workers
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Audit and Auto-Fill Translations">

Intlayer provides a CLI to audit for missing translations and automatically fill them using AI:

```bash packageManager="npm"
# Audit missing translations
npx intlayer test

# Fill missing translations using AI
npx intlayer fill
```

```bash packageManager="pnpm"
# Audit missing translations
pnpm dlx intlayer test

# Fill missing translations using AI
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Audit missing translations
yarn dlx intlayer test

# Fill missing translations using AI
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Audit missing translations
bun x intlayer test

# Fill missing translations using AI
bun x intlayer fill
```

</Step>
</Steps>

## TypeScript Configuration

Point JSX at the `remix/ui` runtime and ensure that your `tsconfig.json` includes the generated `.intlayer` types:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` is what makes `<HomePage />` resolve to Remix's `createElement` instead of React's.

## Conclusion

With Remix 3 and Intlayer, you have a lean, fully typed, runtime-portable stack that adheres to open web standards. Your application can scale effortlessly from simple localised marketing pages to globally distributed, edge-rendered services.
