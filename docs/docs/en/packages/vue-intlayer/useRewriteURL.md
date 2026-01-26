---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Composable Documentation
description: Vue-specific composable for managing localized URL rewrites in Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# useRewriteURL Composable

The `useRewriteURL` composable for Vue 3 is designed to handle localized URL rewrites on the client side. It automatically corrects the browser's URL to its "pretty" localized version based on the user's current locale and the configuration in `intlayer.config.ts`.

It works by using `window.history.replaceState`, which avoids triggering unwanted Vue Router navigations.

## Usage

Call the composable within your `setup()` function or `<script setup>`.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// Automatically correct /fr/tests to /fr/essais in the address bar if a rewrite rule exists
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## How it works

1. **Reactive Monitoring**: The composable sets up a `watch` on the user's `locale`.
2. **Rewrite Matching**: Whenever the locale changes (or on mount), it checks if the current `window.location.pathname` matches a canonical route that has a prettier localized alias.
3. **URL Correction**: If a prettier alias is found, the composable calls `window.history.replaceState` to update the address bar without reloading the page or losing router state.

## Why use it?

- **SEO Optimization**: Ensures search engines index the authoritative localized version of your URLs.
- **Improved UX**: Corrects manually entered URLs to reflect your preferred naming (e.g., `/fr/a-propos` instead of `/fr/about`).
- **Low Overhead**: Silently updates the URL without re-triggering component lifecycles or navigation guards.

---
