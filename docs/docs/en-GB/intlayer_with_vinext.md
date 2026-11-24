---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Complete guide to translate your Next.js app on Vite"
description: "Set up Intlayer with vinext, the Next.js API on Vite: locale routing with proxy.ts, Server and Client Components, localised metadata, sitemap and Cloudflare Workers deployment."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "Initial history"
author: aymericzip
---

# Translate your vinext website using Intlayer

[vinext](https://github.com/cloudflare/vinext) reimplements the Next.js API on top of Vite. Your `app/` directory, `next/*` imports and `proxy.ts` keep working, but the build runs through Vite instead of Turbopack or webpack.

Intlayer plugs into that setup with two packages: `next-intlayer` for the hooks, providers and proxy your components already use on Next.js, and `vite-intlayer` for the build side (dictionary compilation, watching and bundle optimisation).

> Running Next.js with its own toolchain? Follow the [Next.js 16 guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md) instead.

- [Next.js 16 guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md)

## Table of Contents

<TOC/>

## Why Intlayer over alternatives?

Compared to solutions like `next-intl` or `i18next`, Intlayer comes with integrated optimisations:

<AccordionGroup>
<Accordion header="Built for the Next.js API, on Vite">

The same `next-intlayer` code runs on Next.js and on vinext. Server Components resolve content on the server, Client Components read it through the provider, and the locale routing runs from your `proxy.ts`. Migrating between the two toolchains does not touch your components.

</Accordion>
<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. The Vite plugin replaces each `useIntlayer` call with the entries the component actually uses, which **reduces bundle and page size by up to 50%**.

</Accordion>
<Accordion header="Maintainability">

Scoping content per component **simplifies maintenance** for large applications. You can duplicate or delete a feature folder without reviewing your whole content codebase, and Intlayer is **fully typed** to keep your content accurate.

</Accordion>
<Accordion header="AI Agent">

Co-locating content **reduces the context needed** by LLMs. Intlayer ships a **CLI** to test for missing translations, an **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md)**, an **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md)** and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md)
- [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md)

</Accordion>
<Accordion header="Automation">

Translate in your CI/CD pipeline with the LLM of your choice, at the cost of your AI provider. Intlayer also offers a **compiler** to automate content extraction, and a [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md) to **translate in the background**.

- [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)

</Accordion>
<Accordion header="Scaling with non-developers">

Intlayer provides a **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)** to manage multilingual content in **real time** with translators and copywriters. Content can be stored locally and/or remotely.

- [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md)
- [full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Step-by-Step Guide to Set Up Intlayer in a vinext Application

<Steps>
<Step number={1} title="Install Dependencies">

Start from a working vinext project. To create one, run `npm create vinext-app@latest`. To migrate an existing Next.js app, run `npx vinext init`.

Then install Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  The core package that provides internationalisation tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).

- **next-intlayer**

  Provides the providers, hooks and proxy for the Next.js API. vinext resolves `next/navigation`, `next/headers` and `next/server` to its own implementations, so `next-intlayer` works unchanged.

- **vite-intlayer**

  The Vite plugin that builds your content declarations, watches them in development, and optimises dictionaries in the production bundle. It replaces the `withIntlayer()` Next.js plugin, which vinext does not run.

</Step>
<Step number={2} title="Configure Your Project">

Choose whether your application should use localised URL paths (e.g. `/en/about`, `/fr/about`) or serve content without a locale segment in the path (e.g. `/about`, detecting the locale via cookies, headers, or query parameters).

<Tabs group="routing-mode">
<Tab label="With locale path" value="with-locale-path">

### Architecture

All localised pages are nested under a `[locale]` dynamic segment. This is recommended for SEO and static rendering, because each language has its own URL:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Configuration

Create an `intlayer.config.ts` file to declare the supported languages:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="Without locale path" value="without-locale-path">

### Architecture

Routes do not include a `[locale]` segment. All pages live directly under `src/app/`, and the locale comes from cookies, headers, or query parameters. This fits dashboards and authenticated apps:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Configuration

