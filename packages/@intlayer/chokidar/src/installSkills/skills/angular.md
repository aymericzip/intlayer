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
  version: 8.1.2
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

### Intlayer Provider

To use Intlayer in your Angular application, you need to add the `provideIntlayer` provider to your application configuration.

```typescript
import { ApplicationConfig } from "@angular/core";
import { provideIntlayer } from "angular-intlayer";

export const appConfig: ApplicationConfig = {
  providers: [provideIntlayer()],
};
```

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

## Change language

To change the language, use the `setLocale` function from the `useLocale` hook.

```typescript
import { Component } from "@angular/core";
import { useLocale } from "angular-intlayer";
import { Locales } from "intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  template: `
    <button (click)="setLocale(Locales.FRENCH)">
      Change Language to French
    </button>
  `,
})
export class LocaleSwitcherComponent {
  Locales = Locales;
  private localeCtx = useLocale();
  setLocale = this.localeCtx.setLocale;
}
```

## Localized Link component

Ensure your application's navigation respects the current locale by using a localized link. You can create a component or use a helper.

```typescript
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { useLocale } from "angular-intlayer";
import { getLocalizedUrl } from "intlayer";

@Component({
  selector: "app-link",
  standalone: true,
  imports: [RouterModule],
  template: `
    <a [routerLink]="localizedHref()" [replaceUrl]="false">
      <ng-content></ng-content>
    </a>
  `,
})
export class LinkComponent {
  @Input() href: string = "";

  private localeCtx = useLocale();
  locale = this.localeCtx.locale;

  localizedHref() {
    return this.href.startsWith("http")
      ? this.href
      : getLocalizedUrl(this.href, this.locale());
  }
}
```

## References

- [Angular](https://intlayer.org/doc/environment/angular.md)
- [Angular Intlayer Exports](https://intlayer.org/doc/packages/angular-intlayer/exports.md)
- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
