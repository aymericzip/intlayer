---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: ESLint Plugin | Lint rules for Intlayer
description: Catch hardcoded strings, dynamic calls the Intlayer compiler cannot optimize, and unused dictionary content, with eslint-plugin-intlayer. Works with ESLint and oxlint, across React, Vue, Svelte, Angular and Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Internationalization
  - no-raw-text
  - Hardcoded strings
  - Unused translations
  - Dead content
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Init history"
author: aymericzip
---

# ESLint x OXLint Plugin

`eslint-plugin-intlayer` catches the kinds of i18n mistake TypeScript cannot:

1. **Hardcoded text** that never made it into a dictionary.
2. **Dynamic calls** that type-check and run, but that the Intlayer compiler cannot optimize.
3. **Dead content** — dictionaries and fields nothing in the project reads (opt-in).

Unknown dictionary keys, unknown field paths and missing locales are already compile errors, so the plugin does not repeat them.

## Installation

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Requires ESLint 9 or later (flat config). ESLint 10 is supported.

## Usage

The plugin runs in both ESLint and [oxlint](https://oxc.rs) — the same rules, the same options.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Or spread a config and set the severities yourself:

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Two caveats: oxlint's JS plugin support is still alpha, and oxlint does not support custom parsers — so `.vue`, `.svelte`, `.astro` and Angular templates are not linted there. Run oxlint over your JS/TS/JSX files and keep ESLint for the rest.

`no-unused-content` is left out above on purpose: it needs the working directory and the linted file path from the rule context, which the alpha JS plugin bridge does not guarantee. Run it under ESLint.

  </Tab>
</Tabs>

### Configs

| Config          | `no-raw-text`              | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | -------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                       | error                   | error                     | off                      | off                 |
| `strict`        | error (+ non-JSX literals) | error                   | error                     | error                    | off                 |
| `contract-only` | off                        | error                   | error                     | off                      | off                 |

`recommended` keeps `no-raw-text` at `warn` on purpose: pointing it at an existing codebase surfaces every untranslated string at once, which should not break your build on day one.

`enforce-adapter-import` is off by default — enable it explicitly if you want it.

`no-unused-content` is off in every config, `strict` included. It is the one rule that reads your Intlayer configuration and walks your source files from disk, so turning it on should be a deliberate choice rather than something a preset does for you.

## Rules

### `no-raw-text`

Reports user-facing text that is not declared in a dictionary. It uses the same detection as `intlayer extract`, so brand names, CSS classes and technical identifiers are ignored.

```jsx
// ✗ Reported
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Fine
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Content declaration files (`*.content.ts`, …) are skipped.

To fix a whole file at once, run `npx intlayer extract` and let the compiler move the strings into a dictionary for you.

**Options**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Attributes whose value is user-facing text.
      // Default: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elements whose content is never user-facing text.
      // Default: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Regular expressions for text to never report.
      ignorePatterns: ["^Powered by"],

      // Also report string literals outside markup. Default: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Requires the dictionary key to be a string literal.

The compiler can only pre-load a dictionary when it can read the key directly at the call site. With a computed key it silently skips the optimization and bundles every dictionary instead.

```typescript
// ✗ Reported
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ A variable is still not a literal
const key = "home";
useIntlayer(key);

// ✓ Fine
useIntlayer("home");
getTranslations({ namespace: "home" });
```

This applies to `useIntlayer`, `getIntlayer` and every compat adapter (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Requires the field you read from a dictionary to be statically known.

The compiler removes fields it does not see used. A computed access is invisible to it, so the read can return `undefined` at runtime.

```typescript
// ✗ Reported
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Fine
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Prefers the `@intlayer/*` compat adapter over the original package. The original only resolves to Intlayer when the bundler alias is configured; the adapter always does. Autofixable with `--fix`.

```typescript
// ✗ Reported
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Fine
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Off by default.** Reports content nothing in your project reads, plus dictionary keys declared in more than one place.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Reported when no caller anywhere asks for "home"
  content: {
    title: t({ en: "Title" }),

    // ✗ Reported when nothing reads `hero`
    hero: {
      subtitle: t({ en: "Subtitle" }),
    },
  },
};
```

Unlike the other rules, this one cannot answer from the file in front of it — a field is unused only relative to the whole project. On the first content declaration of a lint run it loads your Intlayer configuration, globs the source files that configuration declares (`build.traversePattern`, `compiler.transformPattern`) and runs the same usage analyser that powers `@intlayer/lsp` and the "unused" strikethrough in the VS Code extension. The result is cached for `cacheTtl` milliseconds, so the scan happens once per run rather than once per file.

**Options**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Report dictionary keys nothing references. Default: true
      reportUnusedDictionaries: true,

      // Report content fields nothing reads. Default: true
      reportUnusedFields: true,

      // Report keys declared in more than one place. Default: true
      reportDuplicateKeys: true,

      // Regular expressions for field paths to never report.
      ignoreFields: ["^meta"],

      // Project root the scan starts from. Default: ESLint's working directory
      baseDir: process.cwd(),

      // How long one project scan is reused, in ms. Default: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Lower `cacheTtl` when you lint from a long-lived editor server and want your edits reflected sooner; set `baseDir` when a single lint run spans several Intlayer projects in a monorepo.

> **It errs towards silence.** A false positive here deletes a translation, so nothing is reported when the dictionary is consumed in a way the analysis cannot follow: the content object passed on as a whole, a translator function bound from it (`const t = useTranslations("home")`), a declaration reached through a direct import (`useDictionary(myDictionary)`), a `nest()` from another dictionary, or a field list made non-exhaustive by a spread. Single-file components (`.vue`, `.svelte`, `.astro`) count as using every field of the dictionaries they mention, because their script blocks are not parsed here.

`reportDuplicateKeys` reads the unmerged dictionaries the build writes under `.intlayer/`, so it stays quiet until the project has been built at least once. Two declarations sharing a key are merged, which is a legitimate pattern — the report exists because a field defined on both sides silently keeps only one of the two values.

The analyser is loaded from `@intlayer/lsp`, which ships as ESM. The rule therefore needs a Node version that can `require()` an ES module — Node 20.19+ or 22.12+. On anything older it reports nothing rather than failing the lint run.

## Frameworks

Every rule works across all Intlayer integrations, including inside Vue, Svelte and Angular templates. You only need to tell ESLint which parser reads each file type.

| Framework                 | Files             | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular templates         | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Install only the parsers your project needs.

> **Known limitation.** In Vue and Angular templates, an expression such as `{{ content[key] }}` is not checked by `no-dynamic-field-access`. Dynamic reads written in the script block are caught normally.
