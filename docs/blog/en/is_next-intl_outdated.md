---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: Is next-intl Outdated in 2026?
description: next-intl became the go-to choice for Next.js App Router. But beneath the surface, it still carries runtime bundle bloat and manual namespace overhead.
keywords:
  - next-intl
  - Intlayer
  - Internationalization
  - i18n
  - Next.js
  - Bundle size
  - Blog
  - JavaScript
slugs:
  - blog
  - is-next-intl-outdated
author: aymericzip
---

# Is next-intl Outdated in 2026?

When Vercel introduced the App Router and phased out built-in Pages Router i18n, `next-intl` quickly filled the gap. Jan Amann delivered great documentation and timely App Router support, making it the community default.

So why question whether it's showing its age?

**Web architecture shifted rapidly over the past three years, but `next-intl`’s foundational model didn't.**

While Next.js moved toward React Server Components (RSC), streaming, and compiler-level optimization, `next-intl` still treats internationalization as a runtime concern: passing large JSON objects through client providers, running ICU formatters in browser bundles, and relying on manual namespace curation to curb bundle bloat.

<TOC/>

## Key Takeaways

**Maintenance plateau:**

In the past 12 months, `next-intl` recorded ~187 commits, mainly focused on Next.js compatibility bumps and patch maintenance.

**Client runtime tax:**

Mounting `NextIntlClientProvider` with `useTranslations()` adds ~12.8 KB gzipped (51 KB minified) before rendering a single word, roughly 3x `next-intlayer` (4.3 KB).

**The 90% copy leak:**

In typical setups, **89.8% of the translation payload sent to a page belongs to other routes**. Landing on `/contact` downloads `/pricing` and `/dashboard` copy as well.

**Manual namespace overhead:**

Avoiding copy bloat requires manually mapping namespaces per route by hand, increasing the likelihood of production misses.

**Commercial sponsorship:**

As an official partner of Crowdin, there is little incentive to build a free, local AI translation command directly into the CLI.

## Maintenance vs. Modern Tooling

Commit activity across the past twelve months:

