---
name: intlayer-preact
description: Integrates Intlayer internationalization with Preact applications. Use when the user asks to "setup Preact i18n", create a new translated component, use the "useIntlayer" hook in Preact, or configure providers.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n, preact, vite]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Preact Usage

## Core Philosophy

Intlayer promotes **Component-Level Content Declaration**. Instead of a massive global translation file, content is declared in `*.content.ts` files adjacent to the Preact components that use them.

## Workflow

To create a translated component, you need two files:

1.  **Declaration:** A content file (e.g., `myComponent.content.ts`) defining the dictionary.
2.  **Implementation:** A Preact component (e.g., `MyComponent.tsx`) using the `useIntlayer` hook.

### Declare Content

Create a content file using `t()` for translations.
**File:** `src/components/MyComponent/myComponent.content.ts`

```typescript
import { t, type Dictionary } from "intlayer";

const content = {
  // The 'key' must be unique and matches what you pass to useIntlayer()
  key: "my-component",
  content: {
    text: t({
      en: "Welcome",
      fr: "Bienvenue",
      es: "Hola",
    }),
  },
} satisfies Dictionary;

export default content;
```

## Setup

- [Vite and Preact](references/environment_vite-and-preact.md)

## useIntlayer Hook

```tsx
import { useIntlayer } from "preact-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-component");

  return (
    <div>
      <h1>
        {/* Return content */}
        {content.text}
      </h1>
      {/* Return string (.value) */}
      <img src={content.text.value} alt={content.text.value} />
    </div>
  );
};
```

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

- [Vite and Preact](references/environment_vite-and-preact.md)
- [Intlayer Exports](references/packages_intlayer_exports.md)
- [Preact Intlayer Exports](references/packages_preact-intlayer_exports.md)
