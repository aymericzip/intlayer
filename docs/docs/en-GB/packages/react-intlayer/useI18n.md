---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useI18n Hook Documentation | react-intlayer
description: Learn how to use the useI18n hook in the react-intlayer package
keywords:
  - useI18n
  - i18n
  - translation
  - dictionary
  - Intlayer
  - internationalisation
  - documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
history:
  - version: 6.0.0
    date: 29-06-2025
    changes: Initial writing of `useI18n` hook documentation
---

# React Integration: `useI18n` Hook Documentation

This section provides detailed guidance on how to use the `useI18n` hook within React applications, enabling efficient content localisation.

## Importing `useI18n` in React

The `useI18n` hook can be imported and integrated into React applications according to the context as follows:

- **Client Components:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // Use in client-side React components
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // Use in client-side React components
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // Use in client-side React components
  ```

- **Server Components:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // Use in server-side React components
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // Use in server-side React components
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // Use in server-side React components
  ```

## Parameters

This hook accepts two parameters:

1. **`namespace`**: A dictionary namespace to scope the translation keys.
2. **`locale`** (optional): The desired locale. If not specified, the context's locale will be used as default.

## Dictionary

All dictionary keys must be declared within content declaration files to enhance type safety and prevent errors. [Configuration instructions can be found here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/get_started.md).

## Usage Examples in React

Examples of using the `useI18n` hook within React components:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Display the title */}
      <p>{t("description")}</p> {/* Display the description */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Display the title */}
      <p>{t("description")}</p> {/* Display the description */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Display the title */}
      <p>{t("description")}</p> {/* Display the description */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Display the title */}
      <p>{t("description")}</p> {/* Display the description */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Display the title */}
      <p>{t("description")}</p> {/* Display the description */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## Attribute Handling

When localising attributes, access the translation values appropriately:

```jsx
<button title={t("buttonTitle.value")}>{t("buttonText")}</button>;

{
  /* For accessibility attributes (e.g., aria-label), use .value since pure strings are required */
}
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>;
```

## Additional Resources

- **Intlayer Visual Editor**: For a more intuitive content management experience, refer to the visual editor documentation [here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md).

This section specifically covers the integration of the `useI18n` hook in React applications, simplifying the localisation process and ensuring content consistency across different locales.
