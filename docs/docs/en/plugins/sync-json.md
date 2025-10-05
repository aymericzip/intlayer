---
createdAt: 2025-03-13
updatedAt: 2025-10-05
title: Sync JSON plugin
description: Synchronize Intlayer dictionaries with third‑party i18n JSON files (i18next, next-intl, react-intl, vue-i18n, and more). Keep your existing i18n while using Intlayer to manage, translate, and test your messages.
keywords:
  - Intlayer
  - Sync JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - translations
slugs:
  - doc
  - plugin
  - sync-json
---

## Sync JSON (i18n bridges)

Use Intlayer as an add‑on to your existing i18n stack. This plugin keeps your JSON messages in sync with Intlayer dictionaries so you can:

- Keep i18next, next‑intl, react‑intl, vue‑i18n, next‑translate, nuxt‑i18n, Solid‑i18next, svelte‑i18n, etc.
- Manage and translate your messages with Intlayer (CLI, CI, providers, CMS), without refactoring your app.
- Ship tutorials and SEO content targeting each ecosystem, while suggesting Intlayer as the JSON management layer.

Notes and current scope:

- Externalization to the CMS works for translations and classic text.
- No support yet for insertions, plurals/ICU, or advanced runtime features of other libraries.
- The visual editor is not supported yet for third‑party i18n outputs.

### When to use this plugin

- You already use an i18n library and store messages in JSON files.
- You want AI‑assisted fill, test in CI, and content ops without changing your rendering runtime.

## Installation

```bash
pnpm add -D @intlayer/sync-json-plugin
# or
npm i -D @intlayer/sync-json-plugin
```

## Quick start

Add the plugin to your `intlayer.config.ts` and point it at your existing JSON structure.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Keep your current JSON files in sync with Intlayer dictionaries
  plugins: [
    syncJSON({
      // Per-locale, per-namespace layout (e.g., next-intl, i18next with namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

Alternative: single file per locale (common with i18next/react-intl setups):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### How it works

- Read: the plugin discovers JSON files from your `source` builder and loads them as Intlayer dictionaries.
- Write: after builds and fills, it writes localized JSON back to the same paths (with a final newline to avoid formatting issues).
- Auto‑fill: the plugin declares an `autoFill` path for each dictionary. Running `intlayer fill` updates only missing translations in your JSON files by default.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // required
  location?: string, // optional label, default: "plugin"
});
```

## Integrations

Below are common mappings. Keep your runtime untouched; only add the plugin.

### i18next

Typical file layout: `./public/locales/{locale}/{namespace}.json` or `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

Per‑locale JSON messages (often `./messages/{locale}.json`) or per‑namespace.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

See also: `docs/en/intlayer_with_next-intl.md`.

### react-intl

Single JSON per locale is common:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

Either a single file per locale or per‑namespace:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

### Others

- next-translate / nuxt-i18n: map to their folder conventions (per‑locale/per‑namespace JSON).
- LinguiJS / Polyglot.js / Solid‑i18next / svelte‑i18n: point the builder to wherever those tools read JSON from. This plugin synchronizes JSON; advanced formats (PO/ICU/catalog binaries) are out of scope for now.

## CLI and CI features

Test for missing translations in CI:

```bash
npx intlayer content test --build
```

Auto‑fill only what is missing (default behavior skips existing translations):

```bash
npx intlayer fill
```

Translate with your own provider/model/API key:

```bash
# OpenAI example
OPENAI_API_KEY=sk-... npx intlayer fill --provider openai --model gpt-4o-mini

# Anthropic example
ANTHROPIC_API_KEY=sk-... npx intlayer fill --provider anthropic --model claude-3-5-sonnet

# Mistral / DeepSeek examples
MISTRAL_API_KEY=sk-... npx intlayer fill --provider mistral --model mistral-small
DEEPSEEK_API_KEY=sk-... npx intlayer fill --provider deepseek --model deepseek-chat
```

Only translate what changed (use Git diff filters):

```bash
npx intlayer fill --git-diff --git-diff-base origin/main --git-diff-current HEAD
```

More options: providers, temperature, locale filters, file/path filters. See `docs/en/intlayer_cli.md`.

## Limitations (current)

- No insertions or plurals/ICU support when targeting third‑party libraries.
- Visual editor is not available for non‑Intlayer runtimes yet.
- JSON synchronization only; non‑JSON catalog formats are not supported.

## Why this matters

- We can recommend established i18n solutions and position Intlayer as an add‑on.
- We leverage their SEO/keywords with tutorials that end by suggesting Intlayer to manage JSON.
- Expands the addressable audience from “new projects” to “any team already using i18n”.

## Doc history

| Version | Date       | Changes                                |
| ------- | ---------- | -------------------------------------- |
| 6.1.6   | 2025-10-05 | Initial Sync JSON plugin documentation |
