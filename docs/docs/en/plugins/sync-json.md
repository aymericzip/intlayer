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
history:
  - version: 6.1.6
    date: 2025-10-05
    changes: Initial Sync JSON plugin documentation
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
  priority?: number, // optional priority for conflict resolution, default: 0
});
```

## Multiple JSON sources and priority

You can add multiple `syncJSON` plugins to synchronize different JSON sources. This is useful when you have multiple i18n libraries or different JSON structures in your project.

### Priority system

When multiple plugins target the same dictionary key, the `priority` parameter determines which plugin takes precedence:

- Higher priority numbers win over lower ones
- Default priority of `.content` files is `0`
- Default priority of plugins content files is `-1`
- Plugins with the same priority are processed in the order they appear in the configuration

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Primary JSON source (highest priority)
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Fallback JSON source (lower priority)
    syncJSON({
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Legacy JSON source (lowest priority)
    syncJSON({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### Conflict resolution

When the same translation key exists in multiple JSON sources:

1. The plugin with the highest priority determines the final value
2. Lower priority sources are used as fallbacks for missing keys
3. This allows you to maintain legacy translations while gradually migrating to new structures

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

## CLI

The synchronized JSON files will be considered as other `.content` files. That means, all intlayer commands will be available for the synchronized JSON files. Including:

- `intlayer content test` to test if there are missing translations
- `intlayer content list` to list the synchronized JSON files
- `intlayer content fill` to fill the missing translations
- `intlayer content push` to push the synchronized JSON files
- `intlayer content pull` to pull the synchronized JSON files

See [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md) for more details.

## Limitations (current)

- No insertions or plurals/ICU support when targeting third‑party libraries.
- Visual editor is not available for non‑Intlayer runtimes yet.
- JSON synchronization only; non‑JSON catalog formats are not supported.

## Why this matters

- We can recommend established i18n solutions and position Intlayer as an add‑on.
- We leverage their SEO/keywords with tutorials that end by suggesting Intlayer to manage JSON.
- Expands the addressable audience from “new projects” to “any team already using i18n”.
