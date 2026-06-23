---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: comparePaths Function Documentation | intlayer
description: See how to use the comparePaths function for intlayer package
keywords:
  - comparePaths
  - normalizePath
  - active link
  - navigation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "Initial documentation"
author: aymericzip
---

# Documentation: `comparePaths` Function in `intlayer`

## Description

The `comparePaths` function compares two URLs or pathnames for equality while ignoring the locale segment, the protocol/host, the query string, the hash and trailing slashes. It is the recommended way to determine whether a navigation link points to the current page — for example to highlight the active link — without having to roll your own (error-prone) normalization logic.

Internally it reuses [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md) to strip the locale segment, so it respects your configured routing mode and locales.

The package also exports the underlying [`normalizePath`](#normalizepath) helper, which returns the canonical, locale-agnostic pathname used for the comparison.

**Key Features:**

- Locale-agnostic comparison (`/fr/about` matches `/about`)
- Works with both absolute URLs and relative pathnames
- Ignores query string, hash and trailing slashes
- Tolerates missing leading slashes and empty values (normalized to `/`)
- Lightweight — built on top of `getPathWithoutLocale`

---

## Function Signature

```typescript
comparePaths(
  pathname: string,  // Required
  href: string,      // Required
  locales?: Locales[] // Optional
): boolean

normalizePath(
  inputUrl: string,   // Required
  locales?: Locales[] // Optional
): string
```

---

## Parameters

- `pathname: string`
  - **Description**: The first URL string or pathname to compare (typically the current pathname).
  - **Type**: `string`
  - **Required**: Yes

- `href: string`
  - **Description**: The second URL string or pathname to compare (typically a navigation link's `href`).
  - **Type**: `string`
  - **Required**: Yes

- `locales: Locales[]`
  - **Description**: Optional array of supported locales. Defaults to the configured locales in the project.
  - **Type**: `Locales[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `boolean`
- **Description**: `true` when both inputs resolve to the same locale-agnostic path, otherwise `false`.

---

## Example Usage

### Basic Usage

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### Absolute and relative URLs

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Highlighting the active navigation link

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` returns the canonical, locale-agnostic pathname used by `comparePaths`. It strips the locale segment, the protocol/host, the query string and the hash, ensures a single leading slash, removes any trailing slash (except for the root) and falls back to `/` for empty values.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## Related Functions

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md): Removes the locale segment from a URL or pathname.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPrefix.md): Determines the URL prefix for a given locale.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md): Generates a localized URL for a specific locale.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
