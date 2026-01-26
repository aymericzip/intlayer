---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Hook Documentation
description: Solid-specific hook for managing localised URL rewrites in Intlayer.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

The `useRewriteURL` hook for SolidJS is designed to manage localised URL rewrites on the client-side. It automatically corrects the browser's URL to its "pretty" localised version based on the current locale and the configuration in `intlayer.config.ts`.

By using `window.history.replaceState`, it avoids unnecessary Solid Router navigations.

## Usage

Call the hook within a component that is part of your application.

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // Automatically correct /fr/tests to /fr/essais in the address bar if a rewrite rule exists.
  useRewriteURL();

  return <>{props.children}</>;
};
```

## How it works

1. **Detection**: The hook uses `createEffect` to monitor changes in the reactive `locale()`.
2. **Matching**: It identifies if the current `window.location.pathname` corresponds to a canonical route that has a prettier localised alias for the current language.
3. **URL Correction**: If a prettier alias is found, the hook calls `window.history.replaceState` to update the address bar without affecting the internal navigation state or causing component re-renders.

## Why use it?

- **Authoritative URLs**: Enforces a single URL for each localised version of your content, which is crucial for search engine optimisation (SEO).
- **Developer Convenience**: Allows you to keep your internal route definitions canonical while exposing user-friendly, localised paths to the outside world.
- **Consistency**: Corrects URLs when users manually type a path that doesn't follow your preferred localisation rules.

---
