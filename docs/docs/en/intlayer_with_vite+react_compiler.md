---
createdAt: 2024-03-07
updatedAt: 2026-08-29
title: "Vite + React i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Vite + React app. Translate with AI agents and optimize bundle size, SEO and performances."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Vite
  - React
  - Compiler
  - AI
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
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

# How to make multilingual (i18n) an existing Vite and React application afterward (i18n guide 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="The best i18n solution for Vite and React? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See [Application Template](https://github.com/aymericzip/intlayer-vite-react-template) on GitHub.

## Table of Contents

<TOC/>

## Why is it hard to internationalize an existing application?

If you've ever tried to add multiple languages to an app that was built for just one, you know the pain. It's not just "hard", it's tedious. You have to comb through every single file, hunt down every string of text, and move them into separate dictionary files.

Then comes the risky part: replacing all that text with code hooks without breaking your layout or logic. It's the kind of work that halts new feature development for weeks and feels like endless refactoring.

## What is the Intlayer Compiler?

The **Intlayer Compiler** was built to skip that manual grunt work. Instead of you manually extracting strings, the compiler does it for you. It scans your code, finds the text, and uses AI to generate the dictionaries behind the scenes.
Then, it modifies your code during the build to inject the necessary i18n hooks. Basically, you keep writing your app as if it's single-language, and the compiler handles the multilingual transformation automatically.

> Doc Compiler: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md)

### Limitations

Because the compiler performs code analysis and transformation (inserting hooks and generating dictionaries) at **compile time**, it can **slow down the build process** of your application.

To mitigate this impact during development, you can configure the compiler to run in [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) mode or disable it when not needed.

---

## Step-by-Step Guide to Set Up Intlayer in a Vite and React Application

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  The core package that provides internationalization tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  The package that integrates Intlayer with React application. It provides context providers and hooks for React internationalization.

- **vite-intlayer**
  Includes the Vite plugin for integrating Intlayer with the [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), as well as middleware for detecting the user's preferred locale, managing cookies, and handling URL redirection.

</Step>

<Step number={2} title="Configure Your Project">

