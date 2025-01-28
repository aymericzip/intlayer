# React Integration: `useIntlayerAsync` Hook Documentation

The `useIntlayerAsync` hook extends the functionality of `useIntlayer` by not only returning pre-rendered dictionaries but also fetching updates asynchronously, making it ideal for applications that frequently update their localized content after the initial render.

## Overview

- **Asynchronous Dictionary Loading:**  
  On initial mount, `useIntlayerAsync` first returns any pre-fetched or statically bundled locale dictionary (just like `useIntlayer` would) and then asynchronously fetches and merges any newly available remote dictionaries.
- **Progress State Management:**  
  The hook also provides an `isLoading` state, indicating when a remote dictionary is being fetched. This allows developers to display loading indicators or skeleton states for a smoother user experience.

## Environment Setup

Intlayer provides a headless Content Source Management (CSM) system that empowers non-developers to manage and update application content seamlessly. By using Intlayer’s intuitive dashboard, your team can edit localized text, images, and other resources without directly modifying code. This streamlines the content management process, fosters collaboration, and ensures that updates can be made quickly and easily.

To get started with Intlayer:

1. **Register and obtain an access token** at [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Add credentials to your configuration file:**  
   In your React project, configure the Intlayer client with your credentials:

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
   /** @type {import('intlayer').IntlayerConfig} */
   const config = {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   };

   module.exports = config;
   ```

3. **Push a new locale dictionary to Intlayer:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   This command uploads your initial content dictionaries, making them available for asynchronous fetching and editing through the Intlayer platform.

## Importing `useIntlayerAsync` in React

In your React components, import `useIntlayerAsync`:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## Parameters

1. **`key`**:  
   **Type**: `DictionaryKeys`  
   The dictionary key used to identify the localized content block. This key should be defined in your content declaration files.

2. **`locale`** (optional):  
   **Type**: `Locales`  
   The specific locale you want to target. If omitted, the hook uses the locale from the current Intlayer context.

3. **`isRenderEditor`** (optional, defaults to `true`):  
   **Type**: `boolean`  
   Determines whether the content should be ready for rendering with the Intlayer editor overlay. If set to `false`, the returned dictionary data will exclude editor-specific features.

## Return Value

The hook returns a dictionary object containing localized content keyed by `key` and `locale`. It also includes an `isLoading` boolean indicating whether a remote dictionary is currently being fetched.

## Example Usage in a React Component

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Content is loading...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Loading…</h1>
          <p>Please wait while content updates.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Content is loading...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Loading…</h1>
          <p>Please wait while content updates.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Content is loading...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Loading…</h1>
          <p>Please wait while content updates.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**Key Points:**

- On initial render, `title` and `description` come from the pre-fetched or statically embedded locale dictionary.
- While `isLoading` is `true`, a background request fetches an updated dictionary.
- Once the fetch completes, `title` and `description` are updated with the newest content, and `isLoading` returns to `false`.

## Handling Attribute Localization

You can also retrieve localized attribute values for various HTML properties (e.g., `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Content Declaration Files

All content keys must be defined in your content declaration files for type safety and to prevent runtime errors. These files enable TypeScript validation, ensuring you always reference existing keys and locales.

Instructions for setting up content declaration files are available [here](https://github.com/aymericzip/intlayer/blob/main/docs/en/content_declaration/get_started.md).

## Further Information

- **Intlayer Visual Editor:**  
  Integrate with the Intlayer visual editor for managing and editing content directly from the UI. More details [here](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md).

---

**In summary**, `useIntlayerAsync` is a powerful React hook designed to enhance the user experience and maintain content freshness by merging pre-rendered or pre-fetched dictionaries with asynchronous dictionary updates. By leveraging `isLoading` and TypeScript-based content declarations, you can seamlessly integrate dynamic, localized content into your React applications.
