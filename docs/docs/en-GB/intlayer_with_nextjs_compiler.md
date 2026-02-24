---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Transform an existing Next.js app into a Multilingual app (i18n guide 2026)
description: Discover how to make your existing Next.js application multilingual using the Intlayer Compiler. Follow the documentation to internationalise (i18n) and translate your application using AI.
keywords:
  - Internationalisation
  - Translation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Compiler
  - AI
slugs:
  - doc
  - configuration
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Initial Release
---

# How to make an existing Next.js application multilingual (i18n) (i18n guide 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Best i18n solution for Next.js? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="CodeSandbox Demo - How to internationalise your application with Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Check the [Application Template](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) on GitHub.

## Table of Contents

<TOC/>

## Why is internationalising an existing application hard?

If you've ever tried to add multiple languages to an application that was only built for one, you know the struggle. It's not just "hard"—it's tedious. You have to go through every file, find every text string, and move them into separate dictionary files.

Then comes the risky part: replacing all that text with code hooks without breaking your layout or logic. It's the kind of work that pauses new feature development for weeks and feels like an endless refactoring.

## What is the Intlayer Compiler?

The **Intlayer Compiler** is built to bypass that manual work. Instead of forcing you to extract strings manually, the compiler does it for you. It scans your code, finds the text, and uses AI to generate dictionaries in the background.
It then modifies your source code during the build step to inject the necessary i18n hooks. Essentially, you keep writing your application as if it's in a single language, and the compiler handles the multilingual transformation natively.

> Compiler Documentation: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md

### Limitations

Because the compiler does code analysis and transformation (injecting hooks and generating dictionaries) during **compile time**, it can **slow down the build time** of your application.

To limit this impact during active development (dev mode), you can set the compiler to `'build-only'` mode or disable it when not needed.

---

## Step-by-step guide to set up Intlayer in a Next.js application

### Step 1: Install Dependencies

Install the necessary packages using your preferred package manager:

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

  The core package providing internationalisation tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).

