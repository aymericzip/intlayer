---
name: intlayer-lit
description: Integrates Intlayer internationalization with Lit web components. Use when the user asks to "setup Lit i18n", create a translated LitElement, use the "useIntlayer" controller, or switch locale in a Lit application.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n, lit, web-components, vite]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Lit Usage

## Core Philosophy

Intlayer promotes **Component-Level Content Declaration**. Instead of a massive global translation file, content is declared in `*.content.ts` files adjacent to the Lit elements that use them.

## Workflow

To create a translated element, you need two files:

1.  **Declaration:** A content file (e.g., `myElement.content.ts`) defining the dictionary.
2.  **Implementation:** A `LitElement` (e.g., `my-element.ts`) using the `useIntlayer` controller.

### Declare Content

Create a content file using `t()` for translations.
**File:** `src/components/myElement.content.ts`

```typescript
import { t, type Dictionary } from "intlayer";

const content = {
  // The 'key' must be unique and matches what you pass to useIntlayer()
  key: "my-element",
  content: {
    title: t({
      en: "Welcome",
      fr: "Bienvenue",
      es: "Hola",
    }),
  },
} satisfies Dictionary;

export default content;
```

## Setup

- [Vite and Lit](references/environment_vite-and-lit.md)

Call `installIntlayer()` from `lit-intlayer` before any custom element is registered (see the [Vite and Lit guide](references/environment_vite-and-lit.md)).

## useIntlayer Controller

> [!IMPORTANT]
> In Lit, `useIntlayer` takes the host element as first argument. It registers itself as a `ReactiveController`, so the element re-renders automatically when the locale changes.

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "my-element");

  override render() {
    return html`
      <h1>${this.content.title}</h1>
      <!-- Return string (.value) for native attributes -->
      <img alt=${this.content.title.value} />
    `;
  }
}
```

## useLocale Controller

```typescript
import { useLocale } from "lit-intlayer";

// Inside a LitElement
private locale = useLocale(this);

// this.locale.locale, this.locale.availableLocales, this.locale.setLocale("fr")
```

## Compiler

The [Intlayer Compiler](references/compiler.md) can extract all your content keys from your components, using one CLI command (`npx intlayer extract`) or automatically at app build.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Vite and Lit](references/environment_vite-and-lit.md)
- [Astro and Lit](references/environment_astro_lit.md)

### Concepts

- [Variants](references/concept_variants.md)
- [Collections](references/concept_collections.md)
- [Compiler](references/compiler.md)
- [Formatters (number, currency, date, …)](references/formatters.md)

### Packages

- [Intlayer Exports](references/packages_intlayer_exports.md)
