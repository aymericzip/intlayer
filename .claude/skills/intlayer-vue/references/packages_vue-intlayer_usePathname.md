---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Composable Documentation | vue-intlayer
description: See how to use the usePathname composable for vue-intlayer package
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
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

# Vue Integration: `usePathname` Composable Documentation

The `usePathname` composable returns the current browser pathname with the locale segment stripped, as a reactive `ComputedRef<string>`. It is useful for building locale-aware navigation — for example, determining which nav item is active — without having to manually remove the locale prefix.

## Importing `usePathname` in Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Overview

`usePathname` reads `window.location.pathname`, strips the locale prefix via `getPathWithoutLocale`, and updates automatically when the browser fires a `popstate` event (back/forward navigation). The result is exposed as a `ComputedRef<string>` so it integrates naturally with Vue's reactivity system.

## Usage

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## Return Value

| Type                  | Description                                                                      |
| --------------------- | -------------------------------------------------------------------------------- |
| `ComputedRef<string>` | Reactive computed ref containing the current pathname without the locale prefix. |

## Behavior

- **Locale stripping**: Removes the leading locale segment (e.g. `/fr/dashboard` → `/dashboard`).
- **Reactive**: Updates automatically on `popstate` events (browser back / forward navigation).
- **SSR-safe**: Returns `""` when `window` is not available.
- **Cleanup**: The `popstate` listener is removed automatically when the component is unmounted (`onUnmounted`).

## Example

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## Related

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vue-intlayer/exports.md) — current locale + locale switcher
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md) — the underlying utility used by this composable
