---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Plural
description: Discover how to declare and use locale-aware plural content (CLDR-based) in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.
keywords:
  - Plural
  - Pluralization
  - CLDR
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Plural Content / Plural in Intlayer

## How Plural Works

In Intlayer, plural content is achieved through the `plural` function, which maps CLDR plural categories, `zero`, `one`, `two`, `few`, `many`, `other`, to their corresponding content. The correct category is selected automatically based on the active locale and a count value, using the platform's built-in [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) API.

Unlike [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration.md), which selects content based on numeric ranges you define yourself, `plural` delegates the selection to CLDR rules. This is what makes it scalable to languages with complex pluralization rules, such as Russian, Polish, Arabic, or Welsh, without having to hand-write modulo logic.

## When to Use `plural` vs `enu`

| Use case                                                                 | Helper   |
| ------------------------------------------------------------------------ | -------- |
| Locale-aware grammatical plural forms (one apple / two apples / 5 яблок) | `plural` |
| Custom numeric ranges (`<5`, `>=10`) or non-CLDR buckets                 | `enu`    |

If you only target English (which has just `one` / `other`), either works. For any language with `few` / `many` / `two` distinctions, prefer `plural`.

## Setting Up Plural Content

To set up plural content in your Intlayer project, create a content module that uses the `plural` helper. The `other` category is required and is used as the fallback when a locale doesn't define a more specific category.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      ru: plural({
        one: "{{count}} вакансия",
        few: "{{count}} вакансии",
        many: "{{count}} вакансий",
        other: "{{count}} вакансий",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "ru": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} вакансия",
            "few": "{{count}} вакансии",
            "many": "{{count}} вакансий",
            "other": "{{count}} вакансий"
          }
        }
      }
    }
  }
}
```

> The supported categories are `zero`, `one`, `two`, `few`, `many`, `other`. You only need to declare the categories your target language uses, Intlayer falls back to `other` when no specific category matches.
>
> The `{{count}}` placeholder is automatically replaced with the count you pass at runtime. You can include other placeholders too (see [Custom placeholders](#custom-placeholders) below).

## Using Plural Content with React Intlayer

To use plural content inside a React component, retrieve it via the `useIntlayer` hook and call it with a count. The active locale and the count are combined to pick the matching CLDR category.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* In English:                                  */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

You can call the returned function in two equivalent ways:

```tsx
totalOpenings(21); // shorthand: count only
totalOpenings({ count: 21 }); // explicit form
```

## Custom placeholders

Plural strings can include placeholders other than `{{count}}`. Pass them in the object form alongside `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, you have {{count}} new message",
      other: "{{name}}, you have {{count}} new messages",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, you have 1 new message"

summary({ count: 7, name: "Alice" });
// → "Alice, you have 7 new messages"
```

## CLDR Categories at a Glance

Different languages use different subsets of the CLDR categories. A few common cases:

| Language           | Categories used                              |
| ------------------ | -------------------------------------------- |
| English (`en`)     | `one`, `other`                               |
| French (`fr`)      | `one`, `many`, `other`                       |
| Russian (`ru`)     | `one`, `few`, `many`, `other`                |
| Polish (`pl`)      | `one`, `few`, `many`, `other`                |
| Arabic (`ar`)      | `zero`, `one`, `two`, `few`, `many`, `other` |
| Japanese / Chinese | `other` only                                 |

You don't need to memorize this, declare the categories you have translations for, and Intlayer will fall back to `other` when needed.

## Limitation

In comparison to other nodes, `plural` cannot be imbricated with children nodes yet.

Example:

Valid:

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

Invalid:

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## Additional Resources

For more detailed information on configuration and usage, refer to the following resources:

- [Enumeration Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration.md)
- [Insertion Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md)
- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

These resources offer further insights into the setup and usage of Intlayer across various environments and frameworks.