- **next-intlayer**

  The package that integrates Intlayer with Next.js. It provides context providers and hooks for Next.js internationalisation. Additionally, it includes the Next.js plugin for integrating Intlayer with [Webpack](https://webpack.js.org/) or [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), as well as middleware to detect the user's preferred locale, manage cookies, and handle URL redirection.

### Step 2: Configure your project

Create a configuration file to define the languages of your application:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalisation: {
    locales: [Locales.ENGLISH_UNITED_KINGDOM, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH_UNITED_KINGDOM,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Can be set to 'build-only' to limit the impact in dev mode
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // No compilation prefix
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This is a simple map application example",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalisation: {
    locales: [Locales.ENGLISH_UNITED_KINGDOM, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH_UNITED_KINGDOM,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Can be set to 'build-only' to limit the impact in dev mode
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // No compilation prefix
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This is a simple map application example",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalisation: {
    locales: [Locales.ENGLISH_UNITED_KINGDOM, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH_UNITED_KINGDOM,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Can be set to 'build-only' to limit the impact in dev mode
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // No compilation prefix
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This is a simple map application example",
  },
};

module.exports = config;
```

> **Note**: Ensure you have set the `OPEN_AI_API_KEY` in your environment variables.

> Through this configuration file, you can set up localised URLs, proxy redirection, cookie mapping, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, check the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

### Step 3: Integrate Intlayer into your Next.js configuration

Configure your Next.js setup to use Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Optional additional Next.js config here */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Optional additional Next.js config here */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Optional additional Next.js config here */
};

module.exports = withIntlayer(nextConfig);
```

> The `withIntlayer()` Next.js plugin is used to integrate Intlayer with Next.js. It ensures the building of dictionary files and watches them in dev mode. It defines the Intlayer environment variables within the [Webpack](https://webpack.js.org/) or [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) environments. What's more, it provides aliases to optimise performance and works thoroughly with Server Components.

### Configure Babel

The Intlayer compiler requires Babel to extract and optimise your content. Update your `babel.config.js` (or `babel.config.json`) to include the Intlayer plugins:

```js fileName="babel.config.js" codeFormat="commonjs"
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

### Step 4: Dynamic Locale Routing

Clear the content of your `RootLayout` and replace it with the example below:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
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

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
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

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### Step 5: Declare your content (Auto)

With the Compiler enabled, you **no longer need** to declare your content dictionaries manually (e.g. `.content.ts` files).

Instead, you just write your content as hardcoded strings in your code. Intlayer will scan the source code, generate translations using the configured AI provider, and silently replace those strings with localised content during the build compile step. All of this is totally automated.

### Step 6: Use your content in your code

Just use hard-coded strings in your default locale inside your component and let the Intlayer Compiler do the rest.

Example of what your `page.tsx` will look like:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Get started by editing this!</p>
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
        getStartedByEditingThis: "Get started by editing this!",
      },
      fr: {
        getStartedByEditingThis: "Commencez par éditer ceci !",
      },
      es: {
        getStartedByEditingThis: "¡Empieza editando esto!",
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
      <p>{content.getStartedByEditingThis}</p>
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

- Note that **`IntlayerClientProvider`** is used to provide the locale to the children on Client side.
- Whereas **`IntlayerServerProvider`** is used to provide the locale to the children on Server side.

### (Optional) Step 7: Fill missing translation

Intlayer provide a CLI tool to help you fill missing translations. You can use the `intlayer` command to test and fill missing translations from your code.

```bash
npx intlayer test         # Test is there is missing translations
```

```bash
npx intlayer fill         # Fill missing translations
```

### (Optional) Step 8: Localised Routing Proxy Middleware

If you wish to automatically redirect the user to their preferred locale, establish a proxy middleware:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> `intlayerProxy` is used to detect the user's preferred locale and redirect the client to the appropriate URL based on the [Configuration File settings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md). It also saves the locale in a cookie for future access.

### (Optional) Step 9: Language Switcher

For the best user experience and a seamless Next.js navigation flow (meaning no hard refresh of the page), craft a language switcher component by calling the Link component and redirecting your users to their targeted route language.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
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
              {/* Short Language notation - eg: EN */}
              {localeItem}
            </span>
            <span>
              {/* Language mapped by current Locale - e.g. depending on current user: Francés / French */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language Name mapped by Native Locale - eg: Français */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH_UNITED_KINGDOM}>
              {/* Language Name mapped by English - eg: French */}
              {getLocaleName(localeItem, Locales.ENGLISH_UNITED_KINGDOM)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
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
              {/* Short Language notation - eg: EN */}
              {localeItem}
            </span>
            <span>
              {/* Language mapped by current Locale - e.g. depending on current user: Francés / French */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language Name mapped by Native Locale - eg: Français */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH_UNITED_KINGDOM}>
              {/* Language Name mapped by English - eg: French */}
              {getLocaleName(localeItem, Locales.ENGLISH_UNITED_KINGDOM)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
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
              {/* Short Language notation - eg: EN */}
              {localeItem}
            </span>
            <span>
              {/* Language mapped by current Locale - e.g. depending on current user: Francés / French */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language Name mapped by Native Locale - eg: Français */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH_UNITED_KINGDOM}>
              {/* Language Name mapped by English - eg: French */}
              {getLocaleName(localeItem, Locales.ENGLISH_UNITED_KINGDOM)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> The `setLocale` function provided by the `useLocale` hook can also be used as an alternative. Explore further routing integrations via the [useLocale hook reference manual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/next-intlayer/useLocale.md).

### (Optional) Step 10: Use Server Actions retrieving Locale State

In instances where a Next backend Server node evaluates the proper language to execute functions (for sending an email dynamically or requesting an API correctly mapped to the locale), the `getLocale` function from `@next-intlayer/server` is the solution.

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Perform any logic handling specific to the acquired locale state...
};
```

> The resolution of `getLocale()` retrieves the right locale from the server ecosystem following this exact hierarchy:
>
> 1. Next.js Default Request Headers (Parameter query mapped by existing Proxy Middleware).
> 2. Fallback to existing persistent user Cookie state recorded prior.
> 3. Evaluation of Device System/Navigator language values via Request object.
> 4. Default baseline defined as Fallback-Locale parameter in the `intlayer.config.ts` setup.

### (Optional) Step 11: Optimise your final Client bundle sizes. (Through the SWC Next js plugin)

Ordinarily, without external module manipulation, `next-intlayer` dispatches all translated dictionaries into client-side JS bundles. If your dictionaries are huge, this affects bandwidth and performance. Enter the SWC next compiler plugin extension (like `@intlayer/swc`). It extracts only the required targeted strings to compile into the React elements directly inside the Server Component scope out of your dictionary data, cutting away the rest of the object. Time for an extreme payload diet!

Begin by appending the plugin mapping via dev packages:

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

> Note Reminder: The "SWC experimental feature Next.js environment" plugin is technically in Experimental Vercel Extension stages. Thus, it behaves optimally primarily against Next.js base architectures version `> 13.0.x++` where Turbopack exists.

> Extremely Important Warning: Where you employ a dynamic Server component mapping strategy requiring async fetch implementations like: using the `<Suspense>` hook wrapping your components, you MUST implement React Suspense wraps correctly on components manipulating the async parameter: `importMode: "dynamic"` through `useIntlayer`. Ignoring proper React Suspense bounds triggers a severe NextJs error on the Server side build evaluation rendering processes.

### Co-habiting the Intlayer Live "Watch mode" generation process alongside the "Turbopack" compiler

As it stands, Next's newly deployed "Turbopack dev mode generator" presents occasional compatibility mismatches when bridging asynchronous background Webpack processing plugins natively (such as a translation content JSON dynamic generation). Therefore, Intlayer background auto-dictionary rebuild might intermittently fail to reflect real-time code dictionary changes while compiling concurrently from `next dev --turbopack`.

Solving the Live Watch update concurrency is simple: start multiple watchers simultaneously from the command line execution node script:

Open your root `package.json` configurations:

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'", // Launches both CLI concurrent watchers in a single instance
  },
}
```

> Backward Compatibility: if your main application resolves on a `next-intlayer` branch prior to version `@6.X.X`, you MUST append the keyword `--turbopack` as such within the run parameters: `"intlayer watch --with 'next dev --turbopack'"`. Subsequent framework updates past version `>= 7.X.X` automate parameter passing securely by default.

### Editor Autocomplete Integration & TypeScript Types Configurations

At the heart of the Intlayer Compiler engine lies an implicit procedure that outputs mapped Typescript models matching generated dictionary translations transparently in the background folders.

Enabling your VS Code or text editor with these types grants you the immense power of "IntelliSense Code Hinting/Autocomplete" and "Linter Key Missing Validation". No more missing language string bugs!

![Live Autocomplete Widget Types Reference](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Live Red Missing Linter Path Value Hint](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Update your main project `tsconfig.json` mappings to include the compiler auto-generation node path directory:

```json5 fileName="tsconfig.json"
{
  "include": [
    // Pre-existing Next or other framework TS mappings paths here...
    ".intlayer/**/*.ts", // Incorporate path tracking directly back to Intlayer generated types
  ],
}
```

### Git Repository Safeguards

Since the Intlayer generator essentially caches, generates, and constructs dynamic files mapped to dictionaries inside a temporary `.intlayer` node folder during build phases, tracking these files via Source-control versions (Git/CI) generates useless conflicts, bloated Pull Requests, and CI workflow headaches.

Evict this node permanently from your Git history via `.gitignore`:

```plaintext fileName=".gitignore"
# Explicitly ignore background Intlayer generated cache data output!
.intlayer
```

### Extensibility Focus: MS Visual Studio Code Editor Intlayer Add-on

Productivity rules supreme when editing code. Stop checking external documents! Benefit natively from Microsoft Visual Studio Code IDE through our officially mapped tools: the `Intlayer VS Code Extension`.

Get it free below:
[Visual Studio Tools Web Extension Marketplace Portal Application Store Link](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Your Developer toolsets gain the following:

- **String Text Tooltip Translation Dialog Hook Viewer**: Hover your mouse index exclusively on any mapped `UseIntlayer` dictionary Key in code! The IDE launches an instant visual snippet displaying translated versions right there. Don't waste time checking native language file counterparts!
- **Error Live Linter Tracking Validation**: The extension parses and watches translation states actively. Missed mapping values flag as red-error alerts across the entire file dynamically.
- **Fast-action Code String-extraction Keyboard Shortcut Macros**: Select your target "hardcoded Component line string" > execute the Hotkey shortcut extraction code combo > Watch Intlayer automate string excision, copy it to JSON root content dictionaries, and flawlessly refactor/incorporate the React Hook replacement without you typing one word! To master this power, explore the [Developer's Guide for VS Code Editor settings configurations tools Site](https://intlayer.org/doc/vs-code-extension).

### Moving Beyond? CMS Integrations & Visual Interfaces.

Have you achieved the first milestone of installing Next JS component translations internally under a developer ecosystem? What if you wish to expose these translated states for easy accessibility to Copywriters/Marketing divisions? Experience manipulating these configurations externally on a Dashboard Web GUI Application without any Local Development Setup issues through our Web Platform UI [Web Visual Editor React Application Interface Settings and Instructions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md).

For deployments moving remote into API Headless CMS backend database architectures away from codebases, leverage this structure by setting up dedicated cloud Intlayer resources remotely. Follow the [Intlayer CMS Remote Headless Setup Blueprint Config documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md).
