---
createdAt: 2024-03-07
updatedAt: 2026-09-06
title: How to Make Multilingual (i18n) an Existing Vite and React Application Afterward (i18n Guide 2026)
description: The 2026 guide to making an existing Vite and React app multilingual (i18n) without tedious refactoring. Discover zero-effort content extraction, AI translation, and high-performance bundling with Intlayer.
keywords:
  - Vite i18n
  - React i18n
  - Internationalization
  - Translate existing Vite app
  - Translate existing React app
  - Intlayer
  - Multilingual
  - Compiler
  - AI translation
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
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

Adding internationalization (i18n) to a Vite and React project from day one is relatively straightforward. But what happens when you already have a mature, production-ready single-language application and need to make it multilingual **afterward**?

If you have ever attempted this with traditional libraries like `react-i18next` or `react-intl`, you know the friction:

- Hunting down hardcoded strings across hundreds of JSX and TSX files.
- Manually creating nested JSON files and inventing arbitrarily named translation keys (`components.header.title`, etc.).
- Replacing JSX text with cumbersome translation hook calls (`t('...')`).
- Re-architecting client-side routing, state management, and locale switching logic.

In 2026, you do not have to rewrite your codebase to make your Vite and React application multilingual. With **Intlayer**, you can retrofit internationalization onto an existing app in minutes, using automated extraction, AI-powered translation, and non-invasive routing.

> Looking for the complete, step-by-step technical guide for Vite and React? Check out our dedicated documentation: [Translate Vite and React with Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md).

## Table of Contents

<TOC/>

## The Retrofit Dilemma: Why Making an Existing Vite and React App Multilingual Is Hard

When internationalizing an existing Vite and React application, developers face three major obstacles:

1. **Codebase Disruption**: Manually extracting strings into JSON dictionaries requires modifying almost every component file. This produces huge git diffs, creates merge conflict risks, and introduces potential layout regressions.
2. **Key Maintenance Overhead**: Inventing keys like `dashboard.hero.ctaButton` for every text snippet slows development down and introduces cognitive load every time UI copy changes.
3. **Translation Grunt Work**: Once strings are extracted, populating dictionaries in 5, 10, or 20 languages involves endless copy-pasting or expensive external translation services.

Intlayer solves these challenges at the architectural level with **compiler-assisted extraction**, **declarative component-level dictionaries**, and **seamless Vite integration**.

## Automated Content Extraction (No Manual String Hunting)

Instead of manually extracting every hardcoded string from your JSX, Intlayer provides two zero-friction paths:

### Option A: The CLI Extractor (`npx intlayer extract`)

You can run Intlayer's extraction tool directly on your codebase:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

This command parses your React components, extracts user-facing strings, and automatically creates per-component content declaration files (`.content.ts`) right alongside your components. Your component logic remains declarative, clear, and fully type-safe without having to write a single translation key by hand.

### Option B: The Intlayer Compiler (Build-Time Extraction)

With the Intlayer Compiler enabled in your configuration, you can continue writing your components with plain, hardcoded text in your default language. At build time, the compiler extracts the text and injects the localized content automatically:

```tsx fileName="src/App.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function App() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

Behind the scenes, Intlayer builds the dictionary and links the component to its localized content, completely eliminating manual refactoring.

In this case, it generates a `src/App.content.ts` declaration file with the following structure:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## AI-Powered Translation with Your Favorite LLM

Once your content is extracted, translating it into dozens of languages should not take days. Intlayer includes a built-in AI translation CLI that integrates directly with OpenAI, Anthropic, DeepSeek, or Mistral using your own API keys:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

Configure your locales and AI provider in `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Modern SaaS application and dashboard built with Vite and React",
  },
};

export default config;
```

Running `npx intlayer fill` populates your content declarations with high-quality translations for your configured locales:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      de: "Willkommen auf unserer Plattform",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      de: "Entdecken Sie noch heute unsere modernen Funktionen.",
    }),
  },
};

export default content;
```

Because Intlayer provides high-level `applicationContext` to the LLM, generated translations preserve technical nuance, brand tone, and grammatical context far better than traditional generic translation tools.

To verify that no strings were missed before deploying to production:

```bash
npx intlayer test
```

## Vite Integration and Provider Setup

Integrating Intlayer into Vite requires adding the plugin to `vite.config.ts` and wrapping your root component with `IntlayerProvider`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Since Intlayer v9, the compiler is bundled directly into the `intlayer()` plugin and activates automatically once `compiler.enabled` is configured in `intlayer.config.ts`.

Wrap your application with `IntlayerProvider` in your root component:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### Changing Locales Dynamically

Switch languages easily anywhere in your application using the `useLocale` hook:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Multilingual SEO (Sitemap and Robots.txt)

Intlayer includes formatters such as `generateSitemap` and `getMultilingualUrls` that produce crawler-ready multilingual `sitemap.xml` and `robots.txt` output for static Vite deployments:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("SEO files generated successfully.");
```

Add a `prebuild` hook to your `package.json` to run this script before `vite build`:

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

## Deep-Dive: Ready for the Step-by-Step Implementation?

This guide provided a high-level overview of how to retrofit internationalization into an existing Vite and React app in 2026 without architectural headaches.

If you are ready to configure every part of your Vite and React application step-by-step, including detailed configuration options, TypeScript type safety, dynamic dictionaries, and visual editing, head over to our comprehensive documentation guide:

👉 **[Complete Guide to Translating Vite and React with Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)**

## Frequently Asked Questions (FAQ)

<FAQ>

<Question title="Can I make my Vite and React app multilingual without manually refactoring all strings?">

Yes. You can use `npx intlayer extract` to automatically detect and extract hardcoded strings into localized content declarations, or use the Intlayer Compiler to transform components at build time so you can keep writing standard JSX.

</Question>
<Question title="How does Intlayer reduce Vite bundle size compared to react-i18next or react-intl?">

Intlayer uses per-component dictionary definitions and build-time macro optimization. Bundles only receive the exact fields needed by the components rendered on the page, rather than importing entire namespace JSON files. Dynamic dictionaries can also lazy-load languages on demand.

</Question>
<Question title="Can I use AI to translate my existing components into multiple languages?">

Yes. Intlayer's CLI includes the `npx intlayer fill` command, which connects to your preferred AI provider (OpenAI, Anthropic, Mistral, DeepSeek) to generate contextual translations for missing locales across your entire project.

</Question>
<Question title="Can I migrate from react-i18next or react-intl without rewriting my components?">

Yes. Intlayer provides compatibility adapters for `react-i18next` and `react-intl`, as well as plugins to synchronize existing JSON translation files (`sync-json`).

</Question>

</FAQ>
