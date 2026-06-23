---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Documentation | react-intlayer
description: Learn how to use the usePathname hook from the react-intlayer package to get the current URL pathname without the locale segment.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - internationalisation
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Add usePathname utility"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Initialise history"
author: aymericzip
---

# React Integration: `usePathname` Hook Documentation

The `usePathname` hook from `react-intlayer` returns the current browser pathname with the locale segment removed. It relies on the native `window.location.pathname` property and reacts to browser navigation events via `popstate`.

## Importing `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## Overview

Unlike framework-specific routing hooks (such as those in `next-intlayer` or `react-router`), this hook is a lightweight, framework-agnostic solution for plain React applications. It extracts the current URL and strips any matching locale prefix (e.g., `/en-GB/about` becomes `/about`).

## Usage

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Home
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        About
      </a>
    </nav>
  );
};

export default Navigation;
```

## Return Value

| Type     | Description                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `string` | The browser's current pathname with the locale prefix removed (e.g. `/en-GB/dashboard` → `/dashboard`). |

## Behaviour

- **Locale Stripping**: Under the hood, it uses the `getPathWithoutLocale` utility to automatically detect and remove the locale from the pathname based on the application's Intlayer configuration.
- **Reactivity**: Listens to the `popstate` event. When the user navigates using the browser's back/forward buttons, or when `pushState`/`replaceState` are called, the hook updates the returned pathname.
- **SSR Fallback**: On the server (where `window` is undefined), it defaults to returning `/` since it does not have access to the request URL by default in a pure React context.

## Related Documentation

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getPathWithoutLocale.md)
