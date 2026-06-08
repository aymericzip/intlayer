---
name: intlayer-svelte
description: Integrates Intlayer internationalization with Svelte and SvelteKit applications. Use when the user asks to "setup Svelte i18n", create a new translated component, use the "useIntlayer" store, or configure providers.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n, svelte, vite]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Svelte Usage

## Core Philosophy

Intlayer promotes **Component-Level Content Declaration**. Instead of a massive global translation file, content is declared in `*.content.ts` files adjacent to the Svelte components that use them.

## Workflow

To create a translated component, you need two files:

1.  **Declaration:** A content file (e.g., `myComponent.content.ts`) defining the dictionary.
2.  **Implementation:** A Svelte component (e.g., `MyComponent.svelte`) using the `useIntlayer` store.

### 1. Declare Content

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

- [SvelteKit](https://intlayer.org/doc/environment/sveltekit.md)
- [Vite and Svelte](https://intlayer.org/doc/environment/vite-and-svelte.md)

## useIntlayer Hook

In Svelte, `useIntlayer` returns a **store**. You must use the `$` prefix to access its value.

```svelte
<script>
  import { useIntlayer } from "svelte-intlayer";
  const content = useIntlayer("my-component");
</script>

<div>
  <h1>
    {/* Return content */}
    {$content.text}
  </h1>
  {/* Return string (.value) */}
  <div aria-label={$content.text.value}></div>
</div>
```

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
- [Vite and Svelte](https://intlayer.org/doc/environment/vite-and-svelte.md)
- [SvelteKit](https://intlayer.org/doc/environment/sveltekit.md)
- [Svelte Intlayer Exports](https://intlayer.org/doc/packages/svelte-intlayer/exports.md)
