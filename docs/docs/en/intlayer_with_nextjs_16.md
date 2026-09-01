---
createdAt: 2024-12-06
updatedAt: 2026-08-29
title: "Next.js 16 i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Next.js 16 app. Translate with AI agents and optimize bundle size, SEO and performances."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Add init command"
  - version: 7.0.6
    date: 2025-11-01
    changes: "Added mention of `x-default` in `alternates` object"
  - version: 7.0.0
    date: 2025-06-29
    changes: "Initial history"
author: aymericzip
---

# Translate your Next.js 16 website using Intlayer | Internationalization (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="The best i18n solution for Next.js? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Next.js 16 Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See [Application Template](https://github.com/aymericzip/intlayer-next-16-template) on GitHub.

## Table of Contents

<TOC/>

## Why Intlayer over alternatives?

Compared to main solutions like `next-intl` or `i18next`, Intlayer is a solution that comes with integrated optimizations such as:

<AccordionGroup>
<Accordion header="Full Next.js coverage">

Intlayer is optimized to work with **Server Components** for efficient rendering and is fully compatible with [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). It does not block static rendering and offers middleware as well as all the features needed for scaling internationalization (i18n).

> Intlayer is compatible with Next.js 12, 13, 14, 15, and 16. If you are using the Next.js Pages Router, you can refer to this [guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> Locale routing is useful for SEO, bundle size, and performance. If you don't need it, you can refer to this [guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> For Next.js 12, 13, 14, and 15 with the App Router, refer to this [guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

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

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application

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
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  The core package that provides internationalization tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **next-intlayer**

  The package that integrates Intlayer with Next.js. It provides context providers and hooks for Next.js internationalization. Additionally, it includes the Next.js plugin for integrating Intlayer with [Webpack](https://webpack.js.org/) or [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), as well as proxy for detecting the user's preferred locale, managing cookies, and handling URL redirection.

</Step>

<Step number={2} title="Configure Your Project">

Here is the final structure that we will make:

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
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

Create a config file to configure the languages of your application:

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
};

export default config;
```

> Through this configuration file, you can set up localized URLs, proxy redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Integrate Intlayer in Your Next.js Configuration">

Configure your Next.js setup to use Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* config options here */};

export default withIntlayer(nextConfig);
```

> The `withIntlayer()` Next.js plugin is used to integrate Intlayer with Next.js. It ensures the building of content declaration files and monitors them in development mode. It defines Intlayer environment variables within the [Webpack](https://webpack.js.org/) or [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) environments. Additionally, it provides aliases to optimize performance and ensures compatibility with server components.

> The `withIntlayer()` function is a promise function. It allows to prepare the intlayer dictionaries before the build starts. If you want to use it with other plugins, you can await it. Example:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> If you want to use it synchronously, you can use the `withIntlayerSync()` function. Example:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer automatically detects whether your project is using **webpack** or **Turbopack** based on the command-line flags `--webpack`, `--turbo`, or `--turbopack`, as well as your current **Next.js version**.
>
> Since `next>=16`, if you are using **Rspack**, you must explicitly force Intlayer to use the webpack configuration by disabling Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Define Dynamic Locale Routes">

Remove everything from `RootLayout` and replace it with the following code:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, Like `next-themes`, `react-query`, `framer-motion`, etc.
  <>{children}</>
);

export default RootLayout;
```

> Keeping the `RootLayout` component empty allows to set the [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) and [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) attributes to the `<html>` tag.

To implement dynamic routing, provide the path for the locale by adding a new layout in your `[locale]` directory:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> A single `IntlayerProvider` covers both halves of the tree: it seeds the request-scoped server context read by the server hooks, and mounts the client provider so client components receive the same locale.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

 </Tab>
</Tabs>

> The `[locale]` path segment is used to define the locale. Example: `/en-US/about` will refer to `en-US` and `/fr/about` to `fr`.

> At this stage, you will encounter the error: `Error: Missing <html> and <body> tags in the root layout.`. This is expected because the `/app/page.tsx` file is no longer in use and can be removed. Instead, the `[locale]` path segment will activate the `/app/[locale]/page.tsx` page. Consequently, pages will be accessible via paths like `/en`, `/fr`, `/es` in your browser. To set the default locale as the root page, refer to the `proxy` setup in step 7.

Then, implement the `generateStaticParams` function in your application Layout.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Line to insert

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Rest of the code*/
};

export default LocaleLayout;
```

> `generateStaticParams` ensures that your application pre-builds the necessary pages for all locales, reducing runtime computation and improving the user experience. For more details, refer to the [Next.js documentation on generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer works with `export const dynamic = 'force-static';` to ensure that the pages are pre-built for all locales.

</Step>

<Step number={5} title="Declare Your Content">

Create and manage your content declarations to store translations:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
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
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Your content declarations can be defined anywhere in your application as soon they are included into the `contentDir` directory (by default, `./src`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={6} title="Utilize Content in Your Code">

Access your content dictionaries throughout your application:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

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

- **`IntlayerProvider`** is mounted once, in the locale layout. It provides the locale to both server and client components, so pages no longer wrap themselves.
- The server hooks resolve the locale in this order: the locale passed at the call site, then the server context seeded by the provider, then the locale carried by the request (the `x-intlayer-locale` header set by the Intlayer proxy, then the locale cookie). That last step is what keeps content correct on a client-side navigation that re-renders only the page segment, where the layout — and with it the provider — does not re-run.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** is used to provide the locale to client-side components. It can be placed in any parent component, including the layout. However, placing it in a layout is recommended because Next.js shares layout code across pages, making it more efficient. By using `IntlayerClientProvider` in the layout, you avoid reinitializing it for every page, improving performance and maintaining a consistent localization context throughout your application.
- **`IntlayerServerProvider`** is used to provide the locale to the server children. It cannot be set set in the layout.

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

 </Tab>
</Tabs>

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

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

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

> `next-intlayer` is the isomorphic import path: the `react-server` export condition gives server components the ambient-locale implementation, while client components get the context-backed one. The same call works on both sides.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

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

 </Tab>
</Tabs>

> If you want to use your content in a `string` attribute, such as `alt`, `title`, `href`, `aria-label`, etc., you can use the value of the function, like:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> To Learn more about the `useIntlayer` hook, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayer.md).

> If your app already exists, you can use the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md), as well as the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md), to transform thousands of components in a second.

