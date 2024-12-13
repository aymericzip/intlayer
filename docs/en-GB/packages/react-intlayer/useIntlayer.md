# React Integration: `useIntlayer` Hook Documentation

This section provides detailed guidance on using the `useIntlayer` hook within React applications, allowing for efficient content localization.

## Importing `useIntlayer` in React

The `useIntlayer` hook can be integrated into React applications by importing it based on the context:

- **Client Component:**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // Used in client-side React components
  ```

- **Server Component:**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // Used in server-side React components
  ```

## Parameters

The hook accepts two parameters:

1. **`key`**: The dictionary key to retrieve localized content.
2. **`locale`** (optional): The desired locale. Defaults to the context's locale if not specified.

## Content Declaration

All dictionary keys must be declared within content declaration files to enhance type safety and avoid errors. You can find the setup instructions [here](https://github.com/aymericzip/intlayer/blob/main/docs/en/content_declaration/get_started.md).

## Example Usage in React

Demonstrating the `useIntlayer` hook within a React component:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Handling Attributes

When localizing attributes, access the content values appropriately:

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Additional Resources

- **Intlayer Visual Editor**: For a more intuitive content management experience, refer to the visual editor documentation [here](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_editor.md).

This section specifically targets the integration of the `useIntlayer` hook in React applications, simplifying the localization process and ensuring content consistency across different locales.
