---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Function Documentation | svelte-intlayer
description: See how to use the usePathname function for svelte-intlayer package
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
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

# Svelte Integration: `usePathname` Documentation

The `usePathname` function returns the current browser pathname with the locale segment stripped, as a Svelte `Readable<string>` store. It is useful for building locale-aware navigation — for example, determining which nav item is active — without having to manually remove the locale prefix.

## Importing `usePathname` in Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## Overview

`usePathname` creates a Svelte readable store that reads `window.location.pathname`, strips the locale prefix via `getPathWithoutLocale`, and emits a new value whenever the browser fires a `popstate` event (back/forward navigation). Subscribe with the `$` store syntax in components.

## Usage

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## Return Value

| Type               | Description                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| `Readable<string>` | Svelte readable store containing the current pathname without the locale prefix. |

## Behavior

- **Locale stripping**: Removes the leading locale segment (e.g. `/fr/dashboard` → `/dashboard`).
- **Reactive**: Emits a new value on every `popstate` event (browser back / forward navigation).
- **SSR-safe**: Returns `""` when `window` is not available.
- **Cleanup**: The `popstate` listener is removed automatically when the last subscriber unsubscribes.

## Example

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Settings" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## Related

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/svelte-intlayer/exports.md) — current locale + locale switcher
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md) — the underlying utility used by this function
