---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Hook Documentation
description: Svelte-specific hook for managing localised URL rewrites in Intlayer.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

The `useRewriteURL` hook for Svelte is designed to manage localised URL rewrites on the client side. It automatically corrects the browser's URL to its "pretty" localised version based on the current locale and the configuration in `intlayer.config.ts`.

It updates the URL silently using `window.history.replaceState`, avoiding a full SvelteKit navigation.

## Usage

Call the hook within a Svelte component.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // Automatically corrects /fr/tests to /fr/essais in the address bar if a rewrite rule exists
  useRewriteURL();
</script>

<slot />
```

## How it works

1. **Reactive Updates**: The hook subscribes to the Intlayer `locale` store.
2. **Detection**: Whenever the locale changes (or on mount), it calculates if the current `window.location.pathname` has a prettier localised alias defined in your rewrite rules.
3. **URL Correction**: If a prettier path is found, the hook calls `window.history.replaceState` to update the address bar without a full page reload or triggering SvelteKit navigation logic.

## Why use it?

- **SEO Best Practices**: Ensures search engines index only the pretty, localised version of your URLs.
- **Improved UX**: Corrects manually-entered URLs to reflect your preferred naming structure.
- **Silent Updates**: Updates the address bar without affecting the component tree or the navigation history.
