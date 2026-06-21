---
createdAt: 2025-03-25
updatedAt: 2026-05-31
title: "TanStack Start + Solid i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) TanStack Start + Solid app. Translate with AI agents and optimise bundle size, SEO and performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.5.1
    date: 2026-03-25
    changes: "Added for Tanstack Start Solid.js"
author: aymericzip
---

# Translate your Tanstack Start website with Solid.js using Intlayer | Internationalisation (i18n)

## Table of Contents

<TOC/>

This guide demonstrates how to integrate **Intlayer** for seamless internationalisation in Tanstack Start projects with Solid.js, locale-aware routing, TypeScript support, and modern development practices.

## Why Intlayer over alternatives?

Compared to main solutions like `react-i18next` or `i18next`, Intlayer is a solution that comes with integrated optimizations such as:

<AccordionGroup>

<Accordion header="Full TanStack Start coverage">

Intlayer is optimized to work perfectly with TanStack Start and Solid by offering **multilingual routing**, **sitemap**, and all the features needed for scaling internationalization (i18n).

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

## Step-by-Step Guide to Setting Up Intlayer in a Tanstack Start Application

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Tanstack Start? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalise your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See the [Application Template](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) on GitHub.

<Steps>

<Step number={1} title="Project Creation">

First, create a new TanStack Start project following the [Start New Project](https://tanstack.com/start/latest/docs/framework/solid/quick-start) guide on the TanStack Start website.

</Step>

<Step number={2} title="Install Intlayer Packages">

Install the necessary packages using your preferred package manager:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> the `--interactive` flag is optional. Use `intlayer-cli init` if you're an AI agent.

> This command will detect your environment and install the required packages. For example:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  The core package that provides internationalisation tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).

- **solid-intlayer**
  The package that integrates Intlayer into the Solid application. It provides context providers and hooks for Solid internationalisation.

- **vite-intlayer**
  Includes the Vite plugin to integrate Intlayer with the [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), as well as middleware to detect the user's preferred locale, manage cookies, and handle URL redirection.

</Step>

<Step number={3} title="Configuration of your project">

Create a configuration file to set up the languages of your application:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Through this configuration file, you can configure localised URLs, middleware redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

</Step>

<Step number={4} title="Integrate Intlayer in your Vite Configuration">

Add the intlayer plugin in your configuration:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> The `intlayer()` Vite plugin is used to integrate Intlayer with Vite. It ensures the building of content declaration files and monitors them in development mode. It defines the Intlayer environment variables within the Vite application. Additionally, it provides aliases to reduce performance overhead.

</Step>

<Step number={5} title="Create the Root Layout">

Configure your root layout to support internationalisation by using `useParams` to detect the current locale and setting the `lang` and `dir` attributes on the `html` tag.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { Route as LocaleRoute } from "./{-$locale}/route";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

</Step>

<Step number={6} title="Create the Locale Layout">

Create a layout that handles the locale prefix and performs validation. This layout will ensure only valid locales are processed.

> This step is optional if you don't need to validate the locale prefix at the route level.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Validate the locale prefix
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> Here, `{-$locale}` is a dynamic route parameter that is replaced by the current locale. This notation makes the slot optional, allowing it to work with routing modes like `'prefix-no-default'` etc.

> Be aware that this slot may cause issues if you use multiple dynamic segments in the same route (ex: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> For `'prefix-all'` mode, you might prefer switching the slot to `$locale`.
> For `'no-prefix'` or `'search-params'` mode, you can remove the slot entirely.

</Step>

<Step number={7} title="Declare Your Content">

Create and manage your content declarations to store translations:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Your content declarations can be defined anywhere in your application, as long as they are included in the `contentDir` directory (by default, `./app`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md).

</Step>

<Step number={8} title="Utilise Locale-Aware Components and Hooks">

Create a `LocalizedLink` component for locale-aware navigation:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
  McPherson,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

This component serves two purposes:

- Removing the unnecessary `{-$locale}` prefix from the URL.
- Injecting the locale parameter into the URL to ensure the user is directly redirected to the localised route.

Then, we can create a `useLocalizedNavigate` hook for programmatic navigation:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="Use Intlayer in Your Pages">

Access your content dictionaries throughout your application:

#### Localised Home Page

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> If you want to use your content in a `string` attribute, such as `alt`, `title`, `href`, `aria-label`, etc., you can use the value of the function, like:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> In Solid, `useIntlayer` returns reactive content (e.g., `content`). You can access its properties directly.
>
> To learn more about the `useIntlayer` hook, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/solid-intlayer/useIntlayer.md).

</Step>

<Step number={10} title="Create a Locale Switcher Component">

