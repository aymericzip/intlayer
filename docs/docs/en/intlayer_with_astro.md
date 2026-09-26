---
createdAt: 2024-03-07
updatedAt: 2026-09-21
priority: 10
title: "Astro i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Astro app. Translate with AI agents and optimize bundle size, SEO and performances."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Add useIntlayer / useLocale hooks and the Astro.locals middleware to astro-intlayer"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Add init command"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Refresh for Astro integration, config, usage"
author: aymericzip
---

# Translate your Astro website using Intlayer | Internationalization (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

## Why Intlayer over alternatives?

Compared to main solutions like `astro-i18n` or `i18next`, Intlayer is a solution that comes with integrated optimizations such as:

<AccordionGroup>
<Accordion header="Full Astro coverage">

Intlayer is optimized to work perfectly with Astro by offering **multilingual routing**, **sitemap**, and all the features needed for scaling internationalization (i18n).

</Accordion>
<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. Intlayer helps **reduce your bundle and page sizes by up to 50%**.

</Accordion>
<Accordion header="Maintainability">

Scoping your application's content **facilitates maintenance** for large-scale applications. You can duplicate or delete a single feature folder without the mental burden of reviewing your entire content codebase. Additionally, Intlayer is **fully typed** to ensure your content's accuracy.

</Accordion>
<Accordion header="AI Agent">

Co-locating content **reduces the context needed** by Large Language Models (LLMs). Intlayer also comes with a suite of tools, such as a **CLI** to test for missing translations,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, to make the developer experience (DX) even smoother for AI agents.

</Accordion>
<Accordion header="Automation">

Use automation to translate in your CI/CD pipeline using the LLM of your choice at the cost of your AI provider. Intlayer also offers a **compiler** to automate content extraction, as well as a [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) to help **translate in the background**.

</Accordion>
<Accordion header="Performance">

Connecting massive JSON files to components can lead to performance and reactivity issues. Intlayer optimizes your content loading at build time.

</Accordion>
<Accordion header="Scaling with none-dev">

More than just an i18n solution, Intlayer provides an **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** to help you manage your multilingual content in **real-time**, making collaboration with translators, copywriters, and other team members seamless. Content can be stored locally and/or remotely.

</Accordion>
</AccordionGroup>

## Step-by-Step Guide to Set Up Intlayer in Astro

