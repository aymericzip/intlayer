---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Hook Documentation
description: Next.js-specific hook for managing localised URL rewrites in Intlayer.
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

The `useRewriteURL` hook for Next.js is a client-side hook that automatically manages localised URL rewrites. It ensures that the browser's address bar always reflects the "pretty" localised path defined in your `intlayer.config.ts`, even if the user manually types a canonical path with a locale prefix.

This hook operates silently by using `window.history.replaceState`, avoiding redundant Next.js router navigations or page reloads.

## Usage

Simply call the hook in a Client Component that is part of your layout.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // Automatically corrects /fr/privacy-notice to /fr/politique-de-confidentialite in the address bar
  useRewriteURL();

  return null;
};
```

## How it works

1. **Path Monitoring**: The hook listens for changes to the user's `locale`.
2. **Rewrite Detection**: It checks the current `window.location.pathname` against the rewrite rules in your configuration.
3. **URL Correction**: If a prettier localised alias is found for the current path, the hook triggers a `window.history.replaceState` to update the address bar while keeping the user on the same internal page.

## Why use it in Next.js?

While the `intlayerMiddleware` handles server-side rewrites and initial redirects, the `useRewriteURL` hook ensures that the browser's URL remains consistent with your preferred SEO structure even after client-side transitions.

- **Clean URLs**: Enforces the use of localised segments like `/fr/essais` instead of `/fr/tests`.
- **Performance**: Updates the address bar without triggering a full router cycle or re-fetching data.
- **SEO Alignment**: Prevents duplicate content issues by ensuring only one URL version is visible to the user and search engine bots.