Create a component to allow users to change languages:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> in Solid files, `locale` from `useLocale` is a **signal accessor**. Use `locale()` (with parentheses) to reactively read its current value.
>
> To learn more about the `useLocale` hook, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Management of HTML Attributes">

As seen in Step 5, you can manage the `lang` and `dir` attributes of the `html` tag by using `useParams` in your root component. This ensures that the correct attributes are set on both the server and client.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

</Step>

<Step number={12} title="Add Middleware">

You can also use the `intlayerProxy` to add server-side routing to your application. This plugin will automatically detect the current locale based on the URL and set the appropriate locale cookie. If no locale is specified, the plugin will determine the most appropriate locale based on the user's browser language preferences. If no locale is detected, it will redirect to the default locale.

> Note that to use the `intlayerProxy` in production, you need to switch the `vite-intlayer` package from `devDependencies` to `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // The Proxy should be placed before the server if you use Nitro
    nitro(),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

</Step>

<Step number={13} title="Internationalise Your Metadata">

You can also use the `getIntlayer` function to access your content dictionaries within the `head` loader for locale-aware metadata:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

---

</Step>

<Step number={14} title="Retrieve the locale in your server actions">

You may want to access the current locale from within your server actions or API endpoints.
You can do this using the `getLocale` helper from `intlayer`.

Here's an example using TanStack Start's server functions:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Get the cookie from the request (default: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Get the header from the request (default: 'x-intlayer-locale')
    // Fallback using Accept-Language negotiation
    getHeader: (name) => getRequestHeader(name),
  });

  // Retrieve some content using getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={15} title="Manage not found pages">

When a user visits a non-existent page, you can display a custom not found page and the locale prefix can impact the way the not found page is triggered.

#### Understanding TanStack Router's 404 handling with locale prefixes

In TanStack Router, handling 404 pages with localised routes requires a multi-layered approach:

1. **Dedicated 404 route**: A specific route to display the 404 UI
2. **Route-level validation**: Validates locale prefixes and redirects invalid ones to the 404
3. **Catch-all route**: Captures any non-matching paths within the locale segment

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// This creates a dedicated /[locale]/404 route
// It's used both as a direct route and imported as a component in other files
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Exported separately so it can be reused in notFoundComponent and catch-all routes
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad runs before the route renders (both server and client)
  // It's the ideal place to validate the locale prefix
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix checks if the locale is valid according to your intlayer config
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Invalid locale prefix - redirect to the 404 page with a valid locale prefix
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent is called when a child route doesn't exist
  // ex: /en/non-existent-page triggers this within the /en layout
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// The $ (splat/catch-all) route matches any path that doesn't match other routes
// ex: /en/some/deeply/nested/invalid/path
// This ensures ALL non-matching paths within a locale show the 404 page
// Without this, deep non-matching paths could show a blank page or error
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={16} title="Extract the content from your components" isOptional={true}>

If you have an existing codebase, transforming thousands of files can be time-consuming.

To ease this process, Intlayer proposes a [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md) to transform your components and extract the content.

To set it up, you can add a `compiler` section in your `intlayer.config.ts` file:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates whether the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indicates whether components should be saved after being transformed.
     *
     * - If `true`, the compiler will rewrite the component file on the disk. Thus, the transformation will be permanent, and the compiler will skip the transformation for the next process. In this way, the compiler can transform the app and then it can be removed.
     *
     * - If `false`, the compiler will inject the `useIntlayer()` function call in the code only in the build output, keeping the base codebase intact. Transformation will be done only in memory.
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
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
  ],
});
```

```bash packageManager="npm"
npm run build # Or rpm run dev
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

<Step number={16} title="Generate Sitemap">

Intlayer comes with a built-in sitemap generator to help you create a sitemap for your application easily. It handles localised routes and adds the necessary metadata for search engines.

To use it, you first need to configure your `vite.config.ts` to enable pre-rendering for your localised routes and disable the default TanStack Start sitemap generation.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
// ... other imports

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... other plugins
    tanstackStart({
      // ... other config
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Then, create a `src/routes/sitemap[.]xml.ts` route that uses the `generateSitemap` function:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
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
      },
    },
  },
});
```

---

</Step>

<Step number={17} title="Configure TypeScript">

Intlayer uses module augmentation to get the benefits of TypeScript and make your codebase stronger.

Ensure your TypeScript configuration includes the auto-generated types:

```json5 fileName="tsconfig.json"
{
  // ... your existing settings
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

</Step>

</Steps>

### Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension offers:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to create and update translations easily.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Going Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) or externalise your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md).

---

## Documentation References

- [Intlayer Documentation](https://intlayer.org)
- [Tanstack Start Documentation](https://tanstack.com/start/latest)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/solid-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/solid-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)
