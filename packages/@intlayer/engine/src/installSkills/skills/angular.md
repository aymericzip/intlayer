---
name: intlayer-angular
description: Integrates Intlayer internationalization with Angular applications. Use when the user asks to "setup Angular i18n", create a new translated component, use the "useIntlayer" composable, or configure providers.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n, angular]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Angular Usage

## Core Philosophy

Intlayer promotes **Component-Level Content Declaration**. Instead of a massive global translation file, content is declared in `*.content.ts` files adjacent to the Angular components that use them.

## Workflow

To create a translated component, you need two files:

1.  **Declaration:** A content file (e.g., `my-component.content.ts`) defining the dictionary.
2.  **Implementation:** An Angular component (e.g., `my-component.component.ts`) using the `useIntlayer` signal.

### 1. Declare Content

Create a content file using `t()` for translations.
**File:** `src/app/my-component/my-component.content.ts`

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

- [Angular](https://intlayer.org/doc/environment/angular.md)
- [Angular 19](https://intlayer.org/doc/environment/angular/19.md)
- [Analog](https://intlayer.org/doc/environment/analog.md)

Register `provideIntlayer()` in the `providers` of your `ApplicationConfig` (see the [Angular guide](https://intlayer.org/doc/environment/angular.md)).

## useIntlayer Hook

In Angular, `useIntlayer` returns a **Signal**. You must call it as a function to access the value.

```typescript
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my-component",
  standalone: true,
  template: `
    <div>
      <h1>
        {{ content().text }}
      </h1>
      <img [src]="content().text.value" [alt]="content().text.value" />
    </div>
  `,
})
export class MyComponent {
  content = useIntlayer("my-component");
}
```

## Compiler

The [Intlayer Compiler](https://intlayer.org/doc/compiler.md) can extract all your content keys from your components, using one CLI command (`npx intlayer extract`) or automatically at app build.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Angular](https://intlayer.org/doc/environment/angular.md)
- [Angular 19](https://intlayer.org/doc/environment/angular/19.md)
- [Analog](https://intlayer.org/doc/environment/analog.md)

### Concepts

- [Variants](https://intlayer.org/doc/concept/variants.md)
- [Collections](https://intlayer.org/doc/concept/collections.md)
- [Compiler](https://intlayer.org/doc/compiler.md)
- [Formatters (number, currency, date, …)](https://intlayer.org/doc/formatters.md)

### Packages

- [Angular Intlayer Exports](https://intlayer.org/doc/packages/angular-intlayer/exports.md)
- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
- [angular-intlayer usePathname](https://intlayer.org/doc/packages/angular-intlayer/usePathname.md)
