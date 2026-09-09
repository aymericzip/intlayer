---
createdAt: 2026-09-09
updatedAt: 2026-09-09
title: "Remix 3 i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Remix 3 app. Translate with AI agents and optimize bundle size, SEO and performances."
keywords:
  - Internationalization
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
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "Initial documentation for Remix 3"
author: aymericzip
---

# Translate your Remix 3 website using Intlayer | Internationalization (i18n)

This guide demonstrates how to integrate **Intlayer** for seamless internationalization in **Remix 3** applications with locale-aware routing, type-safe content declarations, safe HTML templates, and cross-runtime support across Node.js, Bun, Deno, and Cloudflare Workers.

---

## What is Remix 3?

**Remix 3** represents a fundamental architectural shift towards a **composable, runtime-agnostic web framework built entirely on web standards**. Rather than being coupled to specific bundlers or proprietary server APIs, Remix 3 is distributed as single-purpose, composable packages:

- **`remix/fetch-router`** (or `remix/router`): Lightweight, standard-compliant routing built on the Fetch API (`Request` and `Response`).
- **`remix/html-template`**: Safe HTML template literals with automatic XSS protection and fragment composition.
- **`remix/response/html`**: Response helper utilities for serving HTML with standard HTTP semantics.
- **`remix/node-fetch-server`**: Server adapters for Node.js, while natively supporting Bun, Deno, and edge runtimes.
- **`remix/cookie`**: Cryptographically secure cookie parsing and serialization.

Combined with **Intlayer**, you get a complete internationalization system that delivers compile-time safety, automated AI translations, zero-overhead server rendering, and seamless locale routing.

---

## Table of Contents

<TOC/>

---

## Why Intlayer over alternatives?

Compared to traditional solutions like `i18next` or bespoke translation loaders, Intlayer offers an integrated developer experience optimized for modern web architecture:

<AccordionGroup>
<Accordion header="Full Remix 3 & Web Standards Coverage">

Intlayer is built to work seamlessly with web standards (`Request`, `Response`, `Headers`, and `URL`). It integrates effortlessly into Remix 3's Fetch router through lightweight middleware, extracting locales from URL paths, cookies, or `Accept-Language` headers without locking you into a specific runtime.

</Accordion>
<Accordion header="Type-Safe Content Declarations">

Say goodbye to loose JSON keys and runtime missing-key crashes. Intlayer enforces TypeScript checks across all declared locales, warning you at build time if a translation is missing or invalid.

</Accordion>
<Accordion header="Zero Bundle Overhead on the Server">

When using Remix 3's server-rendered HTML templates (`remix/html-template`), only the resolved text for the requested locale is rendered into the output stream. No client hydration bundles or bulky translation catalogs are needed unless explicitly required.

</Accordion>
<Accordion header="AI Agent & Automation Ready">

Intlayer co-locates content declarations (`.content.ts`) with your route logic, reducing the token context required by Large Language Models (LLMs). Built-in CLI commands like `intlayer fill` and `intlayer test` let you automate translations in CI/CD pipelines at the cost of your own AI provider.

</Accordion>
<Accordion header="Visual Editor & CMS Integration">

Beyond code-first workflows, Intlayer provides a self-hosted [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) and a [Remote CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) allowing non-technical editors, translators, and copywriters to update content without redeploying code.

</Accordion>
</AccordionGroup>

---

## Step-by-Step Guide