See [Application Template](https://github.com/aymericzip/intlayer-astro-template) on GitHub.

<Steps>
<Step number={1} title="Install Dependencies">

Install the necessary packages using your package manager:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> the `--interactive` flag is optional. Use `intlayer-cli init` if you're an AI agent.

> This command will detect your environment and install the required packages. For example:

```bash packageManager="npm"
npm install intlayer astro-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
```

```bash packageManager="bun"
bun add intlayer astro-intlayer
```

- **intlayer**
  The core package that provides internationalization tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **astro-intlayer**
  Includes the Astro integration plugin for integrating Intlayer with the [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), a middleware that resolves the locale of every request into `Astro.locals.intlayer`, and the `useIntlayer` / `useDictionary` / `useLocale` hooks. The same import path resolves to the server implementation in your `.astro` frontmatter and to the client one (backed by `vanilla-intlayer`) in `<script>` blocks.

</Step>
<Step number={2} title="Configuration of your project">

### Architecture

In this architecture, the `intlayer()` integration registered in `astro.config.ts` builds your dictionaries and adds a middleware that resolves the locale of every request and exposes it on `Astro.locals.intlayer`. Pages live under a `src/pages/[...locale]/` rest segment, so the default locale is served without prefix and every other locale gets its own dedicated URL. `.astro` files read the content with the `useIntlayer` / `useLocale` hooks of `astro-intlayer`, and content declarations are placed alongside your components in `src/`.

```bash
.
├── src
│   ├── app.content.tsx               # App content declaration
│   ├── components
│   │   └── LocaleSwitcher.astro      # Locale switcher component
│   └── pages
│       ├── [...locale]
│       │   └── index.astro           # Localized page (rest param also serves the default locale)
│       ├── robots.txt.ts             # robots.txt endpoint
│       └── sitemap.xml.ts            # Localized sitemap endpoint
├── astro.config.ts                   # Astro config with the intlayer() integration
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### Configuration

Create a config file to configure the languages of your application:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Through this configuration file, you can set up localized URLs, middleware redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>
<Step number={3} title="Integrate Intlayer in Your Astro Configuration">

Add the intlayer plugin into your configuration.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> The `intlayer()` Astro integration plugin is used to integrate Intlayer with Astro. It ensures the building of content declaration files and monitors them in development mode. It defines Intlayer environment variables within the Astro application. Additionally, it provides aliases to optimize performance.

</Step>
<Step number={4} title="Declare Your Content">

Create and manage your content declarations to store translations:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Your content declarations can be defined anywhere in your application as soon they are included into the `contentDir` directory (by default, `./src`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>
<Step number={5} title="Use your content in Astro">

Consume your dictionaries in `.astro` files with the hooks exported by `astro-intlayer`. They share the signatures of `react-intlayer`: `useIntlayer("key")` returns the content of a dictionary and `useLocale()` the current locale, with no argument to pass around.

The locale comes from the `astro-intlayer` middleware, which the integration registers for you ahead of your own `src/middleware.ts`. It resolves it for every request — from the URL prefix, then the locale persisted by the client (cookie or header), then `Accept-Language` — and stores it in `Astro.locals.intlayer`. Prerendered pages only use the URL, since they are rendered once for every visitor.

You should also add SEO metadata like hreflang and canonical links to each page and include a locale switcher to allow users to change languages.

```astro fileName="src/pages/index.astro"
---
import { useIntlayer, useLocale } from "astro-intlayer";
import {
  getLocalizedUrl,
  defaultLocale,
  localeMap,
  getHTMLTextDir,
} from "intlayer";
import LocaleSwitcher from "../components/LocaleSwitcher.astro";

// Locale resolved by the middleware (e.g. /es/about -> 'es')
const { locale } = useLocale();

// Content of the 'app' dictionary for that locale
const { title } = useIntlayer("app");
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: Tells search engines which is the primary version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Tell Google about all localized versions -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: Fallback for users in unmatched languages -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <h1>{title}</h1>
    </main>
  </body>
</html>
```

> `Astro.locals.intlayer` also exposes `locale`, `defaultLocale` and `availableLocales` to your own middleware and endpoints. Pass a locale or a selector as second argument (`useIntlayer("app", "fr")`, `useIntlayer("faq", { item: 2 })`) to override the request locale for one call.

</Step>
<Step number={6} title="Localized routing">

Create a dynamic route segment to serve localized pages. To handle both the default locale (without prefix) and all other locales, use a rest parameter `[...locale]` in your page structure, for example `src/pages/[...locale]/index.astro`:

```astro fileName="src/pages/[...locale]/index.astro"
---
import { useIntlayer, useLocale } from "astro-intlayer";
import {
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  getHTMLTextDir,
} from "intlayer";
import LocaleSwitcher from "../../components/LocaleSwitcher.astro";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const { locale } = useLocale();
const { title } = useIntlayer("app");
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <LocaleSwitcher />
    <h1>{title}</h1>
  </body>
</html>
```

> **Note on Routing Configuration:**
> The directory structure you use depends on the `middleware.routing` setting in your `intlayer.config.ts`:
>
> - **`prefix-no-default` (default):** Keeps the default locale at the root (no prefix) and prefixes others. Use `[...locale]` to catch all cases.
> - **`prefix-all`:** All URLs are prefixed with the locale. You can use standard `[locale]` if you don't need to handle the root separately.
> - **`search-param` or `no-prefix`:** No locale folder is needed. The locale is handled via search parameters or cookies.

</Step>
<Step number={7} title="Add a Locale Switcher">

To allow users to switch between languages, you can create a `LocaleSwitcher` component. This component should display a list of all supported locales and link to the same page in each language.

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<nav aria-label="Languages">
  <ul>
    {
      availableLocales.map((localeItem) => (
        <li key={localeItem} class="p-1">
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            data-locale={localeItem}
            aria-current={localeItem === locale ? "page" : undefined}
          >
            {getLocaleName(localeItem)}
          </a>
        </li>
      ))
    }
  </ul>
</nav>

<script>
  // In the browser, the same import resolves to the client implementation
  import { useLocale } from "astro-intlayer";
  import { getLocalizedUrl, type LocalesValues } from "intlayer";

  // Persists the choice in the locale cookie, then navigates to the localized URL
  const { setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  const localeLinks = document.querySelectorAll("[data-locale]");

  localeLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const locale = link.getAttribute("data-locale") as LocalesValues;

      event.preventDefault();
      setLocale(locale);
    });
  });
</script>

<style>
  nav {
    display: flex;
    gap: 1rem;
  }
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.5rem;
  }
  a[aria-current="page"] {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
```

> **Note on Persistence:**
> `setLocale` from the client-side `useLocale` saves the user's language preference in a cookie. This allows Intlayer to remember the choice and automatically redirect the user to their preferred language on future visits: on-demand rendered pages (an adapter with `output: 'server'` or `prerender = false`) are redirected by the Intlayer middleware before any HTML is sent, while prerendered pages, served as static files, are redirected by a small script the integration injects in every page. Set `routing.enableProxy` to `false` to turn both off. In `astro dev`, the cookie is ignored as a redirect source unless `routing.enableProxy` is set to `true`, so a stale cookie cannot hijack the pages you are working on.
>
> **Server / client intercompatibility:**
> `astro-intlayer` resolves to its server hooks in the frontmatter (reading `Astro.locals`) and to the client hooks of `vanilla-intlayer` in `<script>` blocks and islands, with the same names and content shape. `setLocale` and `onChange` only act on the client — call `installIntlayer()` there once to seed the client store. `astro-intlayer/client` exposes the client entry explicitly.

</Step>
<Step number={8} title="Sitemap and Robots.txt">

Intlayer provides utilities to generate localized sitemaps and robots.txt files dynamically.

#### Sitemap

Intlayer comes with a built-in sitemap generator to help you create a sitemap for your application easily. It handles localized routes and adds the necessary metadata for search engines.

> The Intlayer generated sitemap supports the `xhtml:link` namespace (Hreflang XML Extensions). Unlike the default sitemap generators that only list raw URLs, Intlayer automatically creates the required bidirectional links between all language versions of a page (e.g., `/about`, `/about?lang=fr`, and `/about?lang=es`). This ensures search engines correctly index and serve the right language version to the right audience.

Create `src/pages/sitemap.xml.ts` to generate a sitemap that includes all your localized routes.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, {
    siteUrl: "https://example.com",
  });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Create `src/pages/robots.txt.ts` to control search engine crawling.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

