---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Function Documentation | vue-intlayer
description: Learn how to use the usePathname function from the vue-intlayer package
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisation
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
    changes: "Initialise history"
author: aymericzip
---

# Vue Integration: `usePathname` Documentation

The `usePathname` function returns the current browser pathname with the locale segment removed, as a Vue `ComputedRef<string>`. This is useful for building locale-aware navigation—for example, to determine which nav item is active—without having to strip off the locale prefix manually.

## Importing `usePathname` in Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Overview

`usePathname` creates a Vue computed ref that reads `window.location.pathname`, removes the locale prefix via `getPathWithoutLocale`, and updates its value whenever the browser fires a `popstate` event (back/forward navigation). The value can be used directly in your Vue templates or setup functions.

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

| Type                  | Description                                                                         |
| --------------------- | ----------------------------------------------------------------------------------- |
| `ComputedRef<string>` | Vue Computed Ref containing the current browser pathname without the locale prefix. |

## Behaviour

- **Locale stripping**: Removes the leading locale segment (e.g. `/en-GB/dashboard` → `/dashboard`).
- **Reactive**: Updates the value on every `popstate` event (browser back / forward navigation).
- **SSR-safe**: Returns `""` when `window` is unavailable.
- **Cleanup**: The `popstate` listener is added globally upon initialisation and typically does not require manual per-component cleanup, thanks to how Vue manages the lifecycle.

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

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/vue-intlayer/useLocale.md) — current locale + locale switcher
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getPathWithoutLocale.md) — the underlying utility used by this hook
