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

- [Vite and Preact](https://intlayer.org/doc/environment/vite-and-preact.md)

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

## Compiler

The [Intlayer Compiler](https://intlayer.org/doc/compiler.md) can extract all your content keys from your components, using one CLI command (`npx intlayer extract`) or automatically at app build.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Vite and Preact](https://intlayer.org/doc/environment/vite-and-preact.md)
- [Astro and Preact](https://intlayer.org/doc/environment/astro/preact.md)

### Concepts

- [Variants](https://intlayer.org/doc/concept/variants.md)
- [Collections](https://intlayer.org/doc/concept/collections.md)
- [Compiler](https://intlayer.org/doc/compiler.md)
- [Formatters (number, currency, date, …)](https://intlayer.org/doc/formatters.md)

### Packages

- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
- [Preact Intlayer Exports](https://intlayer.org/doc/packages/preact-intlayer/exports.md)
- [preact-intlayer usePathname](https://intlayer.org/doc/packages/preact-intlayer/usePathname.md)
