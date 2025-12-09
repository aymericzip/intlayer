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
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 6.1.6
    date: 2025-10-05
    changes: Initial Sync JSON plugin documentation
---

# Sync JSON (i18n bridges)

<iframe title="How to keep your JSON translations in sync with Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

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

## Plugins

This package provides two plugins:

- `loadJSON`: Load JSON files into Intlayer dictionaries.
  - This plugin is used to load JSON files from a source and will be loaded into Intlayer dictionaries. It can scan all the codebase and search for specific JSON files.
    This plugin can be used
    - if you use an i18n library that impose a specific location for your JSON to be loaded (ex: `next-intl`, `i18next`, `react-intl`, `vue-i18n`, etc.), but you want to place your content declaration where you want in your code base.
    - It can also be used if you want to fetch your messages from a remote source (ex: a CMS, a API, etc.) and store your messages in JSON files.

  > Under the hood, this plugin will scan all the codebase and search for specific JSON files and load them into Intlayer dictionaries.
  > Note that this plugin will not write the output and translations back to the JSON files.

- `syncJSON`: Synchronize JSON files with Intlayer dictionaries.
  - This plugin is used to synchronize JSON files with Intlayer dictionaries. It can scan the given location and load the JSON that match the pattern for specific JSON files. This plugin is useful if you want to get the benefits of Intlayer while using another i18n library.

## Using both plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Keep your current JSON files in sync with Intlayer dictionaries
  plugins: [
    /**
     * Will load all the JSON files in the src that match the pattern {key}.i18n json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Ensures these JSON files take precedence over files at `./locales/en/${key}.json`
    }),
    /**
     * Will load, and write the output and translations back to the JSON files in the locales directory
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Quick start

Add the plugin to your `intlayer.config.ts` and point it at your existing JSON structure.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
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
};

export default config;
```

Alternative: single file per locale (common with i18next/react-intl setups):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

#### How it works

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

### Multiple JSON sources and priority

You can add multiple `syncJSON` plugins to synchronize different JSON sources. This is useful when you have multiple i18n libraries or different JSON structures in your project.

#### Priority system

When multiple plugins target the same dictionary key, the `priority` parameter determines which plugin takes precedence:

- Higher priority numbers win over lower ones
- Default priority of `.content` files is `0`
- Default priority of plugins is `0`
- Plugins with the same priority are processed in the order they appear in the configuration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
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
};

export default config;
```

## Load JSON plugin

### Quick start

Add the plugin to your `intlayer.config.ts` to ingest existing JSON files as Intlayer dictionaries. This plugin is read‑only (no writes to disk):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingest JSON messages located anywhere in your source tree
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Load a single locale per plugin instance (defaults to the config defaultLocale)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternative: per‑locale layout, still read‑only (only the selected locale is loaded):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Only files for Locales.FRENCH will be loaded from this pattern
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### How it works

- Discover: builds a glob from your `source` builder and collects matching JSON files.
- Ingest: loads each JSON file as an Intlayer dictionary with the provided `locale`.
- Read‑only: does not write or format output files; use `syncJSON` if you need round‑trip sync.
- Auto‑fill ready: defines a `fill` pattern so `intlayer content fill` can populate missing keys.

### API

```ts
loadJSON({
  // Build paths to your JSON. `locale` is optional if your structure has no locale segment
  source: ({ key, locale }) => string,

  // Target locale for the dictionaries loaded by this plugin instance
  // Defaults to configuration.internationalization.defaultLocale
  locale?: Locale,

  // Optional label to identify the source
  location?: string, // default: "plugin"

  // Priority used for conflict resolution against other sources
  priority?: number, // default: 0
});
```

### Behavior and conventions

- If your `source` mask includes a locale placeholder, only files for the selected `locale` are ingested.
- If there is no `{key}` segment in your mask, the dictionary key is "index".
- Keys are derived from file paths by substituting the `{key}` placeholder in your `source` builder.
- The plugin only uses discovered files and does not fabricate missing locales or keys.
- The `fill` path is inferred from your `source` and used to update missing values via CLI when you opt‑in.

## Conflict resolution

When the same translation key exists in multiple JSON sources:

1. The plugin with the highest priority determines the final value
2. Lower priority sources are used as fallbacks for missing keys
3. This allows you to maintain legacy translations while gradually migrating to new structures

## CLI

The synchronized JSON files will be considered as other `.content` files. That means, all intlayer commands will be available for the synchronized JSON files. Including:

- `intlayer content test` to test if there are missing translations
- `intlayer content list` to list the synchronized JSON files
- `intlayer content fill` to fill the missing translations
- `intlayer content push` to push the synchronized JSON files
- `intlayer content pull` to pull the synchronized JSON files

See [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) for more details.

## Limitations (current)

- No insertions or plurals/ICU support when targeting third‑party libraries.
- Visual editor is not available for non‑Intlayer runtimes yet.
- JSON synchronization only; non‑JSON catalog formats are not supported.

## Why this matters

- We can recommend established i18n solutions and position Intlayer as an add‑on.
- We leverage their SEO/keywords with tutorials that end by suggesting Intlayer to manage JSON.
- Expands the addressable audience from “new projects” to “any team already using i18n”.
