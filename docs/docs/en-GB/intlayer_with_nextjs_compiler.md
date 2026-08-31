---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Next.js app. Translate with AI agents and optimise bundle size, SEO and performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Compiler
  - AI
slugs:
  - doc
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# How to make multilingual (i18n) an existing Next.js application afterward (i18n guide 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="The best i18n solution for Next.js? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalise your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See [Application Template](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) on GitHub.

## Table of Contents

<TOC/>

## Why is it hard to internationalise an existing application?

If you've ever tried to add multiple languages to an app that was built for just one, you know the pain. It's not just "hard", it's tedious. You have to comb through every single file, hunt down every string of text, and move them into separate dictionary files.

Then comes the risky part: replacing all that text with code hooks without breaking your layout or logic. It's the kind of work that halts new feature development for weeks and feels like endless refactoring.

## What is the Intlayer Compiler?

The **Intlayer Compiler** was built to skip that manual grunt work. Instead of you manually extracting strings, the compiler does it for you. It scans your code, finds the text, and uses AI to generate the dictionaries behind the scenes.
Then, it modifies your code during the build to inject the necessary i18n hooks. Basically, you keep writing your app as if it's single-language, and the compiler handles the multilingual transformation automatically.

> Doc Compiler: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md)

### Limitations

Because the compiler performs code analysis and transformation (inserting hooks and generating dictionaries) at **compile time**, it can **slow down the build process** of your application.

To mitigate this impact during development, you can configure the compiler to run in [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md) mode or disable it when not needed.

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
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  The core package that provides internationalisation tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).

- **next-intlayer**

  The package that integrates Intlayer with Next.js. It provides context providers and hooks for Next.js internationalisation. Additionally, it includes the Next.js plugin for integrating Intlayer with [Webpack](https://webpack.js.org/) or [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), as well as proxy for detecting the user's preferred locale, managing cookies, and handling URL redirection.

</Step>

<Step number={2} title="Configure Your Project">

Create a config file to configure the languages of your application:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    /**
     * Set to 'build-only' to skip the compiler during development and speed up start times.
     */
    enabled: true,

    /**
     * Output directory for the optimized dictionaries.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Inset only content in generated file, without key.
     */
    noMetadata: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "", // Remove base prefix
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This app is a map app",
  },
};

export default config;
```

> **Note**: Ensure you have your `OPEN_AI_API_KEY` set in your environment variables.

> Through this configuration file, you can set up localised URLs, proxy redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

</Step>

<Step number={3} title="Integrate Intlayer in Your Next.js Configuration">

Configure your Next.js setup to use Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* config options here */};

export default withIntlayer(nextConfig);
```

> The `withIntlayer()` Next.js plugin is used to integrate Intlayer with Next.js. It ensures the building of content declaration files and monitors them in development mode. It defines Intlayer environment variables within the [Webpack](https://webpack.js.org/) or [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) environments. Additionally, it provides aliases to optimise performance and ensures compatibility with server components.

</Step>

<Step number={4} title="Configure Babel">

The Intlayer compiler requires Babel to extract and optimise your content. Update your `babel.config.js` (or `babel.config.json`) to include the Intlayer plugins:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

</Step>

<Step number={5} title="Detect Locale in your pages">

Remove everything from `RootLayout` and replace it with the following code:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

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
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>

<Step number={6} title="Compile your components">

With the compiler enabled, you **no longer need** to manually declare content dictionaries (like `.content.ts` files).

Instead, you can write your content directly in your code as strings. Intlayer will analyze your code, generate the translations using the configured AI provider, and replace the strings with localised content at compile time.

Just write your components with hardcoded strings in your default locale. The compiler handles the rest.

Example of how your page might look:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Get started by editing</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      es: {
        getStartedByEditing: "Comience editando",
      },
    }
  }
}
```

<Tabs>
  <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerProvider`** is mounted once, in the root layout. It provides the locale to both server and client components, so pages no longer wrap themselves.
- Without a `[locale]` path segment the locale always comes from the request — the `x-intlayer-locale` header set by the Intlayer proxy, then the locale cookie — which the server hooks read on their own when the provider has not run.

