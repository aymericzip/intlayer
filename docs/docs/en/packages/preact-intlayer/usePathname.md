---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Documentation | preact-intlayer
description: See how to use the usePathname hook for preact-intlayer package
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Preact
  - JavaScript
slugs:
  - doc
  - packages
  - preact-intlayer
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

# Preact Integration: `usePathname` Hook Documentation

The `usePathname` hook returns the current browser pathname with the locale segment stripped. It is useful for building locale-aware navigation — for example, determining which nav item is active — without having to manually remove the locale prefix.

## Importing `usePathname` in Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## Overview

`usePathname` reads `window.location.pathname`, strips the locale prefix via `getPathWithoutLocale`, and re-renders the component whenever the browser fires a `popstate` event (back/forward navigation). It returns an empty string during server-side rendering.

## Usage

```tsx fileName="src/components/NavItem.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FunctionComponent<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Return Value

| Type     | Description                                                                                |
| -------- | ------------------------------------------------------------------------------------------ |
| `string` | The current pathname without the locale prefix. Empty string during server-side rendering. |

## Behavior

- **Locale stripping**: Removes the leading locale segment (e.g. `/en/dashboard` → `/dashboard`).
- **Reactive**: Updates automatically on `popstate` events (browser back / forward navigation).
- **SSR-safe**: Returns `""` when `window` is not available.
- **Cleanup**: The `popstate` listener is removed automatically when the component unmounts.

## Example

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

const Sidebar: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
```

## Related

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/preact-intlayer/exports.md) — current locale + locale switcher
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md) — the underlying utility used by this hook