| Repository            | Stars                                                                                                                                                  | Total commits                                                                                                                                                       | Commits / year                                                                                                                                                     | Last commit                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `amannn/next-intl`    | [![stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=stars)](https://github.com/amannn/next-intl/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/amannn/next-intl?style=for-the-badge&label=%2Fyear)](https://github.com/amannn/next-intl/commits)       | [![last](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Trailing 12-month activity:

- `amannn/next-intl`: **187 commits** (mostly patch updates and peer dependency bumps).
- `aymericzip/intlayer`: **4,343 commits** (active work across compilers, IDE extensions, MCP servers, and translation engines).

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#amannn/next-intl&aymericzip/intlayer)

A small library can be complete and stable. But frontend i18n has moved forward: compilers can now prune unreferenced copy at build time, LLMs can automate localization directly in CI, and editors rely on dedicated Language Servers (LSP) and AI agents. A maintenance-mode library cannot easily absorb this evolution.

## Measuring Next.js 16 App Router Performance

We benchmarked a standard App Router application with 10 routes and 10 locales:

<I18nBenchmark framework="nextjs" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tested in real browser environments using production gzip compression. Details in the [Next.js benchmark report](https://intlayer.org/doc/benchmark/nextjs).

### Core Library Footprint

Client footprint before adding any content:

| Library                | Gzipped    | Minified    |
| ---------------------- | ---------- | ----------- |
| `next-intl@4.9.1`      | 12.8 KB    | 51.0 KB     |
| `next-intlayer@8.7.12` | **4.3 KB** | **13.3 KB** |

### Page Weight and Leakage

| Setup                 | Page JS avg (gz) | Locale leak | Other-page leak | Avg component (gz) |
| --------------------- | ---------------- | ----------- | --------------- | ------------------ |
| Base (no i18n)        | 150.8 KB         | 0.0%        | 0.0%            | 0.7 KB             |
| `next-intl` (static)  | 163.5 KB         | 4.2%        | **89.8%**       | 20.5 KB            |
| `next-intl` (dynamic) | 163.4 KB         | 9.7%        | **89.9%**       | 20.5 KB            |
| `next-intlayer`       | **152.1 KB**     | **0.0%**    | **0.0%**        | **7.2 KB**         |

### Why Other-Page Leakage Happens

In standard `next-intl` setups, root layouts load all messages upfront:

```tsx fileName="app/[locale]/layout.tsx"
export default async function RootLayout({ children, params }) {
  const messages = await getMessages();

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Because `messages` is passed to the client provider at the root, the browser receives the full translation dictionary on every page. Visiting `/login` forces the user to download FAQ, documentation, and dashboard copy as well.

You can prevent this by splitting JSON files into namespaces and loading them conditionally per route. But maintaining that route-to-namespace map manually is tedious and prone to missing keys in production.

Intlayer solves this via static analysis: the [Intlayer compiler](https://intlayer.org/doc/compiler) bundles only the copy actually referenced on that route, driving other-page leakage to **0.0%**.

## Why next-intl Cannot Be Tree-Shaken

The API relies on dynamic runtime string calls:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```tsx fileName="UserProfile.tsx"
"use client";

import { useTranslations } from "next-intl";

export function UserProfile() {
  const t = useTranslations("UserProfile");

  return <h2>{t("heading")}</h2>;
}
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="UserProfile.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function UserProfile() {
  const { heading } = useIntlayer("user-profile");

  return <h2>{heading}</h2>;
}
```

  </Tab>
</Tabs>

Turbopack and Webpack cannot verify which keys inside `UserProfile` are actually called at runtime. To prevent missing-key errors, **the bundler must include the entire namespace in the client chunk**. Intlayer's destructured properties allow the compiler to track references directly and strip unused fields during compilation. See [bundle optimization](https://intlayer.org/doc/concept/bundle-optimization) for details.

## Developer Experience

### Disconnected JSON vs. Co-Location

With `next-intl`, copy is separated across multiple JSON files in a distant `messages/` folder. Intlayer co-locates content declarations right beside components:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "authModal": {
    "title": "Sign in to your account",
    "submitButton": "Continue"
  }
}
```

```json fileName="messages/fr.json"
{
  "authModal": {
    "title": "Connectez-vous à votre compte",
    "submitButton": "Continuer"
  }
}
```

```tsx fileName="AuthModal.tsx"
import { useTranslations } from "next-intl";

export const AuthModal = () => {
  const t = useTranslations("authModal");
  return (
    <form>
      <h2>{t("title")}</h2>
      <button type="submit">{t("submitButton")}</button>
    </form>
  );
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="AuthModal.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "auth-modal",
  content: {
    title: t({
      en: "Sign in to your account",
      fr: "Connectez-vous à votre compte",
    }),
    submitButton: t({
      en: "Continue",
      fr: "Continuer",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="AuthModal.tsx"
import { useIntlayer } from "next-intlayer";

export const AuthModal = () => {
  const { title, submitButton } = useIntlayer("auth-modal");
  return (
    <form>
      <h2>{title}</h2>
      <button type="submit">{submitButton}</button>
    </form>
  );
};
```

  </Tab>
</Tabs>

When you delete or refactor `AuthModal.tsx`, its translations are refactored or removed with it.

### Autocomplete vs. Strict Type Constraints

Augmenting `IntlMessages` in `next-intl` provides editor autocomplete based on your primary language file:

```ts fileName="global.d.ts"
import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

However, it only checks your canonical locale. If you delete a key from `fr.json`, TypeScript raises no warning, leaving your CI green while French users encounter fallbacks or missing text.

Intlayer infers types from all content declarations. Enabling [`strictMode`](https://intlayer.org/doc/concept/configuration) turns missing translations in any locale into hard compile errors.

### Tooling & AI Agent Workflows

| Feature                        | `next-intl` | Intlayer                                                               |
| ------------------------------ | ----------- | ---------------------------------------------------------------------- |
| **VS Code Extension**          | ❌ None     | ✅ [First-party extension](https://intlayer.org/doc/vs-code-extension) |
| **Language Server (LSP)**      | ❌ None     | ✅ [Integrated LSP](https://intlayer.org/doc/lsp)                      |
| **MCP Server (for AI Agents)** | ❌ None     | ✅ [Built-in MCP Server](https://intlayer.org/doc/mcp-server)          |
| **Agent Skills**               | ❌ None     | ✅ [Ready-to-use skills](https://intlayer.org/doc/agent_skills)        |
| **Visual In-Context CMS**      | ❌ None     | ✅ [Free & Open Source](https://intlayer.org/doc/concept/editor)       |

An integrated LSP and MCP server enable AI code assistants to inspect your project's content graph, complete strings across languages, and update dictionaries accurately.

## The Crowdin Partnership and Tooling

`next-intl` is officially partnered with Crowdin. Sponsorships keep open source healthy, but this commercial relationship naturally shapes roadmap priorities: `next-intl` is designed as a client for external TMS platforms, meaning a free, local AI translation command is unlikely to be prioritized.

Intlayer provides built-in tools:

**Local AI auto-fill (`intlayer fill`):**

Automatically detects and translates missing keys via your own OpenAI, Anthropic, Mistral, or Gemini API keys.

**Self-hostable visual CMS:**

Use the [Intlayer CMS](https://intlayer.org/doc/concept/cms) to give non-technical contributors visual editing that commits back to Git.

**Permissive open-source license:**

The entire stack is Apache 2.0.

## Where next-intl Still Fits

**Complex ICU MessageFormat requirements:**

If your project relies heavily on intricate plurals, select ordinals, and complex nested formatters, `next-intl`'s ICU implementation is mature and reliable.

**Established Crowdin workflows:**

If your team already uses Crowdin pipelines, `next-intl` slots into that workflow seamlessly.

**Existing stable apps:**

If your codebase is running cleanly and client bundle sizes meet performance targets, a migration may not be necessary.

## Migration and Compatibility

**Drop-in Compatibility:**

Keep your existing `useTranslations` hooks using the [`next-intl` compatibility layer](https://intlayer.org/doc/compatibility/next-intl).

**Automated Migration:**

Convert legacy JSON files into structured dictionaries with our [next-intl migration guide](https://intlayer.org/doc/migration/next-intl).

**Hybrid Setup:**

Keep `next-intl` for runtime rendering while [using Intlayer with next-intl](https://intlayer.org/blog/intlayer-with-next-intl) for local AI translation.

Check your live Next.js application's payload and leakage with the free [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Further Reading

- [Next.js i18n Benchmark: Complete Performance Analysis](https://intlayer.org/doc/benchmark/nextjs)
- [next-i18next vs next-intl vs Intlayer: Full Comparison](https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Is i18next Outdated in 2026?](https://intlayer.org/blog/is-i18next-outdated)
- [The Case for Compiler-Driven Internationalization](https://intlayer.org/blog/compiler-vs-declarative-i18n)
