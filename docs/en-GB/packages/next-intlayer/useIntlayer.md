# Next.js Integration: `useIntlayer` Hook Documentation

The `useIntlayer` hook is tailored for Next.js applications to fetch and manage localized content efficiently. This documentation will focus on how to utilize the hook within Next.js projects, ensuring proper localization practices.

## Importing `useIntlayer` in Next.js

Depending on whether you're working on client-side or server-side components in a Next.js application, you can import the `useIntlayer` hook as follows:

- **Client Component:**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // Used in client-side components
  ```

- **Server Component:**

  ```tsx
  import { useIntlayer } from "next-intlayer/server"; // Used in server-side components
  ```

## Parameters

1. **`key`**: A string identifier for the dictionary key from which you want to retrieve content.
2. **`locale`** (optional): A specific locale to use. If omitted, the hook defaults to the locale set in the client or server context.

## Content Declaration Files

It's crucial that all content keys are defined within content declaration files to prevent runtime errors and ensure type safety. This approach also facilitates TypeScript integration for compile-time validation.

Instructions for setting up content declaration files are available [here](https://github.com/aymericzip/intlayer/blob/main/docs/en/content_declaration/get_started.md).

## Example Usage in Next.js

Here's how you can implement the `useIntlayer` hook within a Next.js page to dynamically load localized content based on the application's current locale:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  return (
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

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

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

import { useIntlayer } from "next-intlayer/server";

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

## Handling Attribute Localization

To localize attributes such as `alt`, `title`, `href`, `aria-label`, etc., ensure you reference the content correctly:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Further Information

- **Intlayer Visual Editor**: Learn how to use the visual editor for easier content management [here](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_editor.md).

This documentation outlines the use of the `useIntlayer` hook specifically within Next.js environments, providing a robust solution for managing localization across your Next.js applications.
