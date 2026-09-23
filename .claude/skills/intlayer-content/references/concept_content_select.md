---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Select-Based Content
description: Learn how to use select-based content in Intlayer to dynamically display content based on an arbitrary string value. Follow this documentation to implement switch-like content efficiently in your project.
keywords:
  - Select-Based Content
  - Switch Content
  - ICU select
  - Dynamic Rendering
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
    changes: "Introduce select based content"
author: aymericzip
---

# Select-Based Content / Select in Intlayer

## How Select Works

In Intlayer, select-based content is achieved through the `select` function, which maps arbitrary string values to their corresponding content. It is the equivalent of an ICU `{value, select, …}` message, or of a `switch` statement in your application code.

Use `select` when the discriminant is a free-form string — a status, a plan, a platform, a role. For the other discriminants, Intlayer provides dedicated nodes:

| Discriminant           | Node       |
| ---------------------- | ---------- |
| A quantity             | `enu()`    |
| A boolean              | `cond()`   |
| A gender               | `gender()` |
| Any other string value | `select()` |

## Setting Up Select-Based Content

To set up select-based content in your Intlayer project, create a content module that includes your select definitions. Below are examples in various formats.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // Optional
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
        "fallback": "Unknown status", // Optional
      },
    },
  },
}
```

> If no `fallback` is declared, the last key declared will be taken as a fallback when the provided value matches no declared case — the same contract as `cond()` and `gender()`.

### Type safety

The accepted argument is inferred from the declared cases:

- Without a `fallback`, only the declared cases are accepted — a typo is a type error.
- With a `fallback`, any string is accepted (the fallback covers the unmatched values) while the declared cases still autocomplete.

## Why not a plain object?

It is tempting to declare a plain object and index it with the runtime value:

```tsx
// ❌ Do not do this
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

The Intlayer compiler analyses your source to prune unused content and minify the remaining keys. A dynamic computed access (`obj[expr]`) cannot be resolved statically, so the whole branch is marked opaque: it is kept in the bundle and its keys stay un-minified.

With `select()`, the case resolution happens inside a function call rather than as a property access. The compiler sees a single static field access and optimises the node exactly like `enu()`, `cond()` or `gender()`:

```tsx
// ✅ Do this
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Using Select-Based Content

<Tabs group="framework">
  <Tab label="React" value="react">

To utilize select-based content within a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This hook fetches the content for the specified key and allows you to pass in a value to select the appropriate output.

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
          publishStatus("archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To utilize select-based content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize select-based content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize select-based content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

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

To utilize select-based content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize select-based content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize select-based content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize select-based content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

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

## Combining Select with Other Nodes

Each case holds a full content node, so `select` composes with `t()`, `insert()`, `md()` and the others:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
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

Messages using the ICU `select` argument are imported as `select` nodes:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

becomes

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

The ICU `other` case is renamed to `fallback`, which is Intlayer's canonical name for a catch-all. The second argument records the ICU variable name so the message round-trips back to the exact same ICU string when exported.

> An ICU `select` whose cases are gender values (`male` / `female` / `other`) is imported as a [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/gender.md) node instead.

## Additional Resources

For more detailed information on configuration and usage, refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

These resources offer further insights into the setup and usage of Intlayer across various environments and frameworks.
