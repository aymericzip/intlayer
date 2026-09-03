---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: Is vue-i18n Outdated in 2026?
description: vue-i18n has been the standard for Vue and Nuxt apps for a decade. But in our benchmarks, it proved to be the heaviest i18n runtime on the web. Here is why.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalisation
  - i18n
  - Vue
  - Nuxt
  - Bundle size
  - Blog
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# Is vue-i18n Outdated in 2026?

In the Vue community, few libraries are as widely adopted as `vue-i18n`. Maintained by Kazupon since Vue 2, it powers `@nuxtjs/i18n` and serves as the default choice for virtually every multilingual Vue app.

Yet in our 2026 benchmarks, we ran into an unexpected finding: **`vue-i18n` was the single heaviest localisation runtime across all frontend frameworks tested.**

On a clean 31.5 KB Vite + Vue baseline, adding `vue-i18n` pushed average page JavaScript to **136.4 KB**, more than quadrupling the payload.

How did a framework known for being lightweight and nimble end up with such a heavy internationalisation stack? And does its classic runtime model still make sense today?

<TOC/>

## Key Takeaways

**Heaviest runtime benchmarked:**

At **24.3 KB gzipped (83.2 KB minified)** before adding any content, `vue-i18n` is roughly **9x heavier** than `intlayer`'s 2.7 KB runtime.

**A 330% payload penalty:**

`vue-i18n` swelled a 31.5 KB baseline Vue page to 136.4 KB. Intlayer produced 59.3 KB, a **56% smaller page payload**.

**The hidden runtime compiler:**

By default, unless you configure specific bundler aliases, `vue-i18n` ships an entire message compiler to the browser to parse strings on the fly.

**Maintenance velocity:**

Over the past year, `vue-i18n` recorded ~259 commits, focused on patch fixes and Vue core compatibility.

**No first-party modern tooling:**

Missing first-party Language Server (LSP) support, AI MCP servers, or automated CLI translation pipelines.

## Maintenance vs. Modern Tooling

| Repository            | Stars                                                                                                                                                  | Total commits                                                                                                                                                       | Commits / year                                                                                                                                                     | Last commit                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Trailing twelve months:

- `intlify/vue-i18n`: **259 commits** (routine patches and Vue 3 / Nuxt dependency maintenance).
- `aymericzip/intlayer`: **4,343 commits** (active work across compiler optimisations, LSP tools, and AI agents).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

A mature library can be complete. But modern frontends now leverage build-time AST transformations, bundler dead-code elimination, and AI-driven localisation. A runtime-bound architecture cannot easily adopt these paradigms.

## Measuring Performance in Vite + Vue