</Step>
<Step number={9} title="Continue using your favorite framework">

Continue using your favorite framework to build your application.

- Intlayer + React: [Intlayer with React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_react.md)
- Intlayer + Vue: [Intlayer with Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_vue.md)
- Intlayer + Svelte: [Intlayer with Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_svelte.md)
- Intlayer + Solid: [Intlayer with Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_solid.md)
- Intlayer + Preact: [Intlayer with Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_preact.md)
- Intlayer + Lit: [Intlayer with Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_lit.md)
</Step>

<Step number={15} title="Extract the content of your components" isOptional={true}>

If you have an existing codebase, transforming thousands of files can be time-consuming.

To ease this process, Intlayer propose a [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) to transform your components and extract the content.

To set it up, you can add a `compiler` section in your `intlayer.config.ts` file:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indicates if the components should be saved after being transformed.
     *
     * - If `true`, the compiler will rewrite the component file in the disk. So the transformation will be permanent, and the compiler will skip the transformation for the next process. That way, the compiler can transform the app, and then it can be removed.
     *
     * - If `false`, the compiler will inject the `useIntlayer()` function call into the code in the build output only, and keep the base codebase intact. The transformation will be done only in memory.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Run the extractor to transform your components and extract the content

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel compiler'>

Build your application to transform your components and extract the content

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

</Step>

</Steps>

### Configure TypeScript

