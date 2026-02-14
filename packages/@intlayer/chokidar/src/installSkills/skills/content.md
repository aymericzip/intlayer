---
name: intlayer-content
description: Defines rich content structures using Intlayer content nodes. Use when the user asks to "create translations", "handle pluralization", "use markdown in content", or implement "conditional content".
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: @intlayer/mcp
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
  version: 8.1.2
---

# Intlayer Content Nodes

Intlayer provides various functions to define rich and dynamic content. Below is a reference for each node type.

## Translation (`t`)

Define multilingual content mapped to locales.

[Doc](https://intlayer.org/doc/concept/content/translation.md)

```typescript
import { t } from "intlayer";

const content = t({
  en: "Hello",
  fr: "Bonjour",
  es: "Hola",
});
```

## Enumeration (`enu`)

Map content to specific keys, numbers, or ranges (useful for pluralization).

[Doc](https://intlayer.org/doc/concept/content/enumeration.md)

```typescript
import { enu } from "intlayer";

const carCount = enu({
  "0": "No cars",
  "1": "One car",
  ">1": "Multiple cars",
  fallback: "Unknown amount",
});
```

## Condition (`cond`)

Define content based on a boolean condition.

[Doc](https://intlayer.org/doc/concept/content/condition.md)

```typescript
import { cond } from "intlayer";

const isLoggedIn = cond({
  true: "Welcome back!",
  false: "Please log in",
  fallback: "Status unknown", // Optional
});
```

## Markdown (`md`)

Define rich text using Markdown syntax.

[Doc](https://intlayer.org/doc/concept/content/markdown.md)

```typescript
import { md } from "intlayer";

const article = md("# Title\n\nSome **bold** text.");
```

## HTML (`html`)

Define HTML content, optionally with custom components.

[Doc](https://intlayer.org/doc/concept/content/html.md)

```typescript
import { html } from "intlayer";

const richText = html("<p>Hello <strong>World</strong></p>");
```

## Nesting (`nest`)

Reuse content from another dictionary.

[Doc](https://intlayer.org/doc/concept/content/nesting.md)

```typescript
import { nest } from "intlayer";

// Reference entire dictionary
const fullRef = nest("other_dictionary_key");

// Reference specific path
const partialRef = nest("other_dictionary_key", "path.to.value");
```

## Function Fetching

Execute logic to generate content (synchronous or asynchronous).

[Doc](https://intlayer.org/doc/concept/content/function-fetching.md)

```typescript
const computed = () => `Current time: ${new Date().toISOString()}`;

const fetched = async () => {
  const data = await fetch("/api/data").then((res) => res.json());
  return data.message;
};
```

## Gender (`gender`)

Define content based on gender ('male', 'female', etc.).

[Doc](https://intlayer.org/doc/concept/content/gender.md)

```typescript
import { gender } from "intlayer";

const greeting = gender({
  male: "Welcome sir",
  female: "Welcome madam",
  fallback: "Welcome",
});
```

---

[Content Overview](https://intlayer.org/doc/concept/content.md)
