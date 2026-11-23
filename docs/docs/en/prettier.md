---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: Prettier x Oxfmt Plugin | Sort Intlayer translations and fix .value
description: "Sort the locales of t(), plural(), enu() and select() in your content declarations, and add .value where content is used as a string so types hold with the visual editor. Works with Prettier and oxfmt."
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
  - Visual editor
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "Add .value rewrite for content used as a string"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Init history"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Add oxfmt usage"
author: aymericzip
---

# Prettier x Oxfmt Plugin

`prettier-plugin-intlayer` does two things every time Prettier formats a file:

1. **Sorts your translations** in a fixed order. Diffs stay small, merge conflicts get rarer and a missing locale is easy to spot.
2. **Adds `.value`** where content is used as a string, so your types keep holding once the visual editor is enabled. See [Content used as a string](#content-used-as-a-string).

```ts
// before
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// after
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Installation

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Requires Prettier 3 or later.

`intlayer init prettier` installs the plugin and adds it to your config for you.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt cannot load third-party plugins, so the sorting runs through Prettier. Install Prettier next to oxfmt. It is only used to sort your content declarations; oxfmt keeps formatting your project.

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

Requires Prettier 3 or later. `intlayer init` only sets up the plugin in projects that already use Prettier, so configure it by hand as shown below.

  </Tab>
</Tabs>

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

To sort your content declarations only, use an override. The `.value` rewrite then no longer runs on your components:

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

The format script runs two tools, each with one job:

1. **Prettier** runs the plugin. The first glob sorts your content declarations, the second adds `.value` in your components. Drop the second glob if you only want sorting.
2. **oxfmt** formats the whole project, content declarations included.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" \"src/**/*.{ts,tsx,js,jsx}\" && oxfmt"
  }
}
```

Keep this order. oxfmt replaces the layout written by Prettier with its own, but never reorders object keys, so the sorted order is kept.

Some limits come with this setup:

- **Format on save.** An editor that formats with oxfmt does not run the plugin. Run the `format` script instead.
- **Check mode.** Do not use `prettier --check` on files formatted by oxfmt: the layouts differ, so it reports every file. To check the order in CI, run the `format` script and fail on changes:

```bash
npm run format && git diff --exit-code
```

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

## Content used as a string

With the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) enabled (`editor.enabled: true`), a field returned by `useIntlayer` or `getIntlayer` is a renderable node, not a string. Passing it to a native element attribute or calling a string method on it no longer type-checks. Template literals, concatenation and `String()` accept any type and stay as they are. The plugin appends `.value`, which holds the string whether the editor is enabled or not.

```tsx
// before
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// after
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

Rewritten:

- string methods: `content.name.toUpperCase()`
- attributes of native elements: `<img alt={content.alt} />`

Left untouched, because they accept a node:

- JSX children: `<h1>{content.title}</h1>`
- component props: `<Card title={content.title} />`
- tagged templates: `` html`<h1>${content.title}</h1>` `` (Lit)

This applies to components, not content declarations, so the plugin must run on your component files. A variable whose name is declared again elsewhere in the file is skipped. Vue and Svelte templates are not rewritten: use the [`no-node-as-string` ESLint rule](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md) for them, it also has an autofix.

It also removes `.value` from a JSX child: `<h1>{content.title.value}</h1>` becomes `<h1>{content.title}</h1>`, so the visual editor can select the text. This applies to React, Next.js, Preact, Solid and React Native.

Disable it with `intlayerNodeValueAccess: false`.

## Options

| Option                                  | Default  | Description                                                                                            |
| --------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `intlayerPinnedLocales`                 | `["en"]` | Locales kept first in `t()`, in this order. Pass `[]` to sort every locale.                            |
| `intlayerSortContentKeys`               | `false`  | In `*.content.*` files, also sort the dictionary content keys and nested objects.                      |
| `intlayerCollapseIdenticalTranslations` | `true`   | In `*.content.*` files, replace a `t()` whose locales all hold the same string by that string.         |
| `intlayerNodeValueAccess`               | `true`   | Append `.value` where content is used as a string (`alt={content.alt}`, `content.name.toUpperCase()`). |

## What is left untouched

- Objects holding a spread (`...base`), a computed key (`[key]`), a method or a duplicated key.
- `plural()` maps with a key that is not a CLDR category.
- `enu()` maps whose new order would change the resolved content.
- Calls to any other function named like a helper but given a non-object argument.

Comments move with the key they belong to.

## Supported parsers

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` and `jsonc`. The `<script>` blocks of Vue, Svelte and Astro files are formatted with these parsers.

> **Known limitation.** Prettier runs a single plugin per parser. If another plugin also replaces the JavaScript/TypeScript parsers (for example `prettier-plugin-tailwindcss`), only the last one listed applies to those files. Scope `prettier-plugin-intlayer` to `*.content.*` files with an override to avoid the conflict, and rely on the [`no-node-as-string` ESLint rule](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md) for `.value` in components. With oxfmt, Tailwind classes are sorted by its built-in `sortTailwindcss` option, so this conflict does not apply.
