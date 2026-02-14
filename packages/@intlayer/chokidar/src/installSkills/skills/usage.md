---
name: Intlayer Usage
description: How to use Intlayer in your project
---

# Intlayer Usage

To use Intlayer effectively:

1.  **Retrieve Locales**: Check `intlayer.config.{ts,js,json,json5,jsonc,cjs,mjs}`, `.intlayerrc` to see the configured locales.

2.  **Declare Content**:
    We recommend creating one content declaration file per component, located alongside the component file. This keeps translations close to the code.

    **Example Directory Structure:**

    ```
    src/
    ├── components/
    │   ├── MyComponent/
    │   │   ├── index.content.ts          # Content declaration
    │   │   └── index.tsx                 # Component
    │   ├── MyOtherComponent.content.ts   # Content declaration
    │   └── MyOtherComponent.tsx          # Component
    ```

    **Content Templates:**

    _TypeScript (.content.ts)_

    ```typescript
    import { t, type Dictionary } from "intlayer";

    const content = {
      key: "my-component-key",
      content: {
        title: t({
          en: "Hello World",
          es: "Hola Mundo",
        }),
        description: "My description text",
      },
    } satisfies Dictionary;

    export default content;
    ```

    _TypeScript with React (.content.tsx)_

    ```tsx
    import { t, type Dictionary } from "intlayer";
    import { ReactNode } from "react";

    const content = {
      key: "my-component-key",
      content: {
        description: t<ReactNode>({
          en: <>My description text</>,
          es: <>Mi descripción de texto</>,
        }),
      },
    } satisfies Dictionary;

    export default content;
    ```

    ```json
    {
      "key": "my-component-key",
      "content": {
        "title": {
          "en": "Hello World",
          "fr": "Bonjour le monde"
        }
      }
    }
    ```

    ```javascript
    import { t } from "intlayer";

    export default {
      key: "my-component-key",
      content: {
        title: t({
          en: "Hello World",
          fr: "Bonjour le monde",
        }),
      },
    };
    ```

    - [Content Declaration Documentation](https://intlayer.org/doc/concept/content.md)
    - [Content File Format](https://intlayer.org/doc/concept/content/file.md)

3.  **Consume Content**: Use the provided hooks and functions to access your content.
    - [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
    - [React Intlayer Exports](https://intlayer.org/doc/packages/react-intlayer/exports.md)

    **Common Packages:**
    - `intlayer`: Core package for content declaration and utility functions.
    - `react-intlayer`: React components and hooks (e.g., `useIntlayer`).
    - `vite-intlayer`: Vite plugin for integration.

4.  **CLI Commands**:
    Useful commands for managing your content:
    - `npx intlayer build`: Build the dictionaries from your content declarations.