</Step>

<Step number={7} title="Configure Proxy for Locale Detection" isOptional={true}>

Set up proxy to detect the user's preferred locale:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> The `intlayerProxy` is used to detect the user's preferred locale and redirect them to the appropriate URL as specified in the [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md). Additionally, it enables saving the user's preferred locale in a cookie.

> Since Intlayer v9, this middleware respects the `routing.enableProxy` option (`true` by default). Set `routing.enableProxy: false` in your configuration to turn it into a pass-through without removing this file. See the [v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/releases/v9.md).

> If you need to chain several proxies together (for example, `intlayerProxy` with authentication or custom proxies), Intlayer now provides a helper called `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Internationalization of your metadata" isOptional={true}>

In the case you want to internationalize your metadata, such as the title of your page, you can use the `generateMetadata` function provided by Next.js. Inside, you can retrieve the content from the `getIntlayer` function to translate your metadata.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
      },
    },
  },
};
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

> Note that the `getIntlayer` function imported from `next-intlayer` returns your content wrapped in an `IntlayerNode`, allowing integration with the visual editor. In contrast, the `getIntlayer` function imported from `intlayer` returns your content directly without additional properties.

> Learn more about the metadata optimization [on the official Next.js documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Internationalization of your sitemap.xml and robots.txt" isOptional={true}>

To internationalize your `sitemap.xml` and `robots.txt`, you can use the `getMultilingualUrls` function provided by Intlayer. This function allows you to generate multilingual URLs for your sitemap.

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
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
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

> Learn more about the sitemap optimization [on the official Next.js documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Learn more about the robots.txt optimization [on the official Next.js documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Change the language of your content" isOptional={true}>

To change the language of your content in Next.js, the recommended way is to use the `Link` component to redirect users to the appropriate localized page. The `Link` component enables prefetching of the page, which helps avoid a full page reload.

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
            replace // Will ensure that the "go back" browser button will redirect to the previous page
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

> An alternative way is to use the `setLocale` function provided by the `useLocale` hook. This function will not allow prefetching the page. See the [`useLocale` hook documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md) for more details.

> You can also set a function in the `onLocaleChange` option to trigger a custom function when the locale changes.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Rest of the code

const { setLocale } = useLocale();

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Change to French</button>
);
```

> Documentation references:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Creating a Localized Link Component" isOptional={true}>

To ensure that your application's navigation respects the current locale, you can create a custom `Link` component. This component automatically prefixes internal URLs with the current language, so that. For example, when a French-speaking user clicks on a link to the "About" page, they are redirected to `/fr/about` instead of `/about`.

This behavior is useful for several reasons:

