---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "How to Make Multilingual (i18n) an Existing Next.js Application Afterward (i18n Guide 2026)"
description: "The 2026 guide to making an existing Next.js app multilingual (i18n) without tedious refactoring. Discover zero-effort content extraction, AI translation, and high-performance routing with Intlayer."
keywords:
  - Next.js i18n
  - Internationalisation
  - Translate existing Next.js app
  - Next.js 16
  - Intlayer
  - Multilingual
  - React i18n
  - Compiler
  - AI translation
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
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

Adding internationalisation (i18n) to a Next.js project from day one is relatively straightforward. But what happens when you already have a mature, production-ready Next.js application built in a single language, and you need to make it multilingual **afterward**?

If you have ever attempted this with traditional libraries like `next-intl` or `next-i18next`, you know the nightmare:

- Hunting down hardcoded strings across hundreds of JSX/TSX files.
- Manually creating nested JSON files and inventing arbitrarily named translation keys (`pages.dashboard.header.title`, etc.).
- Replacing JSX text with cumbersome translation hook calls (`t('...')`).
- Re-architecting your entire `app/` folder into `app/[locale]/...`, breaking existing routes, bookmarks, and search indexing.

In 2026, you don't have to rewrite your codebase to make your Next.js application multilingual. With **Intlayer**, you can retrofit internationalisation onto an existing Next.js app in minutes, using automated extraction, AI-powered translation, and non-invasive routing.

> Looking for the complete, step-by-step technical guide for Next.js 16 App Router? Check out our dedicated documentation: [Translate Next.js 16 with Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md).

## Table of Contents

<TOC/>

## The Retrofit Dilemma: Why Making an Existing Next.js App Multilingual Is Hard

When internationalising an existing Next.js application, developers face three major obstacles:

1. **Codebase Disruption**: Manually extracting strings into JSON dictionaries requires touching almost every component file. This creates massive git diffs, high merge conflict risk, and potential regression bugs.
2. **Routing Lock-in**: Traditional i18n libraries usually force you to relocate your root layout and pages into a dynamic `[locale]` segment (e.g., `/app/[locale]/page.tsx`). For an established application, this can disrupt existing middleware, relative paths, and third-party integrations.
3. **Translation Grunt Work**: Once strings are extracted, populating dictionaries in 5, 10, or 20 languages involves endless copy-pasting or expensive localisation management services.

Intlayer solves these problems at the architectural level with **compiler-assisted extraction**, **declarative dictionaries**, and **flexible routing**.

## Automated Content Extraction (No Manual String Hunting)

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

This command parses your React components, extracts user-facing strings, and automatically creates per-component content declaration files (`.content.ts`) right alongside your components. Your component logic remains declarative, clear, and fully type-safe without you having to manually write a single translation key.

### Option B: The Intlayer Compiler (Build-Time Extraction)

With the Intlayer Compiler enabled in your configuration, you can simply keep writing your components with plain, hardcoded text in your default language. At build time, the compiler extracts the text and injects the localised content automatically:

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

Behind the scenes, Intlayer builds the dictionary and links the component to its localised content, completely eliminating the manual refactoring step.

In this case it will generate a `src/app/page.content.ts` file with the following content:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## AI-Powered Translation with Your Favourite LLM

Once your content is extracted, translating it into dozens of languages shouldn't take days. Intlayer includes a built-in AI translation CLI that integrates directly with OpenAI, Anthropic, DeepSeek, or Mistral using your own API keys:

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
      "SaaS dashboard for productivity and team collaboration",
  },
};

export default config;
```

Running `npx intlayer fill` populates your `.content.ts` declarations with translations for your configured locales:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
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

Because Intlayer provides high-level `applicationContext` to the LLM, generated translations preserve technical nuance, brand voice, and grammatical context far better than traditional automated tools.

To verify that no strings were missed before shipping to production:

```bash
npx intlayer test
```

## Add Multilingual Routing Without Breaking Existing URLs

One of the biggest fears when translating an existing app is rewriting routing. Intlayer provides multiple routing strategies out of the box:

- **Search Params / Cookie Mode (`search-params`)**: Keep your exact folder structure (`/app/page.tsx`, `/app/dashboard/page.tsx`) without moving anything to `[locale]`. The language is switched via query parameter (e.g., `?locale=fr`) or saved in cookies.
- **Prefix / Path-based Mode (`prefix` / `prefix-all-locales`)**: If and when you are ready for SEO-friendly URLs (`/fr/dashboard`, `/es/dashboard`), Intlayer supports path routing with a simple Next.js proxy.

Configure your Next.js integration in seconds:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

Wrap your root layout with `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## Multilingual SEO

Make your pages discoverable globally by generating localised metadata, OpenGraph tags, and canonical `hreflang` headers:

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## Deep-Dive: Ready for the Step-by-Step Implementation?

This guide provided a high-level overview of how to retrofit internationalisation into an existing Next.js app in 2026 without architectural headaches. If you are ready to configure every part of your Next.js application step-by-step, including detailed middleware setups, static site generation (`generateStaticParams`), localised sitemaps, and advanced Server Component patterns, head over to our comprehensive documentation guide:

👉 **[Complete Guide to Translating Next.js 16 with Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md)**

## Frequently Asked Questions (FAQ)

<FAQ>

<Question title="Can I make my Next.js app multilingual without moving files into app/[locale]?">

Yes. Intlayer supports `routing.mode: "search-params"` as well as cookie- and header-based locale detection. You can keep your existing `app/` folder structure intact, making it ideal for retrofitting existing applications without breaking existing URLs or folder hierarchies.

</Question>
<Question title="Do I have to manually replace all hardcoded strings in my existing codebase?">

No. You can use `npx intlayer extract` to automatically detect and extract hardcoded strings into localised content declarations, or use the Intlayer Compiler to transform components at build time so you can keep writing standard JSX.

</Question>
<Question title="How does Intlayer reduce Next.js bundle size compared to next-intl or next-i18next?">

Intlayer uses per-component dictionary definitions and build-time macro optimisation. Client bundles only receive the exact fields needed by the components rendered on the page, rather than importing entire namespace JSON files. In addition, React Server Components render their content on the server with zero client overhead.

</Question>
<Question title="Can I use AI to translate my existing components into multiple languages?">

Yes. Intlayer's CLI includes the `npx intlayer fill` command, which connects to your preferred AI provider (OpenAI, Anthropic, Mistral, DeepSeek) to generate contextual translations for missing locales across your entire project.

</Question>
</FAQ>
