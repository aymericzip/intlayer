---
createdAt: 2025-08-06
updatedAt: 2026-08-30
title: "Solid Start i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) SolidStart app. Server-rendered locale routing, hreflang, sitemap, and AI-assisted translation."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Initial history"
author: aymericzip
---

# Translate your SolidStart website using Intlayer | Internationalisation (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="The best i18n solution for Vite and Solid? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalise your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>

<Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-solid-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Solid Start Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

This guide covers a **server-rendered** SolidStart application: locale detection happens on the request, pages are rendered on the server in the right language, and the `<html lang>`, `hreflang` and sitemap signals search engines need are emitted server-side.

## Why Intlayer over alternatives?

Compared to main solutions like `@solid-primitives/i18n` or `i18next`, Intlayer is a solution that comes with integrated optimisations such as:

<AccordionGroup>

<Accordion header="Full Solid coverage">

Intlayer is optimised to work perfectly with Solid by offering **component-level content scoping**, **reactive translations**, and all the features needed for scaling internationalisation (i18n).

</Accordion>

<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. Intlayer helps **reduce your bundle and page sizes by up to 50%**.

</Accordion>

<Accordion header="Maintainability">

Scoping your application's content **facilitates maintenance** for large-scale applications. You can duplicate or delete a single feature folder without the mental burden of reviewing your entire content codebase. Additionally, Intlayer is **fully typed** to ensure your content's accuracy.

</Accordion>

<Accordion header="AI Agent">

Co-locating content **reduces the context needed** by Large Language Models (LLMs). Intlayer also comes with a suite of tools, such as a **CLI** to test for missing translations, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md)**, to make the developer experience (DX) even smoother for AI agents.

</Accordion>

<Accordion header="Automation">

Use automation to translate in your CI/CD pipeline using the LLM of your choice at the cost of your AI provider. Intlayer also offers a **compiler** to automate content extraction, as well as a [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) to help **translate in the background**.

</Accordion>

<Accordion header="Performance">

Connecting massive JSON files to components can lead to performance and reactivity issues. Intlayer optimises your content loading at build time.

</Accordion>

<Accordion header="Scaling with non-devs">

More than just an i18n solution, Intlayer provides a **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** to help you manage your multilingual content in **real-time**, making collaboration with translators, copywriters, and other team members seamless. Content can be stored locally and/or remotely.

</Accordion>
</AccordionGroup>

---

## Step-by-Step Guide to Set Up Intlayer in a SolidStart Application

<Steps>

<Step number={1} title="Install Dependencies">

Install the necessary packages using npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> the `--interactive` flag is optional. Use `intlayer-cli init` if you're an AI agent.

> This command will detect your environment and install the required packages. For example:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  The core package that provides internationalisation tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **solid-intlayer**

  The package that integrates Intlayer with Solid application. It provides context providers and hooks for Solid internationalisation.

- **vite-intlayer**

  Includes the Vite plugin for integrating Intlayer with the [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), as well as the locale-routing handler that detects the user's preferred locale, manages cookies, and handles URL redirection.

> `vite-intlayer` is a server-side concern here, not only a build-time one: it supplies the request handler that SolidStart's Nitro server runs. Keeping it in `dependencies` is the safe default — you can move it to `devDependencies` only if you deploy the built `.output` directory, into which Nitro inlines the handler.

</Step>

<Step number={2} title="Configuration of your project">

Create a config file to configure the languages of your application:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

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
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

With `prefix-no-default`, the default locale is served from unprefixed URLs:

```plaintext
/            /about          → English  (default locale)
/fr          /fr/about       → French
/es          /es/about       → Spanish
```

> Through this configuration file, you can set up localised URLs, middleware redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Integrate Intlayer in Your Vite Configuration">

Add the Intlayer plugin to your configuration:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> The `intlayer()` Vite plugin builds your content declaration files, watches them in development mode, and defines the Intlayer environment variables inside the application. It also provides aliases that optimise performance.

### Locale routing comes with the plugin