Create a config file to configure the languages of your application:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
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

    /**
     * Indicates if the components should be saved after being transformed.
     *
     * - If `true`, the compiler will rewrite the component file in the disk. So the transformation will be permanent, and the compiler will skip the transformation for the next process. That way, the compiler can transform the app, and then it can be removed.
     *
     * - If `false`, the compiler will inject the `useIntlayer()` function call into the code in the build output only, and keep the base codebase intact. The transformation will be done only in memory.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This app is an map app", // Note: you can customize this app description
  },
};

export default config;
```

> **Note**: Ensure you have your `OPEN_AI_API_KEY` set in your environment variables.

> Through this configuration file, you can set up localized URLs, middleware redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Integrate Intlayer in Your Vite Configuration">

Add the intlayer plugin into your configuration.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> The `intlayer()` Vite plugin is used to integrate Intlayer with Vite. It ensures the building of content declaration files and monitors them in development mode. It defines Intlayer environment variables within the Vite application. Additionally, it provides aliases to optimize performance.

> The `intlayerCompiler()` Vite plugin is used to extract content from component and write `.content` files.

> Since Intlayer v9, the compiler is bundled directly into the `intlayer()` plugin and activates automatically once `compiler.enabled` is set with a `compiler.output` path. Registering `intlayerCompiler()` separately as shown below is now optional — it deduplicates itself if also added. See the [v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/releases/v9.md).

</Step>

<Step number={4} title="Compile your code">

Just write your components with hardcoded strings in your default locale. The compiler handles the rest.

Example of how your page might look:

<Tabs>
 <Tab value="Code">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Output">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      fr: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "compte est",
        editMessage: "Modifier",
        hmrMessage: "et enregistrer pour tester HMR",
        readTheDocs: "Cliquez sur les logos Vite et React pour en savoir plus",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** is used to provide the locale to nested components.

</Step>

<Step number={6} title="Change the language of your content" isOptional={true}>

To change the language of your content, you can use the `setLocale` function provided by the `useLocale` hook. This function allows you to set the locale of the application and update the content accordingly.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> To Learn more about the `useLocale` hook, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md).

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

> For more details, refer to the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/ci.md)
> </Step>

</Steps>

### (Optional) Sitemap and robots.txt (build-time)

Intlayer includes formatters such as `generateSitemap` and `getMultilingualUrls` that produce crawler-ready multilingual `sitemap.xml` and `robots.txt` output you can write into your project’s `public/` folder. In practice you run a small Node script **before** Vite (for example `predev` / `prebuild` npm hooks) so those files exist when you build or serve the app.

#### Sitemap

Intlayer’s sitemap generator respects your locale setup and includes the usual metadata for crawlers.

> The generated sitemap supports the `xhtml:link` namespace (hreflang XML extensions). Unlike basic generators that only emit flat URLs, Intlayer wires bidirectional links between every localized variant of each page (for example `/about`, `/fr/about`, or `/about?lang=fr`, depending on your routing mode), which helps search engines relate localized URLs.

#### Robots.txt

Use `getMultilingualUrls` so `Disallow` entries cover every localized spelling of sensitive paths.

#### 1. Add `generate-seo.mjs` at the project root

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

`intlayer` must be installed so the script can import it. Set `SITE_URL` in the environment for production (for example in CI).

> Prefer `generate-seo.mjs` for Node ESM. If you use `generate-seo.js` instead, ensure `"type": "module"` is set in `package.json`, or run Node with ESM enabled.

#### 2. Run the script before Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Adjust if you use pnpm or yarn. You can also invoke the same script from CI or another step if that fits your workflow.

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

<Question title="What are the different solutions available to internationalize a Vite and React app?">

- **`react-i18next` / `i18next`**: JSON namespaces loaded at runtime, with keys written by hand at every call site.
- **`react-intl`** and **`Lingui`**: ICU messages with an extraction step you run yourself.
- **`Intlayer`**: content compiled out of your components at build time, fully typed, with AI translation, a visual editor and a CMS.

This guide uses the compiler setup, where you keep writing plain strings in your components and the dictionaries are generated for you. See [why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md).

</Question>

<Question title="How much does i18n add to my Vite bundle size?">

Much less than a namespace based setup, because a page never downloads a catalog it does not render. The build time compiler replaces `useIntlayer` calls with the exact dictionary entries a component uses, so unused keys and unused languages are dropped, and [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md) split the rest per locale. Measured against the usual alternatives, Intlayer reduces bundle and page size by up to 50%. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md).

</Question>

<Question title="Can I migrate from `react-i18next` or `react-intl` without rewriting my components?">

Yes, and there are two paths. You can migrate the content progressively with the [react-i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_react-i18next_to_intlayer.md) or the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md). Or you can keep your current API entirely: the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md) expose the exact same API as `react-i18next`, `react-intl` and `i18next`, but served by Intlayer dictionaries, so imports change and component code does not.

</Question>

<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md) does the same for gettext catalogs, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>

<Question title="Do I have to move my content key by key?">

No, and that is what this guide sets up. You write your components with plain strings in your default locale, and the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) scans the source on every build, extracts the user facing text and generates the dictionaries, so there are no keys to create or maintain by hand.

Two limits are worth knowing. The compiler works by static analysis, so strings that only exist at runtime, such as API error codes or CMS fields, stay out of reach and still need a declared dictionary. And it has to tell user facing text apart from application logic like `className="active"` or a status code, which needs a few annotations in a large codebase.

If you would rather keep control, `npx intlayer extract` does the same extraction once, on the files you choose, and writes a `.content` file next to each component for you to review. See the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md).

</Question>

<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)**: jump from a `useIntlayer` key to the content file that declares it, extract content from a component, and run build, fill, test, push and pull from the command palette or a dedicated Intlayer tab.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, find all references, hover previews of a translated value, autocompletion of keys and fields, and a warning when a key is not declared anywhere. It also resolves `i18next`, `react-i18next`, `next-intl` and `use-intl` calls, which helps while you migrate.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT, so an assistant answers from current docs instead of guessing, and can run commands such as `intlayer fill` itself.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`, plus one per framework, that teach an agent your routing setup and the content node types.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md)**: `no-raw-text` flags hardcoded strings, with further rules for static dictionary keys and unused content.

</Question>

<Question title="Should I use the compiler or declare my content myself?">

Use the compiler when you want i18n added to an existing codebase with the least churn: you keep your components as they are and the dictionaries follow. Declare content yourself, as the [standard Vite and React guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md) shows, when you want explicit control over keys, structure and reuse across components. The two can coexist: compiled content and declared content live in the same dictionary layer.

</Question>

<Question title="What happens to strings the compiler cannot see?">

They stay untranslated, because the compiler works by static analysis. Anything assembled at runtime, such as an API error message, a CMS field or a string built by concatenation, has to be declared in a content file the normal way. Run `npx intlayer test` to find what is missing.

</Question>

<Question title="How does the compiler decide what is user facing text?">

By heuristics over your JSX, which is why it can be wrong in both directions: a `className` value or a status code can look like copy, and an unusual pattern can be missed. In a large codebase you correct the edge cases with annotations. If that trade off does not suit you, `npx intlayer extract` performs the same extraction once and leaves the result as a diff to review. See the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md).

</Question>

<Question title="How do I fill the missing translations?">

Step 7 covers it. `npx intlayer fill` sends the extracted content to the LLM of your choice, using your own provider and API key, and `--git-diff` limits the run to what changed on the branch. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md).

</Question>

<Question title="How do I change the language at runtime?">

Step 6 covers it. `useLocale` exposes the active locale, the declared locales and a setter that persists the choice, and the components reading compiled content re-render in the new language without a page reload.

</Question>

<Question title="Does Intlayer support plurals, gender and rich text?">

Yes: [plural forms](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/plurial.md), [gender based content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/gender.md), conditions, [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md) and [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md) for numbers, dates and currencies.

</Question>

<Question title="How can translators edit the content without touching the code?">

Through the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md), which runs on your own infrastructure and lets anyone edit text in place on the running app, or the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), which externalizes content so it can change without a deployment.

</Question>

<Question title="Is Intlayer free and open source?">

Yes, under the Apache 2.0 license, commercial use included. The hosted CMS is an optional paid service that can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md).

</Question>

</FAQ>