- **SEO and User Experience**: Localized URLs help search engines index language-specific pages correctly and provide users with content in their preferred language.
- **Consistency**: By using a localized link throughout your application, you guarantee that navigation stays within the current locale, preventing unexpected language switches.
- **Maintainability**: Centralizing the localization logic in a single component simplifies the management of URLs, making your codebase easier to maintain and extend as your application grows.

Below is the implementation of a localized `Link` component in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Utility function to check whether a given URL is external.
 * If the URL starts with http:// or https://, it's considered external.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * A custom Link component that adapts the href attribute based on the current locale.
 * For internal links, it uses `getLocalizedUrl` to prefix the URL with the locale (e.g., /fr/about).
 * This ensures that navigation stays within the same locale context.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // If the link is internal and a valid href is provided, get the localized URL.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### How It Works

- **Detecting External Links**:  
  The helper function `checkIsExternalLink` determines whether a URL is external. External links are left unchanged because they do not need localization.

- **Retrieving the Current Locale**:  
  The `useLocale` hook provides the current locale (e.g., `fr` for French).

- **Localizing the URL**:  
  For internal links (i.e., non-external), `getLocalizedUrl` is used to automatically prefix the URL with the current locale. This means that if your user is in French, passing `/about` as the `href` will transform it to `/fr/about`.

- **Returning the Link**:  
  The component returns an `<a>` element with the localized URL, ensuring that navigation is consistent with the locale.

By integrating this `Link` component across your application, you maintain a coherent and language-aware user experience while also benefitting from improved SEO and usability.

</Step>

<Step number={12} title="Get the current locale in Server Actions" isOptional={true}>

If you need the active locale inside a Server Action (e.g., to localize emails or run locale-aware logic), call `getLocale` from `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> The `getLocale` function follows a cascading strategy to determine the user's locale:
>
> 1. First, it checks the request headers for a locale value that may have been set by the proxy
> 2. If no locale is found in headers, it looks for a locale stored in cookies
> 3. If no cookie is found, it attempts to detect the user's preferred language from their browser settings
> 4. As a last resort, it falls back to the application's configured default locale
>
> This ensures the most appropriate locale is selected based on available context.

</Step>

<Step number={13} title="Optimize your bundle size" isOptional={true}>

When using `next-intlayer`, dictionaries are included in the bundle for every page by default. To optimize bundle size, Intlayer provides an optional SWC plugin that intelligently replace `useIntlayer` calls using macros. This ensures dictionaries are only included in bundles for pages that actually use them.

To enable this optimization, install the `@intlayer/swc` package. Once installed, `next-intlayer` will automatically detect and use the plugin:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Note: This optimization is only available for Next.js 13 and above.

> Note: This package is not installed by default because SWC plugins are still experimental on Next.js. It may change in the future.

> Note: If you set the option as `importMode: 'dynamic'` or `importMode: 'fetch'` (in the `dictionary` configuration), it will rely on Suspense, so you will have to wrap your `useIntlayer` calls in a `Suspense` boundary. That means, you will not be able to use the `useIntlayer` directly at the top level of your Page / Layout component.

</Step>

<Step number={14} title="Extract the content of your components" isOptional={true}>

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
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

</Steps>

### Watch dictionaries changes on Turbopack

When using Turbopack as your development server with the `next dev` command, dictionary changes will not be automatically detected by default.

This limitation occurs because Turbopack cannot run webpack plugins in parallel to monitor changes in your content files. To work around this, you'll need to use the `intlayer watch` command to run both the development server and the Intlayer build watcher simultaneously.

```json5 fileName="package.json"
{
  // ... Your existing package.json configurations
  "scripts": {
    // ... Your existing scripts configurations
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> If you are using next-intlayer@<=6.x.x, you need to keep the `--turbopack` flag to make the Next.js 16 application work correctly with Turbopack. We recommend using next-intlayer@>=7.x.x to avoid this limitation.

### Configure TypeScript

Intlayer use module augmentation to get benefits of TypeScript and make your codebase stronger.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Ensure your TypeScript configuration includes the autogenerated types.

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

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
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

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

### Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

## Frequently Asked Questions

<FAQ>

<Question title="What are the different solutions available to internationalize a Next.js app?">

Next.js has no built-in message layer since the `i18n` field of `next.config.js` stopped applying to the App Router, so the localization layer is always a library choice:

- **`next-intl`**, **`i18next` / `next-i18next`** and **`react-intl`**: the historical options, based on JSON or ICU message catalogs loaded per namespace.
- **`Lingui`**: extraction driven, with ICU messages compiled at build time.
- **`Intlayer`**: the most advanced solution. Content declared anywhere in your codebase ([next to each component or centralized](https://intlayer.org/blog/per-component-vs-centralized-i18n)), compiled at build time into per component dictionaries, fully typed, with AI translation, a visual editor and a CMS included.

The practical difference is what reaches the browser. Namespace based libraries ship whole JSON catalogs to a page, while Intlayer ships only the content the rendered components use, which cuts bundle and page size by up to 50%. See [why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md) and the [Next.js i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/nextjs.md).

</Question>

<Question title="How much does i18n add to my Next.js bundle size?">

Much less than a namespace based setup, because a page never downloads a catalog it does not render. Server Components resolve their content on the server, and the build time compiler replaces `useIntlayer` calls with the exact dictionary entries a component uses, so unused keys and unused languages are dropped, and [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md) split the rest per locale. Measured against the usual alternatives, Intlayer reduces bundle and page size by up to 50%. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/nextjs.md).

</Question>

<Question title="Can I migrate from `next-intl`, `next-i18next` or `i18next` without rewriting my components?">

Yes, and there are two paths. You can migrate the content progressively with the [next-intl migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_next-intl_to_intlayer.md) or the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md). Or you can keep your current API entirely: the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md) expose the exact same API as `next-intl`, `react-i18next` and `react-intl`, but served by Intlayer dictionaries, so imports change and component code does not.

</Question>

<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md) does the same for gettext catalogs, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>

