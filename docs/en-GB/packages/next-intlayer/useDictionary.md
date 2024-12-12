# React Integration: `useDictionary` Hook Documentation

This section provides detailed guidance on using the `useDictionary` hook within React applications, enabling efficient handling of localized content without a visual editor.

## Importing `useDictionary` in React

The `useDictionary` hook can be integrated into React applications by importing it based on the context:

- **Client Component:**

  ```javascript
  import { useDictionary } from "next-intlayer"; // Used in client-side React components
  ```

- **Server Component:**

  ```javascript
  import { useDictionary } from "next-intlayer/server"; // Used in server-side React components
  ```

## Parameters

The hook accepts two parameters:

1. **`dictionary`**: A declared dictionary object containing localized content for specific keys.
2. **`locale`** (optional): The desired locale. Defaults to the current context's locale if not specified.

## Content Declaration

All dictionary objects should be declared in structured content files to ensure type safety and prevent runtime errors. You can find the setup instructions [here](https://github.com/aymericzip/intlayer/blob/main/docs/en/content_declaration/get_started.md). Here's an example of content declaration:

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
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
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## Example Usage in React

Below is an example of how to use the `useDictionary` hook in a React component:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## Server Integration

If you're using the `useDictionary` hook outside the `IntlayerServerProvider`, the locale must be explicitly provided as a parameter when rendering the component:

```tsx
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## Notes on Attributes

Unlike integrations using visual editors, attributes like `buttonTitle.value` do not apply here. Instead, directly access the localized strings as declared in your content.

```tsx
<button title={content.title}>{content.content}</button>
```

## Additional Tips

- **Type Safety**: Always use `DeclarationContent` to define your dictionaries to ensure type safety.
- **Localization Updates**: When updating content, ensure all locales are consistent to avoid missing translations.

This documentation focuses on the integration of the `useDictionary` hook, providing a streamlined approach to managing localized content without relying on visual editor functionalities.
