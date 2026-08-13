<!-- markdownlint-disable MD024 -->

# eslint-plugin-intlayer

ESLint rules for [Intlayer](https://intlayer.org) projects.

The plugin is deliberately small. Intlayer already reports most i18n mistakes
through other layers, and a rule that duplicates one of them only produces the
same squiggle three times:

| Mistake                 | Already reported by                                            |
| ----------------------- | -------------------------------------------------------------- |
| Unknown dictionary key  | TypeScript (`__DictionaryRegistry`) **and** `@intlayer/lsp`    |
| Unknown field path      | TypeScript (`__DictionaryRegistry`)                            |
| Missing required locale | TypeScript (`StrictModeLocaleMap`) **and** `intlayer test`     |
| Unused dictionary       | `intlayer test`, and the VS Code extension's inline decoration |

What is left are the two things neither the type system nor the language server
can see, and that is exactly what this plugin covers:

1. **Coverage** — user-facing copy that never made it into a dictionary.
   Types cannot know a string is meant for a human.
2. **The compiler contract** — call shapes that type-check and run, but that
   the Babel/SWC passes cannot analyse. These silently lose the optimize pass,
   or read a field the purge pass has stripped.

## Installation

```bash
npm install --save-dev eslint-plugin-intlayer
```

Requires ESLint 9 or later (flat config).

## Usage

```js
// eslint.config.js
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Or configure rules individually:

```js
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": ["warn", { includeStringLiterals: false }],
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
    },
  },
];
```

### Configs

| Config          | `no-raw-text`              | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | -------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                       | error                   | error                     | off                      | off                 |
| `strict`        | error (+ non-JSX literals) | error                   | error                     | error                    | off                 |
| `contract-only` | off                        | error                   | error                     | off                      | off                 |

`recommended` keeps `no-raw-text` at `warn` on purpose: pointing it at an
existing codebase surfaces every untranslated string at once, which should not
block a build on day one.

Use `contract-only` when translation coverage is already tracked by
`intlayer test` in CI and you only want the rules that protect the build output.

`no-unused-content` is off in every config, `strict` included. It is the one
rule that reads the Intlayer configuration and walks your source files from
disk, so enabling it should be a deliberate choice.

### Frameworks

Every rule works across all of Intlayer's integrations. The rules are
parser-agnostic; what differs is the parser ESLint needs to read each file type,
which you configure once:

| Framework                 | Files             | Parser                            | Text coverage | Contract rules |
| ------------------------- | ----------------- | --------------------------------- | ------------- | -------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               | ✅            | ✅             |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               | ✅            | ✅             |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               | ✅ template   | ✅ `<script>`  |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            | ✅ markup     | ✅ `<script>`  |
| Angular                   | `.ts`             | `typescript-eslint`               | ✅            | ✅             |
| Angular templates         | `.component.html` | `@angular-eslint/template-parser` | ✅            | n/a (no JS)    |
| Astro                     | `.astro`          | `astro-eslint-parser`             | ✅            | ✅ frontmatter |

`no-raw-text` understands each ecosystem's markup natively — Vue's `VText` /
`VAttribute` (reached through `defineTemplateBodyVisitor`), Svelte's
`SvelteText` / `SvelteAttribute`, Angular's `Text` / `TextAttribute`, and JSX's
`JSXText` / `JSXAttribute` — so a `<code>` block is skipped and a `placeholder`
is reported the same way in all of them. Vue directives (`:title="expr"`) and
Svelte interpolations are expressions, not copy, and are never reported.

The compiler-contract rules read the `<script>` block, which every one of these
parsers exposes as an ordinary ESTree program.

```js
// eslint.config.js
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  // React / Angular components / plain TS
  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },

  // Vue — the TS parser handles <script lang="ts">
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },

  // Svelte
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },

  // Angular templates
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Install only the parsers your project needs — they are peer-optional, and the
plugin never imports them.

**Known limitation.** In Vue and Angular templates, an expression such as
`{{ content[key] }}` is not checked by `no-dynamic-field-access`: the binding is
declared in the script block and used in a separate template AST, so the two
cannot be linked without type information. Dynamic reads written in the script
block are caught normally. `static-dictionary-key` is unaffected, because a
dictionary key is always passed in the script.

### With oxlint

Every rule targets the ESLint v9 API and none needs type information, so they
load in oxlint as-is:

```json
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error"
  }
}
```

Two caveats: oxlint's JS plugin support is still alpha, and it does not support
custom parsers — so `.vue`, `.svelte`, `.astro` and Angular templates are not
linted there. Use oxlint for the JS/TS/JSX files and keep ESLint for the rest.

## Rules

### no-raw-text

Reports user-facing strings that are not declared in a dictionary.

The predicate is `shouldExtract` from `@intlayer/config/extract` — the very same
heuristic `intlayer extract` uses — so what this rule reports is exactly what the
extractor would rewrite. Brand names, CSS class strings, technical identifiers
and code-shaped strings are filtered out.