</Tabs>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerClientProvider`** is used to provide the locale to client-side components.
- **`IntlayerServerProvider`** is used to provide the locale to the server children.

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

  </Tab>

</Tabs>

</Step>

<Step number={7} title="Fill missing translation" isOptional={true}>

Intlayer provide a CLI tool to help you fill missing translations. You can use the `intlayer` command to test and fill missing translations from your code.

```bash packageManager="npm"
npx intlayer test         # Test if there is missing translations
```

```bash packageManager="yarn"
yarn intlayer test         # Test if there is missing translations
```

```bash packageManager="pnpm"
pnpm intlayer test         # Test if there is missing translations
```

```bash packageManager="bun"
bun x intlayer test         # Test if there is missing translations
```

```bash packageManager="npm"
npx intlayer fill         # Fill missing translations
```

```bash packageManager="yarn"
yarn intlayer fill         # Fill missing translations
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Fill missing translations
```

```bash packageManager="bun"
bun x intlayer fill         # Fill missing translations
```

> For more details, refer to the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/ci.md)

</Step>

<Step number={8} title="Configure Proxy for Locale Detection" isOptional={true}>

Set up proxy to detect the user's preferred locale:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> The `intlayerProxy` is used to detect the user's preferred locale and redirect them to the appropriate URL as specified in the [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md). Additionally, it enables saving the user's preferred locale in a cookie.

> Since Intlayer v9, this middleware respects the `routing.enableProxy` option (`true` by default). Set `routing.enableProxy: false` in your configuration to turn it into a pass-through without removing this file. See the [v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/releases/v9.md).

</Step>

<Step number={8} title="Change the language of your content" isOptional={true}>

To change the language of your content in Next.js, the recommended way is to use the `Link` component to redirect users to the appropriate localised page. The `Link` component enables prefetching of the page, which helps avoid a full page reload.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Locale - e.g. EN */}
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
            <span dir="ltr" lang={Locales.ENGLISH_UNITED_KINGDOM}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH_UNITED_KINGDOM)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> An alternative way is to use the `setLocale` function provided by the `useLocale` hook. This function will not allow prefetching the page. See the [`useLocale` hook documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/next-intlayer/useLocale.md) for more details.

</Step>

<Step number={10} title="Optimise your bundle size" isOptional={true}>

When using `next-intlayer`, dictionaries are included in the bundle for every page by default. To optimise bundle size, Intlayer provides an optional SWC plugin that intelligently replace `useIntlayer` calls using macros. This ensures dictionaries are only included in bundles for pages that actually use them.

The `@intlayer/babel` plugin already integrates the bundling optimisation (see `babel.config.js`). But the `@intlayer/swc` plugin is more performant. If you remove the `@intlayer/babel` plugin, you can use the `@intlayer/swc` plugin.

To enable this optimisation, install the `@intlayer/swc` package. Once installed, `next-intlayer` will automatically detect and use the plugin:

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

> Note: This optimisation is only available for Next.js 13 and above.

> Note: This package is not installed by default because SWC plugins are still experimental on Next.js. It may change in the future.

> Note: If you set the option as `importMode: 'dynamic'` or `importMode: 'fetch'` (in the `dictionary` configuration), it will rely on Suspense, so you will have to wrap your `useIntlayer` calls in a `Suspense` boundary. That means, you will not be able to use the `useIntlayer` directly at the top level of your Page / Layout component.
> </Step>

</Step>

<Step number={11} title="Extract the content of your components" isOptional={true}>

If you have an existing codebase, transforming thousands of files can be time-consuming.

To ease this process, Intlayer proposes a [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md) to transform your components and extract the content.

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

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) or externalise your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md).

## Frequently Asked Questions

<FAQ>

<Question title="What are the different solutions available to internationalize a Next.js app?">

The `i18n` field of `next.config.js` does not apply to the App Router, so the localization layer is always a library choice:

- **`next-intl`**, **`next-i18next` / `i18next`** and **`react-intl`**: JSON or ICU catalogues loaded per namespace, with keys written by hand at every call site.
- **`Lingui`**: extraction driven, with ICU messages compiled at build time.
- **`Intlayer`**: content compiled out of your components at build time, fully typed, with AI translation, a visual editor and a CMS.

This guide uses the compiler setup, where you keep writing plain strings in your components and the dictionaries are generated for you. See [why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/interest_of_intlayer.md) and the [Next.js i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/nextjs.md).

</Question>

<Question title="How much does i18n add to my Next.js bundle size?">

Much less than a namespace based setup, because a page never downloads a catalogue it does not render. Server Components resolve their content on the server, and the build time compiler replaces `useIntlayer` calls with the exact dictionary entries a component uses, so unused keys and unused languages are dropped, and [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dynamic_dictionaries/index.md) split the rest per locale. Measured against the usual alternatives, Intlayer reduces bundle and page size by up to 50%. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/nextjs.md).

</Question>

<Question title="Can I migrate from `next-intl`, `next-i18next` or `i18next` without rewriting my components?">

Yes, and there are two paths. You can migrate the content progressively with the [next-intl migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_next-intl_to_intlayer.md) or the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_i18next_to_intlayer.md). Or you can keep your current API entirely: the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md) expose the exact same API as `next-intl`, `react-i18next` and `react-intl`, but served by Intlayer dictionaries, so imports change and component code does not.

</Question>

<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-po.md) does the same for gettext catalogues, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>

<Question title="Do I have to move my content key by key?">

No, and that is what this guide sets up. You write your components with plain strings in your default locale, and the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) scans the source on every build, extracts the user facing text and generates the dictionaries, so there are no keys to create or maintain by hand.

Two limits are worth knowing. The compiler works by static analysis, so strings that only exist at runtime, such as API error codes or CMS fields, stay out of reach and still need a declared dictionary. And it has to tell user facing text apart from application logic like `className="active"` or a status code, which needs a few annotations in a large codebase.

If you would rather keep control, `npx intlayer extract` does the same extraction once, on the files you choose, and writes a `.content` file next to each component for you to review. See the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md).

</Question>

<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md)**: jump from a `useIntlayer` key to the content file that declares it, extract content from a component, and run build, fill, test, push and pull from the command palette or a dedicated Intlayer tab.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, find all references, hover previews of a translated value, autocompletion of keys and fields, and a warning when a key is not declared anywhere. It also resolves `i18next`, `react-i18next`, `next-intl` and `use-intl` calls, which helps while you migrate.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT, so an assistant answers from current docs instead of guessing, and can run commands such as `intlayer fill` itself.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`, plus one per framework, that teach an agent your routing setup and the content node types.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/eslint.md)**: `no-raw-text` flags hardcoded strings, with further rules for static dictionary keys and unused content.