SolidStart runs on [Nitro](https://nitro.build), and `intlayer()` registers its locale-routing handler directly into Nitro's server pipeline (through the `routing.enableProxy` option, `true` by default). Nothing else to wire: on a built server, every request is inspected before it reaches the router, and

- the locale is read from the URL prefix, then the `INTLAYER_LOCALE` cookie, then the `Accept-Language` header;
- a non-prefixed URL is redirected to its localised counterpart when the resolved locale is not the default one (`/` → `/fr`);
- a redundantly prefixed URL is redirected back to its canonical form (`/en/about` → `/about`);
- the locale cookie is written back on the response.

</Step>

<Step number={4} title="Declare Your Content">

Create and manage your content declarations to store translations:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **SolidStart-specific gotcha**: every `.ts` / `.tsx` file under `src/routes` becomes a route, and a `.content.ts` file has a default export, so it would be picked up as a page. Keep the content declarations of your **pages** outside the routes directory (`src/contents/` works well). Content of **components** can stay co-located, since `src/components` is not scanned by the file-system router.

> Your content declarations can be defined anywhere in your application as soon as they are included in the `contentDir` directory (by default, `./src`), and match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={5} title="Add localized routing">

The goal of this step is to give each language its own URL, which is what search engines index.

Move your pages under an **optional dynamic segment**. In SolidStart's file-system router, `[[locale]]` compiles to the `:locale?` path pattern:

```plaintext
src/routes/
  [[locale]].tsx          ← layout that validates the segment
  [[locale]]/
    index.tsx             → /        and /fr        and /es
    about.tsx             → /about   and /fr/about  and /es/about
  [...404].tsx            → catch-all for anything else
```

The layout file's only job is to constrain the segment to a configured locale:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` expands `:locale?` into two patterns — one with the segment and one without — and tries them by descending specificity. `matchFilters` is what makes the difference between a working setup and a confusing one:

| URL         | Without `matchFilters`                         | With `matchFilters`                           |
| ----------- | ---------------------------------------------- | --------------------------------------------- |
| `/fr/about` | French about page                              | French about page                             |
| `/about`    | About page (static segment wins)               | About page                                    |
| `/unknown`  | **Home page**, silently, with `locale=unknown` | No match → falls through to the catch-all 404 |

> Prefer `[locale]` (required) over `[[locale]]` if you use the `'prefix-all'` routing mode, and drop the segment entirely for `'no-prefix'` or `'search-params'`.

</Step>

<Step number={6} title="Provide the locale to your application">

The URL is the single source of truth for the locale: the middleware has already redirected the request to its localised path, so reading the path in the root layout keeps the server render and the client hydration in agreement, and makes every client-side navigation update the locale for free.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // The server renders <html> in entry-server.tsx; client-side navigations
  // between locales have to update the attributes themselves.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` reacts to its `locale` prop, so passing the accessor call `locale()` inside JSX is enough — Solid compiles it to a getter, and the whole tree re-renders in the new language when the URL changes.

</Step>

<Step number={7} title="Set the HTML lang and dir attributes on the server">

The `<html>` element is rendered by `entry-server.tsx`, outside the `Router`. Read the locale from the request URL instead:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

Crawlers now receive the right language on the first byte:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="Utilize Intlayer in Your Pages">

Access your content dictionaries throughout your application:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> In Solid, `useIntlayer` returns reactive content (e.g., `content`). You can access its properties directly.

> If you want to use your content in a `string` attribute, such as `alt`, `title`, `href`, `aria-label`, etc., you can use the value of the function, like:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> To learn more about the `useIntlayer` hook, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md).