Set `routing.mode` to `"search-params"` (e.g. `/about?locale=fr`) or `"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> This file also sets proxy redirection, cookie names, the location and extension of your content declarations, logs, and more. See the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md) for the full list.

- [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)

</Step>
<Step number={3} title="Integrate Intlayer in Your Vite Configuration">

Add the `intlayer()` plugin next to `vinext()` in `vite.config.ts`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> The `intlayer()` plugin builds your dictionaries before the build starts, watches content files in development, and sets up the aliases and optimisations used by `next-intlayer` in the RSC, SSR and client environments.

> `intlayer()` also ships a locale routing middleware for the Vite dev server. On vinext, `src/proxy.ts` already does that job, in development and on your production runtime, so the `ignore` option turns the Vite one off to avoid routing every request twice.

> Leave `next.config.ts` free of `withIntlayer()`. vinext reads `next.config.ts` for options such as `redirects`, `rewrites` and `headers`, but does not run webpack or Turbopack plugins.

If you deploy to Cloudflare Workers, keep the `cloudflare()` plugin generated by `vinext init`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => false } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="Define Dynamic Locale Routes">

<Tabs group="routing-mode">
<Tab label="With locale path" value="with-locale-path">

Remove everything from `RootLayout` and replace it with the following code:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> Keeping `RootLayout` empty lets the locale layout set the [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) and [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) attributes on the `<html>` tag.

Add a layout in your `[locale]` directory:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> A single `IntlayerProvider` covers both halves of the tree: it provides the locale to Server Components and mounts the client provider so Client Components receive the same locale.

> The `[locale]` segment holds the locale: `/en-US/about` resolves to `en-US`, `/fr/about` to `fr`. The previous `src/app/page.tsx` is no longer used and can be removed. The proxy (step 7) serves the default locale at the root.

> `generateStaticParams` makes vinext prerender every page for each locale. vinext also enforces `dynamicParams`, so an unknown locale returns a 404 when you set `export const dynamicParams = false`.

</Tab>
<Tab label="Without locale path" value="without-locale-path">

There is no `[locale]` directory. Configure `src/app/layout.tsx` to read the locale from the request and wrap your application with `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="Declare Your Content">

Create content declarations to store your translations:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        "en-GB": "Get started by editing",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en-GB": "Get started by editing",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> Content declarations can live anywhere under the `contentDir` directory (by default, `./src`), as long as they match the content declaration extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md).

- [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md)

</Step>
<Step number={6} title="Utilize Content in Your Code">

Access your dictionaries from any component:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` is isomorphic: the `react-server` export condition, which vinext applies to its RSC environment, gives Server Components the server implementation, while Client Components get the context-backed one. The same call works on both sides.

> To use your content in a `string` attribute, such as `alt`, `title`, `href` or `aria-label`, read its value:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Learn more in the [`useIntlayer` documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/next-intlayer/useIntlayer.md).

- [`useIntlayer` documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/next-intlayer/useIntlayer.md)

> If your app already exists, the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) and the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md) transform thousands of components in a second.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md)
- [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md)

</Step>
<Step number={7} title="Configure Proxy for Locale Detection">

vinext runs `proxy.ts` (and `middleware.ts`) like Next.js 16, in development and in production, including on Cloudflare Workers. Export the Intlayer proxy:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` detects the user's preferred locale, redirects to the matching URL as set in the [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md), and stores the locale in a cookie. It also passes the locale to `getLocale()` and the server hooks, so keep it even with the without locale path architecture.

- [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)