We benchmarked a 10-page, 10-locale application built with Vite and Vue 3:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tested in a real browser using production gzip compression. Full data in the [Vue benchmark documentation](https://intlayer.org/doc/benchmark/vue).

### Baseline Framework Overhead

Overhead before adding any translation strings:

| Library           | Gzipped    | Minified   |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 KB    | 83.2 KB    |
| `intlayer@8.7.12` | **2.7 KB** | **7.6 KB** |

`vue-i18n`’s runtime alone weighs **24.3 KB gzipped**, nearly the weight of Vue core itself. Intlayer adds just **2.7 KB**.

### Page Weight and Leakage

| Setup          | Page JS avg (gz) | Locale leak | Other-page leak | Avg component (gz) |
| -------------- | ---------------- | ----------- | --------------- | ------------------ |
| Base (no i18n) | 31.5 KB          | 0.0%        | 90.0%           | 0.9 KB             |
| `vue-i18n`     | **136.4 KB**     | 50.2%       | 90.0%           | 196.0 KB           |
| Intlayer       | **59.3 KB**      | 51.1%       | **0.0%**        | **6.5 KB**         |

### Key Findings

**Substantial relative bloat:**

Because baseline Vue is so lean (~31 KB), `vue-i18n` more than quadruples the page payload.

**Other-page leakage:**

By default, **90% of localised text** sent to a route belongs to other pages. Intlayer strips this entirely to **0.0%**.

**Isolated component weight:**

Components compiled with localised scopes averaged 196 KB with `vue-i18n` because catalogues were duplicated inside them, versus **6.5 KB** with Intlayer.

## Why Is vue-i18n Heavy?

### An AST Compiler Shipped to the Browser

`vue-i18n` contains its own message format compiler. Plural rules and interpolations are parsed into Abstract Syntax Trees at runtime.

Avoiding this requires configuring bundler aliases for `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` and pre-compiling catalogues via `@intlify/unplugin-vue-i18n`. Many projects miss this step, inadvertently shipping an entire compiler to end users.

### Monolithic Feature Set

`vue-i18n` includes number and datetime engines, linked message resolvers, legacy Options API bridges (`$t`, `v-t`), and reactive message proxies. Even if you only need plain string translations in `<script setup>`, you pay for the entire suite.

### Dynamic Keys Defeat Tree-Shaking

Because `"home.hero.title"` is evaluated at runtime, bundlers cannot verify which keys are accessed. Unused strings in your message files cannot be tree-shaken.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

The [Intlayer compiler](https://intlayer.org/doc/compiler) tracks exact properties and removes unreferenced content before building client chunks. See [bundle optimisation](https://intlayer.org/doc/concept/bundle-optimization) for details.

## Developer Experience

### Disconnected Catalogues vs. Co-Location

With `vue-i18n`, copy lives in a separate `locales/` directory. Intlayer co-locates typed content files directly beside components:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/fr.json"
{
  "hero": {
    "title": "Livrez dans toutes les langues"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      fr: "Livrez dans toutes les langues",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

When `Hero.vue` is deleted or refactored, its content file moves or gets removed with it.

### Autocomplete vs. Strict Completeness

`DefineLocaleMessage` provides IDE autocomplete against a canonical schema. However, it does not guarantee translation completeness. Omitting a key from `fr.json` raises no TypeScript error at build time.

With Intlayer, dictionaries are validated strictly. Enabling [`strictMode`](https://intlayer.org/doc/concept/configuration) turns missing translations in any locale into hard compile errors.

### Modern Tooling for AI & IDEs

| Feature                   | `vue-i18n`              | Intlayer                                                               |
| ------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| **VS Code Extension**     | Third-party (i18n Ally) | ✅ [First-party extension](https://intlayer.org/doc/vs-code-extension) |
| **Language Server (LSP)** | ❌ None                 | ✅ [Integrated LSP](https://intlayer.org/doc/lsp)                      |
| **MCP Server for AI**     | ❌ None                 | ✅ [Built-in MCP Server](https://intlayer.org/doc/mcp-server)          |
| **Agent Skills**          | ❌ None                 | ✅ [Autonomous agent skills](https://intlayer.org/doc/agent_skills)    |
| **Visual In-Context CMS** | ❌ None                 | ✅ [Free & Open Source CMS](https://intlayer.org/doc/concept/editor)   |

## Translation Pipelines

`vue-i18n` does not offer a native translation command. Teams typically export JSON to third-party platforms like Crowdin or Phrase.

Intlayer provides built-in tools:

**Local AI auto-fill (`intlayer fill`):**

Automatically translates missing keys using your own OpenAI, Anthropic, Mistral, or Gemini API keys.

**Self-hostable visual CMS:**

Use the [Intlayer CMS](https://intlayer.org/doc/concept/cms) to let non-developers edit copy while changes commit directly to Git.

**Permissive open-source license:**

The entire toolkit is Apache 2.0.

## When vue-i18n is Still the Right Choice

<AccordionGroup>
<Accordion header="Large legacy Nuxt 2/3 applications">

If your routing architecture is deeply coupled to `@nuxtjs/i18n` and running stably, a rewrite may not provide an immediate return on investment.

</Accordion>
<Accordion header="Complex ICU formatting">

If you rely extensively on linked messages, complex datetime formatters, or intricate custom plural rules.

</Accordion>
<Accordion header="Small hobby projects">

If bundle size is not a constraint for your use case.

</Accordion>
</AccordionGroup>

## How to Improve My Existing vue-i18n Setup?

Intlayer offers drop-in compatibility packages that preserve the exact function signatures of `vue-i18n` and `@nuxtjs/i18n` (`useI18n`, `$t`, `<i18n-t>`). You do not need to rewrite your templates or composables to start benefiting from a lightweight, compiler-driven architecture.

Setup takes a single command:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

This interactive CLI:

1. Installs the `@intlayer/vue-i18n` or `@intlayer/nuxt-i18n` compatibility package.
2. Configures Vite or Nuxt bundler aliases so your existing imports and template usages route seamlessly to Intlayer, allowing you to remove `vue-i18n` from `package.json`.
3. Instantly enables language server (LSP) diagnostics, eliminates the 24 KB runtime AST parser from your client bundle, and unlocks local AI translation workflows without a major refactor.

For step-by-step instructions, explore our dedicated guides:

- **Drop-in Compatibility:** Keep existing templates using the [`vue-i18n` compatibility layer](https://intlayer.org/doc/compatibility/vue-i18n) or [`@nuxtjs/i18n` compatibility layer](https://intlayer.org/doc/compatibility/nuxtjs-i18n).
- **Automated Migration Guides:** Convert legacy JSON files into structured dictionaries with our guides: [from vue-i18n](https://intlayer.org/doc/migration/vue-i18n) or [from @nuxtjs/i18n](https://intlayer.org/doc/migration/nuxtjs-i18n).
- **Hybrid Setup:** Keep `vue-i18n` at runtime while [using Intlayer alongside vue-i18n](https://intlayer.org/blog/intlayer-with-vue-i18n) for local type safety and AI translation.

Scan your live website for payload and leakage with the free [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Further Reading

- [Vue & Vite i18n Benchmark: Complete Performance Analysis](https://intlayer.org/doc/benchmark/vue)
- [vue-i18n vs Intlayer: Feature-by-Feature Comparison](https://intlayer.org/blog/vue-i18n-vs-intlayer)
- [Is next-intl Outdated in 2026?](https://intlayer.org/blog/is-next-intl-outdated)
- [Compiler vs. Declarative Internationalisation](https://intlayer.org/blog/compiler-vs-declarative-i18n)
