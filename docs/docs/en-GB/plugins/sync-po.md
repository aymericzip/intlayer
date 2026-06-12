---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Sync PO plugin
description: Synchronise Intlayer dictionaries with Gettext PO files. Keep your existing i18n while using Intlayer to manage, translate, and test your messages.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - translations
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Initial Sync PO plugin documentation"
author: aymericzip
---

# Sync PO (i18n bridges) - Sync PO with ICU / i18next support

Use Intlayer as an add‑on to your existing i18n stack. This plugin keeps your Gettext PO messages in sync with Intlayer dictionaries so you can:

- Keep your existing PO-based translation workflow.
- Manage and translate your messages with Intlayer (CLI, CI, providers, CMS), without refactoring your app.
- Ship tutorials and SEO content targeting each ecosystem, while suggesting Intlayer as the PO management layer.

Notes and current scope:

- Externalisation to the CMS works for translations and classic text.
- No support yet for insertions, plurals/ICU, or advanced runtime features of other libraries within the PO entries themselves.
- The visual editor is not supported yet for third‑party i18n outputs.

### When to use this plugin

- You already use Gettext PO files for your translations.
- You want AI‑assisted fill, test in CI, and content ops without changing your rendering runtime.

## Installation

```bash
pnpm add -D @intlayer/sync-po-plugin
# or
npm i -D @intlayer/sync-po-plugin
```

## Plugins

This package provides two plugins:

- `loadPO`: Load PO files into Intlayer dictionaries.
  - This plugin is used to load PO files from a source and will be loaded into Intlayer dictionaries. It can scan all the codebase and search for specific PO files.
    This plugin can be used
    - if you use an i18n library that imposes a specific location for your PO files to be loaded, but you want to place your content declaration where you want in your code base.
    - It can also be used if you want to fetch your messages from a remote source (ex: a CMS, an API, etc.) and store your messages in PO files.

  > Under the bonnet, this plugin will scan all the codebase and search for specific PO files and load them into Intlayer dictionaries.
  > Note that this plugin will not write the output and translations back to the PO files.

- `syncPO`: Synchronise PO files with Intlayer dictionaries.
  - This plugin is used to synchronise PO files with Intlayer dictionaries. It can scan the given location and load the PO that match the pattern for specific PO files. This plugin is useful if you want to get the benefits of Intlayer while using another i18n library.

## Using both plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Keep your current PO files in sync with Intlayer dictionaries
  plugins: [
    /**
     * Will load all the PO files in the src that match the pattern {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Ensures these PO files take precedence over files at `./locales/en/${key}.po`
    }),
    /**
     * Will load, and write the output and translations back to the PO files in the locales directory
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## `syncPO` plugin

### Quick start

Add the plugin to your `intlayer.config.ts` and point it at your existing PO structure.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Keep your current PO files in sync with Intlayer dictionaries
  plugins: [
    syncPO({
      // Per-locale, per-namespace layout
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

Alternative: single file per locale:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### How it works

- Read: the plugin discovers PO files from your `source` builder and loads them as Intlayer dictionaries.
- Write: after builds and fills, it writes localised PO back to the same paths (with proper Gettext headers).
- Auto‑fill: the plugin declares an `autoFill` path for each dictionary. Running `intlayer fill` updates only missing translations in your PO files by default.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // required
  location?: string, // optional label, default: "sync-po::path/to/source"
  priority?: number, // optional priority for conflict resolution, default: 0
});
```

### Multiple PO sources and priority

You can add multiple `syncPO` plugins to synchronise different PO sources. This is useful when you have multiple translation sources or different PO structures in your project.

#### Priority system

When multiple plugins target the same dictionary key, the `priority` parameter determines which plugin takes precedence:

- Higher priority numbers win over lower ones
- Default priority of `.content` files is `0`
- Default priority of plugins is `0`
- Plugins with the same priority are processed in the order they appear in the configuration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Primary PO source (highest priority)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Fallback PO source (lower priority)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Legacy PO source (lowest priority)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load PO plugin

### Quick start

Add the plugin to your `intlayer.config.ts` to ingest existing PO files as Intlayer dictionaries. This plugin is read‑only (no writes to disk):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingest PO messages located anywhere in your source tree
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
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
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // Only files for Locales.FRENCH will be loaded from this pattern
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### How it works

- Discover: builds a glob from your `source` builder and collects matching PO files.
- Ingest: loads each PO file as an Intlayer dictionary with the provided `locale`.
- Read‑only: does not write or format output files; use `syncPO` if you need round‑trip sync.
- Auto‑fill ready: defines a `fill` path so `intlayer content fill` can populate missing keys.

### API

```ts
loadPO({
  // Build paths to your PO. `locale` is optional if your structure has no locale segment
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

### Behaviour and conventions

- If your `source` mask includes a locale placeholder, only files for the selected `locale` are ingested.
- If there is no `{key}` segment in your mask, the dictionary key is "index".
- Keys are derived from file paths by substituting the `{key}` placeholder in your `source` builder.
- The plugin only uses discovered files and does not fabricate missing locales or keys.
- The `fill` path is inferred from your `source` and used to update missing values via CLI when you opt‑in.

## Conflict resolution

When the same translation key exists in multiple PO sources:

1. The plugin with the highest priority determines the final value
2. Lower priority sources are used as fallbacks for missing keys
3. This allows you to maintain legacy translations while gradually migrating to new structures

## CLI

The synchronised PO files will be considered as other `.content` files. That means, all intlayer commands will be available for the synchronised PO files. Including:

- `intlayer content test` to test if there are missing translations
- `intlayer content list` to list the synchronised PO files
- `intlayer content fill` to fill the missing translations
- `intlayer content push` to push the synchronised PO files
- `intlayer content pull` to pull the synchronised PO files

See [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) for more details.

## Limitations (current)

- No insertions or plurals/ICU support when targeting third‑party libraries.
- Visual editor is not available for non‑Intlayer runtimes yet.
- PO synchronisation only; non‑PO catalog formats are not supported.

## Why this matters

- We can recommend established i18n solutions and position Intlayer as an add‑on.
- We leverage their SEO/keywords with tutorials that end by suggesting Intlayer to manage PO.
- Expands the addressable audience from “new projects” to “any team already using i18n”.