</Question>

<Question title="Should I use the compiler or declare my content myself?">

Use the compiler when you want i18n added to an existing codebase with the least churn: your components stay as they are and the dictionaries follow. Declare content yourself, as the [standard Next.js guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md) shows, when you want explicit control over keys, structure and reuse. The two can coexist in the same dictionary layer.

</Question>

<Question title="Why do I need to configure Babel?">

Step 4 covers it. The compiler reads your components through a Babel transform, so Next.js needs a `babel.config.js` for the extraction pass to run. `npx intlayer init --interactive` scaffolds it for you when you pick the compiler setup.

</Question>

<Question title="What happens to strings the compiler cannot see?">

They stay untranslated, because the compiler works by static analysis. Anything assembled at runtime, such as an API error message, a CMS field or a string built by concatenation, has to be declared in a content file the normal way. Run `npx intlayer test` to find what is missing.

</Question>

<Question title="How do I fill the missing translations?">

Step 7 covers it. `npx intlayer fill` sends the extracted content to the LLM of your choice, using your own provider and API key, and `--git-diff` limits the run to what changed on the branch. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/CI_CD.md).

</Question>

<Question title="How is the locale detected?">

Step 5 reads it in your pages and step 8 adds the proxy that resolves it from the URL, a cookie or the `Accept-Language` header. `routing.mode` decides whether the locale appears in the path at all. See the [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

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
