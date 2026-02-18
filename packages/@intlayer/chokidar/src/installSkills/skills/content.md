---
name: intlayer-content
description: Define rich content structures using Intlayer content nodes. Use when the user asks to "create translations", "handle pluralization", "use markdown in content", or implement "conditional content".
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Content Nodes

Define rich and dynamic content using Intlayer functions. Use the reference below for each node type.

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

Find locales to declare in config file. Supported configuration files:

- `intlayer.config.{ts|js|json|json5|jsonc|cjs|mjs}`
- `.intlayerrc`

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

## Insertion (`insert`)

Define dynamic content with variables.

[Doc](https://intlayer.org/doc/concept/content/insertion.md)

```typescript
import { insert } from "intlayer";

const welcome = insert("Hello {{name}}!");
```

## File (`file`)

Reference external files as content.

[Doc](https://intlayer.org/doc/concept/content/file.md)

```typescript
import { file } from "intlayer";

const myFile = file("./path/to/file.txt");
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

### Example Directory Structure (react)

```
src/
├── components/
│   ├── MyComponent/
│   │   ├── index.content.ts          # Content declaration
│   │   └── index.tsx                 # Component
│   ├── myOtherComponent.content.ts   # Content declaration
│   └── MyOtherComponent.tsx          # Component
```

### Content Templates

_TypeScript (.content.ts)_

```typescript
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component-key",
  content: {
    title: "...",
  },
} satisfies Dictionary;

export default content;
```

_TypeScript with React (.content.tsx)_

```tsx
import { t, type Dictionary } from "intlayer";
import { ReactNode } from "react";

const content = {
  key: "my-component-key",
  content: {
    title: <>My React Node</>,
  },
} satisfies Dictionary;

export default content;
```

```json
{
  "key": "my-component-key",
  "content": {
    "title": "..."
  }
}
```

```javascript
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} **/
const content = {
  key: "my-component-key",
  content: {
    title: "...",
  },
};

export default content;
```

## Content declaration combination

Nodes can be imbricated for complex logic.

```tsx
import {
  cond,
  enu,
  file,
  gender,
  insert,
  html,
  md,
  nest,
  t,
  type Dictionary,
} from "intlayer";

const content = {
  key: "test",
  title: "Test component content",
  description:
    "Content declarations for the Test component, including examples of plurals, conditions, gender-specific messages, dynamic insertions, markdown, file-based content and nested dictionaries used for demonstration and testing purposes.",
  content: {
    baseContent: "Intlayer", // Content that no need to be i18n
    welcomeMessage: t({
      en: "Welcome to our application",
      "en-GB": "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
      // ... All other locales set in intlayer config file
    }),
    numberOfCar: enu({
      // Check all conditions in other
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">19": "Many cars",
      ">5": "Some cars", // Will never will triggered, because >5 is included between 1 and >19
      fallback: "Fallback value", // Optional but avoid undefined type
    }),
    myCondition: cond({
      true: "my content when it's true",
      false: "my content when it's false",
      fallback: "my content when the condition fails", // Optional but avoid undefined type
    }),
    myGender: gender({
      male: "my content for male users",
      female: "my content for female users",
      fallback: "my content when gender is not specified", // Optional but avoid undefined type
    }),
    myInsertion: insert(
      "Hello, my name is {{name}} and I am {{age}} years old!"
    ),
    myMultilingualInsertion: insert(
      t({
        ar: "مرحبا, اسمي {{name}} وأنا {{age}} سنة!",
        de: "Hallo, mein Name ist {{name}} und ich bin {{age}} Jahre alt!",
        en: "Hello, my name is {{name}} and I am {{age}} years old!",
        "en-GB": "Hello, my name is {{name}} and I am {{age}} years old!",
      })
    ),
    myTextFile: file("./test.txt"), // File helps to know where is located the file
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
    fullNested: nest("code"),
    // References a specific nested value:
    partialNested: nest("code", "title"),
    myMarkdown: md("## My title \n\nLorem Ipsum"),
    myMarkdownFile: md(file("./test.md")),
    multilingualMarkdown: t({
      en: md("## test en"),
      fr: md("## test fr"),
      es: md("## test es"),
      "en-GB": md("## test en-GB"),
    }),
    myHTML: html("<h2>My title</h2><p>Lorem Ipsum</p>"),
    myHTMLFile: html(file("./test.html")),

    arrayContent: ["string", "string2", "string3"],
    arrayOfObject: [
      {
        name: "item1",
        description: "description1",
      },
      {
        name: "item2",
        description: "description2",
      },
    ],
    objectOfArray: {
      array: ["item1", "item2", "item3"],
      object: {
        name: "object name",
        description: "object description",
      },
    },
  },
  tags: ["test", "test page"],
} satisfies Dictionary;

export default content;
```

## Type validation of dictionary

```ts
Dictionary<{ title: string; description?: string }>; // Generic describing content type for formatted data (metadata, etc)
```

## Key Dictionary Fields for AI Management

Core Metadata

- key: The identifier for the dictionary (e.g., `about-page-meta`). AI can ensure consistent naming conventions.
- title: A human-readable name for identification in the CMS or editor.
- description: Provides context for the dictionary. AI uses this to understand the purpose and generate better translations or content.
- tags: Categorization strings (e.g., `metadata`, `SEO`) to help organize and filter dictionaries.

Content & Localization

- locale: Specifies the language of the content for (per-locale file)[https://intlayer.org/doc/concept/per-locale-file.md]
- contentAutoTransformation: A toggle to automatically convert raw strings into specialized formats like Markdown, HTML, or Insertions (variables).
- fill: An instruction indicating whether the dictionary should be automatically populated by AI/automation tools.

Behaviorals Settings

- priority: A numeric value used to resolve conflicts during merge of dictionaries under a same key.
- importMode: Defines how content is loaded (`static`, `dynamic`, or `live`). AI can recommend the best mode based on performance needs.
- location: Controls CMS synchronization (`hybrid`, `remote`, `local`). AI can manage where the source of truth resides.
- schema: string that use zod schema declared in config file to validate data

## References

- [Content Overview](https://intlayer.org/doc/concept/content.md)
- [Exports intlayer package](https://intlayer.org/doc/packages/intlayer/exports.md)