Content nodes are not limited to plain translations. A pluralised counter, for example:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` selects the category through `Intl.PluralRules` for the active locale, so languages with more than two plural forms work without any extra code.

</Step>

<Step number={9} title="Create a Localized Link Component">

Create a custom `Link` component that automatically prefixes internal URLs with the current language:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

Writing `href="/about"` once now produces `/about`, `/fr/about` or `/es/about` depending on the active locale — no manual prefixing anywhere in your pages.

</Step>

<Step number={10} title="Create a Locale Switcher Component">

Render the switcher as **real anchors** rather than a `<select>`: each language of the current page becomes a crawlable link that can be opened in a new tab, which a JavaScript-only control cannot offer.

`getPathWithoutLocale` strips the locale segment from the current path, and `getLocalizedUrl` rebuilds it for the target locale, so the links follow your routing mode without hard-coding anything. Navigation is what changes the rendered locale — the `[[locale]]` route derives it from the URL — while `setLocale` persists the choice in the `INTLAYER_LOCALE` cookie so a later visit to a locale-free URL resolves to the same language.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // Canonical (locale-free) path of the page currently displayed
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Exact match only, so the default-locale link is not flagged
              // active on every page
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Ensures the "go back" browser button returns to the previous page
              replace
            >
              {/* Language in its own locale - e.g. Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> In Solid, `locale` from `useLocale` is a **signal accessor**. Use `locale()` (with parentheses) to read its current value reactively.
>
> `getLocaleName(localeItem)` renders each language in its own language — `English / Français / Español`. Pass a second argument to translate the names into the language currently displayed instead: `getLocaleName(localeItem, locale())` gives `English / French / Spanish` in English, `anglais / français / espagnol` in French.
>
> `<A>` already sets `aria-current="page"` on the link matching the current URL, so there is nothing to add for that. `replace` is read back from the rendered attribute by the router: it swaps the history entry instead of pushing one, so the browser "go back" button returns to the page visited before the switch rather than to the same page in the previous language.
>
> `dir` and `hreflang` on each link keep right-to-left language names correctly oriented and tell assistive technologies and crawlers which language each link points to.
>
> To learn more about the `useLocale` hook, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Emit canonical and hreflang links" isOptional={true}>

`hreflang` annotations tell search engines that `/about`, `/fr/about` and `/es/about` are the same page in different languages. `getMultilingualUrls` derives them from the canonical (locale-free) path, following your routing mode, so nothing is hard-coded:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** Absolute URL of the page being rendered. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

Render it in the document head, where the request URL is available:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … inside <head>, next to the other meta tags:
<AlternateLinks url={url} />;
```

`GET /fr/about` then serves:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **Note on `@solidjs/meta`**: at the time of writing, `<Title>` and `<Meta>` from `@solidjs/meta` are applied on the client after hydration but are **not** emitted into the server-rendered `<head>` in SolidStart v2. Until that is fixed upstream, render the tags that crawlers must see without JavaScript — `canonical`, `hreflang`, and if needed `title` / `description` — directly in `entry-server.tsx`, as shown above.

</Step>

<Step number={12} title="Manage not found pages" isOptional={true}>

A splat route at the root of `src/routes` catches every path the locale segment did not match — including invalid locale prefixes rejected by `matchFilters`. Because the locale still comes from the URL through the root layout, the 404 page is displayed in the visitor's language:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| Request           | Result                                  |
| ----------------- | --------------------------------------- |
| `/xx`             | `404` — `xx` is not a configured locale |
| `/nonexistent`    | `404` in the default locale             |
| `/fr/nonexistent` | `404` in French (`Page introuvable`)    |

</Step>

<Step number={13} title="Generate a multilingual sitemap" isOptional={true}>

Intlayer's sitemap generator expands every path into one entry per locale and wires the `xhtml:link` alternates between them, so the route only has to list the canonical, locale-free paths.

> Unlike basic generators that only emit flat URLs, Intlayer wires bidirectional links between every localised variant of each page, which helps search engines relate localised URLs and serve the right one to the right audience.

SolidStart turns a file exporting an HTTP method into an API route, and strips the `.ts` extension from the path — so `src/routes/sitemap.xml.ts` is served at `/sitemap.xml`:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> API routes do not support optional parameters, so keep this file at the root of `src/routes`, outside the `[[locale]]` segment. The sitemap already contains every locale.

You can build a `robots.txt` the same way with `getMultilingualUrls`, so that `Disallow` entries cover every localised spelling of a sensitive path:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="Retrieve the locale in your server functions" isOptional={true}>

You may want to access the current locale from inside a server function or an API route.

