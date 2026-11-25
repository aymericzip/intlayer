---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "Collections: Localised Lists by Position or ID"
description: "Build localised lists in Intlayer from one content file per item: FAQs, blog posts or database records, selected by position or ID, with metadata for list pages."
keywords:
  - Collections
  - Content List
  - Database ID
  - Dynamic Content
  - Intlayer
  - Internationalisation
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "Add item `metadata`, the `metadataOnly` selector and string item ids"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Release of the collection dictionaries feature"
author: aymericzip
---

# Collections: Localised Lists of Items

A **collection** is a set of content files that share one dictionary `key`, each declaring a different `item`. Intlayer merges them at build time into a list you read whole or item by item. An item is identified by a position (`1`, `2`…) or a string ID, such as a database record ID.

## Table of Contents

<TOC />

## Declaring items

Each file is one item:

```ts fileName="faq.1.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 1,
  content: {
    question: t({ en: "What is Intlayer?", fr: "Qu'est-ce qu'Intlayer ?" }),
    answer: t({ en: "An i18n toolkit.", fr: "Une boîte à outils i18n." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="faq.2.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 2,
  content: {
    question: t({ en: "Is it free?", fr: "Est-ce gratuit ?" }),
    answer: t({ en: "Yes, open-source.", fr: "Oui, open-source." }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Items identified by a string ID

When items come from a database or a CMS, use the record ID as `item`:

```ts fileName="src/products/desk-lamp.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "products",
  item: "6620d4e8a1b2c3d4e5f60718",
  content: {
    name: t({ en: "Desk lamp", fr: "Lampe de bureau" }),
  },
} satisfies Dictionary;

export default dictionary;
```

- **Order**: the full list returns numeric items by value, then string IDs by character code, so MongoDB ObjectIds and UUIDv7 list in creation order.
- **Numbers as text**: `item: "2"` and `item: 2` are the same item. `"007"` stays a string ID.
- **Markdown frontmatter**: quote IDs that YAML reads as numbers. Unquoted, `0012` becomes `12` and `123e4567` becomes `Infinity`.
- **Letter case**: with `importMode: "dynamic"`, avoid IDs that differ only by case (`abc` and `ABC`). They collide on macOS and Windows file systems.

### Shared content across items

A file with the same `key` and no `item` holds content shared by every item. Each item is completed with it, and keeps its own value when both declare a field:

```ts fileName="faq.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  content: {
    contactLabel: t({
      en: "Still stuck? Contact us",
      fr: "Toujours bloqué ? Contactez-nous",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

Every item of `useIntlayer("faq")` now has `question`, `answer` and `contactLabel`.

## Reading a collection

### All items

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "react-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "next-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="FAQ.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const items = useIntlayer("faq");
    </script>

    <template>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <strong>{{ item.question }}</strong>
          <p>{{ item.answer }}</p>
        </li>
      </ul>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="FAQ.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const items = useIntlayer("faq");
    </script>

    <ul>
      {#each $items as item}
        <li>
          <strong>{item.question}</strong>
          <p>{item.answer}</p>
        </li>
      {/each}
    </ul>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "preact-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { For } from "solid-js";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          <For each={items()}>
            {(item) => (
              <li>
                <strong>{item.question}</strong>
                <p>{item.answer}</p>
              </li>
            )}
          </For>
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="faq.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-faq",
      template: `
        <ul>
          @for (item of items(); track $index) {
            <li>
              <strong>{{ item.question }}</strong>
              <p>{{ item.answer }}</p>
            </li>
          }
        </ul>
      `,
    })
    export class FAQComponent {
      items = useIntlayer("faq");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="faq.js"
    import { useIntlayer } from "vanilla-intlayer";

    const faq = useIntlayer("faq");

    faq.forEach((item) => {
      console.log(item.question);
      console.log(item.answer);
    });
    ```

  </Tab>
</Tabs>

### One item

```tsx
// By position
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// By ID
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// With an explicit locale
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

An `item` that no file declares returns `null`, so a detail page can render its not-found state.

## Item metadata

Each item can declare `metadata`: plain data (title, date, tags…) kept apart from its content and returned as declared. A list page reads the metadata of every item without loading the items, which keeps a blog of 1,000 posts fast.

In a `.content.md` file, the frontmatter becomes the metadata, except the dictionary settings (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). Declare one file per locale to translate it:

```md fileName="src/blog/first-post.en.content.md"
---
key: blog
locale: en
item: 65f1c0a2b3c4d5e6f7a8b9c0
id: 65f1c0a2b3c4d5e6f7a8b9c0
title: First post
---

# First post
```

`item` is not part of the metadata, so `id` repeats it to link each list entry to its page.

In a `.content.ts` file, set the `metadata` field, such as `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. On a multilingual declaration, it applies to every locale.

In the visual editor and the CMS, the **Metadata** tab of a dictionary edits these fields and saves them back to the declaration file.

### List and detail pages

`metadataOnly: true` reads the metadata, `item` reads one item's content:

```tsx fileName="BlogList.tsx"
import { useIntlayer } from "react-intlayer";

export const BlogList = () => {
  const posts = useIntlayer("blog", { metadataOnly: true });

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <a href={`/blog/${post.id}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  );
};
```

```tsx fileName="BlogPost.tsx"
import { useIntlayer } from "react-intlayer";

export const BlogPost = ({ postId }: { postId: string }) => {
  const post = useIntlayer("blog", { item: postId });

  if (!post) return <p>Post not found</p>;

  return <article>{post}</article>;
};
```

Combine both to read one item's metadata, for example in the page `<head>`: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## Loading items on demand

With `importMode: "dynamic"` on the item files, each item ships as its own chunk per locale:

- `{ item }` loads that item only.
- The full list loads every item, in parallel.
- `{ metadataOnly: true }` on the full list loads a single metadata index, never the items.

Static and dynamic modes return the same values. `importMode: "fetch"` does not support collections yet: they fall back to static imports, with a build warning. See [bundle optimisation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md) for the import modes.

## Combining with variants

Items can also declare a `variant` (see [Variants](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dynamic_dictionaries/variants.md)). Every item file of the key then declares both `item` and `variant`:

```tsx
// Items declared for "promo", each completed with its "default" version
const promoItems = useIntlayer("banner", { variant: "promo" });

// One item of the "promo" variant
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

An item with no `promo` declaration is left out of the `promo` list.

## Typical use-cases

- FAQ lists
- Pricing tiers
- Carousel and slider slides
- Step-by-step instructions
- Blog posts
- Records from a database or a CMS, by ID
