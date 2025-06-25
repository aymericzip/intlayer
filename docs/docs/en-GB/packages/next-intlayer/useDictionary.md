---
docName: package__next-intlayer__useDictionary
url: https://intlayer.org/doc/packages/next-intlayer/useDictionary
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useDictionary.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useDictionary Hook Documentation | next-intlayer
description: See how to use the useDictionary hook for next-intlayer package
keywords:
  - useDictionary
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# React Integration: `useDictionary` Hook Documentation

This section provides detailed guidance on using the `useDictionary` hook within React applications, enabling efficient handling of localised content without a visual editor.

## Importing `useDictionary` in React

The `useDictionary` hook can be integrated into React applications by importing it based on the context:

- **Client Component:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Used in client-side React components
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Used in client-side React components
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Used in client-side React components
  ```

- **Server Component:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Used in server-side React components
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Used in server-side React components
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Used in server-side React components
  ```

## Parameters

The hook accepts two parameters:

1. **`dictionary`**: A declared dictionary object containing localised content for specific keys.
2. **`locale`** (optional): The desired locale. Defaults to the current context's locale if not specified.

## Dictionary

All dictionary objects should be declared in structured content files to ensure type safety and prevent runtime errors. You can find the setup instructions [here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/get_started.md). Here's an example of content declaration:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## Example Usage in React Client Component

Below is an example of how to use the `useDictionary` hook in a React component:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Example Usage in React Server Component

If you're using the `useDictionary` hook outside the `IntlayerServerProvider`, the locale must be explicitly provided as a parameter when rendering the component:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Notes on Attributes

Unlike integrations using visual editors, attributes like `buttonTitle.value` do not apply here. Instead, directly access the localised strings as declared in your content.

```jsx
<button title={content.title}>{content.content}</button>
```

## Additional Tips

- **Type Safety**: Always use `Dictionary` to define your dictionaries to ensure type safety.
- **Localisation Updates**: When updating content, ensure all locales are consistent to avoid missing translations.

This documentation focuses on the integration of the `useDictionary` hook, providing a streamlined approach to managing localised content without relying on visual editor functionalities.
