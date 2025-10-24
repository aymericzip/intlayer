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
  - version: 7.0.0
    date: 2025-10-23
    changes: Rename `autoFill` to `fill` and update behavior
  - version: 6.0.0
    date: 2025-09-20
    changes: Add global configuration
  - version: 6.0.0
    date: 2025-09-17
    changes: Add `{{fileName}}` variable
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Fill Content Declaration File Translations

**Autofill content declaration files** in your CI are a way to speed up your development workflow.

## Default Behavior

By default, `fill` is set to `true` globally, which means Intlayer will automatically fill all content files and edit the file itself. This behavior can be customized in several ways:

### Global Configuration Options

1. **`fill: true` (default)** - Automatically fill all locales and edit the current file
2. **`fill: false`** - Disable auto-fill for this content file
3. **`fill: "path/to/file"`** - Create/update the specified file without editing the current one
4. **`fill: { [key in Locales]?: string }`** - Create/update the specified file for each locale

### v7 Behavior Changes

In v7, the `fill` command behavior has been updated:

- **`fill: true`** - Rewrites the current file with filled content for all locales
- **`fill: "path/to/file"`** - Fills the specified file without modifying the current file
- **`fill: false`** - Disables auto-fill completely

When using a path option to write to another file, the fill mechanism works through a _master-slave_ relationship between content declaration files. The main (master) file serves as the source of truth, and when it's updated, Intlayer will automatically apply those changes to the derived (filled) declaration files specified by the path.

### Per-Locale Customization

You can also customize the behavior for each locale by using an object:

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  content: {
    internationalization: {
      locales: [Locales.ENGLISH, Locales.FRENCH, Locales.POLISH],
      defaultLocale: Locales.ENGLISH,
      requiredLocales: [Locales.ENGLISH], // Recommended to avoid Property 'pl' is missing in type '{ en: string; xxx } on your t function if
    },
    fill: {
      en: true, // Fill and edit the current file for English
      fr: "./translations/fr.json", // Create separate file for French
      es: false, // Disable fill for Spanish
    },
  },
};
```

This allows you to have different fill behaviors for different locales within the same project.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  fill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

Here is a [per-locale content declaration file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md) using the `fill` instruction.

Then, when you run the following command:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
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
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Afterward, both declaration files will be merged into a single dictionary, accessible using the standard `useIntlayer("example")` hook (react) / composable (vue).

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
  content: {
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

The recommended format for autofilled declaration files is **JSON**, which helps avoid formatting constraints. However, Intlayer also supports `.ts`, `.js`, `.mjs`, `.cjs`, and other formats.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "./example.filled.content.ts",
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

The `fill` field also supports absolute paths.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/example.content.json",
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

The `fill` field also supports generation of **per-locale** content declaration files.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
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

> In this case, if the object does not contain all locales, Intlayer skip the generation of the remaining locales.

## Filter Specific Locale Autofill

Using an object for the `fill` field allows you to apply filters and generate only specific locale files.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Your content
  },
};
```

This will only generate the French translation file.

## Path Variables

You can use variables inside the `fill` path to dynamically resolve the target paths for the generated files.

**Available variables:**

- `{{locale}}` – Locale code (e.g. `fr`, `es`)
- `{{fileName}}` – File name (e.g. `index`)
- `{{key}}` – Dictionary key (e.g. `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/{{locale}}/{{key}}.content.json",
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
  fill: "./{{fileName}}.content.json",
  content: {
    // Your content
  },
};
```

This will generate:

- `./index.content.json`
- `./index.content.json`