```jsx
// ✗
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓
const { title } = useIntlayer('home');
<h1>{title}</h1>
```

Content declaration files (`*.content.ts`, and every extension in the project's
`content.fileExtensions`) are skipped — the copy lives there by definition.

The fix is usually not manual: run `npx intlayer extract` on the file.

**Options**

```ts
{
  /** JSX attributes whose value is copy. Default: title, placeholder, alt, aria-label, label. */
  attributes?: string[];
  /** Elements whose children are never copy. Default: code, pre, script, style. */
  ignoreElements?: string[];
  /** Regular-expression sources for text to never report. */
  ignorePatterns?: string[];
  /** Also report string literals outside JSX. Default: false. */
  includeStringLiterals?: boolean;
}
```

### static-dictionary-key

Requires the dictionary key of a content read to be a static string literal.

`babel-plugin-intlayer-optimize` (and its SWC equivalent) rewrites a call only
when it can read the key off the argument node. A computed key is left
untouched — no error, no warning, just a build that quietly stops tree-shaking
and bundles every dictionary.

```ts
// ✗ — invisible to the compiler
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ — a const still is not a literal at the call site
const key = "home";
useIntlayer(key);

// ✓
useIntlayer("home");
useIntlayer("home" as const);
getTranslations({ namespace: "home" });
```

The rule covers every caller in the shared registry — `useIntlayer`,
`getIntlayer`, and each compat adapter (`useTranslation`, `useTranslations`,
`formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …) — because a
dynamic key breaks usage analysis for all of them.

Callers that legitimately take no namespace (next-intl's root-scope
`useTranslations()`) are not reported.

### no-dynamic-field-access

Requires the field read from a dictionary to be statically known.

The purge pass strips fields it cannot see used. A computed access is a field it
cannot see, so the read may return `undefined` at runtime — a real bug, not just
a missed optimization.

```ts
// ✗
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓
content.title;
content["title"];
content.items[0];
t("hero.title");
```

Bindings are resolved through ESLint's scope analysis, so two components in the
same file that bind the same variable name to different dictionaries are tracked
independently.

### enforce-adapter-import

Prefers the `@intlayer/*` compat adapter over the original package specifier.

The original specifier only resolves to Intlayer when the bundler alias is
configured; the adapter always does. Autofixable.

```ts
// ✗
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

The mapping is derived from `@intlayer/config/callers`, so a library added to
the shared registry is covered here automatically.

### no-unused-content

Off by default. Reports dictionaries and content fields that nothing in the
project reads, plus keys declared in more than one place.

```ts
// home.content.ts
export default {
  key: "home", // ✗ unusedDictionary — no caller anywhere asks for "home"
  content: {
    title: t({ en: "Title" }),
    hero: {
      // ✗ unusedField — nothing reads `hero`
      subtitle: t({ en: "Subtitle" }),
    },
  },
};
```

Unlike the other rules, this one cannot answer from the file in front of it: a
field is unused only relative to the whole project. On the first content file of
a lint run it loads your Intlayer configuration, globs the source files it
declares (`build.traversePattern`, `compiler.transformPattern`) and runs the
same analyser `@intlayer/lsp` and the VS Code extension use. The result is cached
for `cacheTtl` milliseconds.

```js
{
  "intlayer/no-unused-content": ["warn", {
    reportUnusedDictionaries: true,  // dictionary keys nothing references
    reportUnusedFields: true,        // content fields nothing reads
    reportDuplicateKeys: true,       // keys declared in more than one place
    ignoreFields: ["^meta"],         // regexes for field paths to never report
    baseDir: process.cwd(),          // project root the scan starts from
    cacheTtl: 30000,                 // how long one scan is reused, in ms
  }],
}
```

It errs towards silence, because a false positive here deletes a translation.
Nothing is reported when the dictionary is consumed in a way the analysis cannot
follow — the content object passed on as a whole, a translator function bound
from it, a declaration reached through a direct import, a `nest()` from another
dictionary, or a field list made non-exhaustive by a spread. Single-file
components (`.vue`, `.svelte`, `.astro`) count as using every field of the
dictionaries they mention, since their script blocks are not parsed here.

`reportDuplicateKeys` reads the unmerged dictionaries the build writes to
`.intlayer/`, so it stays quiet until the project has been built at least once.

## How it stays in sync

The plugin reads the same two shared sources as the compiler and the language
server, rather than re-encoding what an Intlayer call looks like:

- `@intlayer/config/callers` — the caller registry consumed by `@intlayer/babel`,
  `@intlayer/swc`, `@intlayer/lsp` and every compat bundler plugin.
- `@intlayer/config/extract` — the `shouldExtract` heuristic and the extractable
  attribute list used by `intlayer extract`.

Adding a compat library to the registry therefore extends the rules for free.

## License

Apache-2.0
