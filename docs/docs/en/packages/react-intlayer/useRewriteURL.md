---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Hook Documentation
description: React-specific hook for managing localized URL rewrites in Intlayer.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

The `useRewriteURL` hook is designed to manage localized URL rewrites on the client side. It automatically detects if the current URL should be corrected to a "pretty" localized version based on the user's locale and the rewrite rules defined in `intlayer.config.ts`.

Unlike standard navigation, this hook uses `window.history.replaceState` to update the URL in the address bar without triggering a full page reload or a router navigation cycle.

## Usage

Simply call the hook in a client-side component.

```tsx
import { useRewriteURL } from "react-intlayer";

const MyComponent = () => {
  // Automatically correct /fr/tests to /fr/essais in the address bar if a rewrite rule exists
  useRewriteURL();

  return <div>My Component</div>;
};
```

## How it works

1. **Detection**: The hook monitors the current `window.location.pathname` and the user's `locale`.
2. **Matching**: It uses the internal Intlayer engine to check if the current pathname matches a canonical route that has a prettier localized alias for the current locale.
3. **URL Correction**: If a better alias is found (and it's different from the current path), the hook calls `window.history.replaceState` to update the browser URL while preserving the same canonical content and state.

## Why use it?

- **SEO**: Ensures that users always land on the single, authoritative pretty URL for a given language.
- **Consistency**: Prevents inconsistencies where a user might manually type a canonical path (like `/fr/privacy-notice`) instead of the localized version (`/fr/politique-de-confidentialite`).
- **Performance**: Updates the address bar without triggering unwanted router side-effects or component re-mounts.
