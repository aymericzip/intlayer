---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Documentation | solid-intlayer
description: See how to use the usePathname hook for solid-intlayer package
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisation
  - Documentation
  - Solid
  - Solid.js
  - JavaScript
slugs:
  - doc
  - packages
  - solid-intlayer
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

# Solid Integration: `usePathname` Hook Documentation

The `usePathname` hook returns the current browser pathname with the locale segment stripped, as a Solid `Accessor<string>`. It is useful for building locale-aware navigation — for example, determining which nav item is active — without having to manually remove the locale prefix.

## Importing `usePathname` in Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## Overview

`usePathname` creates a reactive signal initialised from `window.location.pathname`, strips the locale prefix via `getPathWithoutLocale`, and updates the signal whenever the browser fires a `popstate` event (back/forward navigation). The event listener is cleaned up automatically via `onCleanup`.

## Usage

```tsx fileName="src/components/NavItem.tsx"
import type { Component } from "solid-js";
import { usePathname } from "solid-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: Component<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <a href={href} aria-current={pathname() === href ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Return Value

| Type               | Description                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------ |
| `Accessor<string>` | Solid accessor (reactive getter) returning the current pathname without the locale prefix. |

## Behaviour

- **Locale stripping**: Removes the leading locale segment (e.g. `/en-GB/dashboard` → `/dashboard`).
- **Reactive**: Updates automatically on `popstate` events (browser back / forward navigation).
- **SSR-safe**: Returns `""` when `window` is not available.
- **Cleanup**: The `popstate` listener is removed automatically via Solid's `onCleanup`.

## Example

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

const Sidebar: Component = () => {
  const pathname = usePathname();

  return (
    <nav>
      <For each={links}>
        {({ href, label }) => (
          <a
            href={href}
            style={{ "font-weight": pathname() === href ? "bold" : "normal" }}
          >
            {label}
          </a>
        )}
      </For>
    </nav>
  );
};

export default Sidebar;
```

## Related

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/solid-intlayer/useLocale.md) — current locale + locale switcher
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getPathWithoutLocale.md) — the underlying utility used by this hook
