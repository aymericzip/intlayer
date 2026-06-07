---
createdAt: 2026-04-24
updatedAt: 2026-05-31
title: "Astro + Preact i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Astro + Preact app. Translate with AI agents and optimise bundle size, SEO and performances."
keywords:
  - internationalisation
  - documentation
  - Intlayer
  - Astro
  - Preact
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - preact
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.7.7
    date: 2026-04-24
    changes: "Initial documentation for Astro + Preact"
---

# Translate your Astro + Preact site with Intlayer | Internationalisation (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to internationalise your application with Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
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

---

## Step-by-Step Guide to Configure Intlayer in Astro + Preact

Check out the [application template](https://github.com/aymericzip/intlayer-astro-template) on GitHub.

<Steps>

<Step number={1} title="Install Dependencies">

Install the necessary packages using your preferred package manager:

```bash packageManager="npm"
npm install intlayer astro-intlayer preact preact-intlayer @astrojs/preact

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

bun x intlayer init
```

- **intlayer**
  The core package that provides i18n tools for configuration management, translations, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).

- **astro-intlayer**
  Includes the Astro integration plugin to link Intlayer with the [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), as well as the middleware to detect the user's preferred language, manage cookies, and handle URL redirects.

- **preact**
  Core Preact package - a fast, lightweight alternative to React.

- **preact-intlayer**
  Package to integrate Intlayer into Preact applications. It provides the `IntlayerProvider` as well as the `useIntlayer` and `useLocale` hooks for internationalisation in Preact.

- **@astrojs/preact**
  Official Astro integration that allows the use of Preact component islands.

</Step>

<Step number={2} title="Configure Your Project">

Create a configuration file to define your application's languages:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.ENGLISH_UNITED_KINGDOM,
      // Your other languages
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Through this configuration file, you can configure localised URLs, middleware redirects, cookie names, location and extensions of content declarations, disable Intlayer logs in the console, and more. For a full list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

</Step>

<Step number={3} title="Integrate Intlayer into Your Astro Configuration">

