---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier x Oxfmt Plugin | Sort Intlayer translations
description: "Sort the locales of t(), the categories of plural(), the conditions of enu(), the cases of select() and the keys of your content declarations with prettier-plugin-intlayer. Works with Prettier and oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Formatting
  - Sort translations
  - Sort locales
  - i18n
  - Internationalization
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Init history"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Add oxfmt usage"
author: aymericzip
---

# Prettier x Oxfmt Plugin

`prettier-plugin-intlayer` puts the keys of your translations in a fixed order every time Prettier formats a file. Diffs stay small, merge conflicts get rarer and a missing locale is easy to spot.

```ts
// before
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// after
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Installation

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Requires Prettier 3 or later.

If your project already uses Prettier, `intlayer init prettier` installs the plugin and adds it to your config for you.

## Usage

The plugin works with Prettier and with [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Add the plugin to your Prettier config:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

To apply it to your content declarations only, use an override:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt does not load Prettier plugins. Let Prettier run the plugin on your content declarations only, then let oxfmt format the whole project:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"]
      }
    }
  ]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

Keep this order. oxfmt rewrites the layout in its own style but never reorders object keys, so the sorted order is kept.

  </Tab>
</Tabs>

## What gets sorted

### `t()`: locales

The pinned locales come first (`en` by default). The other locales follow in alphabetical order.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: CLDR order

Categories go from the smallest quantity to the fallback: `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: ascending thresholds

Conditions are sorted by their number, then by operator (`<1`, `<=1`, `1`, `>=1`, `>1`). `fallback` goes last.

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

At runtime, the first matching condition wins. The plugin applies the new order only when every quantity still resolves to the same content. When order decides the result, the object is left as written. For example, in `{ '<1': …, '<=-2.3': … }` the `'<1'` key catches every negative number.

### `select()`: alphabetical

Cases are sorted alphabetically and `fallback` goes last.

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

Without a `fallback` or an `other` key, the last case is used as the fallback. That case stays last and only the cases before it are sorted.

### `.content.json` files

The serialized form is sorted the same way: `{ "nodeType": "translation", "translation": { … } }`, as well as `plural`, `enumeration` and `select` nodes.

### Identical translations

In `*.content.*` files, a `t()` whose locales all hold the same string is replaced by that string. A plain string is served to every locale, so the output does not change.

```ts
// before
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// after
nextjs: "Next.js",
```

A `t()` with a single locale, a type argument (`t<string>()`), a comment or non-string values is kept. Set `intlayerCollapseIdenticalTranslations: false` to turn it off.

### Content keys (opt-in)

With `intlayerSortContentKeys: true`, the plugin also sorts the keys of the dictionary `content` alphabetically, at every nesting level. This applies only in `*.content.*` files.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

The sort continues through every helper (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) to reach the objects inside them. Each helper's own key map keeps its ordering. The keys passed to `cond()` and `gender()` are never reordered, because their last key is the fallback. The fields next to `content` (`key`, `title`, `locale`…) stay as they are.

## Options

| Option                                  | Default  | Description                                                                                    |
| --------------------------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]` | Locales kept first in `t()`, in this order. Pass `[]` to sort every locale.                    |
| `intlayerSortContentKeys`               | `false`  | In `*.content.*` files, also sort the dictionary content keys and nested objects.              |
| `intlayerCollapseIdenticalTranslations` | `true`   | In `*.content.*` files, replace a `t()` whose locales all hold the same string by that string. |

## What is left untouched

- Objects holding a spread (`...base`), a computed key (`[key]`), a method or a duplicated key.
- `plural()` maps with a key that is not a CLDR category.
- `enu()` maps whose new order would change the resolved content.
- Calls to any other function named like a helper but given a non-object argument.

Comments move with the key they belong to.

## Supported parsers

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` and `jsonc`. The `<script>` blocks of Vue, Svelte and Astro files are formatted with these parsers.

> **Known limitation.** Prettier runs a single plugin per parser. If another plugin also replaces the JavaScript/TypeScript parsers (for example `prettier-plugin-tailwindcss`), only the last one listed applies to those files. Scope `prettier-plugin-intlayer` to `*.content.*` files with an override to avoid the conflict. With oxfmt, Tailwind classes are sorted by its built-in `sortTailwindcss` option, so this conflict does not apply.