<Question title="Do I have to move my content key by key?">

No. Run `npx intlayer extract` and Intlayer reads your components, pulls the user facing strings out and writes a `.content` file next to each one, so you review a diff instead of copying strings into a catalog one at a time. Step 14 of this guide walks through it.

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

<Question title="Does Intlayer work with the Next.js App Router and React Server Components?">

Yes. `next-intlayer` is built for the App Router: content is resolved on the server inside Server Components, so no dictionary is sent to the client for server rendered text. Client Components use the same `useIntlayer` hook through the provider. Intlayer does not block static rendering, and it is compatible with Turbopack.

</Question>

<Question title="Which versions of Next.js does Intlayer support?">

Intlayer supports Next.js 12, 13, 14, 15 and 16. This guide covers Next.js 16. For older setups, follow the [Next.js 15 guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md), the [Next.js 14 guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md) or the [Pages Router guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).

</Question>

<Question title="Do I have to put the locale in the URL, like /fr/about?">

No. The URL scheme is a configuration option, not a constraint. `routing.mode` accepts:

- `"prefix-no-default"` (default): `/about` for the default locale, `/fr/about` for the others.
- `"prefix-all"`: every locale is prefixed, `/en/about` and `/fr/about`.
- `"no-prefix"`: no locale in the path, resolved from cookie, header or domain.
- `"search-params"`: `/about?locale=fr`.

You can also map each locale to its own domain with `routing.domains`. See the [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) and the [guide without locale path](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).

</Question>

<Question title="How do I add hreflang tags and localized metadata for SEO?">

Use the Next.js `generateMetadata` function together with `getMultilingualUrls` from Intlayer. It builds the `alternates.languages` map for every declared locale, including the `x-default` entry, so search engines serve the right language version. The same helper localizes `sitemap.ts` and `robots.ts`. Step 8 and step 9 of this guide show the complete code.

</Question>

<Question title="How do I translate a Next.js app automatically with AI?">

Run `npx intlayer fill`. The CLI detects missing translations across your content files and fills them with the LLM of your choice, using your own provider and API key, so you pay the provider directly and nothing goes through a third party. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md).

</Question>

<Question title="Does Intlayer support plurals, gender, conditions and rich text?">

Yes. Content declarations support [plural forms](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/plurial.md), [gender based content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/gender.md), conditions, [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md) for interpolated values, and [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md) for rich text such as legal pages or blog bodies. Numbers, dates and currencies are handled by the [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md).

</Question>

<Question title="How can translators and non developers edit the content?">

Two options, both optional. The [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) runs on your own infrastructure and lets anyone click on the text of your site to edit it in place. The [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) externalizes the content so it can be updated without a deployment, with [live sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/live.md) reflecting changes at runtime.

</Question>

<Question title="How do I catch missing translations before shipping?">

Run `npx intlayer test` in CI. It fails the build when a declared locale is missing content, so an untranslated string never reaches production. The [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md) surfaces the same errors while you type, and the [ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md) and its `no-raw-text` rule catch hardcoded strings. See [testing your content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/testing.md).

</Question>

<Question title="Is Intlayer free and open source?">

Yes. Intlayer is open source under the Apache 2.0 license, and the whole library, CLI, visual editor and compiler are free to use, including commercially. The hosted CMS is an optional paid service, and it can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md).

</Question>

</FAQ>