Add the `intlayer` plugin and Preact integration to your Astro configuration.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import preact from "@astrojs/preact";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), preact()],
});
```

> The `intlayer()` integration plugin is used to integrate Intlayer with Astro. It ensures the generation of the content declaration files and monitors them in development mode. It defines Intlayer environment variables within the Astro application and provides aliases to optimise performance.

> The `preact()` integration allows for using Preact component islands via `client:only="preact"`.

</Step>

<Step number={4} title="Declare Your Content">

Create and manage your content declarations to store translations:

```tsx fileName="src/app.content.tsx"
import { h } from "preact";
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      "en-GB": "Hello World",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Content declarations can be defined anywhere in your application, as long as they are included in the `contentDir` (by default `./src`) and match the content declaration file extension (by default `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> For more information, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md).

> If your content files include TSX code, you might need to import `import { h } from "preact";` or ensure your JSX pragma is correctly configured for Preact.

</Step>

<Step number={5} title="Using Content in Astro">

You can consume the dictionaries directly in your `.astro` files using the core helpers exported from `intlayer`. You should also add SEO metadata (such as hreflang and canonical links) to every page and introduce a Preact island for interactive client-side content.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getHTMLTextDir,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import { PreactIsland } from "../../components/preact/ReactIsland";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical Link: Informs search engines about the main version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Informs Google about all localised versions -->
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

    <!-- x-default: Fallback option when locale doesn't match user's language -->
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
    <!-- The Preact island renders all interactive content, including the language switcher -->
    <PreactIsland locale={locale} client:only="preact" />
  </body>
</html>
```

> If you want to use your content in a `string` attribute, such as `alt`, `title`, `href`, `aria-label`, etc., you can use the value of the function, like:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> **Note on routing setup:**
> The directory structure you use depends on the `middleware.routing` setting in `intlayer.config.ts`:
>
> - **`prefix-no-default` (default):** keeps the default language at the root (no prefix) and prefixes others. Use `[...locale]` to catch all cases.
> - **`prefix-all`:** all URLs get a language prefix. You can use standard `[locale]` if you don't need to handle the root separately.
> - **`search-param` or `no-prefix`:** no language directories are needed. The language is handled via query parameters or cookies.

</Step>

<Step number={6} title="Create a Preact Island Component">

Create an island component that wraps your Preact application and receives the server-detected locale:

```tsx fileName="src/components/preact/PreactIsland.tsx"
/** @jsxImportSource preact */
import { IntlayerProvider, useIntlayer } from "preact-intlayer";
import { type LocalesValues } from "intlayer";
import type { FunctionalComponent } from "preact";
import { LocaleSwitcher } from "./LocaleSwitcher";

const App: FunctionalComponent = () => {
  const { title } = useIntlayer("app");

  return (
    <div>
      <h1>{title}</h1>
      <LocaleSwitcher />
    </div>
  );
};

export const PreactIsland: FunctionalComponent<{ locale: LocalesValues }> = ({
  locale,
}) => (
  <IntlayerProvider locale={locale}>
    <App />
  </IntlayerProvider>
);
```

> The `locale` prop is passed from the Astro page (server detection) to `IntlayerProvider`, making it the initial language for all Preact hooks within the tree.

> Note: In Preact, the HTML `class` property is used instead of `className`.

</Step>

<Step number={7} title="Add a Language Switcher">

Create a Preact `LocaleSwitcher` component that reads available languages and navigates to the localised URL when a user selects a new language:

```tsx fileName="src/components/preact/LocaleSwitcher.tsx"
/** @jsxImportSource preact */
import { useLocale } from "preact-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";
import type { FunctionalComponent } from "preact";

export const LocaleSwitcher: FunctionalComponent = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // Navigate to the localised URL on language change
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div class="locale-switcher">
      <span class="switcher-label">Change language:</span>
      <div class="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => setLocale(localeItem)}
            class={`locale-btn ${localeItem === locale ? "active" : ""}`}
            disabled={localeItem === locale}
          >
            <span class="ls-own-name">{getLocaleName(localeItem)}</span>
            <span class="ls-current-name">
              {getLocaleName(localeItem, locale)}
            </span>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> **Note on persistence:**
> Using `onLocaleChange` to redirect via `window.location.href` ensures the new linguistic URL is visited, allowing the Intlayer middleware to set the language cookie and remember the user's preference in future visits.

> The `LocaleSwitcher` must be rendered within `IntlayerProvider` - use it in your island component (as shown in step 6).

</Step>

<Step number={8} title="Sitemap and Robots.txt">

Intlayer offers utilities to dynamically create your localised sitemap and robots.txt files.

#### Sitemap

Intlayer comes with a built-in sitemap generator to help you create a sitemap for your application easily. It handles localized routes and adds the necessary metadata for search engines.

> The Intlayer generated sitemap supports the `xhtml:link` namespace (Hreflang XML Extensions). Unlike the default sitemap generators that only list raw URLs, Intlayer automatically creates the required bidirectional links between all language versions of a page (e.g., `/about`, `/about?lang=fr`, and `/about?lang=es`). This ensures search engines correctly index and serve the right language version to the right audience.

Create `src/pages/sitemap.xml.ts` to generate a sitemap including all your localised routes.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

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

<Step number={15} title="Extract the content of your components" isOptional={true}>

If you have an existing codebase, transforming thousands of files can be time-consuming.

To ease this process, Intlayer propose a [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md) to transform your components and extract the content.

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

Update your `vite.config.ts` to include the `intlayerCompiler` plugin:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

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

---

</Step>

</Steps>

### TypeScript Configuration

Intlayer uses module augmentation to leverage TypeScript, making your codebase more robust. Ensure your TypeScript configuration includes the autogenerated types and is configured for Preact:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    jsx: "react-jsx",
    jsxImportSource: "preact", // Recommended for Preact 10+
  },
  include: [
    // ... your existing TypeScript configuration
    ".intlayer/**/*.ts", // Include autogenerated types
  ],
}
```

### Git Configuration

It is recommended to ignore the files generated by Intlayer. This avoids committing them to your Git repository.

To do this, add the following instructions to your `.gitignore` file:

```bash
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code Extension

To improve your development experience with Intlayer, you can install the **official Intlayer VS Code extension**.

[Installation from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline preview** of translated content.
- **Quick actions** for easily creating and updating translations.

For more information on using the extension, refer to the [VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

### Deepen Your Knowledge

If you want to learn more, you can also implement the [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) or use the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md) to externalise your content.
