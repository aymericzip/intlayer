---
docName: package__next-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useIntlayer Hook Documentation | next-intlayer
description: See how to use the useIntlayer hook for next-intlayer package
keywords:
  - useIntlayer
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# Next.js Integration: `useIntlayer` Hook Documentation

The `useIntlayer` hook is tailored for Next.js applications to fetch and manage localized content efficiently. This documentation will focus on how to utilise the hook within Next.js projects, ensuring proper localisation practices.

## Importing `useIntlayer` in Next.js

Depending on whether you're working on client-side or server-side components in a Next.js application, you can import the `useIntlayer` hook as follows:

- **Client Component:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Used in client-side components
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Used in client-side components
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Used in client-side components
  ```

- **Server Component:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Used in server-side components
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Used in server-side components
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Used in server-side components
  ```

## Parameters

1. **`key`**: A string identifier for the dictionary key from which you want to retrieve content.
2. **`locale`** (optional): A specific locale to use. If omitted, the hook defaults to the locale set in the client or server context.

## Dictionary Files

It's crucial that all content keys are defined within content declaration files to prevent runtime errors and ensure type safety. This approach also facilitates TypeScript integration for compile-time validation.

Instructions for setting up content declaration files are available [here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/get_started.md).

## Example Usage in Next.js

Here's how you can implement the `useIntlayer` hook within a Next.js page to dynamically load localised content based on the application's current locale:

```tsx fileName="src/pages/{{locale}}/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/pages/{{locale}}/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Handling Attribute Localisation

To localise attributes such as `alt`, `title`, `href`, `aria-label`, etc., ensure you reference the content correctly:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Further Information

- **Intlayer Visual Editor**: Learn how to use the visual editor for easier content management [here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md).

This documentation outlines the use of the `useIntlayer` hook specifically within Next.js environments, providing a robust solution for managing localisation across your Next.js applications.
