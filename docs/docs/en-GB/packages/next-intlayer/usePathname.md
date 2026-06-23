---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook Documentation | next-intlayer
description: See how to use the usePathname hook for next-intlayer package
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
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

# Next.js Integration: `usePathname` Hook Documentation

The `usePathname` hook returns the current Next.js pathname with the locale segment stripped. It is useful for building locale-aware navigation — for example, determining which nav item is active — without having to manually remove the locale prefix.

## Importing `usePathname` in Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## Overview

`usePathname` wraps Next.js's built-in `usePathname()` from `next/navigation`, appends any search params, and strips the locale prefix via `getPathWithoutLocale`. It re-renders on every client-side navigation. The hook is available only in Client Components (requires `"use client"`).

## Usage

```tsx fileName="src/components/NavItem.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ href, label }) => {
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

| Type     | Description                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------- |
| `string` | The current pathname without the locale prefix and query params stripped of their locale parameter. |

## Behaviour

- **Locale stripping**: Removes the leading locale segment (e.g. `/en-GB/dashboard` → `/dashboard`).
- **Search param stripping**: Also strips a `?locale=...` query parameter when search-params routing mode is used.
- **Reactive**: Updates on every client-side navigation via Next.js App Router.
- **SSR-safe**: Returns the server-side pathname during the first render, then syncs search params on the client.

## Comparison with `useLocale`

`useLocale` from `next-intlayer` already exposes `pathWithoutLocale` as part of its return value. Use `usePathname` when you only need the path and do not need locale switching functionality.

```tsx codeFormat={["typescript", "esm"]}
// When you need both locale state and the path:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// When you only need the path:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Example

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

const Sidebar: FC = () => {
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

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/next-intlayer/useLocale.md) — current locale + locale switcher (also exposes `pathWithoutLocale`)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getPathWithoutLocale.md) — the underlying utility used by this hook