> To chain several proxies (for example, `intlayerProxy` with authentication), use `multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="Internationalisation of your metadata" isOptional={true}>

vinext supports the Metadata API. Use `generateMetadata` with `getIntlayer` to translate your page metadata:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      "en-GB": "My vinext app",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      "en-GB": "A Next.js app running on Vite",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of the code
````

> The `getIntlayer` function imported from `intlayer` returns raw values, ready for the metadata object. The one from `next-intlayer` wraps them for the visual editor.

</Step>
<Step number={9} title="Internationalisation of your sitemap.xml and robots.txt" isOptional={true}>

`sitemap.ts` and `robots.ts` work as on Next.js. Use `getMultilingualUrls` to list every localised URL:

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={10} title="Change the language of your content" isOptional={true}>

Use `next/link` to navigate to the localised page. vinext keeps client-side navigation and prefetching, so the switch happens without a full reload:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Documentation references:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` function](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` function](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` function](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="Creating a Localised Link Component" isOptional={true}>

A custom `Link` component prefixes internal URLs with the current locale, so a French user clicking `/about` lands on `/fr/about`:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Get the current locale in Server Actions" isOptional={true}>

Call `getLocale` from `next-intlayer/server` inside a Server Action:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` reads the locale set by the proxy in the request headers, then the locale cookie, then the browser `Accept-Language` header, and falls back to the default locale.

</Step>
<Step number={13} title="Deploy to Cloudflare Workers" isOptional={true}>

Intlayer compiles dictionaries into the bundle at build time, so nothing reads the file system at runtime and the app runs as is in workerd. Build and deploy with the vinext CLI:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> To deploy elsewhere (Vercel, Netlify, AWS, Node.js), add the [Nitro](https://v3.nitro.build/) Vite plugin next to `vinext()`, or set `output: "standalone"` in `next.config.ts`. The Intlayer setup does not change.

</Step>
<Step number={14} title="Extract the content of your components" isOptional={true}>

On an existing codebase, Intlayer provides a [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) and an [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md) to move hardcoded strings into content declarations.

- [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md)
- [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md)

Enable the compiler in `intlayer.config.ts`:

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
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
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

Run the extractor to transform your components and extract the content:

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
 <Tab value='Vite compiler'>

The `intlayer()` Vite plugin includes the compiler. Once `compiler.enabled` is set, run your dev server or build as usual:

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

Intlayer uses module augmentation to type your content keys and values.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Include the generated types in your TypeScript configuration:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git Configuration

Ignore the files generated by Intlayer:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code Extension

Install the official **[Intlayer VS Code Extension](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** for key autocompletion, missing translation errors, inline previews and quick actions. See the [extension documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md).

- [extension documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md)

### Go Further

Add the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) or externalize your content with the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md).

- [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)

## Frequently Asked Questions

<FAQ>

<Question title="What is vinext?">

vinext is an open source Vite plugin, maintained by Cloudflare, that reimplements the public Next.js API: App Router and Pages Router, React Server Components, Server Actions, `proxy.ts`, route handlers and the `next/*` modules. Your Next.js code runs on Vite, and deploys natively to Cloudflare Workers or to other platforms through Nitro.

</Question>
<Question title="What changes compared to the Next.js setup?">

Only the build integration. On Next.js, `withIntlayer()` wraps `next.config.ts`. On vinext, the `intlayer()` plugin from `vite-intlayer` goes in `vite.config.ts` instead. Providers, hooks, `proxy.ts`, metadata and sitemap code stay identical, so you can follow the [Next.js 16 guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md) for anything this page does not cover.

- [Next.js 16 guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md)

</Question>
<Question title="Do I need the Next.js i18n config or the SWC plugin?">

No. The `i18n` field of `next.config.ts` only covers Pages Router locale prefixes on vinext, and Intlayer does its own routing through `proxy.ts`. The `@intlayer/swc` plugin is also not needed: the Vite plugin already replaces `useIntlayer` calls so each page ships only the dictionaries it uses. See [bundle optimisation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md).

- [bundle optimisation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md)

</Question>
<Question title="Do I need `intlayer watch` in development?">

No. The `intlayer()` Vite plugin starts the content watcher with `vite dev`, and a content edit hot-updates only the components that read the changed dictionary.

</Question>
<Question title="Can I migrate from `next-intl` or `i18next` without rewriting my components?">

Yes. Follow the [next-intl migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_next-intl_to_intlayer.md) or the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_i18next_to_intlayer.md), or keep your current API with the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md), which expose the `next-intl`, `react-i18next` and `react-intl` APIs served by Intlayer dictionaries.

- [next-intl migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_next-intl_to_intlayer.md)
- [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_i18next_to_intlayer.md)
- [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md)

</Question>
<Question title="Do I have to put the locale in the URL, like /fr/about?">

No. `routing.mode` accepts:

- `"prefix-no-default"` (default): `/about` for the default locale, `/fr/about` for the others.
- `"prefix-all"`: every locale is prefixed, `/en/about` and `/fr/about`.
- `"no-prefix"`: no locale in the path, resolved from cookie or header.
- `"search-params"`: `/about?locale=fr`.

See the [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md) and the without locale path architecture in step 2.

- [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)

</Question>
<Question title="How do I translate my app automatically with AI?">

Run `npx intlayer fill`. The CLI detects missing translations and fills them with the LLM of your choice, using your own provider and API key. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/CI_CD.md).

- [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/fill.md)
- [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/CI_CD.md)

</Question>
<Question title="How do I catch missing translations before shipping?">

Run `npx intlayer test` in CI. It fails the build when a declared locale is missing content. The [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md) shows the same errors while you type, and the [ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/eslint.md) flags hardcoded strings.

- [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md)
- [ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/eslint.md)

</Question>
<Question title="Is Intlayer free and open source?">

Yes. Intlayer is open source under the Apache 2.0 license, and the library, CLI, visual editor and compiler are free to use, including commercially. The hosted CMS is an optional paid service, and it can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/self_hosting.md).

- [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/self_hosting.md)

</Question>

</FAQ>
