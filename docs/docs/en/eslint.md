---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint Plugin | Lint rules for Intlayer
description: Catch hardcoded strings and dynamic calls the Intlayer compiler cannot optimize, with eslint-plugin-intlayer. Works with ESLint and oxlint, across React, Vue, Svelte, Angular and Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Internationalization
  - no-raw-text
  - Hardcoded strings
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

`eslint-plugin-intlayer` catches the two kinds of i18n mistake TypeScript cannot:

1. **Hardcoded text** that never made it into a dictionary.
2. **Dynamic calls** that type-check and run, but that the Intlayer compiler cannot optimize.

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

Requires ESLint 9 or later (flat config).

## Usage

The plugin runs in both ESLint and [oxlint](https://oxc.rs) — the same rules, the same options.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Or enable rules one by one:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
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

  </Tab>
</Tabs>

### Configs

| Config          | `no-raw-text`              | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | -------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                       | error                   | error                     | off                      |
| `strict`        | error (+ non-JSX literals) | error                   | error                     | error                    |
| `contract-only` | off                        | error                   | error                     | off                      |

`recommended` keeps `no-raw-text` at `warn` on purpose: pointing it at an existing codebase surfaces every untranslated string at once, which should not break your build on day one.

`enforce-adapter-import` is off by default — enable it explicitly if you want it.

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

```javascript fileName="eslint.config.mjs" codeFormat="esm"
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

```javascript fileName="eslint.config.mjs" codeFormat="esm"
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
