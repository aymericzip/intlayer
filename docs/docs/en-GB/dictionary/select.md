---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Select Content
description: Learn how to use select content in Intlayer to dynamically render content based on an arbitrary string value. Follow this documentation to implement switch-like content efficiently in your project.
keywords:
  - Select Content
  - Switch Content
  - ICU select
  - Dynamic rendering
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "Introduce select content"
author: aymericzip
---

# Select Content / Intlayer

## How Select Works

In Intlayer, select content is achieved through the `select` function, which maps arbitrary string values to their corresponding content. It is the equivalent of the ICU `{value, select, …}` message, or similar to a `switch` statement in your application's code.

Use `select` when the discriminant is an arbitrary string: such as a status, a plan, a platform, or a role. For other discriminants, Intlayer provides dedicated nodes:

| Discriminant     | Node       |
| ---------------- | ---------- |
| Quantity         | `enu()`    |
| Boolean          | `cond()`   |
| Gender           | `gender()` |
| Any other string | `select()` |

## Setting Up Select Content

To set up select content in your Intlayer project, create a content module that includes your select definitions. Below are examples in different formats.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // optional
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // optional
      },
    },
  },
}
```

> If no `fallback` is declared, the last declared key is considered as the fallback if the provided value does not match any of the declared cases: exactly the same as for `cond()` and `gender()` contracts.

### Type Safety

The accepted argument is inferred from the declared cases:

- Without a `fallback`, only the declared cases are accepted: a typo will result in a type error.
- With a `fallback`, any string is accepted (as the fallback covers unmatched values), whilst the declared cases still provide autocomplete.

## Why not use a regular object?

It could be tempting to declare a regular object and index it with the runtime value:

```tsx
// ❌ Do not do this
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

The Intlayer compiler parses your source code to eliminate unused content and minify the remaining keys. A dynamically computed access (`obj[expr]`) cannot be resolved statically, hence the entire branch is marked as opaque: it will be kept in the bundle, and its keys will not be minified.

By using `select()`, the case resolution happens inside a function call rather than a property access. The compiler sees it as a single, static field access and properly optimises the node exactly as it does for `enu()`, `cond()`, or `gender()`:

```tsx
// ✅ Do this
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Using Select Content

<Tabs group="framework">
  <Tab label="React" value="react">

To utilise select content in a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This hook fetches the content for the specified key and allows you to pass a value to select the appropriate output.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Output: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Output: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To utilise select content in Next.js Client Components, fetch the content via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

To utilise select content in Vue components, fetch the content via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To utilise select content in Svelte components, fetch the content via the `useIntlayer` hook. The store is accessed using `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To utilise select content in Preact components, fetch the content via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

To utilise select content in SolidJS components, fetch the content via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

To utilise select content in Angular components, fetch the content via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To utilise select content with `vanilla-intlayer`, fetch the content via the `useIntlayer` function. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// Initial render
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Composing Select with Other Nodes

Because each case is housing a complete content node, `select` can be combined with `t()`, `insert()`, `md()`, etc.:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          "en-GB": "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          "en-GB": "{{name}} published the post",
          fr: "{{name}} a publié l’article",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          "en-GB": "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Output: Alice saved a draft
```

## Migrating from ICU `select`

Messages using the ICU `select` argument are imported as a `select` node:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

Will become:

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

The ICU `other` case is renamed to `fallback`, which is the Intlayer canonical name for all catch-all cases. The second argument holds the ICU variable name so that when exported, the message reverts back to the exact same ICU string.

> Please note that ICU `select` messages where the cases are gender values (`male` / `female` / `other`) are imported as a [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/gender.md) node instead.

## Additional Resources

For more detailed information on configuration and usage, please refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md)
- [Intlayer React Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_create_react_app.md)
- [Intlayer Next.js Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_15.md)

These resources provide further insights into setting up and using Intlayer across various environments and frameworks.
