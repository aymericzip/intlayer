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
---

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
        "es": "Este es un exemple de contenu",
      },
    },
  },
}
```

Afterwards, both declaration files will be merged into a single dictionary, accessible using the standard `useIntlayer("example")` hook (React) / composable (Vue).

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

## Doc History

| Version | Date       | Changes                     |
| ------- | ---------- | --------------------------- |
| 6.0.0   | 2025-09-20 | Add global configuration    |
| 6.0.0   | 2025-09-17 | Add `{{fileName}}` variable |
| 5.5.10  | 2025-06-29 | Initialise history          |
