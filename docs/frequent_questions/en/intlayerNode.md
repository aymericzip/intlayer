---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: IntlayerNode type. What is it?
description: What is it the IntlayerNode type? Why my string is transformed as an IntlayerNode<string>?
keywords:
  - Introduction
  - Get started
  - Intlayer
  - Application
  - Packages
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Init doc"
---

# What is the IntlayerNode type?

The `IntlayerNode<T>` type is a special type provided by intlayer's packages such as `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` and `vanilla-intlayer`.

## Example of usage

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // returns type: IntlayerNode<string>
};
```

  </Tab>

// Todo add other framworks as tabs as for docs/docs/en/dictionary/markdown.md
</Tabs>

### Why Intlayer insert an IntlayerNode?

Intlayer insert an IntlayerNode to be able to render the visual editor Selectors in the context of the CMS / Visual Editor.

![Visual Editor demo](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

An IntlayerNode is an enriched React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla Node, but also to access the properties of the base primitive node.

For instance:

```js
const content = useIntlayer("app");

// Case of String
content.title; // Returns IntlayerNode<string>
content.title.value; // Returns the base content, here a string

content.title.toString(); // Returns string
content.title.toLowerCase(); // Returns string
String(content.title); // Returns string
content.title.toUpperCase(); // Returns uppercased string
content.title.replace("a", "b"); // Returns modified string
// ...
```

> Accessing the properties of an IntlayerNode will work, but will break the ability to display the selectors in the Visual Editor.

> The IntlayerNode can also wrap and number, or other types such as `IntlayerNode<number>`
