---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: useDictionary Hook - React Intlayer Documentation
description: Complete guide for using the useDictionary hook in React applications with Intlayer for efficient handling of localised content without visual editor.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localisation
  - i18n
  - dictionary
  - translation
slugs:
  - doc
  - package
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Initial history
---

# React Integration: `useDictionary` Hook Documentation

This section provides detailed guidance on using the `useDictionary` hook within React applications, enabling efficient handling of localised content without a visual editor.

## Importing `useDictionary` in React

The `useDictionary` hook can be integrated into React applications by importing it based on the context:

- **Client Component:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Used in client-side React components
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Used in client-side React components
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Used in client-side React components
  ```

- **Server Component:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Used in server-side React components
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Used in server-side React components
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Used in server-side React components
  ```

## Parameters

The hook accepts two parameters:

1. **`dictionary`**: A declared dictionary object containing localised content for specific keys.
2. **`locale`** (optional): The desired locale. Defaults to the current context's locale if not specified.

## Dictionary

All dictionary objects should be declared in structured content files to ensure type safety and prevent runtime errors. You can find the [setup instructions here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/get_started.md). Here's an example of content declaration:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      "en-GB": "Client Component Example",
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      "en-GB": "This is the content of a client component example",
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      "en-GB": "Client Component Example",
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      "en-GB": "This is the content of a client component example",
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      "en-GB": "Client Component Example",
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      "en-GB": "This is the content of a client component example",
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en-GB": "Client Component Example",
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en-GB": "This is the content of a client component example",
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente"
      }
    }
  }
}
```

## Example Usage in React

Below is an example of how to use the `useDictionary` hook in a React component:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Server Integration

If you are using the `useDictionary` hook outside the `IntlayerProvider`, the locale must be explicitly provided as a parameter when rendering the component:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Notes on Attributes

Unlike integrations using visual editors, attributes such as `buttonTitle.value` do not apply here. Instead, directly access the localised strings as declared in your content.

```jsx
<button title={content.title}>{content.content}</button>
```

## Additional Tips

- **Type Safety**: Always use `Dictionary` to define your dictionaries to ensure type safety.
- **Localisation Updates**: When updating content, ensure all locales are consistent to avoid missing translations.

This documentation focuses on the integration of the `useDictionary` hook, providing a streamlined approach to managing localised content without relying on visual editor functionalities.