In a prefix-based setup like this one, **the URL is authoritative**: `getLocaleFromPath` reads the prefix from the request URL. `getLocale` is the fallback for requests that carry no locale prefix — it inspects the `INTLAYER_LOCALE` cookie, then the `x-intlayer-locale` header, then negotiates `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // Get the cookie from the request (default: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // Get the header from the request (default: 'x-intlayer-locale'),
      // falling back to Accept-Language negotiation
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // Retrieve some content outside of a component using getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> Do not rely on `getLocale` alone here: the locale cookie is only written once a visitor actively switches language, so a first visit to `/fr/...` would resolve to the default locale.

</Step>

<Step number={15} title="Extract the content of your components" isOptional={true}>

If you have an existing codebase, transforming thousands of files can be time-consuming.

To ease this process, Intlayer proposes a [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) to transform your components and extract the content.

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

> Move the generated content files of your pages out of `src/routes` afterwards, for the reason explained in step 5.

 </Tab>
 <Tab value='Babel compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Update your `vite.config.ts` to include the `intlayerCompiler` plugin:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
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

</Step>

<Step number={16} title="Configure TypeScript">

Intlayer uses module augmentation to get the benefits of TypeScript and make your codebase stronger.

Ensure your TypeScript configuration includes the autogenerated types:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... your existing configurations
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

Dictionary keys and content paths are now checked at compile time:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## Verifying your setup

Build and start the server, then check that these requests behave as expected:

```bash
npm run build
node .output/server/index.mjs
```

| Request                                  | Expected response                     |
| ---------------------------------------- | ------------------------------------- |
| `GET /`                                  | `200` — English                       |
| `GET /` with `Accept-Language: fr`       | `302` → `/fr`                         |
| `GET /` with cookie `INTLAYER_LOCALE=es` | `302` → `/es`                         |
| `GET /fr`                                | `200` — French, `<html lang="fr">`    |
| `GET /fr/about`                          | `200` — French about page             |
| `GET /en/about`                          | `302` → `/about` (canonical redirect) |
| `GET /xx`                                | `404`                                 |
| `GET /fr/nonexistent`                    | `404` in French                       |
| `GET /sitemap.xml`                       | `200` — multilingual XML sitemap      |

The rows that render a page behave identically under `vite dev`. The three redirect rows only apply to a built server unless you register the handler as a middleware yourself — see step 3.

> Run the dev server on Node (`vite dev`) rather than on Bun (`bun --bun vite dev`): SolidStart's SSR currently fails under the Bun runtime with `Expected a Response object, but received 'NodeResponse'`. This is unrelated to Intlayer — it reproduces on the plain template — and only affects the dev server, not `vite build`.

---

## Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

---

## Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## Documentation References

- [Intlayer Documentation](https://intlayer.org)
- [SolidStart Documentation](https://start.solidjs.com)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)

## Frequently Asked Questions

<FAQ>

<Question title="What are the different solutions available to internationalize a Solid Start app?">

- **`@solid-primitives/i18n`**: the community primitive, a flat dictionary you assemble, load and type yourself.
- **`i18next`** with a Solid wrapper: mature catalogues, but nothing for locale aware routing or server rendering in Solid Start.
- **`Intlayer`**: the most advanced solution. Content declared anywhere in your codebase ([next to each component or centralized](https://intlayer.org/blog/per-component-vs-centralized-i18n)) and compiled at build time, with localized routes, server side locale resolution, canonical and hreflang links, a multilingual sitemap, AI translation, a visual editor and a CMS.

On Solid Start the difference shows in the server pieces, which this guide covers as dedicated steps rather than leaving them to you. See [why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/interest_of_intlayer.md) and the [Solid i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/solid.md).

</Question>

<Question title="How much does i18n add to my Solid Start bundle size?">

Much less than a namespace based setup, because a page never downloads a catalogue it does not render. Server rendered markup resolves its content on the server, and the build time compiler replaces `useIntlayer` calls with the exact dictionary entries a component uses, so unused keys and unused languages are dropped, and [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dynamic_dictionaries/index.md) split the rest per locale. Measured against the usual alternatives, Intlayer reduces bundle and page size by up to 50%. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/solid.md).

</Question>

<Question title="Can I migrate from `@solid-primitives/i18n` or `i18next` without rewriting my components?">

Largely. Follow the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_i18next_to_intlayer.md) to move the content over. You can also migrate gradually: the [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md) keeps your existing JSON catalogues as the source of truth and generates Intlayer dictionaries from them, so both layers stay in sync while you move components across one at a time.

</Question>

<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-po.md) does the same for gettext catalogues, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>

<Question title="Do I have to move my content key by key?">

No. Run `npx intlayer extract` and Intlayer reads your components, pulls the user facing strings out and writes a `.content` file next to each one, so you review a diff instead of copying strings into a catalogue one at a time. Step 15 of this guide walks through it.

For a fully automated pipeline, the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) does the same at build time: it scans your JSX, TSX, Vue and Svelte source on every change, generates the dictionaries and keeps them in sync through hot module replacement, so there are no keys to maintain by hand at all.

Two limits are worth knowing before you turn the compiler on. It works by static analysis, so strings that only exist at runtime, such as API error codes or CMS fields, stay out of reach. And it has to tell user facing text apart from application logic like `className="active"` or a status code, which needs a few annotations in a large codebase. The [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md) avoids both by keeping you in the loop.

</Question>

<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md)**: jump from a `useIntlayer` key to the content file that declares it, extract content from a component, and run build, fill, test, push and pull from the command palette or a dedicated Intlayer tab.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, find all references, hover previews of a translated value, autocompletion of keys and fields, and a warning when a key is not declared anywhere. It also resolves `i18next`, `react-i18next`, `next-intl` and `use-intl` calls, which helps while you migrate.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT, so an assistant answers from current docs instead of guessing, and can run commands such as `intlayer fill` itself.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`, plus one per framework, that teach an agent your routing setup and the content node types.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/eslint.md)**: `no-raw-text` flags hardcoded strings, with further rules for static dictionary keys and unused content.