Intlayer use module augmentation to get benefits of TypeScript and make your codebase stronger.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Ensure your TypeScript configuration includes the autogenerated types.

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  include: [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```bash
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md).

### Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

## Frequently Asked Questions

<FAQ>

<Question title="What are the different solutions available to internationalize an Astro site?">

Astro ships a routing level `i18n` option that handles locale prefixes and redirects, but it does not manage the content itself, so you still need a message layer:

- **Astro's built-in `i18n`** plus hand written JSON or TypeScript dictionaries: no dependency, but no typing, no plural rules and no tooling.
- **`i18next`** or **`vue-i18n` / `svelte-i18n`** inside islands: a full library per island framework, each with its own catalog.
- **`Intlayer`**: one content layer shared by Astro pages and every island framework, compiled at build time, fully typed, with AI translation, a visual editor and a CMS.

The Astro specific gain is that the same dictionary serves an `.astro` page and a React, Vue, Svelte, Solid, Preact or Lit island, instead of one i18n library per island runtime. See [why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md).

</Question>
<Question title="How much does i18n add to my Astro bundle size?">

Much less than a namespace based setup, because a page never downloads a catalog it does not render. Astro pages are rendered at build time, so they ship translated HTML and no dictionary at all; only the islands receive one. The build time compiler resolves the content calls to the exact entries a component uses, and [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md) split the rest per locale. Measured against the usual alternatives, Intlayer reduces bundle and page size by up to 50%. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md).

</Question>
<Question title="Can I migrate from `i18next` or a hand written dictionary without rewriting my components?">

Largely. Follow the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md) to move the content over. You can also migrate gradually: the [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) keeps your existing JSON catalogs as the source of truth and generates Intlayer dictionaries from them, so both layers stay in sync while you move components across one at a time.

</Question>
<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md) does the same for gettext catalogs, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>
<Question title="Do I have to move my content key by key?">

No. Run `npx intlayer extract` and Intlayer reads your components, pulls the user facing strings out and writes a `.content` file next to each one, so you review a diff instead of copying strings into a catalog one at a time. Step 15 of this guide walks through it.

For a fully automated pipeline, the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) does the same at build time: it scans your JSX, TSX, Vue and Svelte source on every change, generates the dictionaries and keeps them in sync through hot module replacement, so there are no keys to maintain by hand at all.

Two limits are worth knowing before you turn the compiler on. It works by static analysis, so strings that only exist at runtime, such as API error codes or CMS fields, stay out of reach. And it has to tell user facing text apart from application logic like `className="active"` or a status code, which needs a few annotations in a large codebase. The [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) avoids both by keeping you in the loop.

</Question>
<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)**: jump from a `useIntlayer` key to the content file that declares it, extract content from a component, and run build, fill, test, push and pull from the command palette or a dedicated Intlayer tab.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, find all references, hover previews of a translated value, autocompletion of keys and fields, and a warning when a key is not declared anywhere. It also resolves `i18next`, `react-i18next`, `next-intl` and `use-intl` calls, which helps while you migrate.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT, so an assistant answers from current docs instead of guessing, and can run commands such as `intlayer fill` itself.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`, plus one per framework, that teach an agent your routing setup and the content node types.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md)**: `no-raw-text` flags hardcoded strings, with further rules for static dictionary keys and unused content.

</Question>
<Question title="Does Intlayer work inside Astro islands?">

Yes. `astro-intlayer` covers the `.astro` side, and each island framework has its own binding, so an island receives the active locale from the page instead of resolving it again. Dedicated guides exist for [Astro + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_react.md), [Astro + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_vue.md) and [Astro + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_astro_svelte.md), among others.

</Question>
<Question title="Does the translated content ship as static HTML?">

Yes. Astro renders pages at build time by default, and Intlayer resolves content during that render, so localized pages are plain static HTML. Only islands that need to switch locale at runtime receive a dictionary, and only for the locale they render.

</Question>
<Question title="How do I set up localized routing and a locale switcher?">

Step 6 and step 7 of this guide cover it. `routing.mode` controls whether the default locale is prefixed (`"prefix-no-default"`), whether every locale is (`"prefix-all"`), or whether the locale lives outside the path (`"no-prefix"` or `"search-params"`). `getLocalizedUrl` rewrites the current path into the target language so a switcher keeps the reader on the same page.

</Question>
<Question title="How do I generate a localized sitemap and hreflang tags?">

Step 8 covers `sitemap.xml` and `robots.txt`. `getMultilingualUrls` builds the alternates for every declared locale, including `x-default`, which is what search engines use to serve the right language version of a page.

</Question>
<Question title="How do I translate an Astro site automatically with AI?">

Run `npx intlayer fill`. It fills missing translations with the LLM of your choice, using your own provider and API key, and `--git-diff` limits the run to the content changed on the branch. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md).

</Question>
<Question title="Does Intlayer support plurals, gender and Markdown content?">

Yes: [plural forms](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/plurial.md), [gender based content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/gender.md), conditions, [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md) and [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md), which is convenient in Astro for long form pages. [Formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md) handle numbers, dates and currencies.

</Question>
<Question title="How can translators edit the content without touching the code?">

Through the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md), which runs on your own infrastructure and lets anyone edit text in place on the running app, or the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), which externalizes content so it can change without a deployment.

</Question>
<Question title="Is Intlayer free and open source?">

Yes, under the Apache 2.0 license, commercial use included. The hosted CMS is an optional paid service that can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md).

</Question>

</FAQ>
