# Next.js Integration: `useIntlayerAsync` Hook Documentation

The `useIntlayerAsync` hook extends the functionality of `useIntlayer` by not only returning pre-rendered dictionaries but also fetching updates asynchronously, making it ideal for applications that frequently update their localized content after initial render.

## Overview

- **Asynchronous Dictionary Loading:**  
  On the client side, `useIntlayerAsync` first returns the pre-rendered locale dictionary (just like `useIntlayer`) and then asynchronously fetches and merges any newly available remote dictionaries.
- **Progress State Management:**  
  The hook also provides an `isLoading` state, indicating when a remote dictionary is being fetched. This allows developers to display loading indicators or skeleton states for a smoother user experience.

## Environment Setup

Intlayer provides a headless Content Source Management (CSM) system that empowers non-developers to manage and update application content seamlessly. By using Intlayer’s intuitive dashboard, your team can edit localized text, images, and other resources without directly modifying code. This streamlines the content management process, fosters collaboration, and ensures that updates can be made quickly and easily.

To get started with Intlayer, you will first need to register and obtain an access token at [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Once you have your credentials, add them to your configuration file as shown below:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

export default {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// यह कॉन्फ़िगरेशन सेटिंग हैं
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// यह कॉन्फ़िगरेशन सेटिंग हैं
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

After configuring your credentials, you can push a new locale dictionary to Intlayer by running:

```bash
npx intlayer push -d my-first-dictionary-key
```

This command uploads your initial content dictionaries, making them available for asynchronous fetching and editing through the Intlayer platform.

## Importing `useIntlayerAsync` in Next.js

Since `useIntlayerAsync` is intended for **client-side** components, you’ll import it from the same client entry point as `useIntlayer`:

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

Make sure that the importing file is annotated with `"use client"` at the top, if you’re using Next.js App Router with server and client components separated.

## Parameters

1. **`key`**:  
   **Type**: `DictionaryKeys`  
   The dictionary key used to identify the localized content block. This key should be defined in your content declaration files.

2. **`locale`** (optional):  
   **Type**: `Locales`  
   The specific locale you want to target. If omitted, the hook uses the locale from the client context.

3. **`isRenderEditor`** (optional, defaults to `true`):  
   **Type**: `boolean`  
   Determines whether the content should be ready for rendering with the Intlayer editor overlay. If set to `false`, the returned dictionary data will exclude editor-specific features.

## Return Value

The hook returns a dictionary object containing localized content keyed by `key` and `locale`. It also includes an `isLoading` boolean indicating whether a distant dictionary is currently being fetched.

## Example Usage in Next.js

### Client-Side Component Example

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**Key Points:**

- On initial render, `title` and `description` come from the pre-rendered locale dictionary.
- While `isLoading` is `true`, a remote request is made in the background to fetch an updated dictionary.
- Once the fetch completes, `title` and `description` are updated with the newest content, and `isLoading` returns to `false`.

## Handling Attribute Localization

As with `useIntlayer`, you can retrieve localized attribute values for various HTML properties (e.g., `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Content Declaration Files

All content keys must be defined in your content declaration files for type safety and to prevent runtime errors. These files enable TypeScript validation, ensuring you always reference existing keys and locales.

Instructions for setting up content declaration files are available [here](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md).

## Further Information

- **Intlayer Visual Editor:**  
  Integrate with the Intlayer visual editor for managing and editing content directly from the UI. More details [here](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md).

---

**In summary**, `useIntlayerAsync` is a powerful client-side hook designed to enhance the user experience and maintain content freshness by marrying pre-rendered dictionaries with asynchronous dictionary updates. By leveraging `isLoading` and TypeScript-based content declarations, you can seamlessly integrate dynamic, localized content into your Next.js applications.
