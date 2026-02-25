---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Transform an existing Next.js app into a multilingual app (i18n guide 2026)
description: Discover how to make your existing Next.js application multilingual using Intlayer Compiler. Follow the documentation to internationalise (i18n) and translate it with AI.
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
  - version: 8.1.6
    date: 2026-02-23
    changes: Initial release
---

# How to make multilingual (i18n) an existing Next.js application afterward (i18n guide 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="The best i18n solution for Next.js? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
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

If you've ever tried to add multiple languages to an app that was built for just one, you know the pain. It's not just "hard"—it's tedious. You have to comb through every single file, hunt down every string of text, and move them into separate dictionary files.

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

### Step 1: Install Dependencies

Install the necessary packages using npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  The core package that provides internationalisation tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).

- **next-intlayer**

  The package that integrates Intlayer with Next.js. It provides context providers and hooks for Next.js internationalisation. Additionally, it includes the Next.js plugin for integrating Intlayer with [Webpack](https://webpack.js.org/) or [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), as well as proxy for detecting the user's preferred locale, managing cookies, and handling URL redirection.

### Step 2: Configure Your Project

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
    enabled: true, // Can be set to 'build-only' to limit impact on dev mode
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // No prefix, default is "comp-"
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

### Step 3: Integrate Intlayer in Your Next.js Configuration

Configure your Next.js setup to use Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withIntlayer(nextConfig);
```

> The `withIntlayer()` Next.js plugin is used to integrate Intlayer with Next.js. It ensures the building of content declaration files and monitors them in development mode. It defines Intlayer environment variables within the [Webpack](https://webpack.js.org/) or [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) environments. Additionally, it provides aliases to optimise performance and ensures compatibility with server components.

### Step 4: Configure Babel

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

### Step 5: Detect Locale in your pages

Remove everything from `RootLayout` and replace it with the following code:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
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
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

### Step 6: Compile your components

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

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** is used to provide the locale to client-side components.
- **`IntlayerServerProvider`** is used to provide the locale to the server children.

### (Optional) Step 7: Fill missing translation

Intlayer provide a CLI tool to help you fill missing translations. You can use the `intlayer` command to test and fill missing translations from your code.

```bash
npx intlayer test         # Test if there is missing translations
```

```bash
npx intlayer fill         # Fill missing translations
```

> For more details, refer to the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/ci.md)

### (Optional) Step 8: Configure Proxy for Locale Detection

Set up proxy to detect the user's preferred locale:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> The `intlayerProxy` is used to detect the user's preferred locale and redirect them to the appropriate URL as specified in the [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md). Additionally, it enables saving the user's preferred locale in a cookie.

### (Optional) Step 8: Change the language of your content

To change the language of your content in Next.js, the recommended way is to use the `Link` component to redirect users to the appropriate localised page. The `Link` component enables prefetching of the page, which helps avoid a full page reload.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

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

### (Optional) Step 10: Optimise your bundle size

When using `next-intlayer`, dictionaries are included in the bundle for every page by default. To optimise bundle size, Intlayer provides an optional SWC plugin that intelligently replace `useIntlayer` calls using macros. This ensures dictionaries are only included in bundles for pages that actually use them.

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
