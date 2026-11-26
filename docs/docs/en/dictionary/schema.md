---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Validate Dictionaries with Schemas (Zod)"
description: "Declare Zod schemas in intlayer.config.ts and attach them to your dictionaries to validate every locale at build time and type the content in your editor."
keywords:
  - Schema
  - Zod
  - Validation
  - Dictionary
  - Content Declaration
  - Type Safety
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Init doc"
author: aymericzip
---

# Validate Dictionaries with Schemas

A schema describes the expected shape of a dictionary content. You declare it once in `intlayer.config.ts`, give it a name, then attach that name to any dictionary with the `schema` field.

Intlayer then:

- **Validates** the dictionary for every locale when it builds the dictionaries, and reports each issue with its locale and field path.
- **Types** the dictionary content in your editor, so a missing or mistyped field is caught before the build.

Schemas are useful when several dictionaries must share the same structure (SEO metadata, product cards, CMS-like entries), or when content must respect constraints that TypeScript cannot express, such as a maximum length on every translation.

<AccordionGroup>
<Accordion header="Markdown frontmatter">

Validate frontmatter fields such as `title`, `description`, `date`, and `tags` before rendering Markdown. Required fields and expected types are checked during dictionary building, so malformed metadata is reported with its locale and field path.

</Accordion>
<Accordion header="Page SEO metadata">

Validate metadata used to render page titles, descriptions, canonical URLs, social images, and indexing directives. A schema can require a title between 1 and 60 characters, limit descriptions to 160 characters, and check that URLs are valid. Invalid locale content is rejected before it can cause a page rendering error.

</Accordion>
<Accordion header="Shared structured content">

Attach one schema to dictionaries that share a content contract, such as product entries, navigation items, or email templates. A missing field or a value with the wrong type invalidates that dictionary during the build, helping keep inconsistent content out of the application.

</Accordion>
</AccordionGroup>

<Steps>
<Step number={1} title="Declare schemas in the configuration">

Install [Zod](https://zod.dev):

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

Then declare your schemas under the `schemas` key. Each key is the name you will reference from your dictionaries.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="Attach a schema to a dictionary">

Set the `schema` field of a dictionary to one of the names declared in the configuration.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

The same schema can be attached to as many dictionaries as you need.

</Step>
<Step number={3} title="Build and read the report">

Validation runs every time Intlayer builds the dictionaries: with `npx intlayer build`, or through your bundler plugin in dev and build mode. If a translation breaks the schema, Intlayer logs the locale, the field path and the Zod message:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

A one-off `intlayer build` fails when a schema is unknown or validation fails. In watch mode, an invalid dictionary is left out until its content is fixed.

</Step>
</Steps>

## Type the content from the schema

The generic parameters of `Dictionary` control how strictly TypeScript checks a dictionary:

| Declaration                                             | `schema` field                             | `content` field                         |
| ------------------------------------------------------- | ------------------------------------------ | --------------------------------------- |
| `satisfies Dictionary`                                  | Autocompleted, an unknown name is an error | Not checked by TypeScript               |
| `satisfies Dictionary<undefined, "seo-metadata">`       | Must be `"seo-metadata"`                   | Typed from the schema                   |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | Must be `"seo-metadata"`                   | Typed from the schema and your own type |

With a typed schema, each field accepts either a plain value or a content node that produces that value, so `t()` stays allowed:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer generates these types from your Zod schemas in `.intlayer/types` each time it builds the dictionaries. Only the shape is typed: constraints such as `.min()`, `.max()` or `.regex()` are checked at build time.

## What is validated

For each locale listed in `internationalization.locales`, Intlayer resolves the dictionary content for that locale, then validates the result. The schema therefore describes the final value of a field (`title: string`), not the `t()` node that holds the translations.

- **Missing translations**: with the default `strictMode`, a missing translation falls back to the default locale before validation. With `strictMode: "strict"`, a missing translation makes a required field fail.
- **Other content nodes**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` and `insert()` resolve to functions, and `md()` or `html()` resolve to nodes. Declare these fields with `z.any()`, and keep the constraints on fields that resolve to plain values.
- **Not validated**: content provided by a function or a Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md)), and dictionaries pulled from the [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

## Using another validation library

The `schemas` entries are not tied to Zod. Any object exposing a Zod compatible `safeParse(data)` method works, as long as it returns `{ success: true }` or `{ success: false, error: { issues } }`, where each issue has a `path` array and a `message`. Content typing is only generated from Zod schemas: with another library, the content of the attached dictionaries is typed as `any`.

## Frequently Asked Questions

<FAQ>

<Question title="Does a schema error stop my build?">

A one-off `intlayer build` fails when a dictionary does not match its schema. In watch mode, Intlayer logs the issues and excludes the invalid dictionary until you fix and save it.

</Question>
<Question title="Can several dictionaries share the same schema?">

Yes. A schema is referenced by name, so any number of dictionaries can point to it. This is the main use case: enforcing one structure across every page metadata, product entry or email template.

</Question>
<Question title="What happens if the schema name does not exist?">

TypeScript reports it as soon as at least one schema is declared, because the `schema` field only accepts the declared names. For JSON content, Intlayer reports an unknown name during the build and rejects the dictionary.

</Question>
<Question title="Is every locale validated, or only the default one?">

Every locale listed in `internationalization.locales`. The report names the failing locale, so a translation that is too long in German only is easy to spot.

</Question>

</FAQ>

## Related

- [Content declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [Translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