</Question>

<Question title="Does Intlayer work with Solid Start server side rendering?">

Yes. Step 6 provides the locale to the application on the server and step 7 sets the `lang` and `dir` attributes there, so the first HTML response already carries the right language, which is what crawlers and social preview bots read.

</Question>

<Question title="Does changing the locale re-render my whole app?">

No. Content is backed by Solid signals, so switching language updates only the DOM nodes that read the changed values, without re-running the components around them.

</Question>

<Question title="How do I add canonical and hreflang links?">

Step 11 covers it. `getMultilingualUrls` builds the alternates for every declared locale, including `x-default`, and step 13 feeds the same data into a multilingual sitemap so every language version of a page links to the others.

</Question>

<Question title="How do I handle 404 pages on localized routes?">

Step 12 covers it. `validatePrefix` tells you whether the locale segment of the URL is a declared locale, so `/xx/about` returns a real 404 instead of being treated as a path and indexed as a duplicate page.

</Question>

<Question title="Do I have to put the locale in the URL?">

No. `routing.mode` accepts `"prefix-no-default"` (the default), `"prefix-all"`, `"no-prefix"` and `"search-params"`, and `routing.domains` maps each locale to its own domain. See the [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

</Question>

<Question title="How do I get the locale in a server function?">

Step 14 covers it. The locale resolved for the request is available inside server functions, so data fetched there can be localized in the same pass instead of being translated again on the client.

</Question>

<Question title="How do I translate the app automatically with AI?">

Run `npx intlayer fill`. It fills missing translations with the LLM of your choice, using your own provider and API key, and `--git-diff` limits the run to the content changed on the branch. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/CI_CD.md).

</Question>

<Question title="Does Intlayer support plurals, gender and rich text?">

Yes: [plural forms](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/plurial.md), [gender based content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/gender.md), conditions, [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/markdown.md) and [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/formatters.md) for numbers, dates and currencies.

</Question>

<Question title="How can translators edit the content without touching the code?">

Through the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md), which runs on your own infrastructure and lets anyone edit text in place on the running app, or the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md), which externalizes content so it can change without a deployment.

</Question>

<Question title="Is Intlayer free and open source?">

Yes, under the Apache 2.0 licence, commercial use included. The hosted CMS is an optional paid service that can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/self_hosting.md).

</Question>

</FAQ>
