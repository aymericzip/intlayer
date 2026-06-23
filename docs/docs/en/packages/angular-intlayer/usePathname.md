---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Documentation | angular-intlayer
description: See how to use the usePathname hook for angular-intlayer package
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Angular
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - angular-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Add usePathname utility"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Init history"
author: aymericzip
---

# Angular Integration: `usePathname` Hook Documentation

The `usePathname` hook returns the current browser pathname with the locale segment stripped, as an Angular `Signal<string>`. It is useful for building locale-aware navigation — for example, determining which nav item is active — without having to manually remove the locale prefix.

## Importing `usePathname` in Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## Overview

`usePathname` reads `window.location.pathname`, strips the locale prefix via `getPathWithoutLocale`, and updates the signal whenever the browser fires a `popstate` event (back/forward navigation). It uses Angular's `DestroyRef` to clean up the event listener automatically when the component is destroyed.

## Usage

```typescript fileName="src/app/nav-item.component.ts"
import { Component, input } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-nav-item",
  template: `
    <a
      [href]="href()"
      [attr.aria-current]="pathname() === href() ? 'page' : null"
    >
      {{ label() }}
    </a>
  `,
})
export class NavItemComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();

  readonly pathname = usePathname();
}
```

## Return Value

| Type             | Description                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| `Signal<string>` | Angular signal containing the current pathname without the locale prefix. |

## Behavior

- **Locale stripping**: Removes the leading locale segment (e.g. `/fr/dashboard` → `/dashboard`).
- **Reactive**: Updates automatically on `popstate` events (browser back / forward navigation).
- **SSR-safe**: Returns `""` when `window` is not available.
- **Cleanup**: The `popstate` listener is removed via `DestroyRef.onDestroy` when the host component is destroyed.

## Example

```typescript fileName="src/app/sidebar.component.ts"
import { Component } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-sidebar",
  template: `
    <nav>
      @for (link of links; track link.href) {
        <a
          [href]="link.href"
          [style.font-weight]="pathname() === link.href ? 'bold' : 'normal'"
        >
          {{ link.label }}
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Settings" },
  ];

  readonly pathname = usePathname();
}
```

## Related

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/angular-intlayer/exports.md) — current locale + locale switcher
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md) — the underlying utility used by this hook
