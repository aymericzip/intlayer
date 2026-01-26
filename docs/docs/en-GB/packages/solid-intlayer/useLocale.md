---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useLocale Hook Documentation | solid-intlayer
description: See how to use the useLocale hook for the solid-intlayer package
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# useLocale Hook Documentation

The `useLocale` hook allows you to manage the current locale in your Solid application. It provides access to the current locale (as an accessor), the default locale, the available locales, and a function to update the locale.

## Usage

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Description

The hook returns an object containing the following properties:

1. **locale**: A Solid accessor (`() => string`) that returns the current locale.
2. **defaultLocale**: The default locale defined in your `intlayer.config.ts`.
3. **availableLocales**: An array of all locales supported by your application.
4. **setLocale**: A function to update the application's locale. It also handles persistence (cookies or local storage) if enabled.

## Parameters

- **props** (optional):
  - **onLocaleChange**: A callback invoked whenever the locale changes.
  - **isCookieEnabled**: Whether to persist the locale in a cookie.