See the [Application Template](https://github.com/aymericzip/intlayer-remix-3-template) on GitHub.

<Steps>
<Step number={1} title="Install Dependencies">

Install `intlayer` and `remix` (version 3) using your preferred package manager:

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: Core internationalization engine providing configuration management, dictionary declaration (`t()`, `Dictionary`), CLI tools, and runtime interpreter.
- **`remix`**: The unified Remix 3 framework package exporting `remix/router`, `remix/routes`, `remix/html-template`, and `remix/node-fetch-server`.

</Step>
<Step number={2} title="Configure Intlayer">

Create an `intlayer.config.ts` in the root of your project to declare your supported languages and internationalization settings:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> For additional configuration settings (such as strict mode or routing storage preferences), refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>
<Step number={3} title="Declare Your Multilingual Content">

Declare your localized content in `.content.ts` files. Intlayer allows you to co-locate your dictionaries alongside your routes and views:

#### Home Page Content

```typescript fileName="src/content/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to Remix 3 with Intlayer",
      fr: "Bienvenue sur Remix 3 avec Intlayer",
      es: "Bienvenido a Remix 3 con Intlayer",
    }),
    subtitle: t({
      en: "A composable, web-standard-first application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    badge: t({
      en: "Web Standards Framework",
      fr: "Framework axé Standards Web",
      es: "Framework de Estándares Web",
    }),
    viewAbout: t({
      en: "Learn more about us",
      fr: "En savoir plus sur nous",
      es: "Conozca más sobre nosotros",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

#### About Page Content

```typescript fileName="src/content/about.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      en: "About Remix 3",
      fr: "À propos de Remix 3",
      es: "Acerca de Remix 3",
    }),
    description: t({
      en: "Remix 3 is designed around single-purpose packages that work anywhere JavaScript runs.",
      fr: "Remix 3 est conçu autour de packages à responsabilité unique utilisables partout où JavaScript fonctionne.",
      es: "Remix 3 está diseñado en torno a paquetes especializados que funcionan dondequiera que se ejecute JavaScript.",
    }),
    backHome: t({
      en: "Back to Home",
      fr: "Retour à l'accueil",
      es: "Volver al Inicio",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

#### Common Navigation Content

```typescript fileName="src/content/common.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const commonContent = {
  key: "common",
  content: {
    appName: t({
      en: "Remix 3 App",
      fr: "App Remix 3",
      es: "App Remix 3",
    }),
    nav: {
      home: t({ en: "Home", fr: "Accueil", es: "Inicio" }),
      about: t({ en: "About", fr: "À propos", es: "Acerca de" }),
      api: t({ en: "API", fr: "API", es: "API" }),
    },
    switchLanguage: t({
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default commonContent;
```

> Intlayer also supports JSON, YAML, and CommonJS declaration formats. See the [Content Declaration Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

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
<Step number={5} title="Implement the Intlayer Middleware">

Remix 3 provides a composable middleware pipeline via `createRouter({ middleware: [...] })`.

Create an Intlayer middleware that resolves the locale of each incoming request using:

1. The URL path prefix via Intlayer's `getLocaleFromPath` (e.g. `/fr` or `/fr/about`).
2. Intlayer's `getLocale` helper, which automatically negotiates across storage cookies (`INTLAYER_LOCALE`), custom headers (`x-intlayer-locale`), standard `Accept-Language` headers, and your configured `defaultLocale`.

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import { createContextKey, type Middleware } from "remix/router";
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";

/**
 * Type-safe context key to store and retrieve the resolved locale
 * from Remix 3's RequestContext.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Intlayer middleware for Remix 3.
 *
 * Resolves the request locale following priority:
 * 1. URL path prefix (e.g. `/fr/...`) via `getLocaleFromPath`
 * 2. Storage & headers negotiation via Intlayer `getLocale`
 *
 * Attaches the resolved locale to the Remix 3 RequestContext.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // 1. Path detection (/fr/about -> "fr", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname, {
      mode: "prefix-all",
    });

    // 2. Resolve locale: path prefix takes precedence, otherwise negotiate via getLocale
    const resolvedLocale =
      pathLocale ??
      ((await getLocale({
        getHeader: (name) => context.headers.get(name),
        getCookie: (name) =>
          getCookie(name, context.headers.get("cookie") ?? undefined),
      })) as Locale);

    // Attach resolved locale to Remix 3 request context
    context.set(localeKey, resolvedLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="Define Type-Safe Routes">

Define your application routes using `route()` from `remix/routes` (or `remix/fetch-router/routes`):

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Default locale routes
  home: "/",
  about: "/about",
  apiGreeting: "/api/greeting",

  // Localized routes with dynamic :locale segment
  localizedHome: "/:locale",
  localizedAbout: "/:locale/about",
  localizedApiGreeting: "/:locale/api/greeting",
});
```

Using `route()` gives you type-safe URL generation across your templates:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "fr" }); // "/fr"
routes.localizedAbout.href({ locale: "es" }); // "/es/about"
```

</Step>
<Step number={7} title="Render Localized HTML Templates">

Remix 3 uses `remix/html-template` for safe, auto-escaped HTML generation. Build a reusable base layout that sets `<html lang="${locale}">` and incorporates a language switcher:

#### Base Layout Template

```typescript fileName="src/views/layout.ts" codeFormat={["typescript", "esm"]}
import { html, type SafeHtml } from "remix/html-template";
import {
  getHTMLTextDir,
  getIntlayer,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import { routes } from "../routes";

interface LayoutOptions {
  title: string;
  locale: Locale;
  content: SafeHtml;
  currentPath?: "home" | "about";
}

export const renderLayout = ({
  title,
  locale,
  content,
  currentPath = "home",
}: LayoutOptions): SafeHtml => {
  const common = getIntlayer("common", locale);

  const homeHref = getLocalizedPath(routes.home.href(), locale);
  const aboutHref = getLocalizedPath(routes.about.href(), locale);
  const apiHref = getLocalizedPath(routes.apiGreeting.href(), locale);

  return html`
    <!doctype html>
    <html lang="${locale}" dir="${getHTMLTextDir(locale)}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title} | ${common.appName}</title>
        <style></style>
      </head>
      <body>
        <header>
          <div style="font-weight: bold; font-size: 1.2rem;">
            ${common.appName}
          </div>
          <nav>
            <a
              href="${homeHref}"
              class="${currentPath === "home" ? "active" : ""}"
            >
              ${common.nav.home}
            </a>
            <a
              href="${aboutHref}"
              class="${currentPath === "about" ? "active" : ""}"
            >
              ${common.nav.about}
            </a>
            <a href="${apiHref}" target="_blank"> ${common.nav.api} </a>
          </nav>
          <div class="lang-switcher">
            ${locales.map((loc) => {
              const targetPath =
                currentPath === "about"
                  ? routes.about.href()
                  : routes.home.href();
              const href = getLocalizedPath(targetPath, loc);
              const isActive = loc === locale;
              return html`
                <a
                  href="${href}"
                  class="${isActive ? "active" : ""}"
                  title="${common.switchLanguage} ${getLocaleName(loc, locale)}"
                >
                  ${loc.toUpperCase()}
                </a>
              `;
            })}
          </div>
        </header>
        <main>${content}</main>
      </body>
    </html>
  `;
};
```

#### Page Views

```typescript fileName="src/views/home.ts" codeFormat={["typescript", "esm"]}
import { html, type SafeHtml } from "remix/html-template";
import { getIntlayer, getLocalizedPath, type Locale } from "intlayer";
import { renderLayout } from "./layout";
import { routes } from "../routes";

export const renderHomePage = (locale: Locale): SafeHtml => {
  const home = getIntlayer("home", locale);
  const aboutHref = getLocalizedPath(routes.about.href(), locale);

  const content = html`
    <section style="text-align: center; margin-top: 2rem;">
      <span
        style="background: #0369a1; padding: 0.3rem 0.8rem; border-radius: 9999px; font-size: 0.8rem;"
      >
        ${home.badge}
      </span>
      <h1 style="font-size: 2.8rem; margin: 1.5rem 0 0.5rem;">${home.title}</h1>
      <p
        style="font-size: 1.2rem; color: #94a3b8; max-width: 650px; margin: 0 auto 2rem;"
      >
        ${home.subtitle}
      </p>
      <a
        href="${aboutHref}"
        style="display: inline-block; background: #0284c7; color: white; padding: 0.8rem 1.6rem; border-radius: 8px; text-decoration: none; font-weight: 600;"
      >
        ${home.viewAbout} →
      </a>
    </section>
  `;

  return renderLayout({
    title: String(home.title),
    locale,
    content,
    currentPath: "home",
  });
};
```

```typescript fileName="src/views/about.ts" codeFormat={["typescript", "esm"]}
import { html, type SafeHtml } from "remix/html-template";
import { getIntlayer, getLocalizedPath, type Locale } from "intlayer";
import { renderLayout } from "./layout";
import { routes } from "../routes";

export const renderAboutPage = (locale: Locale): SafeHtml => {
  const about = getIntlayer("about", locale);
  const homeHref = getLocalizedPath(routes.home.href(), locale);

  const content = html`
    <section>
      <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">${about.title}</h1>
      <p
        style="font-size: 1.2rem; color: #94a3b8; line-height: 1.7; margin-bottom: 2rem;"
      >
        ${about.description}
      </p>
      <a
        href="${homeHref}"
        style="color: #38bdf8; text-decoration: none; font-weight: 500;"
      >
        ← ${about.backHome}
      </a>
    </section>
  `;

  return renderLayout({
    title: String(about.title),
    locale,
    content,
    currentPath: "about",
  });
};
```

</Step>
<Step number={8} title="Wire Up the Server Application">

Connect your router, middleware, and route actions together in `src/server.ts`:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRouter } from "remix/router";
import { createRequestListener } from "remix/node-fetch-server";
import { createHtmlResponse } from "remix/response/html";
import { getIntlayer, isDeclaredLocale } from "intlayer";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { renderAboutPage } from "./views/about";
import { renderHomePage } from "./views/home";

// 1. Initialize router with Intlayer middleware
export const router = createRouter({
  middleware: [intlayer()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale routes
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
    about(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderAboutPage(locale));
    },

    // Localized routes
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
    localizedAbout(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderAboutPage(locale));
    },

    // Localized JSON API endpoints
    apiGreeting(context) {
      const locale = context.get(localeKey);
      const home = getIntlayer("home", locale);
      return Response.json({
        success: true,
        locale,
        message: home.title,
        timestamp: new Date().toISOString(),
      });
    },
    localizedApiGreeting(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return Response.json(
          { success: false, error: "Not Found" },
          { status: 404 }
        );
      }
      const locale = context.get(localeKey);
      const home = getIntlayer("home", locale);
      return Response.json({
        success: true,
        locale,
        message: home.title,
        timestamp: new Date().toISOString(),
      });
    },
  },
});

// 3. Start server
const PORT = Number(process.env.PORT || 3000);

if (
  typeof (process.versions as any)?.bun === "undefined" &&
  process.env.NODE_ENV !== "test"
) {
  const server = http.createServer(
    createRequestListener((request) => router.fetch(request))
  );
  server.listen(PORT, () => {
    console.log(`🚀 Remix 3 server running at http://localhost:${PORT}`);
  });
}

export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Run on Any JavaScript Runtime">

Remix 3 is runtime-agnostic. The `router.fetch` interface conforms to the Web Fetch standard, meaning you can deploy to any environment without rewriting your code:

<Tabs group="runtimes" defaultTab="bun">
  <Tab label="Bun" value="bun">

```typescript fileName="src/bun.ts" codeFormat={["typescript", "esm"]}
import { router } from "./server";

Bun.serve({
  fetch: router.fetch,
  port: 3000,
});

console.log("Running with Bun at http://localhost:3000");
```

Run directly:

```bash
bun run src/server.ts
```

  </Tab>
  <Tab label="Node.js" value="node">

```typescript fileName="src/node.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./server";

const server = http.createServer(createRequestListener(router.fetch));
server.listen(3000, () => {
  console.log("Running with Node.js at http://localhost:3000");
});
```

  </Tab>
  <Tab label="Deno" value="deno">

```typescript fileName="src/deno.ts" codeFormat={["typescript", "esm"]}
import { router } from "./server.ts";

Deno.serve({ port: 3000 }, router.fetch);
```

  </Tab>
  <Tab label="Cloudflare Workers" value="cloudflare">

```typescript fileName="src/worker.ts" codeFormat={["typescript", "esm"]}
import { router } from "./server";

export default {
  fetch: router.fetch,
};
```

  </Tab>
</Tabs>

</Step>
<Step number={10} title="Audit and Auto-Fill Translations">

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

---

## TypeScript Configuration

Ensure that your `tsconfig.json` includes the generated `.intlayer` types:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

---

## Conclusion

With Remix 3 and Intlayer, you have a lean, fully typed, runtime-portable stack that adheres to open web standards. Your application can scale effortlessly from simple localized marketing pages to globally distributed, edge-rendered services.
