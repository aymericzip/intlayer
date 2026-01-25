---
title: useRewriteURL Hook Documentation
description: Svelte-specific hook for managing localized URL rewrites in Intlayer.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

The `useRewriteURL` hook for Svelte is designed to manage localized URL rewrites on the client side. It automatically corrects the browser's URL to its "pretty" localized version based on the current locale and the configuration in `intlayer.config.ts`.

It updates the URL silently using `window.history.replaceState`, avoiding full SvelteKit navigations.

## Usage

Call the hook within a Svelte component.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // Automatically correct /fr/tests to /fr/essais in the address bar if a rewrite rule exists
  useRewriteURL();
</script>

<slot />
```

## How it works

1. **Reactive Updates**: The hook subscribes to the Intlayer `locale` store.
2. **Detection**: Whenever the locale changes (or on mount), it calculates if the current `window.location.pathname` has a prettier localized alias defined in your rewrite rules.
3. **URL Correction**: If a prettier path is found, the hook calls `window.history.replaceState` to update the address bar without a full page reload or triggering SvelteKit navigation logic.

## Why use it?

- **SEO Best Practices**: Ensures search engines index only the pretty, localized version of your URLs.
- **Improved UX**: Corrects manually entered URLs to reflect your preferred naming structure.
- **Silent Updates**: Modifies the address bar without affecting the component tree or navigation history.
