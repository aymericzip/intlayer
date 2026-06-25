---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Auto Fill
description: Learn how to use auto fill functionality in Intlayer to automatically populate content based on predefined patterns. Follow this documentation to implement auto fill features efficiently in your project.
keywords:
  - Auto Fill
  - Content Automation
  - Dynamic Content
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: "Add global configuration"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Add `{{fileName}}` variable"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initialise history"
author: aymericzip
---

# Fill Content Declaration File Translations

**Autofill content declaration files** in your CI are a way to speed up your development workflow.

## Understanding the behaviour

The `fill` command includes two modes:

- **Complete**: Automatically fill all missing content for each locale and edit the current file, or another file if specified. That is, complete mode will skip the translation of existing content, if already translated.
- **Review**: Automatically fill **all** content for each locale and generate for a specific file, or another file if specified.

The fill command will process all your locale content declaration files. That is, it will not process your remote content from the CMS. The CMS includes its own translations management.
If you use plugins such as `@intlayer/sync-json-plugin`, Intlayer will transform the JSON files into locale content declaration files. That is, they will be processed by the `fill` command.

The new generated files include a `filled` instruction as dictionary metadata. This instruction will be used by Intlayer to know if the file has been autofilled or not, and skip this file from being translated again if present.

Intlayer will also consider the following instruction for autofill:

- From your `.content.{ts|js|json}` → `fill` instruction
- From your configuration file `.intlayer.config.ts` → `dictionary.fill` instruction
- Will be set to `true` by default otherwise

For per-locale content declaration files, the `true` instruction will be replaced by `./{{fileName}}.fill.content.json`. This is because a per-locale content declaration file cannot receive additional localised content. So it will generate a new file to not overwrite the existing file.

## Default Behavior

By default, `fill` is set to `true` globally, which means Intlayer will automatically fill all content files and edit the file itself. This behaviour can be customised in several ways:

### Global Configuration Options

1. **`fill: true` (default)** - Automatically fill all locales and edit the current file
2. **`fill: false`** - Disable auto-fill for this content file
3. **`fill: "./relative/path/to/file"`** - Create/update the specified file without editing the current one by pointing to a relative path resolved based on the location of the current file
4. **`fill: "/absolute/path/to/file"`** - Create/update the specified file without editing the current one by pointing to a relative path resolved based on the location of base directory (field `baseDir` in the configuration file `.intlayer.config.ts`)
5. **`fill: "C:\\absolute\path\to\file"`** - Create/update the specified file without editing the current one by pointing to an absolute path resolved based on your operating system
6. **`fill: { [key in Locales]?: string }`** - Create/update the specified file for each locale

### v7 Behaviour Changes

In v7, the `fill` command behaviour has been updated:

- **`fill: true`** - Rewrites the current file with filled content for all locales
- **`fill: "path/to/file"`** - Fills the specified file without modifying the current file
- **`fill: false`** - Disables auto-fill completely

When using a path option to write to another file, the fill mechanism works through a _master-slave_ relationship between content declaration files. The main (master) file serves as the source of truth, and when it's updated, Intlayer will automatically apply those changes to the derived (filled) declaration files specified by the path.

# Autofill Content Declaration File Translations

**Autofill content declaration files** are a way to speed up your development workflow.

The autofill mechanism works through a _master-slave_ relationship between content declaration files. When the main (master) file is updated, Intlayer will automatically apply those changes to the derived (autofilled) declaration files.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

Here is a [per-locale content declaration file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/per_locale_file.md) using the `autoFill` instruction.

Then, when you run the following command:

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer will automatically generate the derived declaration file at `src/components/example/example.content.json`, filling in all locales not already declared in the main file.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un exemple de contenu",
      },
    },
  },
}
```

Afterwards, both declaration files will be merged into a single dictionary, accessible using the standard `useIntlayer("example")` hook (React) / composable (Vue).

## Global Configuration

You can configure the global auto fill configuration in the `intlayer.config.ts` file.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Auto-generate missing translations for all dictionaries
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // auto-generate missing translations for all dictionaries like using "./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

You can still fine‑tune per dictionary using the `fill` field in content files. Intlayer will first consider the per dictionary configuration and then fallback to the global configuration.

## Autofilled File Format

The recommended format for autofilled declaration files is **JSON**, which helps to avoid formatting constraints. However, Intlayer also supports `.ts`, `.js`, `.mjs`, `.cjs`, and other formats.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Your content
  },
};
```

This will generate the file at:

```
src/components/example/example.filled.content.ts
```

> The generation of `.js`, `.ts`, and similar files works as follows:
>
> - If the file already exists, Intlayer will parse it using the AST (Abstract Syntax Tree) to locate each field and insert any missing translations.
> - If the file does not exist, Intlayer will generate it using the default content declaration file template.

## Absolute Paths

The `autoFill` field also supports absolute paths.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Your content
  },
};
```

This will generate the file at:

```
/messages/example.content.json
```

## Autogenerate Per-Locale Content Declaration Files

The `autoFill` field also supports the generation of **per-locale** content declaration files.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Your content
  },
};
```

This will generate two separate files:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> In this case, if the object does not contain all locales, Intlayer skips the generation of the remaining locales.

## Filter Specific Locale Autofill

Using an object for the `autoFill` field allows you to apply filters and generate only specific locale files.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Your content
  },
};
```

This will only generate the French translation file.

## Path Variables

You can use variables inside the `autoFill` path to dynamically resolve the target paths for the generated files.

**Available variables:**

- `{{locale}}` – Locale code (e.g. `fr`, `es`)
- `{{fileName}}` – File name (e.g. `index`)
- `{{key}}` – Dictionary key (e.g. `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Your content
  },
};
```

This will generate:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // Your content
  },
};
```

This will generate:

- `./index.content.json`
- `./index.content.json`
